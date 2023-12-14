import { HTTP, mainError } from "./mainError";
import {NextFunction, Request, Response} from "express"

const preparedError = (err : mainError, res : Response) => {
    res.status(HTTP.BAD).json({
        message : err.message,
        name : err.name,
        status : err.status,
        success : err.success,
        stack : err.stack,
        error : err
    })
}

export const errorHandling = (
    err : mainError,
    req : Request,
    res : Response,
    next : NextFunction
) =>{
    preparedError(err, res)
}