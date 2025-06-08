import { existsSync } from "jsr:@std/fs@^1.0.18";
import { parse, stringify } from "jsr:@std/dotenv@^0.225.5";

export type EnvConfig = Record<string, string>;

export async function createEnvFile(defEnv: EnvConfig): Promise<void> {
  const envPath = ".env";
  
  if (!existsSync(envPath)) {
    // Create new .env file with all default values
    await Deno.writeTextFile(envPath, stringify(defEnv));
    console.log(".env file created with default values");
  } else {
    // Read existing .env file
    try {
      const envContent = await Deno.readTextFile(envPath);
      const existingEnv = parse(envContent);
      
      // Find missing default keys
      const missingDefaults: Record<string, string> = {};
      for (const [key, value] of Object.entries(defEnv)) {
        if (!(key in existingEnv)) {
          missingDefaults[key] = value;
        }
      }
      
      // Append missing defaults if any
      if (Object.keys(missingDefaults).length > 0) {
        const missingContent = stringify(missingDefaults);
        await Deno.writeTextFile(envPath, `\n${missingContent}`, { append: true });
        console.log("Appended missing default values to .env file");
      } else {
        // .env file already contains all default values
      }
    } catch (error) {
      console.error("Error processing .env file:", (error as Error).message);
    }
  }
}

export async function loadEnvironment(defEnv: EnvConfig): Promise<void> {
  await createEnvFile(defEnv); // Ensure .env file exists

  try {
    const envContent = await Deno.readTextFile(".env");
    const envVars = parse(envContent);
    
    // Set environment variables
    for (const [key, value] of Object.entries(envVars)) {
      Deno.env.set(key, value);
    }
    console.log("Environment variables loaded");
  } catch (error) {
    console.error("Error loading .env file:", (error as Error).message);
  }
}