// eslint-disable react/prop-types
import { useState, useEffect, useCallback } from "react";
import TodoItem from "./TodoItem";
import FixedBottomBar from "./FixedBottomBar";
import AddTodoForm from "./AddTodoForm";
import { IoArrowBack } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { useHeader } from "../HeaderContext";
import EditTodoForm from "./EditTodoForm";
import CompletedTodos from "./CompletedTodos";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useDateSearch } from "../DateSearchContext";
import { FaArrowLeft } from "react-icons/fa";
const TodoBody = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editTodo, setEditTodo] = useState(null);
  const [currentView, setCurrentView] = useState("todoBody");
  const { setHeaderContent } = useHeader();
  const { searchTerm, selectedDate, updateSearchTerm, updateSelectedDate } =
    useDateSearch();
  const [isMobile, setIsMobile] = useState(false);
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
  useEffect(() => {
    updateSearchTerm("");
    updateSelectedDate("");
  }, [filter]);
  const updateHeader = useCallback(() => {
    if (currentView === "todoBody") {
      setHeaderContent({
        heading: filter === "all" ? "TODO APP" : "Completed Tasks",
        icon: null,
      });
    } else {
      const heading = currentView === "addTodoForm" ? "Add Task" : "Edit Task";
      setHeaderContent({
        heading,
        icon: (
          <FaArrowLeft
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentView("todoBody")}
          />
        ),
      });
      updateSearchTerm("");
      updateSelectedDate("");
    }
  }, [currentView, filter, setHeaderContent]);

  useEffect(() => {
    updateHeader();
  }, [updateHeader]);

  const handleAddTodo = (newTodo) => {
    const todoWithId = { ...newTodo, id: uuidv4(), completed: false };
    setTodos((prevTodos) => [...prevTodos, todoWithId]);
    setCurrentView("todoBody");
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setCurrentView("todoBody");
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoToEdit);
    setCurrentView("editTodoForm");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Filter todos by searchTerm and selectedDate
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

  const completedTodos = todos.filter((todo) => todo.completed);
  const activeTodos = filteredTodos.filter((todo) => !todo.completed);

  const todoBodyStyle = {
    flexGrow: 1,
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#D6D7EF",
    width: "100%",
  };

  const addButtonStyle = {
    position: "fixed",
    bottom: isMobile ? "12%" : "20%",
    right: "8%",
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    backgroundColor: "#9395D3",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, .4)",
    fontSize: "36px",
    cursor: "pointer",
    zIndex: 2,
  };

  if (currentView === "addTodoForm") {
    return (
      <AddTodoForm
        onCancel={() => setCurrentView("todoBody")}
        onSubmit={handleAddTodo}
      />
    );
  }

  if (currentView === "editTodoForm") {
    return (
      <EditTodoForm
        todo={editTodo}
        onCancel={() => setCurrentView("todoBody")}
        onUpdate={handleUpdateTodo}
      />
    );
  }

  if (filter === "completed") {
    return (
      <CompletedTodos
        todos={completedTodos}
        filter={filter}
        setFilter={setFilter}
      />
    );
  }

  return (
    <>
      <div style={todoBodyStyle}>
        {activeTodos.length > 0 ? (
          activeTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              detail={todo.detail}
              date={todo.date}
              subtitle={todo.subtitle}
              completed={todo.completed}
              onEdit={() => handleEdit(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onComplete={() => handleComplete(todo.id)}
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
              fontSize: isMobile ? "20px" : "24px",
              padding: isMobile ? "10px" : "20px",
              borderRadius: "8px",
            }}
          >
            No tasks available.
            <br />
            Add a new task to{" "}
            <span style={{ color: "#4A4C8D", fontWeight: "700" }}>
              GET STARTED!
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
              fontSize: isMobile ? "10px" : "20px",
              padding: isMobile ? "10px" : "20px",
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

        <div
          style={addButtonStyle}
          onClick={() => setCurrentView("addTodoForm")}
          data-tooltip-id="add"
          data-tooltip-content="Add new task"
        >
          +
        </div>
        <ReactTooltip id="add" place="top" effect="solid" type="info" />
      </div>
      <FixedBottomBar filter={filter} setFilter={setFilter} />
    </>
  );
};

export default TodoBody;
