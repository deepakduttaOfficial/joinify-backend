export interface EnvConfig {
  PORT: number;
  DB_URL: string;
  JWT_SECRET_AUTH: string;
  JWT_AUTH_EXPIRY: string;
  JWT_EXPIRY: string;
  MAIL_HOST: string;
  MAIL_PORT: string;
  MAIL_USERNAME: string;
  MAIL_PASSWORD: string;
  MAIL_EMAIL: string;
  EMAIL_VERIFY_TOKEN_SECRET_KEY: string;
  DOMAIN_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
}
