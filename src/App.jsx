import React, { useState } from "react";
import Header from "./components/Header";
import TodoBody from "./components/TodoBody";
import { HeaderProvider } from "./HeaderContext";
function App() {
  // const [headerContent, setHeaderContent] = useState({
  //   title: "TODO APP",
  //   icon: "✅", // Default icon
  // });

  const [searchTerm, setSearchTerm] = useState(""); // State to manage the search term
  const [searchVisible, setSearchVisible] = useState(false); // State to manage the search visibility
  const [selectedDate, setSelectedDate] = useState("");
  // Handler to toggle search input visibility
  const onSearchToggle = () => setSearchVisible(!searchVisible);
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchTerm(""); // Clear search when closing the input
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
        }}
      >
        <HeaderProvider>
          <Header
            searchVisible={searchVisible}
            onSearchToggle={toggleSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <TodoBody selectedDate={selectedDate} searchTerm={searchTerm} />
        </HeaderProvider>
      </div>
    </>
  );
}

export default App;
