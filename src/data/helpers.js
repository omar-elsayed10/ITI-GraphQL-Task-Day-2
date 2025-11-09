const jwt = require("jsonwebtoken");
const JWT_SECRET = "My_Secret_key_Is_GraphQL";

const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const generateId = (arr) => String(arr.length + 1);

function listData(
  items,
  {
    filterKey,
    filterValue,
    sortBy,
    sortOrder = "ASC",
    page = 1,
    limit = 5,
  } = {}
) {
  let result = [...items];

  if (filterKey && filterValue) {
    result = result.filter((item) =>
      String(item[filterKey])
        .toLowerCase()
        .includes(String(filterValue).toLowerCase())
    );
  }

  if (sortBy) {
    result.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "ASC" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "ASC" ? 1 : -1;
      return 0;
    });
  }

  const start = (page - 1) * limit;
  return result.slice(start, start + limit);
}

const signToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

module.exports = { isEmail, generateId, listData, signToken, verifyToken };
