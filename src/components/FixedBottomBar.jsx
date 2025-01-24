/* eslint-disable react/prop-types */
import { PiListDashes } from "react-icons/pi";
import { FiCheck } from "react-icons/fi";
const FixedBottomBar = ({ filter, setFilter }) => {
  const barStyle = {
    position: "fixed",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "25px 30px",
    backgroundColor: "white", // Purple background
    zIndex: 1,
    height: "75px",
  };

  const iconContainerStyle = (isActive) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    color: isActive ? "#9395D3" : "#8B8787", // Highlight active filter
  });

  return (
    <>
      <div style={barStyle}>
        {/* All Filter */}
        <div
          style={iconContainerStyle(filter === "all")}
          onClick={() => setFilter("all")}
        >
          <div style={{ fontSize: "20px", marginBottom: "1px" }}>
            <PiListDashes />
          </div>
          <div style={{ fontSize: "12px" }}>Active</div>
        </div>

        {/* Completed Filter */}
        <div
          style={iconContainerStyle(filter === "completed")}
          onClick={() => setFilter("completed")}
        >
          <div style={{ fontSize: "20px", marginBottom: "1px" }}>
            <FiCheck />
          </div>
          <div style={{ fontSize: "12px" }}>Completed</div>
        </div>
      </div>
    </>
  );
};

export default FixedBottomBar;
