import { Resolver, Mutation, Arg } from "type-graphql";
import { Permit } from "../models/Permit";
import { config } from "../config/config";

@Resolver()
export class PermitResolver {
  @Mutation(returns => String, { nullable: true })
  async makePermit(@Arg("k") k: string) {
    const secret = config.app.key;

    if (!secret || k !== secret) {
      return null;
    }

    const permit = await Permit.create().save();

    return permit.id;
  }
}
