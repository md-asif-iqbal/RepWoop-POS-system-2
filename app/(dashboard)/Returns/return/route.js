import { query } from '../../../../lib/db';


export async function GET(request) {
    try {
      // Fetch all sales with status "Returned"
      const result = await query(
        `SELECT * FROM sales WHERE status = $1;`,
        ["Returned"]
      );
  
      // Return the list of returned sales
      return new Response(
        JSON.stringify({ sales: result.rows }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error fetching returned sales:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch returned sales" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  