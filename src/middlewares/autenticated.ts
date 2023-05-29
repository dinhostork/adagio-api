import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { BadRequestError, HttpError } from "../utils/errors/httpErrors";
import { ProtectedRequest } from "@/app/interfaces/protectedRequest";

export const autenticated = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new BadRequestError("Token não informado, esta rota é protegida");
    }

    const [, token] = authorization.split(" ");

    if (!token) {
        throw new BadRequestError("Token não informado, esta rota é protegida");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const { id } = decoded as { id: string };
      req.userId = id;
    } catch (error) {
      throw new BadRequestError("Token inválido");
    }

    return next();
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json({ message: error.message });
    }
  }
};
