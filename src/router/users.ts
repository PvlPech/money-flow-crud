import { OpenAPIRoute, Str, Int, Path } from '@cloudflare/itty-router-openapi'
import { Env } from '../../worker-configuration';

const User = {
  id: new Int({ required: true, description: "User ID", example: 2892 }),
  name: new Str({ required: true, description: "User Name", example: "Tomas" }),
}

export class UserFetch extends OpenAPIRoute {
  static schema = {
    tags: ["Users"],
    summary: "Get users",    
    parameters: {
      userId: Path(Int, {
        description: 'User ID',
        example: 32214561,
        required: true,        
      }),
    },
    responses: {
      "200": {
        description: "User response",
        schema: User,
      },
    },
  }

  async handle(request: Request, env: Env, context: any, data: any) {
    const { userId } = data.params;
    return env.STORAGE_SERVICE.getUser(userId);
  }
}

export class UserCreate extends OpenAPIRoute {
  static schema = {
    tags: ["Users"],
    summary: "Create a user",    
    requestBody: {
      id: new Int({required: true, description: "User ID", example: 2892}),
      name: new Str({required: true, description: "User Name", example: "Tomas"})
    },
    responses: {
      "200": {
        description: "User response",
        schema: User,
      },
    },
  }

  async handle(request: Request, env: Env, context: any, data: any) {
    const newUser = data.body;
    return env.STORAGE_SERVICE.createUser(newUser);
  }
}