import { Document } from "mongoose"
import { ORDER_STATUS } from "../config/enums";

type orderStatus={
    state:ORDER_STATUS,
    updateDate:string,
    description:string,
    title:string
}

interface IOrder extends Document{
    pid:string;
    status:orderStatus[];
    expectedDate:string;
    comment?:string;
    createdAt:string;
}

export {IOrder}