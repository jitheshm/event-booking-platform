import { Document } from "mongoose";
import { IBookings } from "./IBookings";

export interface IBookingRepository {
    confirm(data: Omit<IBookings, "_id" | "created_at">): Promise<IBookings & Document>
}