import { requestsLogger } from "../utils/loggerFn";
import { Request, Response, NextFunction } from "express";

export default function(req: Request, res: Response, next: NextFunction){
    requestsLogger(req.headers.origin, req.url, req.method);
    next();
}