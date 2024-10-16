import { Container } from "inversify";
import IAuthenticationController from "../interfaces/IAuthenticationController";
import AuthenticationController from "../controllers/v1/AuthenticationController";


const container = new Container(); 


container.bind<IAuthenticationController>("IAuthenticationController").to(AuthenticationController);


export { container };