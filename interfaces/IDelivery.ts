import { Document } from "mongoose";

type DELIVERD_STATUS={
    isDelivered:boolean,
    isPaid:boolean,
    amount:number,
    transactionId:string
}

export interface IDelivery extends Document {
  subscriptionId: string;
  userId: string;
  date: string;
  morning: DELIVERD_STATUS;
  afternoon: DELIVERD_STATUS;
  dinner: DELIVERD_STATUS;
};