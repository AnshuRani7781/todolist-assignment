import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

const TodoItem = ({
  title,
  subtitle = "", // Default to empty string if subtitle is undefined
  detail = "", // Default to empty string if detail is undefined
  onEdit,
  onDelete,
  onComplete,
  completed,
  date,
}) => {
  const [showDetail, setShowDetail] = useState(false); // State to toggle detail view
  const [isMobile, setIsMobile] = useState(false); // State to track if screen is mobile

  // Check window width and set isMobile to true if <= 450px
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450); // Update isMobile state on resize
    };

    handleResize(); // Initialize the value on mount
    window.addEventListener("resize", handleResize); // Add event listener to handle resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  const itemStyle = {
    maxWidth: "100%",
    display: "flex",
    flexDirection: isMobile ? "column" : "row", // Change direction based on screen width
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "10px" : "20px", // Adjust padding for smaller screens
    margin: "10px 0",
    backgroundColor: "white",
    color: "#9395D3", // Text color
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    textDecoration: "none", // No strike-through for completed
    marginBottom: "20px",
    wordWrap: "break-word", // Ensure text wraps inside container
    overflowWrap: "break-word", // Ensure text breaks properly
    width: "100%", // Allow the item to take full width of parent
    flexWrap: "wrap", // Allow wrapping of content
  };

  const textContainerStyle = {
    display: "flex",
    flexDirection: "column", // Stack title, subtitle, and detail vertically
    maxWidth: isMobile ? "90%" : "70%", // Change max width based on screen width
    overflow: "hidden", // Hide overflow content
    textOverflow: "ellipsis", // Add ellipsis for overflowing text
  };

  return (
    <div style={itemStyle}>
      <div style={textContainerStyle}>
        <h3 style={{ fontSize: "24px", margin: 0 }}>{title}</h3>
        <p style={{ color: "#A7A7A7", fontSize: "8px", marginBottom: "" }}>
          {date}
        </p>
        <p style={{ color: "black", marginTop: ".75rem", fontSize: "12px" }}>
          {showDetail ? detail : subtitle}
        </p>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {detail.length > subtitle.length && (
          <button
            style={{
              padding: "5px 10px",
              fontSize: "20px",
              cursor: "pointer",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "white",
              color: "#B3B7EE",
            }}
            onClick={() => setShowDetail((prev) => !prev)}
          >
            {showDetail ? (
              <IoMdArrowDropdownCircle />
            ) : (
              <IoMdArrowDropupCircle />
            )}
          </button>
        )}
        {!completed && (
          <>
            <button
              style={{
                padding: "5px 10px",
                fontSize: "20px",
                cursor: "pointer",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "#B3B7EE",
              }}
              onClick={onComplete}
            >
              <BiCheckCircle />
            </button>
            <button
              style={{
                padding: "5px 10px",
                fontSize: "20px",
                cursor: "pointer",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "#B3B7EE",
              }}
              onClick={onEdit}
            >
              <FiEdit2 />
            </button>
            <button
              style={{
                padding: "5px 10px",
                fontSize: "20px",
                cursor: "pointer",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "#B3B7EE",
              }}
              onClick={onDelete}
            >
              <RiDeleteBin5Line />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
