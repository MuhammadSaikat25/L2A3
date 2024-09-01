import { JwtPayload } from "jsonwebtoken"
import { TUser } from "../users/user.interface";

export interface TLogin{
    email:string,
    password:string
}

export type TAuthRole={
    role:["admin",'user']
}
declare global{
    namespace Express{
        interface Request{
            user?: TUser;
        }
    }
}