import express, { Express, Request, Response } from 'express';
import cors from "cors";
import { exceptionHandlerMiddleware } from './commons/middlewares/middleware';

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger.json"

import expenseRouter from './routes/expenses.route';

const app: Express = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/expense', expenseRouter)
app.use(exceptionHandlerMiddleware)

app.listen(port, (): void => {
    console.log(`[server]: Listening on port ${port}`);
});
