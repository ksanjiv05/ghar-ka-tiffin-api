import { Document } from "mongoose"

interface IReview extends Document{
    name: string;
    uid: string;
    pid:string;
    rate: number;
    comment?: string;
    imageUrl?: string;
    createdAt:string
}

export {IReview}