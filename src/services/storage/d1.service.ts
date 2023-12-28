import { eq } from "drizzle-orm";
import { Expense, Category, InsertExpense, InsertCategory, InsertUser, User, expenses, categories, users } from "../../db/d1/schema";
import { Env } from "../../../worker-configuration";
import { StorageService } from "./storage.service";
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import { json } from "itty-router-extras";

export class D1StorageService implements StorageService {

    db: DrizzleD1Database;

    constructor(protected readonly env: Env) {
        this.db = drizzle(env.D1_DB);
    }

    async getCategories(userId: number): Promise<Category[] | undefined> {        
        return this.db
            .select()
            .from(categories)
            .where(eq(categories.userId, userId));
    }
    async createCategory(category: InsertCategory): Promise<Category> {
        return this.db
            .insert(categories)
            .values(category)
            .returning()
            .get();        
    }

    async getUser(userId: number): Promise<User | undefined> {
        return this.db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .get();
    }
    async createUser(user: InsertUser): Promise<User> {    
        return this.db
            .insert(users)
            .values(user)
            .returning()
            .get();
    }

    async getExpenses(userId: number): Promise<Expense[] | undefined> {        
        return this.db
            .select()
            .from(expenses)
            .where(eq(expenses.userId, userId));
    }
    async createExpense(expense: InsertExpense): Promise<Expense> {
        return this.db
            .insert(expenses)
            .values(expense)
            .returning()
            .get();        
    }
}
