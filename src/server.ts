import { connectDatabase } from "./bootstrap/database";
import { Browser } from "./services/Browser";
import { serve } from "./bootstrap/app";

serve();
connectDatabase();

export const browser = new Browser();
browser.initialize();
