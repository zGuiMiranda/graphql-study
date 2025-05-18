import { Post } from "./core/domain/Post";
import { User } from "./core/domain/User";
import { buildSchema } from "graphql";
import { db } from "./db";

const schema = buildSchema(`
   type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    user: User!
  }

  type Query {
    users: [User!]!
    postsByUser(userId: Int!): [Post!]!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input CreatePostInput {
    title: String!
    userId: Int!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createPost(input: CreatePostInput!): Post!
  }
`);

const root = {
  users: async () => {
    const users = await db("users");

    return users.map(
      (user: User) => new User(user.getId(), user.getName(), user.getEmail())
    );
  },
  postsByUser: async ({ userId }: any) => {
    const posts = await db("posts").where({ userId });

    const userFromDb = await db("users").where({ id: userId }).first();
    const user = new User(userFromDb.id, userFromDb.name, userFromDb.email);

    return posts.map((post: any) => new Post(post.id, post.title, user));
  },
  createUser: async ({ input }: any) => {
    const [id] = await db("users").insert(input);
    return { id, ...input };
  },

  createPost: async ({ input }: any) => {
    const [id] = await db("posts").insert({
      title: input.title,
      userId: input.userId,
    });

    const user = await db("users").where({ id: input.userId }).first();

    return new Post(id, input.title, user);
  },
};

module.exports = { schema, root };
