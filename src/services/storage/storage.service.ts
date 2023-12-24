import { Hashtag } from "../../model/hashtag";

export interface StorageService {
    getHashtags(userId: number | undefined): Promise<Hashtag[]>;
}
