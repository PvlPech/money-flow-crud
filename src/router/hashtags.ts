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
    summary: "Get hashtags",    
    parameters: {
      userId: Query(Int, {
        required: true,
        example: -6033471599,        
      }),
    },
    responses: {
      "200": {
        description: "Hashtag response",
        schema: [Hashtag],
      },
    },
  }

  async handle(request: Request, env: Env, context: any, data: any) {
    const { userId } = data.query;
    return env.STORAGE_SERVICE.getHashtags(userId);
  }
}

export class HashtagCreate extends OpenAPIRoute {
  static schema = {
    tags: ["Hashtags"],
    summary: "Create a hashtag",    
    requestBody: {
      id: new Int({ required: false, description: "Hashtag ID", example: 2892 }),
      name: new Str({ required: true, description: "Hashtag Name", example: "Restaurant" }),
      parentId: new Int({ required: false, description: "Parent Hashtag ID", example: 122 }),
      userId: new Int({ required: true, description: "Hashtag Owner ID", example: -6033471599 }),
    },
    responses: {
      "200": {
        description: "Hashtags response",
        schema: Hashtag,
      },
    },
  }

  async handle(request: Request, env: Env, context: any, data: any) {
    const newHashtag = data.body;
    return env.STORAGE_SERVICE.createHashtag(newHashtag);
  }
}