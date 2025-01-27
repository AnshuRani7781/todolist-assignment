/* eslint-disable react/prop-types */
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FiSearch } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { useState, useEffect } from "react";
import { useHeader } from "../HeaderContext";
import { useDateSearch } from "../DateSearchContext";
const Header = () => {
  const [screenSize, setScreenSize] = useState("large"); // Track screen size: 'small', 'medium', 'large'

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

    handleResize(); // Initialize screen size on mount
    window.addEventListener("resize", handleResize); // Listen for resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const { searchTerm, selectedDate, updateSearchTerm, updateSelectedDate } =
    useDateSearch();
  const [calendarVisible, setCalendarVisible] = useState(false); // Toggle calendar visibility
  const [searchVisible, setSearchVisible] = useState(false);
  const { headerContent } = useHeader();
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "17px 22px",
    backgroundColor: "#9395D3", // Purple
    color: "#FFFFFF", // White
    fontSize: "18px",
    width: "100%",
  };

  const titleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxGap: "7px",
    fontWeight: "600",
  };

  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap:
      screenSize === "small"
        ? "15px"
        : screenSize === "medium"
        ? "20px"
        : "25px",
    justifyContent: window.innerWidth <= 500 ? "flex-end" : "center",
    flexWrap: "wrap",
  };
  const iconStyle1 = {
    fontSize:
      screenSize === "small"
        ? "18px"
        : screenSize === "medium"
        ? "20px"
        : "28px",
    cursor: "pointer",
    paddingRight: "15px",
  };
  const iconStyle = {
    fontSize:
      screenSize === "small"
        ? "20px"
        : screenSize === "medium"
        ? "25px"
        : "30px",
    cursor: "pointer",
    paddingRight: "0px",
  };

  const searchInputStyle = {
    transition: "width 0.3s ease, opacity 0.3s ease",
    width:
      screenSize === "small"
        ? "6rem"
        : screenSize === "medium"
        ? "7rem"
        : "8rem", // Animation width change
    opacity: 1, // Fade in/out animation
    padding: "5px",
    marginLeft: "0px",
    // border: "1px solid #ccc",
    borderRadius: "5px",
    border: "none",
  };
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    // Split by "/"
    console.log("", day, month, year);
    return `${year}-${month}-${day}`; // Return in "yyyy-mm-dd" format
  };

  return (
    <header style={headerStyle}>
      <div style={titleStyle}>
        {headerContent.icon && (
          <span
            style={{ ...iconStyle1, transition: "transform 0.2s ease-in-out" }}
            onClick={() => {}}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.2)"; // Scale up to 1.2x on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)"; // Reset scale on hover out
            }}
            data-tooltip-id="back-to-active"
            data-tooltip-content="back"
          >
            {headerContent.icon}
          </span>
        )}
        <ReactTooltip
          id="back-to-active"
          place="bottom"
          effect="solid"
          type="info"
        />
        <h1
          style={{
            fontSize:
              screenSize === "small"
                ? "18px"
                : screenSize === "medium"
                ? "24px"
                : "26px",
          }}
        >
          {headerContent.heading}
        </h1>
      </div>
      {(headerContent.heading === "TODO APP" ||
        headerContent.heading === "Completed Tasks") && (
        <div style={iconContainerStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap:
                screenSize === "small"
                  ? ".55rem"
                  : screenSize === "medium"
                  ? ".65rem"
                  : ".75rem",
            }}
          >
            <FiSearch
              style={{ ...iconStyle, transition: "transform 0.2s ease-in-out" }}
              onClick={() => setSearchVisible(!searchVisible)}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.2)"; // Scale up to 1.2x on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"; // Reset scale on hover out
              }}
              data-tooltip-id="search"
              data-tooltip-content="search by title"
            />
            {searchVisible && (
              <input
                style={searchInputStyle}
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => updateSearchTerm(e.target.value)} // Update search term
                onFocus={{ border: "none !important" }}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap:
                screenSize === "small"
                  ? ".55rem"
                  : screenSize === "medium"
                  ? ".65rem"
                  : ".75rem",
            }}
          >
            <ReactTooltip
              id="search"
              place="bottom"
              effect="solid"
              type="info"
            />
            <SlCalender
              style={{
                ...iconStyle,
                paddingRight: "2px",
                transition: "transform 0.2s ease-in-out",
              }}
              onClick={() => setCalendarVisible(!calendarVisible)}
              data-tooltip-id="search"
              data-tooltip-content="search by date"
            />

            {calendarVisible && (
              <input
                type="date"
                value={formatDate(selectedDate)}
                onChange={(e) => updateSelectedDate(e.target.value)}
                onFocus={{ border: "none !important" }}
                style={{
                  transition: "width 0.3s ease, opacity 0.3s ease",
                  width:
                    screenSize === "small"
                      ? "6rem"
                      : screenSize === "medium"
                      ? "7rem"
                      : "8rem", // Animation width change
                  opacity: 1, // Fade in/out animation
                  padding: "5px",
                  marginLeft: "0px",
                  border: "none",
                  borderRadius: "5px",
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Media Query Styles */}
    </header>
  );
};

export default Header;
