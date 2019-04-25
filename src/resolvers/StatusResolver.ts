import { Query, Resolver } from "type-graphql";

@Resolver()
export class StatusResolver {
  @Query(returns => String)
  ping() {
    return "pong";
  }
}
