import { serve } from "./bootstrap/app";
import { createConnection } from "typeorm";

serve();
createConnection();
