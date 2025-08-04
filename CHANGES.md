# CHANGES.md

## Why I Migrated to Node.js

- Python 3.13 compatibility issues blocked package installation.
- Flask & bcrypt were not installable due to DNS and path errors.
- I opted for Node.js + Express for a faster, production-safe rewrite.

---

## What Was Refactored

| Original Flask API                     | Node.js Express Equivalent                  |
|----------------------------------------|---------------------------------------------|
| Monolithic app.py                      | Modular structure with routers + services   |
| SQL injection risks                    | Parameterized queries with SQLite           |
| Plaintext password storage             | bcrypt hashing added                        |
| Raw strings as responses               | Proper JSON + HTTP codes                    |
| No validation                          | Email/password validation added             |

---

## New Endpoints

| Method | Route           | Description            |
|--------|------------------|------------------------|
| GET    | `/`              | Home                   |
| GET    | `/users`         | List all users         |
| GET    | `/user/:id`      | Fetch user by ID       |
| POST   | `/users`         | Create new user        |
| PUT    | `/user/:id`      | Update user            |
| DELETE | `/user/:id`      | Delete user            |
| GET    | `/search?name=x` | Search users by name   |
| POST   | `/login`         | Login via credentials  |

---

## Stack Used

- Node.js (v18+)
- Express.js
- SQLite (in-memory for testing)
- bcrypt
- body-parser

---

## If Given More Time

- Add persistent SQLite file-based DB
- Implement JWT authentication
- Unit test coverage for all endpoints
- Use TypeScript for type safety

---

## AI Usage

- Manual adjustments made for API structure and validations

