import { Document } from "mongoose";

export interface IAddress extends Document {
  uid?:string;
  name: string;
  state: string;
  address: string;
  city: string;
  pinCode: string;
  phone: string;
  country: string;
  alernativePhone?: string;
  landmark?: string;
}
