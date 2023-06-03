import Joi from "joi";
import { type } from "os";

export type Category = {
    id: string;
    name: string;
    amount: number;
}

export const categorySchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    amount: Joi.number().required().min(0),
})