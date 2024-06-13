import { JwtPayload } from "jsonwebtoken"

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
            user:JwtPayload
        }
    }
}