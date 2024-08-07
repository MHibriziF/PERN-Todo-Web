import React, { useState, useEffect } from "react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async (todo) => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="container">
        <InputTodo onInput={getTodos} />
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {todos.map((todo) => (
            <ListTodo
              description={todo.description}
              todoId={todo.todo_id}
              onDelete={deleteTodo}
            />
          ))}
        </table>
      </div>
    </>
  );
}

export default App;
