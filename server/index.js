import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
// import axios from "axios";
import { Users } from "./data/users.js";
import {Todos} from './data/todos.js';


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
    user: (todo) => Users.find(e => e.id === todo.id)
    // async (todo) => {
    //   const user = await axios.get(
    //     `https://jsonplaceholder.typicode.com/users/${todo.id}`
    //   );
    //   return user.data;
    // },
  },
  Query: {
    getTodos:  () => {
      // const todos = await axios.get(
      //   "https://jsonplaceholder.typicode.com/todos"
      // );
      // return todos.data;

      return Todos
    },
    getAllUsers: () => {
      // const users = await axios.get(
      //   "https://jsonplaceholder.typicode.com/users"
      // );
      // return users.data;

      return Users;
    },
    getUser: (parent, { id }) => {
      // const user = await axios.get(
      //   `https://jsonplaceholder.typicode.com/users/${id}`
      // );
      // return user.data;
      return Users.find((e) => e.id === id)
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
