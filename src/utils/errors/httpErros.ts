export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export const NotFoundError = new HttpError(404, 'Not Found');
export const BadRequestError = new HttpError(400, 'Bad Request');
export const InternalServerError = new HttpError(500, 'Internal Server Error');
export const UnauthorizedError = new HttpError(401, 'Unauthorized');
export const ForbiddenError = new HttpError(403, 'Forbidden');
