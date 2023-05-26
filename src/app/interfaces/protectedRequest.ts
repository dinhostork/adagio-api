import { Request } from "express";

export interface ProtectedRequest<T = any> extends Request{
    userId?: string;
}
