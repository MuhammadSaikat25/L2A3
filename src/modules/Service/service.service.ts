import { TService } from "./service.interface";
import { service } from "./service.model";

const postServiceIntoDB=async(palyLoad:TService)=>{
    const result=await service.create(palyLoad)
    return result
}


 export const serviceService={
    postServiceIntoDB
}