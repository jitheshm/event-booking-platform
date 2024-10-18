import { Container } from "inversify";
import IAuthenticationController from "../../interfaces/IAuthenticationController";
import AuthenticationController from "../../controllers/v1/AuthenticationController";
import IUserRepository from "../../interfaces/IUserRepository";
import UserRepository from "../../repository/UserRepository";
import IAuthenticationService from "../../interfaces/IAuthenticationService";
import AuthenticationService from "../../services/AuthenticationService";
import IOtpRepository from "../../interfaces/IOtpRepository";
import OtpRepository from "../../repository/OtpRepository";
import { IServiceProviderService } from "../../interfaces/IServiceProviderService";
import { IServiceController } from "../../interfaces/IServiceController";
import ServiceController from "../../controllers/v1/ServiceController";
import ServiceProviderService from "../../services/ServiceProviderService";
import { IServiceRepository } from "../../interfaces/IServiceRepository";
import ServiceRepository from "../../repository/ServiceRepository";


const container = new Container();


container.bind<IAuthenticationController>("IAuthenticationController").to(AuthenticationController);
container.bind<IUserRepository>("IUserRepository").to(UserRepository);
container.bind<IAuthenticationService>("IAuthenticationService").to(AuthenticationService);
container.bind<IOtpRepository>("IOtpRepository").to(OtpRepository);
container.bind<IServiceRepository>("IServiceRepository").to(ServiceRepository);
container.bind<IServiceProviderService>("IServiceProviderService").to(ServiceProviderService);
container.bind<IServiceController>("IServiceController").to(ServiceController);




export { container };