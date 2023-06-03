import { Request, Response, NextFunction } from 'express';
import { CommonsException } from '../exceptions/exception';

export const exceptionHandlerMiddleware = (error : CommonsException, _req : Request, res :Response, next : NextFunction) => {
    if (!(error instanceof CommonsException)){
        next(error);
        return;
    }

    let reason = {
        name: error.name,
        message: error.message
    };
    
    res.status(error.statusCode)
       .send({detail: reason});

    next();
}