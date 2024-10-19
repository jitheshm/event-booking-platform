import { Document } from "mongoose";
import { IBookings } from "../interfaces/IBookings";
import Booking from "../models/BookingModel";
import { injectable } from "inversify";

@injectable()

export default class BookingRepository {
    
    async confirm(data: Omit<IBookings, "_id" | "created_at">): Promise<IBookings & Document> {
        try {
            const booking = new Booking(data);
            await booking.save();
            return booking 
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
