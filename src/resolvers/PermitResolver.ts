import { Resolver, Mutation, Arg, Query, Ctx, Authorized } from "type-graphql";
import { Permit } from "../models/Permit";
import { config } from "../config/config";
import { Context } from "../interfaces/Context";

@Resolver()
export class PermitResolver {
  @Authorized()
  @Query(returns => Boolean)
  async permit(@Ctx() ctx: Context) {
    return true;
  }

  @Mutation(returns => Boolean)
  async setPermit(@Arg("token") token: string, @Ctx() ctx: Context) {
    const permit = await Permit.findOne(token);

    if (!permit) {
      return false;
    }

    ctx.res.cookie("permit", token, {
      httpOnly: true
    });

    return true;
  }

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
