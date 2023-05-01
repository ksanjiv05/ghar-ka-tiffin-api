import { Document } from "mongoose"

interface IManufacturer extends Document{
    name: string;
    address: string;
    country: string;
    createdAt:string

}

export {IManufacturer}