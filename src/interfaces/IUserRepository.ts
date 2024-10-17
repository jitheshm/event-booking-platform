import { IUsers } from "./IUsers"

export default interface IUserRepository {

    create(data: IUsers): Promise<Omit<IUsers, "password">>
    findByEmail(email: string): Promise<IUsers>
    updateByEmail(email: string, data: Partial<IUsers>): Promise<IUsers>
}