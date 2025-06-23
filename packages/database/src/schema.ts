import { uuid } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp, boolean, integer, varchar } from "drizzle-orm/pg-core";

export const exampleSchema = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  email: text("email"),
})

export const schema = {
  exampleSchema,
}
