import { Request, Response } from "express";

export class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }

  public sendResponse(response: Response) {
    return response.status(this.status).json({ error: this.message });
  }
}

export class NotFoundError extends HttpError {
  constructor(public message: string) {
    super(404, message);
  }
}

export class BadRequestError extends HttpError {
  constructor(public message: string) {
    super(400, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(public message: string) {
    super(500, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(public message: string) {
    super(401, message);
  }
}
