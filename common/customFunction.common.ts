import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (fnc: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fnc(req, res, next);
    } catch (err: any) {
      console.log(err);
      res.status(err.code || 500).json({
        success: false,
        message: err.message,
      });
    }
  };

export class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export const generateUniqueUserName = (name: string): string => {
  // Remove whitespace and convert to lowercase
  const cleanedName = name.trim().toLowerCase();

  // Generate a random alphanumeric string
  const randomString = Math.random().toString(36).slice(2, 10);

  // Combine the cleaned name and random string
  const userName = cleanedName.replace(/[^a-z0-9]/g, '-') + '-' + randomString;

  return userName;
};