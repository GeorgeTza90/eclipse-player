import { Response } from "express";

type ErrorMap = Record<
  string,
  { status: number; message: string }
>;

const errorMap: ErrorMap = {
  VALIDATION_ERROR: { status: 400, message: "Invalid input" },
  USER_NOT_FOUND: { status: 404, message: "User not found" },
  EMAIL_EXISTS: { status: 400, message: "Email already in use" },
  INVALID_CREDENTIALS: { status: 401, message: "Invalid credentials" },
  PASSWORD_LOGIN_DISABLED: { status: 400, message: "Password login not enabled for this account" },
  INVALID_OLD_PASSWORD: { status: 401, message: "Incorrect old password" },
  INVALID_RESET_TOKEN: { status: 400, message: "Invalid or expired token" },
  SAME_PASSWORD: { status: 400, message: "New password cannot be the same as old password" },
};