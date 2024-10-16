import { IUsers } from "./IUsers";

export default interface IAuthenticationService {
    signup(data: IUsers): Promise<Omit<IUsers, "password">>

}