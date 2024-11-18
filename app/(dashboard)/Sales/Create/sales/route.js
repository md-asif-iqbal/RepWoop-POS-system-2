import { query } from '../../../../../lib/db';



export async function GET() {
  try {
    const result = await query('SELECT * FROM sales ORDER BY sale_date DESC;');
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch sales' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function POST(request) {
  try {
    const {
      selectedCustomer,
      saleDate,
      payTerm,
      status,
      invoiceScheme,
      invoiceNo,
      products,
      total,
      discountType,
      discountAmount,
      shippingCharges,
      orderTax,
      sellNote,
      amountPaid,
      changeReturn,
      paymentDate,
      paymentMethod,
      paymentAccount, // should contain account_id and name
      paymentNote,
      shippingNote,
      totalPayable,
    } = await request.json();

    // Log to debug received data
    console.log("Received data:", { selectedCustomer, paymentAccount, amountPaid });

    // Ensure account_id is available in paymentAccount
    if (!paymentAccount?.account_id) throw new Error("No account ID provided");

    // Start a transaction
    await query('BEGIN');

    // Insert sale record into the sales table
    const saleResult = await query(
      `INSERT INTO sales 
        (selected_customer, sale_date, pay_term, status, invoice_scheme, invoice_no, products, total, 
         discount_type, discount_amount, shipping_charges, order_tax, sell_note, amount_paid, change_return, 
         payment_date, payment_method, payment_account, payment_note, shipping_note, total_payable) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
       RETURNING *;`,
      [
        selectedCustomer,
        saleDate,
        payTerm,
        status,
        invoiceScheme,
        invoiceNo,
        JSON.stringify(products),
        total,
        discountType,
        discountAmount,
        shippingCharges,
        orderTax,
        sellNote,
        amountPaid,
        changeReturn,
        paymentDate,
        paymentMethod,
        paymentAccount.name, // Store the account name for reference
        paymentNote,
        shippingNote,
        totalPayable,
      ]
    );

    // Log sale insertion result
    console.log("Sale inserted:", saleResult.rows[0]);

    // Update balance in the selected bank account using account_id
    const updateResult = await query(
      `UPDATE bank_account 
       SET current_balance = current_balance + $1 
       WHERE account_id = $2;`,
      [amountPaid, paymentAccount.account_id]
    );

    // Log balance update result
    console.log("Account balance updated:", updateResult.rowCount);

    // Commit transaction
    await query('COMMIT');

    // Return success response
    return new Response(JSON.stringify({ message: 'Sale added successfully', sale: saleResult.rows[0] }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving sale:', error);
    // Rollback transaction in case of error
    await query('ROLLBACK');
    return new Response(JSON.stringify({ error: 'Failed to save sale' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function PUT(request) {
  try {
    const { saleId, status } = await request.json();

    // Validate input
    if (!saleId) throw new Error("Sale ID is required");
    if (!status) throw new Error("Status is required");

    // Start a transaction
    await query("BEGIN");

    // Fetch sale details, including current status and products
    const saleResult = await query(
      `SELECT id, status, products FROM sales WHERE id = $1;`,
      [saleId]
    );

    if (saleResult.rowCount === 0) {
      throw new Error("Sale not found");
    }

    const sale = saleResult.rows[0];
    const currentStatus = sale.status;

    // Parse products if stored as JSON
    const products =
      typeof sale.products === "string"
        ? JSON.parse(sale.products)
        : sale.products;

    console.log("Products to update stock:", products);

    // Update product stock only if the new status is "Returned" and wasn't previously "Returned"
    if (currentStatus !== "Returned" && status === "Returned") {
      for (const product of products) {
        const result = await query(
          `UPDATE products 
           SET opening_stock = opening_stock + $1 
           WHERE id = $2 
           RETURNING opening_stock;`,
          [product.quantity, product.id]
        );
        console.log(`Updated stock for product ID ${product.id}:`, result.rows[0]);
      }
    }

    // Update the status of the sale
    const updateResult = await query(
      `UPDATE sales 
       SET status = $1 
       WHERE id = $2 
       RETURNING *;`,
      [status, saleId]
    );

    if (updateResult.rowCount === 0) {
      throw new Error("Sale not found or status unchanged");
    }

    // Commit the transaction
    await query("COMMIT");

    return new Response(
      JSON.stringify({
        message: "Sale status and product stock updated successfully",
        sale: updateResult.rows[0],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating sale status or product stock:", error);

    // Rollback the transaction in case of an error
    await query("ROLLBACK");

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to update sale status or product stock",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}




