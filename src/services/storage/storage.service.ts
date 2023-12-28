import { Expense, Category, InsertExpense, InsertCategory, InsertUser, User } from "../../db/d1/schema";

export interface StorageService {
    getCategories(userId: number): Promise<Category[] | undefined>;
    createCategory(category: InsertCategory): Promise<Category>;
    
    getUser(userId: number): Promise<User | undefined>;
    createUser(user: InsertUser): Promise<User>;

    getExpenses(userId: number): Promise<Expense[] | undefined>;
    createExpense(expense: InsertExpense): Promise<Expense>;
}
