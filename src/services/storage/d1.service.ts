import { Env } from "../../../worker-configuration";
import { StorageService } from "./storage.service";
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';

export class D1StorageService implements StorageService {

    drizzleD1Db: DrizzleD1Database;

    constructor(protected readonly env: Env) {
        this.drizzleD1Db = drizzle(env.D1_DB);
    }
    getHashtags(userId: number | undefined): void {
        throw new Error("Method not implemented.");
    }
}
