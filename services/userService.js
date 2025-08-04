import db from '../db/db.js';
import bcrypt from 'bcrypt';
import { isValidEmail } from '../utils/validator.js';

export const getAllUsers = (req, res) => {
  db.all("SELECT id, name, email FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

export const getUserById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT id, name, email FROM users WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "User not found" });
    res.json(row);
  });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !isValidEmail(email))
    return res.status(400).json({ error: "Invalid input" });

  const hashed = await bcrypt.hash(password, 10);
  db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashed], function (err) {
    if (err) return res.status(409).json({ error: "Email already exists" });
    res.status(201).json({ message: "User created", id: this.lastID });
  });
};

export const updateUser = (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  if (!name || !isValidEmail(email))
    return res.status(400).json({ error: "Invalid input" });

  db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User updated" });
  });
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
};

export const searchUsers = (req, res) => {
  const name = req.query.name || '';
  db.all("SELECT id, name, email FROM users WHERE name LIKE ?", [`%${name}%`], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing credentials" });

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful" });
  });
};
