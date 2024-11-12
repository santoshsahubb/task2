import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "../schemas";


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'santoshsahu',
  password: 'password',
  port: 5432,
});

export const db = drizzle(pool,{
    schema: {
        ...schema,
      }
});
