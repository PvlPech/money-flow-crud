import { OpenAPIRoute, Str, Int, Query } from '@cloudflare/itty-router-openapi'
import { Env } from '../../worker-configuration';

const Category = {
  id: new Int({ required: true, description: "Category ID", example: 2892 }),
  name: new Str({ required: true, description: "Category Name", example: "Restaurant" }),
  parentId: new Int({ required: false, description: "Parent Category ID", example: 122 }),
  userId: new Int({ required: true, description: "Category Owner ID", example: -6033471599 }),
}

export class CategoryFetch extends OpenAPIRoute {
  static schema = {
    tags: ["Categories"],
    summary: "Get categories",    
    parameters: {
      userId: Query(Int, {
        required: true,
        example: -6033471599,        
      }),
    },
    responses: {
      "200": {
        description: "Category response",
        schema: [Category],
      },
    },
  }

  async handle(request: Request, env: Env, context: any, data: any) {
    const { userId } = data.query;
    return env.STORAGE_SERVICE.getCategories(userId);
  }
}

export class CategoryCreate extends OpenAPIRoute {
  static schema = {
    tags: ["Categories"],
    summary: "Create a category",    
    requestBody: {
      name: new Str({ required: true, description: "Category Name", example: "Restaurant" }),
      parentId: new Int({ required: false, description: "Parent Category ID", example: 122 }),
      userId: new Int({ required: true, description: "Category Owner ID", example: -6033471599 }),
    },
    responses: {
      "200": {
        description: "Categories response",
        schema: Category,
      },
    },
  }

  async handle(request: Request, env: Env, context: any, data: any) {
    const newCategory = data.body;
    return env.STORAGE_SERVICE.createCategory(newCategory);
  }
}