import { useState, useEffect } from "react";
import { useDateSearch } from "../DateSearchContext";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const AddTodoForm = ({ onCancel, onSubmit }) => {
  const { searchTerm, selectedDate, updateSearchTerm, updateSelectedDate } =
    useDateSearch();
  useEffect(() => {
    updateSearchTerm("");
    updateSelectedDate("");
  });
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    subtitle: "",
    date: "",
  });
  console.log(formData.date);
  const [isValid, setIsValid] = useState(false); // Track form validity

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      // Remove leading/trailing spaces and enforce length limit
      const trimmedValue = value.trimStart().slice(0, 35);
      setFormData({ ...formData, [name]: trimmedValue });
    } else if (name === "date") {
      if (value) {
        const [year, month, day] = value.split("-");
        setFormData({ ...formData, [name]: `${day}/${month}/${year}` });
      } else {
        // Clear date value if input is empty
        setFormData({ ...formData, [name]: "" });
      }
    } else if (name === "detail") {
      setFormData({
        ...formData,
        detail: value,
        subtitle: value.length > 25 ? `${value.slice(0, 25)}...` : value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({ title: "", detail: "", date: "", subtitle: "" });
    if (onCancel) onCancel();
  };

  const checkFormValidity = () => {
    const { title, detail, date } = formData;
    if (title && title.length <= 35 && detail && date) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  useEffect(() => {
    const { title, detail, date } = formData;

    setIsValid(Boolean(title && detail && date));
  }, [formData]);

  // useEffect(() => {
  //   checkFormValidity();
  // }, [formData.title, formData.detail, formData.date]);

  return (
    <div
      style={{
        flexGrow: 1,
        overflowY: "auto",
        padding: "30px",
        backgroundColor: "#ffffff",
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title (max 35 characters) *"
          maxLength="35"
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
        <span
          style={{
            fontSize: "12px",
            color: formData.title.length > 35 ? "red" : "#8b8787",
          }}
        >
          {formData.title.length > 35
            ? "Title cannot exceed 35 characters"
            : ""}
        </span>

        {/* Detail Field */}
        <input
          type="text"
          id="detail"
          name="detail"
          placeholder="Detail *"
          value={formData.detail}
          onChange={handleChange}
          style={{
            color: "black",
            padding: "10px 0",
            width: "100%",
            border: "none",
            borderBottom: "1px solid #8B8787",
            fontSize: "16px",
            marginBottom: "30px",
          }}
          required
        />

        {/* Date Field */}
        <input
          name="date"
          placeholder="Date *"
          type="text"
          onFocus={(e) => {
            e.target.type = "date";
            e.target.style.color = "black";
          }}
          onBlur={(e) => {
            console.log(formData.date);
            if (!formData.date || formData.date === undefined)
              e.target.type = "text";
          }}
          id="date"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px 0",
            color: "#8b8787",
            fontSize: "16px",
            border: "none",
            borderBottom: "1px solid #8B8787",
            marginBottom: "30px",
            boxShadow: "none",
          }}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor:
              formData.title && formData.detail && formData.date
                ? "#9395D3"
                : "#d3d3d3", // Change color based on enabled/disabled
            border: "none",
            borderRadius: "15px",
            cursor: isValid ? "pointer" : "not-allowed",
            transition: "background-color 0.3s",
            boxShadow: "0px 4px 4px 0px #00000040",
          }}
          onMouseEnter={(e) =>
            isValid && (e.target.style.backgroundColor = "#4A4C8D")
          }
          onMouseLeave={(e) =>
            isValid && (e.target.style.backgroundColor = "#9395D3")
          }
          disabled={!formData.title || !formData.detail || !formData.date} // Disable button if form is not valid
          data-tooltip-id="disable-button"
          data-tooltip-content={
            !formData.title || !formData.detail || !formData.date
              ? "Please fill out all fields to enable the button."
              : "Click to add the task"
          }
        >
          ADD
        </button>
        <ReactTooltip
          id="disable-button"
          place="bottom"
          effect="solid"
          type="info"
        />
      </form>
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
    </div>
  );
};

export default AddTodoForm;
