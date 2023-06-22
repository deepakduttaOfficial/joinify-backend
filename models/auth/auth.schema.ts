import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { AuthRoles } from "../../helpers/auth.helper";
import { IUserSchema } from "./type.auth.schema";
import envConfig from "../../config/env.config";

const userSchema = new Schema<IUserSchema, Model<IUserSchema>>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [25, "Name must be under 25 characters"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    userName: {
      type: String,
      unique: true,
      required: [true, "User name is required"],
      lowercase: true,
      trim: true,
    },

    googleId: {
      type: String,
      unique: true,
      trim: true,
      default: null
    },

    password: {
      type: String,
      minLength: [4, "Password must be 4 characters long"],
      required: [true, "Password is required"],
      trim: true,
      select: false
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerifyId: {
      type: String,
      default: null,
      select: false
    },

    photo: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },

    photoUrl: {
      type: String,
    },

    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },

    deleted: {
      type: Boolean,
      default: false,
    },

    activeAccount: {
      type: Boolean,
      default: true,
    },

    loginCount: {
      type: Number,
      default: 0,
    },

    loginDetails: [
      {
        type: Object,
        select: false
      },
      
    ],

    resetPasswordToken: {
      type: String,
      default: null,
      select: false
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.methods = {
  // Compare password
  comparePassword: async function (providedPassword: string) {
    return await bcrypt.compare(providedPassword, this.password);
  },

  //generate JWT TOKEN
  authJwtToken: function () {
    return jwt.sign(
      {
        _id: this._id,
        role: this.role,
      },
      envConfig.JWT_SECRET_AUTH,
      {
        expiresIn: envConfig.JWT_AUTH_EXPIRY,
      }
    );
  },

  //ResetPasswordToken
  generateResetPasswordToken: function () {
    const resetToken = crypto.randomBytes(8).toString("hex");
    this.resetPasswordToken = resetToken;
    return jwt.sign({ resetToken: resetToken }, envConfig.JWT_EXPIRY, {
      expiresIn: envConfig.JWT_AUTH_EXPIRY,
    });
  },
};

const User = model<IUserSchema>("User", userSchema);
export default User;
