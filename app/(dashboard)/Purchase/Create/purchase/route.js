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
        paymentAccount, // Should include account_id and name
        paymentNote,
        totalPayable,
      } = await request.json();
  
      // Log received data for debugging
      console.log('Received Purchase Data:', {
        supplier,
        products,
        amountPaid,
        paymentAccount,
      });
  
      // Ensure required fields are present
      if (!supplier || !products || products.length === 0) {
        throw new Error('Missing required fields: supplier or products');
      }
  
      // Start a database transaction
      await query('BEGIN');
  
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
          paymentAccount?.name || null, // Store account name for reference
          paymentNote,
          totalPayable,
        ]
      );
  
      // Log purchase insertion result
      console.log('Purchase inserted:', purchaseResult.rows[0]);
  
      // Update the stock for each product
      for (const product of products) {
        const { id, quantity } = product;
  
        if (!id || !quantity) {
          throw new Error('Product ID and quantity are required for stock update');
        }
  
        const stockUpdateResult = await query(
          `UPDATE products
           SET opening_stock = opening_stock + $1
           WHERE id = $2;`,
          [quantity, id]
        );
  
        // Log stock update result
        console.log(`Product ID ${id} stock updated:`, stockUpdateResult.rowCount);
      }
  
      // Update balance in the selected payment account, if provided
      if (paymentAccount?.account_id && amountPaid > 0) {
        const accountUpdateResult = await query(
          `UPDATE bank_account 
           SET current_balance = current_balance - $1
           WHERE account_id = $2;`,
          [amountPaid, paymentAccount.account_id]
        );
  
        // Log account balance update result
        console.log(
          `Account ID ${paymentAccount.account_id} balance updated:`,
          accountUpdateResult.rowCount
        );
      }
  
      // Commit transaction
      await query('COMMIT');
  
      // Return success response
      return new Response(
        JSON.stringify({
          message: 'Purchase saved successfully',
          purchase: purchaseResult.rows[0],
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error saving purchase:', error);
  
      // Rollback transaction in case of error
      await query('ROLLBACK');
  
      return new Response(
        JSON.stringify({ error: error.message || 'Failed to save purchase' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  
