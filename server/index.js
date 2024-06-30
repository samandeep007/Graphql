import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";

// Define the GraphQL schema
const typeDefs = `
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User
  }

  type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUser(id: ID!): User
  }
`;

// Define the resolvers
const resolvers = {
  Todo: {
    user: async (todo) => {
      const user = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${todo.id}`
      );
      return user.data;
    },
  },
  Query: {
    getTodos: async () => {
      const todos = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return todos.data;
    },
    getAllUsers: async () => {
      const users = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return users.data;
    },
    getUser: async (parent, { id }) => {
      const user = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return user.data;
    },
  },
};

// Start the server
async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  app.use(bodyParser.json());
  app.use(cors());
  app.use("/graphql", expressMiddleware(server));

  app.listen(3000, () => {
    console.log("Server started at port 3000");
  });
}

startServer();
