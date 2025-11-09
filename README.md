# GraphQL Student & Course Management API

---

## Features

- **User Authentication**:
  - Signup & Login
  - Password hashing with `bcryptjs`
  - JWT token authentication

- **Students CRUD**:
  - Add, update, delete, and view students
  - Students have: `name`, `email`, `age`, `major`
  - Nested fields: `courses` and `coursesCount`

- **Courses CRUD**:
  - Add, update, delete, and view courses
  - Courses have: `title`, `code`, `credits`, `instructor`
  - Nested fields: `students` and `studentsCount`

- **Enrollment Management**:
  - Enroll/Unenroll students in courses

- **Filtering, Sorting & Pagination**:
  - Simplified utility for list queries
  - Filter by field, search by text, sort by key, paginate results

---

## Folder Structure

src/
│   ├── schema/
│   │   ├── typeDefs.js
│   │   └── resolvers.js
│   │
│   ├── data/
│   │   ├── db.js
│   │   └── helpers.js
│   │
│   ├── auth/
│   │   └── auth.js
│   │
│   |
│   └── index.js
│
├── package.json
└── README.md

**Install dependencies: npm i**
**Start the server: npm run dev**
**Server will run at: http://localhost:5000/graphql**

