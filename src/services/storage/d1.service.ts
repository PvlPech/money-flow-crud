import { hashtags } from "../../../db/schema";
import { Env } from "../../../worker-configuration";
import { Hashtag } from "../../model/hashtag";
import { StorageService } from "./storage.service";
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';

export class D1StorageService implements StorageService {

    db: DrizzleD1Database;

    constructor(protected readonly env: Env) {
        this.db = drizzle(env.D1_DB);
    }
    async getHashtags(userId: number | undefined): Promise<Hashtag[]> {        
        const query = this.db.select().from(hashtags);
        console.log(query.toSQL());
        const result = await query.all();
        return result;
    }
}
