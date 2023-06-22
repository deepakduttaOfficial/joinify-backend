import mongoose from "mongoose";
import envConfig from "../config/env.config";

(async () => {
  try {
    await mongoose.connect(envConfig.DB_URL, {
      dbName: "joinify",
    });
    console.log("DB CONNECTED😊");

    mongoose.connection.on("error", (err) => {
      console.log("DB connection failed!😒", err);
      throw err;
    });
  } catch (err) {
    console.log("ERROR ", err);
    throw err;
  }
})();
