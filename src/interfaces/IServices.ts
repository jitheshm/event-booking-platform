import { Types } from "mongoose";

export interface IServices {
    _id: Types.ObjectId;
    title: string;
    price_per_day: number;
    category: string;
    availability_dates: Date[];
    description: string
    service_provider_id: Types.ObjectId;
    is_deleted:boolean
}

export type ServiceInput = Omit<IServices, "_id" | "service_provider_id">
