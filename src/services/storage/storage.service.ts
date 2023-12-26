import { Hashtag, InsertHashtag, InsertUser, User } from "../../db/d1/schema";

export interface StorageService {
    getHashtags(userId: number): Promise<Hashtag[] | undefined>;
    createHashtag(hashtag: InsertHashtag): Promise<Hashtag>;
    
    getUser(userId: number): Promise<User | undefined>;
    createUser(user: InsertUser): Promise<User>;
}
