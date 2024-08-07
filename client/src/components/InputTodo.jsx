import React, { useState } from "react";

function InputTodo(props) {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      props.onInput(body);
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setDescription(value);
  };

  return (
    <>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
        <button className="btn btn-success"> Add </button>
      </form>
    </>
  );
}

export default InputTodo;
