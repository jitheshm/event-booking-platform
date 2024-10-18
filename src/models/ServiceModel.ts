import mongoose, { Schema, Types } from 'mongoose';
import { IServices } from '../interfaces/IServices';



const ServicesSchema: Schema = new Schema({
    title: { type: String, required: true },
    price_per_day: { type: Number, required: true },
    category: { type: String, required: true },
    availability_dates: [{ type: Date, required: true }],
    contact_details: {
        mobile: { type: String, required: true }
    },
    description: { type: String, required: true },
    service_provider_id: { type: Types.ObjectId, required: true },
});

const Services = mongoose.model<IServices>('Services', ServicesSchema);

export default Services;

