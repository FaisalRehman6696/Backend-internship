import db from "../config/db.js"; // your db file

export const CreateUser = (req, res) => {
  try {
    const { name, email, password } = req.body;

    const stmt = db.prepare(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    );
    const result = stmt.run(name, email, password);

    return res.json({
      msg: "User Created",
      data: { id: result.lastInsertRowid, name, email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error creating user" });
  }
};
