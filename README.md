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

src/<br>
│   ├── schema/<br>
│   │   ├── typeDefs.js<br>
│   │   └── resolvers.js<br>
│   │<br>
│   ├── data/<br>
│   │   ├── db.js<br>
│   │   └── helpers.js<br>
│   │<br>
│   ├── auth/<br>
│   │   └── auth.js<br>
│   │
│   |<br>
│   └── index.js<br>
│
├── package.json<br>
└── README.md<br>

**Install dependencies: npm i** <br>
**Start the server: npm run dev** <br>
**Server will run at: http://localhost:5000/graphql** <br>

