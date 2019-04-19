import { createConnection } from "typeorm";
import { config } from "../config/config";

export const connectDatabase = async () =>
  createConnection(
    process.env.NODE_ENV === "testing"
      ? config.database.testing
      : config.database.default
  );
