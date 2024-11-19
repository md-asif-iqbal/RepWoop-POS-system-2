import { query } from "@/lib/db";


export async function GET(request) {
    try {
      const result = await query(`
        SELECT 
          p.id, 
          p.product_name, 
          p.product_code, 
          p.category, 
          p.brand,
          p.main_unit,
          p.sub_unit,
          p.opening_stock,
          p.sale_price,
          p.purchase_cost,
          p.product_details,
          p.image,
          p.created_at,
          p.expire_date,
          p.discount,
          COALESCE(s.sold, 0) AS sold, 
          COALESCE(d.damaged, 0) AS damaged, 
          COALESCE(r.returned, 0) AS returned
        FROM products AS p
        LEFT JOIN (
          SELECT 
            jsonb_array_elements(products)->>'id' AS product_id, 
            SUM((jsonb_array_elements(products)->>'quantity')::INT) AS sold 
          FROM sales 
          WHERE status = 'completed'
          GROUP BY jsonb_array_elements(products)->>'id'
        ) s ON p.id::TEXT = s.product_id
        LEFT JOIN (
          SELECT 
            product_id, 
            SUM(quantity) AS damaged 
          FROM damages 
          GROUP BY product_id
        ) d ON p.id = d.product_id
        LEFT JOIN (
          SELECT 
            jsonb_array_elements(products)->>'id' AS product_id, 
            SUM((jsonb_array_elements(products)->>'quantity')::INT) AS returned 
          FROM sales 
          WHERE status = 'returned'
          GROUP BY jsonb_array_elements(products)->>'id'
        ) r ON p.id::TEXT = r.product_id;
      `);
  
      return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
      console.error('Error fetching product stock:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch stock data' }), { status: 500 });
    }
  }