const { buildSchema } = require('graphql');

console.log('test schema');
const schema = buildSchema(`
type User {
  id: Int!
  username: String!
  email: String!
  password: String!
  posts: [Post!]
}

type Post {
  id: Int!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]
  createdAt: String

}

type Comment {
  id: Int!
  content: String!
  author: User!
  post: Post!
  createdAt: String

}

type Query {
  getAllPosts: [Post!]
  getPostById(id: Int!): Post
}

type Mutation {
  register(username: String!, email: String!, password: String!): RegisterResponse
  login(email: String! password: String!): LoginResponse
  createPost(title: String!, content: String!): CreatePostResponse
  updatePost(id: Int!, title: String!, content: String!): UpdatePostResponse
  deletePost(id: Int!): DeletePostResponse
  createComment(content: String!, postId: Int!): CreateCommentResponse
}

type RegisterResponse {
 id: Int!
 username: String!
 email: String!
}

input RegisterInput {
  username: String!
  email: String!
  password: String!
}

input LoginInput {
  email: String! 
  password: String!
}

type LoginResponse {
 id: Int!
 name: String!
 email: String!
 token: String!
}

type CreatePostResponse {
  id: Int!
  title: String!
  content: String!
  createdAt: String!
}

type UpdatePostResponse {
  success: Boolean
}

type DeletePostResponse {
  success: Boolean
}
  
type CreateCommentResponse {
  id: Int!
  content: String!
  createdAt: String!
}

`);

module.exports = schema;
