import { useState, useEffect } from "react";

const AddTodoForm = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    subtitle: "",
    date: "",
  });

  const [isValid, setIsValid] = useState(false); // Track form validity

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const [year, month, day] = value.split("-");
      setFormData({ ...formData, [name]: `${day}/${month}/${year}` });
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
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({ title: "", detail: "", date: "", subtitle: "" });
    if (onCancel) onCancel();
  };

  // Function to check form validity
  const checkFormValidity = () => {
    const { title, detail, date } = formData;
    if (title && title.length <= 35 && detail && date) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkFormValidity();
  }, [formData.title, formData.detail, formData.date]); // Recheck validation on each change

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
          placeholder="Title"
          maxLength="35"
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
        <span
          style={{
            fontSize: "12px",
            color: formData.title.length > 35 ? "red" : "#8b8787",
          }}
        >
          {formData.title.length > 35 ? "Title cannot exceed 35 characters" : ""}
        </span>

        {/* Detail Field */}
        <input
          type="text"
          id="detail"
          name="detail"
          placeholder="Details"
          value={formData.detail}
          onChange={handleChange}
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

        {/* Date Field */}
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleChange}
          style={{
            cursor: "pointer",
            width: "100%",
            padding: "10px",
            color: "#8b8787",
            fontSize: "16px",
            border: "none",
            borderBottom: "2px solid #8B8787",
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
            backgroundColor: "#9395D3",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#4c3bc0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#9395D3")}
          disabled={!isValid} // Disable button if form is not valid
        >
          ADD
        </button>
      </form>
      <style>
        {` 
          input[type="date"]::-webkit-input-placeholder {
            color: #8b8787; /* Placeholder color */
          }
          input[type="date"]::-moz-placeholder {
            color: #8b8787; /* Firefox placeholder color */
          }
          input[type="date"]:-ms-input-placeholder {
            color: #8b8787; /* Internet Explorer/Edge placeholder color */
          }

          input::placeholder {
            color: #8B8787; /* Placeholder text color */
          }

          input:focus {
            border: none; /* Prevent full border */
            border-bottom: 3px solid #8B8787; /* Maintain consistent bottom border on focus */
            outline: none; /* Remove browser focus outline */
            color: black; /* Ensure text remains black */
          } 
        `}
      </style>
    </div>
  );
};

export default AddTodoForm;
