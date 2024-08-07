import React from "react";
import EditTodo from "./EditTodo";

function ListTodo(props) {
  return (
    <>
      <tbody>
        <tr>
          <td>{props.description}</td>
          <td>
            <EditTodo todoId={props.todoId} description={props.description} />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                props.onDelete(props.todoId);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default ListTodo;
