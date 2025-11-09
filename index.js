const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/schema/typeDefs.js");
const resolvers = require("./src/schema/resolvers");
const { verifyToken } = require("./src/data/helpers");

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const authHeader = req.headers.authorization || "";
      if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.slice(7);
        const decoded = verifyToken(token);
        if (decoded) return { user: { id: decoded.sub, email: decoded.email } };
      }
      return { user: null };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(5000, () =>
    console.log("GraphQL ready at http://localhost:5000/graphql")
  );
}

startServer();
