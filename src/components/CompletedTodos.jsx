/* eslint-disable react/prop-types */
import { useEffect } from "react";
import TodoItem from "./TodoItem";
import FixedBottomBar from "./FixedBottomBar";
import { useHeader } from "../HeaderContext";
import { useDateSearch } from "../DateSearchContext";
const CompletedTodos = ({ todos, filter, setFilter }) => {
  const { setHeaderContent } = useHeader();
  const { searchTerm, selectedDate } = useDateSearch();
  useEffect(() => {
    setHeaderContent({
      heading: "Completed Tasks",
      icon: null,
    });
  }, [setHeaderContent]);

  const filteredTodos =
    searchTerm || selectedDate
      ? todos.filter((todo) => {
          const matchesSearchTerm = todo.title
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase());
          const matchesDate = !selectedDate || todo.date === selectedDate;
          return matchesSearchTerm && matchesDate;
        })
      : todos;
  return (
    <>
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          width: "100%",
          padding: "10px",
          backgroundColor: "#D6D7EF",
        }}
      >
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              date={todo.date}
              detail={todo.detail}
              title={todo.title}
              subtitle={todo.subtitle}
              completed={todo.completed}
              // No handlers for edit/delete here unless needed
            />
          ))
        ) : searchTerm === "" && selectedDate === "" ? (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "black",
              fontSize: "22px",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            No tasks completed yet.
            <br />
            Stay motivated and finish your{" "}
            <span style={{ color: "#4A4C8D", fontWeight: "700" }}>
              first one!
            </span>
          </p>
        ) : (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "black",
              fontSize: "22px",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            No results found for{" "}
            <span style={{ color: "#4A4C8D", fontWeight: "700" }}>
              {searchTerm}{" "}
            </span>{" "}
            {searchTerm != "" && selectedDate != "" ? <span>& </span> : ""}
            <span style={{ color: "#4A4C8D", fontWeight: "700" }}>
              {selectedDate}
            </span>
          </p>
        )}
      </div>
      <FixedBottomBar filter={filter} setFilter={setFilter} />
    </>
  );
};

export default CompletedTodos;
