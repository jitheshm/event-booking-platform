import mongoose, { Schema } from 'mongoose';
import { IOtps } from '../interfaces/IOtps';


const OtpSchema: Schema = new Schema({
    email: { type: String, required: true },
    created_at: { type: Date, expires: '2m', required: true, default: Date.now },
    otp: { type: String, require: true },
    context: { type: String, require: true }
});

const Otps = mongoose.model<IOtps>('Otps', OtpSchema);

export default Otps;
