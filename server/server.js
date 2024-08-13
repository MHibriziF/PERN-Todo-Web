import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// GET
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    res.json(todos.rows);
  } catch (error) {
    console.error(error);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// POST
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// PUT
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("Todo Succesfully updated");
  } catch (error) {
    console.error(error);
  }
});

// DELETE
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
    res.json("Todo deleted");
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => {
  res.send("hi!");
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
