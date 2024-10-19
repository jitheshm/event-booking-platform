import mongoose, { Schema, Types } from 'mongoose';
import { IServices } from '../interfaces/IServices';



const ServicesSchema: Schema = new Schema({
    title: { type: String, required: true },
    price_per_day: { type: Number, required: true },
    category: { type: String, required: true },
    availability_dates: [{ date: { type: Date, required: true }, status: { type: String, required: true, enum: ['open', 'booked'] } }],
    description: { type: String, required: true },
    service_provider_id: { type: Types.ObjectId, required: true },
    is_deleted: { type: Boolean, require: true, default: false }
});

const Services = mongoose.model<IServices>('Services', ServicesSchema);

export default Services;

