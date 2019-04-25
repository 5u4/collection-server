import { Context } from "./../interfaces/Context";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { config } from "../config/config";
import { auth } from "../middlwares/auth";

export const createSchema = async () =>
  buildSchema({
    resolvers: config.graphql.resolver.paths,
    emitSchemaFile: config.graphql.schema.emitPath,
    authChecker: auth,
    authMode: "null"
  });

export const build = async () => {
  const schema = await createSchema();

  const isProduction = process.env.NODE_ENV === "production";

  return new ApolloServer({
    schema,
    tracing: !isProduction,
    playground: isProduction
      ? false
      : (config.graphql.playground.settings as any),
    context: ({ req }) => {
      const s = /^permit=[\w-]*/.exec(req.headers.cookie);
      const permit = s ? s.toString().substr(7) : undefined;
      return { permit } as Context;
    }
  });
};

export const serve = async () => {
  const app = await build();

  const server = await app.listen(config.app.port);

  console.log(`🚀 Server started on ${server.url}`);

  return server;
};
