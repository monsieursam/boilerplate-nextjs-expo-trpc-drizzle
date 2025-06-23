import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from './schema';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const db = drizzle(pool, { schema });
