import { Router } from "express";
import { validateQuery } from "../middlewares/joi-validate/validateQuery";
import { validateExpenseParam } from "../middlewares/params-validate/validateExpenseParams";
import { validateExpenseBody } from "../middlewares/joi-validate/validateExpenseBody";

import { 
    createExpense,
    deleteExpenseById,
    getAllExpenses, 
    getCategoryExpense, 
    getExpenseById, 
    getTotalExpense,
    updateExpenseById
} from "../controllers/expenses.controller";

const router: Router = Router();


router.get("/", validateQuery, getAllExpenses);
router.get("/total", getTotalExpense);
router.post("/", validateExpenseBody, createExpense);

router.get("/category", getCategoryExpense);
router.get("/:id", validateExpenseParam, getExpenseById);
router.delete("/:id", validateExpenseParam, deleteExpenseById);
router.put(
    "/:id",
    validateExpenseParam,
    validateExpenseBody,
    updateExpenseById
  );
  
export default router;