import { AuthRoles } from "../../helpers/auth.helper";

export interface IUserPhoto {
  public_id: string;
  secure_url: string;
}

export interface IUserSchema extends Document {
  name: string;
  email: string;
  userName: string;
  googleId: string;
  googleInfo: Object;
  password: string;
  isVerified: boolean;
  emailVerifyId: string | null;
  photo?: IUserPhoto;
  photoUrl?: String;
  role: AuthRoles;
  deleted: boolean;
  activeAccount: boolean;
  loginCount: Number;
  loginDetails: [];
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(providedPassword: string): Promise<boolean>;
  authJwtToken(): string;
  generateResetPasswordToken(): string
}
