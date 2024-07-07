import { text } from "drizzle-orm/mysql-core";

const { varchar, serial } = require("drizzle-orm/mysql-core");
const { pgTable, numeric, integer } = require("drizzle-orm/pg-core");

export const budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    amount: numeric('amount').default(0),
    icon: text('icon'),
    createdBy: text('createdBy').notNull(),
})

export const expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    amount: numeric('amount').default(0),
    budgetId: integer('budgetId').references(()=> budgets.id),
    createdAt: text('createdAt').notNull()
})

export const additionalBudget = pgTable('additionalBudget', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    product: text('product').notNull(),
    amount: numeric('amount').default(0),
    budgetId: integer('budgetId').references(()=> budgets.id),
    createdAt: text('createdAt').notNull()
})

