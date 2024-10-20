import { Document, Types } from "mongoose";
import { IBookings } from "./IBookings";

export interface IBookingRepository {
    confirm(data: Omit<IBookings, "_id" | "created_at">): Promise<IBookings & Document>
    userBookingList(userId: Types.ObjectId, currentDate: Date): Promise<any[]>
    fetchBookingDetailsById(bookingId: Types.ObjectId): Promise<any[]>
    serviceBookingList(serviceId: Types.ObjectId, currentDate: Date): Promise<any[]>
}