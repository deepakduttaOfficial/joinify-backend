import express, { Response } from "express";
import cors from "cors";

/** Routes imported */
import authRoute from "./routes/auth/auth.route";

const app = express();
/** Middle-ware */
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

/** Test route */
app.get("/", (_, res: Response) => {
  return res.status(200).json({ success: true, message: "Hello world!" });
});

/** Routes Executing  */
app.use(`/api/auth`, authRoute);

export default app;
