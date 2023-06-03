import { Request, Response } from "express";
import expenseSeeds from "../seeds/expenses";
import categorySeeds from "../seeds/category";
import { Expenses } from "../schemas/expenseSchema";
import {v4 as uuidv4} from "uuid";

export const getAllExpenses = (req : Request, res: Response) => {
    const { category_id, min_price, max_price } = req.query;

    let response : Expenses[] = expenseSeeds

    if (category_id) {
        const filteredCategory = category_id.toString().split(",")

        const category_name = categorySeeds.map(category => {
            if(filteredCategory.includes(category.id)) return category.name;
        })

        response = response.filter(expense => category_name.includes(expense.category))
    }

    if (min_price) {
        response = response.filter(expense => expense.amount >= parseInt(min_price.toString()));
    }

    if (max_price) {
        response = response.filter(expense => expense.amount <= parseInt(max_price.toString()));
    }

    res.status(200).send(response);
}

export const getCategoryExpense = (_req : Request, res: Response) => {
    res.status(200).send(categorySeeds)
}

export const getTotalExpense = (req: Request, res: Response) => {
    const totalExpense = expenseSeeds.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);
    res.status(200).send({ totalExpense });
  };
  

export const getExpenseById = (req: Request, res: Response) => {
    const { id } = req.params;

    let response = expenseSeeds.find(expense => expense.id === id);
    
    const categoryObject = categorySeeds.find(category => category.name === response?.category)
    
    return res.status(200).send({
        ...response,
        category: {
            ...categoryObject
        },
    })
}

export const createExpense = (req : Request, res: Response) => {
    const { name, category, amount } = req.body;

    const categoryObject = categorySeeds.find(categoryItem => categoryItem.id === category);
    const newUUID = uuidv4();

    const newExpense: Expenses = {
        amount: amount,
        id: newUUID,
        name: name,
        category: categoryObject!.name,
    };

    expenseSeeds.push(newExpense);
    res.status(201).send(newExpense);
}

export const deleteExpenseById = (req: Request, res: Response) => {
    const { id } = req.params;
    const expenseIndex = expenseSeeds.findIndex(expense => expense.id === id);
    expenseSeeds.splice(expenseIndex, 1);
    return res.status(200).send(`Success delete expense with id ${id}`);
}

export const updateExpenseById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { category } = req.body;
    const expenseIndex = expenseSeeds.findIndex(expense => expense.id === id);
    const validCategory = categorySeeds.find(cat => cat.id === category)

    expenseSeeds[expenseIndex] = {
        id,
        ...req.body,
        category: validCategory!.name
    }
    return res.status(200).send({
        ...expenseSeeds[expenseIndex],
        category: {
            ...validCategory
        }
    })
}