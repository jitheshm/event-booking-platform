import { Types } from "mongoose";

export interface IBookings {
    _id: Types.ObjectId
    user_id: Types.ObjectId,
    service_id: Types.ObjectId,
    booking_dates: Date[],
    total_price: number,
    created_at: Date
}