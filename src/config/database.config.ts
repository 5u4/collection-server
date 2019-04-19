import { ConnectionOptions } from "typeorm";

const entities = ["src/models/**/*.ts"];

export const database: { [env in "default" | "testing"]: ConnectionOptions } = {
  default: {
    type: "postgres",
    host: process.env.DB_HOST || "0.0.0.0",
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || "dictionary",
    password: process.env.DB_PASS || "dictionary",
    database: process.env.DB_NAME || "dictionary",
    dropSchema: false,
    synchronize: true,
    entities
  },
  testing: {
    type: "sqlite",
    database: "test.db",
    dropSchema: true,
    synchronize: true,
    entities
  }
};
