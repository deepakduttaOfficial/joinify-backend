import app from "./app";
import envConfig from "./config/env.config";
import "./utils/db.utils";

app.listen(envConfig.PORT, () =>
  console.log(`SERVER RUNNING AT PORT ${envConfig.PORT}`)
);
