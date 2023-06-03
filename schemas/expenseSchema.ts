import Joi from "joi";
import { categorySchema } from "./categorySchema";
import { Category } from "./categorySchema";
import { type } from "os";

export type Expenses = {
    id: string;
    name: string;
    category: string;
    amount: number;
}


export const expenseSchema = Joi.object({
    amount: Joi.number().required(),
    category: Joi.string().uuid().required(),
    name: Joi.string().required()
})