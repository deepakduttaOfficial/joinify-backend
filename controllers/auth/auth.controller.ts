import { Request, Response } from "express";
import { nanoid } from "nanoid/non-secure";
import jwt from "jsonwebtoken";
import { emailTester, passwordTester } from "../../helpers/fieldVarify.helper";
import {
  CustomError,
  asyncHandler,
  generateUniqueUserName,
} from "../../common/customFunction.common";
import User from "../../models/auth/auth.schema";
import envConfig from "../../config/env.config";
import { SignUpBodyRequest } from "./type.auth.controller";

export const signup = asyncHandler(
  async (req: Request<{}, {}, SignUpBodyRequest>, res: Response) => {
    const { name, email, password } = req.body;
    if (!(name || email || password)) {
      throw new CustomError("All field are required", 400);
    }
    if (!emailTester(email)) throw new CustomError("Invalid email", 400);
    if (!passwordTester(password))
      throw new CustomError("Password must be 4 characters long", 400);

    const existUser = await User.findOne({ email });
    if (existUser) {
      throw new CustomError("User already exists", 400);
    }

    /** Verify Email Token */
    const verifyId: string = nanoid();
    const verifyToken: string = jwt.sign(
      { id: verifyId },
      envConfig.EMAIL_VERIFY_TOKEN_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    /** */

    let userName: string;
    do {
      userName = generateUniqueUserName(name);
    } while (await User.findOne({ userName }));

    const data = {
      name,
      email,
      userName,
      password,
      emailVerifyId: verifyId,
    };

    const user = await User.create(data);

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);
