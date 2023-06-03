import { querySchema } from "../../schemas/querySchema"
import { Request, Response, NextFunction } from 'express';
import { JoiException } from "../exceptions/JoiException";
import { NotFoundException } from "../exceptions/NotFoundException";
import category from "../../seeds/category";

export const validateQuery = (req : Request, _res : Response, next:NextFunction) => {
    const query = req.query;
    const { value, error } = querySchema.validate(query);

    if(error){
        throw new JoiException(error.message, 400);
    }

    const category_id = value.category_id;

    if(category_id){
         const categoryIdData = category.map(category => category.id);

         category_id.split(",").map((id : string)=> {
            if(!categoryIdData.includes(id)){
                throw new NotFoundException(`Id ${id} not exists!`)
            }
         })
    }

    next();
}