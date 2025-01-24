/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { useHeader } from "../HeaderContext";
import { IoArrowBack } from "react-icons/io5";

const EditTodoForm = ({ todo, onCancel, onUpdate }) => {
  const [title, setTitle] = useState(todo.title);
  const [detail, setDetail] = useState(todo.detail);
  const [date, setDate] = useState(todo.date);

  const { setHeaderContent } = useHeader();

  const handleSubmit = () => {
    if (!title || !detail || !date) {
      alert("Please fill out all fields!");
      return;
    }
    const updatedTodo = {
      ...todo,
      title,
      detail,
      subtitle: detail.slice(0, 25), // Generate subtitle from detail
      date,
    };
    onUpdate(updatedTodo); // Pass updated todo back to the parent
  };

  return (
    <>
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "30px",
          backgroundColor: "#ffffff",
        }}
      >
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{
            color: "black",
            width: "100%",
            border: "none",
            borderBottom: "2px solid #8B8787",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "30px",
          }}
          required
        />

        <input
          type="text"
          id="detail"
          name="detail"
          placeholder="Details"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          style={{
            color: "black",
            width: "100%",
            border: "none",
            borderBottom: "2px solid #8B8787",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "30px",
          }}
        />
        <input
          type="date"
          id="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
          style={{
            cursor: "pointer",
            width: "100%",
            padding: "10px",
            value: { date },
            fontSize: "16px",
            border: "none",
            borderBottom: "2px solid #8B8787",
            marginBottom: "30px",
            boxShadow: "none",
          }}
          required
        />
        <div style={styles.buttonContainer}>
          <button
            style={{
              flex: 1,

              padding: "20px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#9395D3",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4c3bc0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#9395D3")}
            onClick={handleSubmit}
          >
            Update
          </button>
          <button
            style={{
              flex: 1,
              padding: "20px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#9395D3",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4c3bc0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#9395D3")}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

const styles = {
  buttonContainer: {
    display: "flex",
    gap: "25px",
    marginTop: "10px",
    justifyContent: "center",
    width: "100%",
  },
  updateButton: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#b1addb",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "0.3s",
  },
  cancelButton: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default EditTodoForm;
