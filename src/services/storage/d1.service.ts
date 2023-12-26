import { eq } from "drizzle-orm";
import { Hashtag, InsertHashtag, InsertUser, User, hashtags, users } from "../../db/d1/schema";
import { Env } from "../../../worker-configuration";
import { StorageService } from "./storage.service";
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import { json } from "itty-router-extras";

export class D1StorageService implements StorageService {

    db: DrizzleD1Database;

    constructor(protected readonly env: Env) {
        this.db = drizzle(env.D1_DB);
    }

    async getHashtags(userId: number): Promise<Hashtag[] | undefined> {        
        return this.db
            .select()
            .from(hashtags)
            .where(eq(hashtags.userId, userId));
    }
    async createHashtag(hashtag: InsertHashtag): Promise<Hashtag> {
        return this.db
            .insert(hashtags)
            .values(hashtag)
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
}
