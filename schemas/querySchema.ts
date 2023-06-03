import Joi from "joi";

export const querySchema = Joi.object({
    category_id : Joi.string().optional(),
    min_price : Joi.number().min(0).optional(),
    max_price : Joi.number().min(0).optional()
})