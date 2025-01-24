/* eslint-disable react/prop-types */
import { useEffect } from "react";
import TodoItem from "./TodoItem";
import FixedBottomBar from "./FixedBottomBar";
import { useHeader } from "../HeaderContext";

const CompletedTodos = ({ todos, filter, setFilter }) => {
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      heading: "Completed Tasks",
      icon: null,
    });
  }, [setHeaderContent]);
  return (
    <div
      style={{
        flexGrow: 1,
        overflowY: "auto",
        width: "100%",
        padding: "10px",
        backgroundColor: "#D6D7EF",
      }}
    >
      {todos.length === 0 ? (
        <p>No completed tasks to show.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            date={todo.date}
            title={todo.title}
            subtitle={todo.subtitle}
            completed={todo.completed}
            // No handlers for edit/delete here unless needed
          />
        ))
      )}
      <FixedBottomBar filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default CompletedTodos;
