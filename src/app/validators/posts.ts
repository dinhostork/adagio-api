import { celebrate, Joi, Segments } from "celebrate";
import { BadRequestError } from "../../utils/errors/httpErrors";
import { Request, Response, NextFunction } from "express";

export const postValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  celebrate(
    {
      [Segments.BODY]: {
        text: Joi.string().required().messages({
          "any.required": "O texto é obrigatório",
        }),
        privacy_id: Joi.number().integer().min(1).max(3).required().messages({
          "any.required": "O ID da privacidade é obrigatório",
          "number.base": "O ID da privacidade deve ser um número",
          "number.integer": "O ID da privacidade deve ser um número inteiro",
          "number.min": "Código de privacidade inválido",
          "number.max": "Código de privacidade inválido",
        }),
        hasMedia: Joi.boolean().messages({
          "boolean.base": "O campo hasMedia deve ser um booleano",
        })
      },
    },
    {
      abortEarly: false,
      allowUnknown: false,
    }
  )(req, res, (err) => {
    if (err) {
      const errorMessages: string[] = [];
      err.details.forEach((value: { message: string }) => {
        if (value.message) {
          errorMessages.push(value.message);
        }
      });
      next(new BadRequestError(errorMessages.join(", ")));
    } else {
      next();
    }
  });
};
