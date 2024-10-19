import { Types } from "mongoose";

export interface IServices {
    _id: Types.ObjectId;
    title: string;
    price_per_day: number;
    category: string;
    location:string
    availability_dates: { date: Date, status: string }[];
    description: string
    service_provider_id: Types.ObjectId;
    is_deleted: boolean
}

export type ServiceInput = Omit<IServices, "_id" | "service_provider_id">

export type ServiceWithContact= IServices & {
    contact_details:{
        name:string,
        email:string,
        mobile:string
    }
}