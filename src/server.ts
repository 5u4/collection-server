import { Browser } from "./services/Browser";
import { serve } from "./bootstrap/app";
import { createConnection } from "typeorm";

serve();
createConnection();

export const browser = new Browser();
browser.initialize();
