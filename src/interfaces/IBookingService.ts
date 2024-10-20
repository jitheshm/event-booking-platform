import { Document } from "mongoose";
import { IBookings } from "./IBookings";

export interface IBookingService {
    ServiceBook(userId: string, serviceId: string, dates: string[]): Promise<IBookings & Document>
    userBookingList(userId: string): Promise<any[]>
    bookingDetails(bookingId: string): Promise<any[]>
}