/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

const TodoItem = ({
  title,
  subtitle = "",
  detail = "",
  onEdit,
  onDelete,
  onComplete,
  completed,
  date,
}) => {
  const [screenSize, setScreenSize] = useState("large"); // Track screen size: 'small', 'medium', 'large'
  const [showDetail, setShowDetail] = useState(false); // Track whether to show detail or subtitle

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 400) {
        setScreenSize("small");
      } else if (width <= 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    handleResize(); // Initialize the screen size on mount
    window.addEventListener("resize", handleResize); // Listen for resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  const itemStyle = {
    maxWidth: "100%",
    display: "flex",
    flexDirection: screenSize === "small" ? "column" : "row",
    justifyContent: "space-between",
    alignItems: screenSize === "small" ? "flex-start" : "center",
    padding:
      screenSize === "small"
        ? "15px"
        : screenSize === "medium"
        ? "15px"
        : "20px",
    margin: "9px 0",
    backgroundColor: "white",
    color: "#9395D3",
    borderRadius: "15px",
    boxShadow: "0px 4px 4px 0px #00000040",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    width: "100%",
    flexWrap: "wrap",
    marginBottom: "17px",
  };

  const textContainerStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth:
      screenSize === "small" ? "90%" : screenSize === "medium" ? "40%" : "70%",

    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const buttonStyle = {
    padding: "5px 10px",
    fontSize: "20px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "#B3B7EE",
  };

  return (
    <div style={itemStyle}>
      <div style={textContainerStyle}>
        <h3
          style={{
            fontSize: screenSize === "small" ? "17px" : "22px", // Adjust title font size for small screens
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "#A7A7A7",
            fontSize: screenSize === "small" ? "10px" : "12px", // Adjust date font size for small screens
            marginBottom: "",
          }}
        >
          {date}
        </p>

        <p
          style={{
            color: "black",
            marginTop: screenSize === "small" ? "1rem" : ".75rem",
            fontSize: "14px",
          }}
        >
          {showDetail ? detail : subtitle}
        </p>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {detail.length > subtitle.length && (
          <button
            style={{
              ...buttonStyle,
              transition: " transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)"; // Scale up to 1.2x on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)"; // Reset scale on hover out
            }}
            onClick={() => setShowDetail((prev) => !prev)}
            aria-label="Toggle details"
            title="Toggle details"
          >
            {showDetail ? (
              <IoMdArrowDropupCircle />
            ) : (
              <IoMdArrowDropdownCircle />
            )}
          </button>
        )}
        {!completed && (
          <>
            <button
              style={{
                ...buttonStyle,
                transition: " transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)"; // Scale up to 1.2x on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"; // Reset scale on hover out
              }}
              onClick={onComplete}
              aria-label="Mark as complete"
              title="Mark as complete"
            >
              <BiCheckCircle />
            </button>
            <button
              style={{
                ...buttonStyle,
                transition: " transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)"; // Scale up to 1.2x on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"; // Reset scale on hover out
              }}
              onClick={onEdit}
              aria-label="Edit task"
              title="Edit task"
            >
              <FiEdit2 />
            </button>
            <button
              style={{
                ...buttonStyle,
                transition: " transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)"; // Scale up to 1.2x on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"; // Reset scale on hover out
              }}
              onClick={onDelete}
              aria-label="Delete task"
              title="Delete task"
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
