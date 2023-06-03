import { NotFoundException } from "../exceptions/NotFoundException";
import { Request, Response, NextFunction } from 'express';
import expense from "../../seeds/expenses";


export const validateExpenseParam = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const expenseObject = expense.filter(expense => expense.id === id);
    if(!expenseObject.length){
        throw new NotFoundException(`Id ${id} not exists!`);
    }
    next();
}