const bcrypt = require("bcryptjs");
const { users } = require("../data/db");
const { isEmail, generateId, signToken } = require("../data/helpers");

async function signup(email, password) {
  if (!isEmail(email)) throw new Error("Invalid email format");
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters");

  const exists = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: generateId(users), email, password: hashed };
  users.push(newUser);

  const token = signToken({ sub: newUser.id, email: newUser.email });
  return { token, user: { id: newUser.id, email: newUser.email } };
}

async function login(email, password) {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = signToken({ sub: user.id, email: user.email });
  return { token, user: { id: user.id, email: user.email } };
}

module.exports = { signup, login };
