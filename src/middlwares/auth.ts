import { Context } from "./../interfaces/Context";
import { AuthChecker } from "type-graphql";
import { Permit } from "../models/Permit";

export const auth: AuthChecker<Context> = async ({ context: { permit } }) => {
  if (!permit) {
    return false;
  }

  return !!(await Permit.findOne(permit));
};
