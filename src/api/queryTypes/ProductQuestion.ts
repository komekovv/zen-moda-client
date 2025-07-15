import {StoreShort} from "@/api/queryTypes/Home";

export interface StoreInfo extends StoreShort {
    photo: string;
}

export interface ProductQuestionResponse {
    id: number;
    question: string;
    username: string;
    createdAt: string;
    answer: string;
    store: StoreInfo;
}

export interface ProductQuestionRequest {
    content: string;
}
