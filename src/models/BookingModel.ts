import mongoose, { Schema, Types } from "mongoose";
import { IBookings } from "../interfaces/IBookings";

const BookingSchema: Schema = new Schema({
    user_id: { type: Types.ObjectId, ref: 'User', required: true }, 
    service_id: { type: Types.ObjectId, ref: 'Services', required: true }, 
    booking_dates: [{ type: Date, required: true }], 
    total_price: { type: Number, required: true }, 
    created_at: { type: Date, default: Date.now }
});

const Booking = mongoose.model<IBookings>('Booking', BookingSchema);
export default Booking;