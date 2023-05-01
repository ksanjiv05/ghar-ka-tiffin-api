import { Document } from "mongoose";
import { SUBSCRIPTION_TYPE } from "../config/enums";



export interface ISubscription extends Document {
 title: string;
 type:SUBSCRIPTION_TYPE,
 duration: number,
 banner: string,
 discount:number,
 price: number,
}