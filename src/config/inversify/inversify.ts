import { Container } from "inversify";
import IAuthenticationController from "../../interfaces/IAuthenticationController";
import AuthenticationController from "../../controllers/v1/AuthenticationController";
import IUserRepository from "../../interfaces/IUserRepository";
import UserRepository from "../../repository/UserRepository";
import IAuthenticationService from "../../interfaces/IAuthenticationService";
import AuthenticationService from "../../services/AuthenticationService";


const container = new Container();


container.bind<IAuthenticationController>("IAuthenticationController").to(AuthenticationController);
container.bind<IUserRepository>("IUserRepository").to(UserRepository);
container.bind<IAuthenticationService>("IAuthenticationService").to(AuthenticationService);


export { container };