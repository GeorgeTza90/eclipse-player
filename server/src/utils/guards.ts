import { Response } from "express";

export function guard<T>(res: Response, param: T | undefined | null, value: any, status: number, message: string): param is T {    
    if (param === value) {
        res.status(status).json({ error: message });
        return false;
    }

    return true;
}