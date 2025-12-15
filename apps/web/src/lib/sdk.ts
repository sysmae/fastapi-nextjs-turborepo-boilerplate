// SDK client configuration
import { client } from "@acme/sdk/client";

// Set the base URL for the API
client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

// Re-export all SDK functions and types
export * from "@acme/sdk";
export { client };
