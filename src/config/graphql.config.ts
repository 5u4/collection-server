import * as path from "path";

export const graphql = {
  resolver: {
    paths: [path.resolve(__dirname, "../resolvers/**/*.ts")]
  },
  schema: {
    emitPath: path.resolve(__dirname, "../schema.graphql")
  },
  playground: {
    settings: {
      "request.credentials": "include",
      "general.betaUpdates": false,
      "editor.theme": "dark",
      "editor.reuseHeaders": true,
      "tracing.hideTracingResponse": true,
      "editor.fontSize": 14,
      "editor.fontFamily":
        "'Source Code Pro', 'Consolas', 'Monaco', 'monospace'"
    }
  }
};
