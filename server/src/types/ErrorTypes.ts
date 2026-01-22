export interface AppError extends Error {
  status?: number;
}

export class HttpError extends Error implements AppError {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}
