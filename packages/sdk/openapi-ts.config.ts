import { defineConfig } from "@hey-api/openapi-ts";
import "dotenv/config";

export default defineConfig({
  client: "@hey-api/client-axios",
  input: process.env.OPENAPI_URL || "http://localhost:8000/openapi.json",
  output: {
    path: "src",
    format: "prettier",
  },
  plugins: ["@hey-api/typescript", "@hey-api/sdk", "@tanstack/react-query"],
});
