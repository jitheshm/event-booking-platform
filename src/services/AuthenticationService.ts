import { inject, injectable } from "inversify";
import IAuthenticationService from "../interfaces/IAuthenticationService";
import { IUsers } from "../interfaces/IUsers";
import { passwordHash } from "../utils/bycrypt";
import IUserRepository from "../interfaces/IUserRepository";


@injectable()
export default class AuthenticationService implements IAuthenticationService {

    private userRepository: IUserRepository

    constructor(@inject("IUserRepository") userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async signup(data: IUsers) {
        console.log(data)
        data.password = await passwordHash(data.password)
        return await this.userRepository.create(data)
    }
}