const { students, courses, enrollments } = require("../data/db");
const { listData, isEmail, generateId } = require("../data/helpers");
const { signup, login } = require("../auth/auth");

const resolvers = {
  Query: {
    user: (_, __, ctx) => ctx.user || null,
    getAllStudents: (_, input) => listData(students, input),
    getStudent: (_, { id }) => students.find((s) => s.id === id) || null,
    getAllCourses: (_, input) => listData(courses, input),
    getCourse: (_, { id }) => courses.find((c) => c.id === id) || null,
  },

  Mutation: {
    signup: (_, { email, password }) => signup(email, password),
    login: (_, { email, password }) => login(email, password),

    addStudent: (_, { name, email, age, major }, ctx) => {
      if (!ctx.user) throw new Error("not authenticated");
      if (!isEmail(email)) throw new Error("Invalid email");
      if (age < 16) throw new Error("Student must be at least 16 years old");
      if (students.some((s) => s.email.toLowerCase() === email.toLowerCase()))
        throw new Error("Email already exists");

      const newStudent = { id: generateId(students), name, email, age, major };
      students.push(newStudent);
      enrollments[newStudent.id] = [];
      return newStudent;
    },

    updateStudent: (_, { id, input }, ctx) => {
      if (!ctx.user) throw new Error("not authenticated");
      const student = students.find((s) => s.id === id);
      if (!student) throw new Error("Student not found");

      if (input.email && !isEmail(input.email))
        throw new Error("Invalid email");
      if (input.age && input.age < 16) throw new Error("Age must be >= 16");

      Object.assign(student, input);
      return student;
    },

    deleteStudent: (_, { id }, ctx) => {
      if (!ctx.user) throw new Error("not authenticated");
      const index = students.findIndex((s) => s.id === id);
      if (index === -1) return false;
      students.splice(index, 1);
      delete enrollments[id];
      return true;
    },

    addCourse: (_, { title, code, credits, instructor }, ctx) => {
      if (!ctx.user) throw new Error("not authenticated");
      if (credits < 1 || credits > 6)
        throw new Error("Credits must be between 1 and 6");
      if (courses.some((c) => c.code.toLowerCase() === code.toLowerCase()))
        throw new Error("Course code exists");

      const newCourse = {
        id: generateId(courses),
        title,
        code,
        credits,
        instructor,
      };
      courses.push(newCourse);
      return newCourse;
    },

    updateCourse: (_, { id, input }, ctx) => {
      if (!ctx.user) throw new Error("not authenticated");
      const course = courses.find((c) => c.id === id);
      if (!course) throw new Error("Course not found");
      Object.assign(course, input);
      return course;
    },

    deleteCourse: (_, { id }, ctx) => {
      if (!ctx.user) throw new Error("not authenticated");
      courses = courses.filter((c) => c.id !== id);
      Object.keys(enrollments).forEach((sid) => {
        enrollments[sid] = enrollments[sid].filter((cid) => cid !== id);
      });
      return true;
    },

    enrollStudent: (_, { studentId, courseId }, ctx) => {
      if (!ctx.user) throw new Error("not authenticated");
      const student = students.find((s) => s.id === studentId);
      const course = courses.find((c) => c.id === courseId);
      if (!student || !course) throw new Error("Invalid student or course");
      enrollments[studentId] = enrollments[studentId] || [];
      if (!enrollments[studentId].includes(courseId))
        enrollments[studentId].push(courseId);
      return student;
    },

    unenrollStudent: (_, { studentId, courseId }, ctx) => {
      if (!ctx.user) throw new Error("not authenticated");
      enrollments[studentId] = (enrollments[studentId] || []).filter(
        (cid) => cid !== courseId
      );
      return students.find((s) => s.id === studentId);
    },
  },

  Student: {
    courses: (parent) =>
      (enrollments[parent.id] || []).map((cid) =>
        courses.find((c) => c.id === cid)
      ),
    coursesCount: (parent) => (enrollments[parent.id] || []).length,
  },

  Course: {
    students: (parent) =>
      students.filter((s) => (enrollments[s.id] || []).includes(parent.id)),
    studentsCount: (parent) =>
      students.filter((s) => (enrollments[s.id] || []).includes(parent.id))
        .length,
  },
};

module.exports = resolvers;
