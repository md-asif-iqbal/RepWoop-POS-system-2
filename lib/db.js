import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGUSER,       // 'postgres'
  host: process.env.PGHOST,       // 'localhost'
  database: process.env.PGDATABASE, // 'POS-System'
  password: process.env.PGPASSWORD, // 'admin'
  port: process.env.PGPORT ||5432, // PostgreSQL port (5432)
});

// Export a reusable query function
export const query = (text, params) => {
  return pool.query(text, params);
};