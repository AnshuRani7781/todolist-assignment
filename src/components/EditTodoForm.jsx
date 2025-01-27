/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { useHeader } from "../HeaderContext";
import { IoArrowBack } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
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
            borderBottom: "1px solid #8B8787",
            padding: "10px 0",
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
            borderBottom: "1px solid #8B8787",
            padding: "10px 0",
            fontSize: "16px",
            marginBottom: "30px",
          }}
        />
        <input
          placeholder={date}
          type="text"
          name="date"
          color="black"
          onFocus={(e) => {
            e.target.type = "date";
            e.target.style.color = "black";
          }}
          onBlur={(e) => (e.target.type = "text")}
          id="date "
          onChange={(e) => setDate(e.target.value)}
          style={{
            cursor: "pointer",
            width: "100%",
            padding: "10px 0",
            value: { date },
            fontSize: "16px",
            border: "none",
            borderBottom: "1px solid #8B8787",
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
              backgroundColor: title && detail && date ? "#9395D3" : "#d3d3d3", // Change color based on enabled/disabled
              border: "none",
              borderRadius: "15px",
              cursor: title && detail && date ? "pointer" : "not-allowed", // Change cursor style
              transition: "background-color 0.3s",
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
            onMouseEnter={(e) =>
              title && detail && date
                ? (e.target.style.backgroundColor = "#4c3bc0")
                : null
            }
            onMouseLeave={(e) =>
              title && detail && date
                ? (e.target.style.backgroundColor = "#9395D3")
                : null
            }
            onClick={handleSubmit}
            disabled={!title || !detail || !date}
            data-tooltip-id="enable"
            data-tooltip-content={
              !title || !detail || !date
                ? "Please fill out all fields to enable the button."
                : "Click to update the task"
            }
            // Disable button if any field is empty
          >
            Update
          </button>
          <ReactTooltip id="enable" place="bottom" effect="solid" type="info" />
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
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4c3bc0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#9395D3")}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
      <style>
        {`
          input::placeholder {
            color: #8B8787; /* Placeholder text color */
          }

          input:focus {
            border: none; /* Prevent full border */
            border-bottom: 3px solid #8B8787; /* Maintain consistent bottom border on focus */
            outline: none; /* Remove browser focus outline */
            color: black; /* Ensure text remains black */
          }

          input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer; /* Make the date picker indicator clickable */
          }
        `}
      </style>
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
