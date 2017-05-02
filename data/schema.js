const typeDefinitions = `
type User {
  id: Int!
  username: String
  firstname: String
  lastname: String
  subscriptions: [Subscription]
  news: [News]
}

type Topic {
  id: Int!
  name: String
  description: String
  news: [News]
}

type Subscription {
  id: Int!
  user: User
  topic: Topic
}

type News {
  id: Int!
  title: String
  content: String
  topics: [Topic]
}

type Query {
  user(id: Int, firstname: String, lastname: String): User
}

schema {
  query: Query
}`;

export default [typeDefinitions];
