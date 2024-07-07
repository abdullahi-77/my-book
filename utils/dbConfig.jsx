import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'


export const sql = neon('postgresql://my-book_owner:SrYOpgej14aU@ep-dark-shadow-a5lz2mgo.us-east-2.aws.neon.tech/my-book?sslmode=require');
export const db = drizzle(sql, {schema});





