import { IStorageService } from "./storage.interface";
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';

export class D1StorageService implements IStorageService {

    drizzleD1Db: DrizzleD1Database;

    constructor(protected readonly env: Env) {
        this.drizzleD1Db = drizzle(env.D1_DB);
    }

    getHashtagsByUserId(userId: number): void {                
        throw new Error("Method not implemented.");
    }
}
