import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { query } from '../../../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      console.log("No file received");
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log("File received:", file.name);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileType = file.name.split('.').pop().toLowerCase();

    let parsedData;
    if (fileType === 'csv') {
      const csvData = buffer.toString();
      parsedData = Papa.parse(csvData, { header: true }).data;
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      parsedData = XLSX.utils.sheet_to_json(worksheet);
    } else {
      console.log("Unsupported file type:", fileType);
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Define mapping from parsed data fields to database columns
    const fieldMapping = {
      productName: 'product_name',
      productCode: 'product_code',
      selectedCategory: 'category',
      selectedBrand: 'brand',
      selectedMainUnit: 'main_unit',
      subUnit: 'sub_unit',
      openingStock: 'opening_stock',
      salePrice: 'sale_price',
      purchaseCost: 'purchase_cost',
      productDetails: 'product_details',
      imageLink: 'image',
      createdDate: 'created_at',
      discount: 'discount',
      expireDate: 'expire_date',
      userName: 'username',  // Optional
      email: 'email'          // Optional
    };

    // Apply field mapping to transform parsed data to match database columns
    parsedData = parsedData.map(row => {
      const transformedRow = {};
      for (const [key, dbColumn] of Object.entries(fieldMapping)) {
        // Ensure discount is parsed as a number, removing "%" if present
        transformedRow[dbColumn] = key === 'discount'
          ? parseFloat(row[key]?.toString().replace('%', '')) || 0
          : row[key] ?? null;
      }
      return transformedRow;
    });

    console.log("Transformed parsed data:", parsedData);

    const headers = Object.values(fieldMapping); // Database columns as headers
    const queryText = `
      INSERT INTO products (${headers.join(', ')})
      VALUES ${parsedData.map((_, i) => `(${headers.map((_, j) => `$${i * headers.length + j + 1}`).join(', ')})`).join(', ')}
      RETURNING *;
    `;
    
    const queryValues = parsedData.flatMap(row => headers.map(header => row[header]));

    console.log("Generated SQL query:", queryText);
    console.log("Query values:", queryValues);

    const result = await query(queryText, queryValues);

    return NextResponse.json({
      message: 'File processed and data inserted successfully',
      data: result.rows,
    });
  } catch (error) {
    console.error("Error processing file upload:", error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}