import mongoose, { Schema } from 'mongoose';
import { IUsers } from '../interfaces/IUsers';


const UsersSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'provider'] },
    verified: { type: Boolean, require: true, default: false }
});

const Users = mongoose.model<IUsers>('Users', UsersSchema);

export default Users;
