import { OpenAPIRoute, Str, Int, Query } from '@cloudflare/itty-router-openapi'
import { Env } from '../../worker-configuration';

const Hashtag = {
  id: new Int({ required: true, description: "Hashtag ID", example: 2892 }),
  name: new Str({ required: true, description: "Hashtag Name", example: "Restaurant" }),
  parentId: new Int({ required: false, description: "Parent Hashtag ID", example: 122 }),
  userId: new Int({ required: true, description: "Hashtag Owner ID", example: -6033471599 }),
}

export class HashtagFetch extends OpenAPIRoute {
  static schema = {
    tags: ["Hashtags"],
    summary: "Get hashtags by user (optionally)",    
    parameters: {
      userId: Query(Int, {
        required: false,
        example: -6033471599,        
      }),
    },
    responses: {
      "200": {
        description: "Hashtag response",
        schema: {
          hashtags: [Hashtag],
        },
      },
    },
  }

  async handle(request: Request, env: Env, context: any, data: any) {
    const { userId } = data.query;
    // TODO: env.STORAGE_SERVICE usage
    return {
      hashtags: [{
        id: 2892,
        name: "Restaurant",
        parentId: 122,
        userId: userId,
      },{
        id: 2893,
        name: "Entertainment",
        userId: userId,
      },{
        id: 23,
        name: "Taxi",
        userId: userId,
      },],
    }
  }
}