/* eslint-disable react/prop-types */
import { PiListDashes } from "react-icons/pi";
import { FiCheck } from "react-icons/fi";
import { useDateSearch } from "../DateSearchContext";
import { useEffect, useState } from "react";

const FixedBottomBar = ({ filter, setFilter }) => {
  const [styleConfig, setStyleConfig] = useState({
    iconSize: 30,
    fontSize: 10,
    padding: 12, // Default padding
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width <= 414 && height <= 896) {
        setStyleConfig({
          iconSize: 22,
          fontSize: 12,
          padding: 11, // Reduced padding for smaller screens
        });
      } else if (width > 414 && width <= 750) {
        setStyleConfig({
          iconSize: 24,
          fontSize: 14,
          padding: 10, // Medium padding
        });
      } else {
        setStyleConfig({
          iconSize: 28,
          fontSize: 16,
          padding: 12, // Larger padding for desktops
        });
      }
    };

    handleResize(); // Initialize the value on mount
    window.addEventListener("resize", handleResize); // Add event listener to handle resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  const { updateSearchTerm, updateSelectedDate } = useDateSearch();

  const barStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: `${styleConfig.padding}px 12px`, // Dynamic padding
    backgroundColor: "white",
    zIndex: 1,
    position: "fixed",
    bottom: 0,
  };

  const iconContainerStyle = (isActive) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    color: isActive ? "#9395D3" : "#8B8787", // Highlight active filter
  });

  return (
    <div style={barStyle}>
      {/* All Filter */}
      <div
        style={iconContainerStyle(filter === "all")}
        onClick={() => {
          setFilter("all");
        }}
      >
        <PiListDashes size={styleConfig.iconSize} />
        <div
          style={{
            fontSize: `${styleConfig.fontSize}px`,
            fontWeight: "400",
            paddingTop: "1px",
          }}
        >
          Active
        </div>
      </div>

      {/* Completed Filter */}
      <div
        style={iconContainerStyle(filter === "completed")}
        onClick={() => {
          setFilter("completed");
          updateSearchTerm("");
          updateSelectedDate("");
        }}
      >
        <FiCheck size={styleConfig.iconSize} />
        <div
          style={{
            fontSize: `${styleConfig.fontSize}px`,
            fontWeight: "400",
            paddingTop: "1px",
          }}
        >
          Completed
        </div>
      </div>
    </div>
  );
};

export default FixedBottomBar;
