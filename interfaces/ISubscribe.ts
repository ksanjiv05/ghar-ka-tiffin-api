import { Document } from "mongoose";



export interface ISubscribe extends Document {
  subscriptionId: string;
  userId: string;
  startDate: string;
  activeDuration: number;
  deliveredDates: string[];
  
}
