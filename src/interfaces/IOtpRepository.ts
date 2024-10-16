import { IOtps } from "./IOtps";

export default interface IOtpRepository {

    create(data: IOtps): Promise<Pick<IOtps, "email" | "otp">>
}