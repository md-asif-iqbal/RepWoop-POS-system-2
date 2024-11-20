import { query } from '../../../../../lib/db'; // Replace with your database query utility

export async function GET(request) {
    try {
      // Parse query parameters for filters (if any)
      const url = new URL(request.url);
      const supplier = url.searchParams.get('supplier');
      const status = url.searchParams.get('status');
      const dateFrom = url.searchParams.get('dateFrom');
      const dateTo = url.searchParams.get('dateTo');
  
      // Base query
      let queryText = `SELECT * FROM purchase`;
      const queryParams = [];
  
      // Apply filters
      if (supplier || status || dateFrom || dateTo) {
        queryText += ' WHERE';
      }
      if (supplier) {
        queryParams.push(supplier);
        queryText += ` supplier = $${queryParams.length}`;
      }
      if (status) {
        if (queryParams.length) queryText += ' AND';
        queryParams.push(status);
        queryText += ` status = $${queryParams.length}`;
      }
      if (dateFrom) {
        if (queryParams.length) queryText += ' AND';
        queryParams.push(dateFrom);
        queryText += ` purchase_date >= $${queryParams.length}`;
      }
      if (dateTo) {
        if (queryParams.length) queryText += ' AND';
        queryParams.push(dateTo);
        queryText += ` purchase_date <= $${queryParams.length}`;
      }
  
      // Sorting and finalizing query
      queryText += ` ORDER BY purchase_date DESC`;
  
      // Execute the query
      const result = await query(queryText, queryParams);
  
      // Return the response
      return new Response(
        JSON.stringify({ purchases: result.rows }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error fetching purchases:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch purchases' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }




  export async function POST(request) {
    try {
      const {
        supplier,
        purchaseDate,
        payTerm,
        status,
        invoiceScheme,
        invoiceNo,
        products,
        total,
        discountType,
        discountAmount,
        orderTax,
        note,
        amountPaid,
        changeReturn,
        paymentDate,
        paymentMethod,
        paymentAccount,
        paymentNote,
        totalPayable,
      } = await request.json();
  
      if (!supplier || !products || products.length === 0) {
        throw new Error("Missing required fields: supplier or products");
      }
  
      // Start a database transaction
      await query("BEGIN");
  
      // Fetch supplier data by name
      const supplierResult = await query(
        `SELECT id, opening_balance, paid, purchase_due
         FROM suppliers
         WHERE name = $1
         LIMIT 1;`,
        [supplier]
      );
  
      if (supplierResult.rows.length === 0) {
        throw new Error("Supplier not found");
      }
  
      const supplierData = supplierResult.rows[0];
      let { opening_balance, paid, purchase_due } = supplierData;
  
      // Insert the purchase record into the purchase table
      const purchaseResult = await query(
        `INSERT INTO purchase 
          (supplier, purchase_date, pay_term, status, invoice_scheme, invoice_no, products, total, 
           discount_type, discount_amount, order_tax, note, amount_paid, change_return, 
           payment_date, payment_method, payment_account, payment_note, total_payable) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
         RETURNING *;`,
        [
          supplier,
          purchaseDate,
          payTerm,
          status,
          invoiceScheme,
          invoiceNo,
          JSON.stringify(products),
          total,
          discountType,
          discountAmount,
          orderTax,
          note,
          amountPaid,
          changeReturn,
          paymentDate,
          paymentMethod,
          paymentAccount?.name || null,
          paymentNote,
          totalPayable,
        ]
      );
  
      console.log("Purchase inserted:", purchaseResult.rows[0]);
  
      // Update stock and add expenses for each product
      for (const product of products) {
        const { id, product_name, quantity, subtotal } = product;
  
        if (!id || !quantity) {
          throw new Error("Product ID and quantity are required for stock update");
        }
  
        // Update stock for the product
        await query(
          `UPDATE products
           SET opening_stock = opening_stock + $1
           WHERE id = $2;`,
          [quantity, id]
        );
  
        // Insert an expense for this product
        await query(
          `INSERT INTO expenses 
            (invoice_no, name, amount, created_at)
           VALUES ($1, $2, $3, NOW())
           RETURNING *;`,
          [
            invoiceNo,
            product_name,
            parseFloat(subtotal) || 0,
          ]
        );
      }
  
      // Calculate remaining due and adjust supplier balances
      let remainingDue = totalPayable - amountPaid;
  
      if (remainingDue > 0) {
        // If there is a remaining due, reduce the opening balance
        opening_balance -= remainingDue;
  
        if (opening_balance < 0) {
          // If the opening balance becomes negative, add the excess to purchase_due
          purchase_due += Math.abs(opening_balance);
          opening_balance = 0; // Retain any remaining balance as zero
        }
      } else {
        // If overpayment occurs, increase opening_balance
        opening_balance += Math.abs(remainingDue); // remainingDue will be negative
      }
  
      paid += amountPaid;
  
      // Update supplier record
      await query(
        `UPDATE suppliers
         SET opening_balance = $1,
             paid = $2,
             purchase_due = $3
         WHERE id = $4;`,
        [opening_balance, amountPaid, purchase_due, supplierData.id]
      );
  
      // Update payment account balance
      if (paymentAccount?.account_id && amountPaid > 0) {
        await query(
          `UPDATE bank_account 
           SET current_balance = current_balance - $1
           WHERE account_id = $2;`,
          [amountPaid, paymentAccount.account_id]
        );
      }
  
      // Commit the transaction
      await query("COMMIT");
  
      return new Response(
        JSON.stringify({
          message: "Purchase saved successfully",
          purchase: purchaseResult.rows[0],
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error saving purchase:", error);
  
      // Rollback transaction in case of error
      await query("ROLLBACK");
  
      return new Response(
        JSON.stringify({
          error: error.message || "Failed to save purchase",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  
  
  
