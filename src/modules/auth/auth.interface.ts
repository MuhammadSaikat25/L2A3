import { JwtPayload } from "jsonwebtoken"

export interface TLogin{
    email:string,
    password:string
}


declare global{
    namespace Express{
        interface Request{
            user:JwtPayload
        }
    }
}