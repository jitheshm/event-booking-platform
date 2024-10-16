import { IUsers } from "./IUsers"

export default interface IUserRepository {

    create(data: IUsers): Promise<Omit<IUsers, "password">>
    findByEmail(email: string): Promise<IUsers>
}