import { OpenAPIRoute, Str, Int, Query, Num, DateOnly } from '@cloudflare/itty-router-openapi'
import { Env } from '../../worker-configuration';

const Expense = {
  id: new Int({ required: true, description: "Expense ID", example: 12 }),
  userId: new Int({ required: true, description: "Expense Owner ID", example: -6033471599 }),
  messageId: new Int({ required: true, description: "Message ID where expense has been posted", example: 3 }),
  amount: new Num({ required: true, description: "Expense amount", example: -200.12 }),
  description: new Str({ required: false, description: "Expense description", example: "Uber taxi" }),
  date: new DateOnly({ required: true, description: "Expenses date", example: "2023-12-28" }),    
}

export class ExpenseFetch extends OpenAPIRoute {
  static schema = {
    tags: ["Expenses"],
    summary: "Get expenses",    
    parameters: {
      userId: Query(Int, {
        required: true,
        example: -6033471599,        
      }),
    },
    responses: {
      "200": {
        description: "Expense response",
        schema: [Expense],
      },
    },
  }

  async handle(request: Request, env: Env, context: any, data: any) {
    const { userId } = data.query;
    return env.STORAGE_SERVICE.getExpenses(userId);
  }
}

export class ExpenseCreate extends OpenAPIRoute {
  static schema = {
    tags: ["Expenses"],
    summary: "Create a expense",    
    requestBody: {
        userId: new Int({ required: true, description: "Expense Owner ID", example: -6033471599 }),
        messageId: new Int({ required: false, description: "Message ID where expense has been posted", example: 3 }),
        amount: new Num({ required: true, description: "Expense amount", example: -200.12 }),
        description: new Str({ required: false, description: "Expense description", example: "Uber taxi" }),
        categoryId: new Int({ required: true, description: "Category ID", example: 2892 }),
    },
    responses: {
      "200": {
        description: "Categories response",
        schema: Expense,
      },
    },
  }

  async handle(request: Request, env: Env, context: any, data: any) {
    const newExpense = data.body;
    return env.STORAGE_SERVICE.createExpense(newExpense);
  }
}