const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    age: Int!
    major: String!
    courses: [Course!]!
    coursesCount: Int!
  }

  type Course {
    id: ID!
    title: String!
    code: String!
    credits: Int!
    instructor: String!
    students: [Student!]!
    studentsCount: Int!
  }

  input StudentInput {
    name: String
    email: String
    age: Int
    major: String
  }

  input CourseInput {
    title: String
    code: String
    credits: Int
    instructor: String
  }

  type Query {
    user: User
    getAllStudents(
      filterKey: String
      filterValue: String
      sortBy: String
      sortOrder: String
      page: Int
      limit: Int
    ): [Student!]!
    getStudent(id: ID!): Student
    getAllCourses(
      filterKey: String
      filterValue: String
      sortBy: String
      sortOrder: String
      page: Int
      limit: Int
    ): [Course!]!
    getCourse(id: ID!): Course
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    addStudent(
      name: String!
      email: String!
      age: Int!
      major: String!
    ): Student!
    updateStudent(id: ID!, input: StudentInput!): Student!
    deleteStudent(id: ID!): Boolean!
    addCourse(
      title: String!
      code: String!
      credits: Int!
      instructor: String!
    ): Course!
    updateCourse(id: ID!, input: CourseInput!): Course!
    deleteCourse(id: ID!): Boolean!
    enrollStudent(studentId: ID!, courseId: ID!): Student!
    unenrollStudent(studentId: ID!, courseId: ID!): Student!
  }
`;

module.exports = typeDefs;
