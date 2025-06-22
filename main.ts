import { type EnvConfig, loadEnvironment } from "./mod.ts";
import { handleError } from "./mod.ts";

// Default environment variables
const DEFAULT_ENV: EnvConfig = {
  CLIENT_ID: "",
  API_TOKEN: "",
  DB_HOST: "localhost",
  DB_ALIAS: "msshop"
};

loadEnvironment(DEFAULT_ENV);

try {
  throw new Error("Invalid input");
} catch (error) {
  const message = handleError(error); // Returns "Invalid input"
  console.log(message);
}