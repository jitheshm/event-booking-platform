import { Document, Types } from "mongoose";
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

    async userBookingList(userId: Types.ObjectId, currentDate: Date) {
        try {
            const bookings = await Booking.aggregate([
                {
                    $match: {
                        "user_id": userId
                    }

                }, {
                    $unwind: "$booking_dates",

                },
                {
                    $facet: {
                        past_booking: [

                            {
                                $match: {
                                    "booking_dates": {
                                        $lt: currentDate
                                    }
                                }
                            }
                        ],
                        upcomming_booking: [

                            {
                                $match: {
                                    "booking_dates": {
                                        $gte: currentDate
                                    }
                                }
                            }
                        ]
                    }
                }
            ])
            // console.log(bookings)
            return bookings
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async fetchBookingDetailsById(bookingId: Types.ObjectId) {
        try {
            const bookingDetails = await Booking.aggregate([
                {
                    $match: {
                        "_id": bookingId
                    }
                },
                {
                    $lookup: {
                        from: "services",
                        localField: "service_id",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "service_provider_id",
                                    foreignField: "_id",
                                    pipeline:[{$project:{"name":1,"email":1,"mobile":1,"_id":0}}],
                                    as: "contact_details"
                                }
                            },
                            {
                                $unwind: "$contact_details"
                            },
                            {
                                $project:{
                                    "availability_dates":0,

                                }
                            }
                        ],
                        as: "service_details"
                    }
                }, {
                    $unwind: "$service_details"
                }
            ])
            return bookingDetails
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
