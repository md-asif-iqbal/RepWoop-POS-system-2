// app/api/brands/[id]/route.js
import { query } from '../../../../../lib/db';

export async function PATCH(request, { params }) {
    try {
      const { id } = params;
      const { name, status } = await request.json();
  
      // Retrieve the current brands array
      const selectQuery = 'SELECT brands FROM categories WHERE EXISTS (SELECT 1 FROM unnest(brands) AS b WHERE b::jsonb->>\'id\' = $1)';
      const selectResult = await query(selectQuery, [id]);
  
      if (selectResult.rows.length === 0) {
        return new Response(JSON.stringify({ error: "Brand not found" }), { status: 404 });
      }
  
      // Parse the brands array
      const brandsArray = selectResult.rows[0].brands?.map((brand) => JSON.parse(brand));
  
      // Update the specific brand
      const updatedBrandsArray = brandsArray?.map((brand) => {
        if (brand.id === parseInt(id)) {
          return {
            ...brand,
            name: name || brand.name,
            status: status || brand.status,
          };
        }
        return brand;
      });
  
      // Convert back to text[] format
      const updatedBrandsTextArray = updatedBrandsArray?.map((brand) => JSON.stringify(brand));
  
      // Update the brands column
      const updateQuery = 'UPDATE categories SET brands = $2 WHERE EXISTS (SELECT 1 FROM unnest(brands) AS b WHERE b::jsonb->>\'id\' = $1)';
      await query(updateQuery, [id, updatedBrandsTextArray]);
  
      return new Response(JSON.stringify({ message: 'Brand updated successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error updating brand:', error.message);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }


//   delete function
  export async function DELETE(request, { params }) {
    try {
      const { id } = params;
  
      // Retrieve the current brands array
      const selectQuery = 'SELECT brands FROM categories WHERE EXISTS (SELECT 1 FROM unnest(brands) AS b WHERE b::jsonb->>\'id\' = $1)';
      const selectResult = await query(selectQuery, [id]);
  
      if (selectResult.rows.length === 0) {
        return new Response(JSON.stringify({ error: "Brand not found" }), { status: 404 });
      }
  
      // Parse the brands array
      const brandsArray = selectResult.rows[0].brands.map((brand) => JSON.parse(brand));
  
      // Filter out the brand to delete
      const updatedBrandsArray = brandsArray.filter((brand) => brand.id !== parseInt(id));
  
      // Convert back to text[] format
      const updatedBrandsTextArray = updatedBrandsArray.map((brand) => JSON.stringify(brand));
  
      // Update the brands column
      const updateQuery = 'UPDATE categories SET brands = $2 WHERE EXISTS (SELECT 1 FROM unnest(brands) AS b WHERE b::jsonb->>\'id\' = $1)';
      await query(updateQuery, [id, updatedBrandsTextArray]);
  
      return new Response(JSON.stringify({ message: 'Brand deleted successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error deleting brand:', error.message);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }