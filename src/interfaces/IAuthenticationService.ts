import { IOtps } from "./IOtps";
import { IUsers } from "./IUsers";

export default interface IAuthenticationService {
    signup(data: IUsers): Promise<Omit<IUsers, "password">>
    verifyOtp(data: IOtps): Promise<void>
}