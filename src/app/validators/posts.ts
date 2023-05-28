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
        privacy_id: Joi.number().required().messages({
          "any.required": "O ID da privacidade é obrigatório",
        }),
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
