import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://my-book_owner:SrYOpgej14aU@ep-dark-shadow-a5lz2mgo.us-east-2.aws.neon.tech/my-book?sslmode=require",
  }
});

