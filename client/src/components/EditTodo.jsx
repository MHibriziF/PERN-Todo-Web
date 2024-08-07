import React, { useState } from "react";

function EditTodo(props) {
  const [description, setDescription] = useState(props.description);

  const editTodo = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${props.todoId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
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
      <button
        type="button"
        class="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${props.todoId}`}
      >
        Edit
      </button>

      <div
        class="modal fade"
        id={`id${props.todoId}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Todo
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-success" onClick={editTodo}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;
