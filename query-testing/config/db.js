import Database from "better-sqlite3"

// Create or open database file
const db = new Database("database.sqlite")

// Example table creation
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`).run()

export default db