// https://dev.to/franciscomendes10866/getting-started-with-drizzle-orm-a-beginners-tutorial-4782
// https://orm.drizzle.team/docs/migrations/#declare-your-schema
// https://github.com/drizzle-team/drizzle-orm/blob/main/examples/cloudflare-d1/src/schema.ts
// https://orm.drizzle.team/docs/indexes-constraints/#foreign-key
// https://orm.drizzle.team/docs/rqb/#one-to-many
// https://orm.drizzle.team/docs/goodies
import { InferInsertModel, InferSelectModel, relations, sql } from "drizzle-orm";
import { AnySQLiteColumn, index, integer, primaryKey, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    categories: many(categories),
    expenses: many(expenses),
}));
  
export const categories = sqliteTable("categories", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
    parentId: integer("parent_id").references((): AnySQLiteColumn => categories.id, { onDelete: "set null" }),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),    
}, (categories) => ({
    parentIdx: index("parent_idx").on(categories.parentId, categories.userId),
    nameIdx: index("name_idx").on(categories.name, categories.userId),
    nameUniqueConstraint: unique("name_unique_constraint").on(
        categories.name,
        categories.userId
      ),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
    users: one(users, {
      fields: [categories.userId],
      references: [users.id],
    }),
    expenses: many(expenses),
}));

export const expenses = sqliteTable("expenses", {
    id: integer("id").primaryKey({autoIncrement: true}),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    messageId: integer("message_id"),
    amount: real("amount").notNull(),
    description: text("description"),
    date: text("date").default(sql`CURRENT_DATE`),
    categoryId: integer("category_id").notNull().references(() => categories.id, { onDelete: "restrict" }),     
}, (expenses) => ({
    dateIdx: index("date_idx").on(expenses.date, expenses.userId), 
    categoryIdx: index("category_idx").on(expenses.categoryId, expenses.userId),       
}));

export const expensesRelations = relations(expenses, ({ one }) => ({
    users: one(users, {
        fields: [expenses.userId],
        references: [users.id],
    }),
    categories: one(categories, {
        fields: [expenses.categoryId],
        references: [categories.id],
    }),
}));

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export type Category = InferSelectModel<typeof categories>;
export type InsertCategory = InferInsertModel<typeof categories>;

export type Expense = InferSelectModel<typeof expenses>;
export type InsertExpense = InferInsertModel<typeof expenses>;