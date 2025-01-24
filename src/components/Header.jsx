/* eslint-disable react/prop-types */
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FiSearch } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { useState } from "react";
import { useHeader } from "../HeaderContext";
const Header = ({
  onSearchToggle,
  searchTerm,
  setSearchTerm,
  searchVisible,
  setSelectedDate, // New prop for selecting date
}) => {
  const [calendarVisible, setCalendarVisible] = useState(false); // Toggle calendar visibility
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
    fontWeight: "700",
  };

  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    justifyContent: "center",
  };

  const iconStyle = {
    fontSize: "30px",
    cursor: "pointer",
    paddingRight: "10px",
  };

  const searchInputStyle = {
    transition: "width 0.3s ease, opacity 0.3s ease",
    width: "8rem", // Animation width change
    opacity: 1, // Fade in/out animation
    padding: "5px",
    marginLeft: "0px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "2px",
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate); // Set the selected date in the parent component
  };

  return (
    <header style={headerStyle}>
      <div style={titleStyle}>
        {headerContent.icon && ( 
          
          <span
            style={iconStyle}
            onClick={() => {}}
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
              fontSize={"8px"}
            />
        <h1>{headerContent.heading}</h1>
      </div>
      {(headerContent.heading === "TODO APP" ||
        headerContent.heading === "Completed Tasks") && (
        <div style={iconContainerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <FiSearch
              style={iconStyle}
              onClick={onSearchToggle}
              data-tooltip-id="search"
              data-tooltip-content="search by title"
            />
            {searchVisible && (
              <input
                style={searchInputStyle}
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <SlCalender
              style={iconStyle}
              onClick={() => setCalendarVisible(!calendarVisible)}
              data-tooltip-id="search"
              data-tooltip-content="search by date"
            />
            {calendarVisible && (
              <input
                type="date"
                onChange={handleDateChange}
                style={{
                  transition: "width 0.3s ease, opacity 0.3s ease",
                  width: "8rem", // Animation width change
                  opacity: 1, // Fade in/out animation
                  padding: "5px",
                  marginLeft: "0px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginBottom: "2px",
                }}
              />
            )}
            <ReactTooltip
              id="search"
              place="bottom"
              effect="solid"
              type="info"
              fontSize={"8px"}
            />
          </div>
        </div>
      )}

      {/* Media Query Styles */}
      <style>{`
        @media screen and (max-width: 485px) {
          header {
            padding: 10px 8px;
          }
          h1 {
            font-size: 14px;
          }
          .icon-container {
            gap: 5px;
          }
          .icon {
            font-size: 10px;
          }
            .searchInputStyle{ width: 2rem;
            font-size: 10px;
            }
          input {
            width: 2rem;
            font-size: 10px;
          }
        } 
           .titleStyle{
            gap: 5px;
            flexDirection: column;}
      `}</style>
    </header>
  );
};

export default Header;
