/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import TodoItem from "./TodoItem";
import FixedBottomBar from "./FixedBottomBar";
import AddTodoForm from "./AddTodoForm"; // Import the form component
import { IoArrowBack } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { useHeader } from "../HeaderContext";
import EditTodoForm from "./EditTodoForm";
import CompletedTodos from "./CompletedTodos";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const TodoBody = ({ searchTerm, selectedDate }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all' or 'completed'
  const [editTodo, setEditTodo] = useState(null); // State to store the todo to be edited
  const [currentView, setCurrentView] = useState("todoBody");
  const { setHeaderContent } = useHeader();

  // Use useCallback to memoize `setHeaderContent`
  const updateHeader = useCallback(() => {
    // Check the current view and filter state
    if (currentView === "todoBody") {
      if (filter === "all") {
        setHeaderContent({
          heading: "TODO APP",
          icon: null, // No icon for the "all" filter
        });
      } else if (filter === "completed") {
        setHeaderContent({
          heading: "Completed Tasks",
          icon: null, // Optionally, you can set an icon here if needed
        });
      }
    } else if (currentView === "addTodoForm") {
      setHeaderContent({
        heading: "Add Task",
        icon: (
          <IoArrowBack
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentView("todoBody")} // Navigate back to the main view
          />
        ),
      });
    } else if (currentView === "editTodoForm") {
      setHeaderContent({
        heading: "Edit Task",
        icon: (
          <IoArrowBack
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentView("todoBody")} // Navigate back to the main view
          />
        ),
      });
    }
  }, [currentView, filter, setHeaderContent]);

  // Effect to update the header whenever the view changes
  useEffect(() => {
    updateHeader();
  }, [updateHeader]);

  // Update the header content immutably
  const handleAddTodo = (newTodo) => {
    const todoWithId = { ...newTodo, id: uuidv4(), completed: false }; // Add unique ID and completed status
    setTodos((prevTodos) => [...prevTodos, todoWithId]);
    setCurrentView("todoBody"); // Go back to the main view
  };
  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setCurrentView("todoBody"); // Go back to the main view
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoToEdit); // Set the todo item for editing
    setCurrentView("editTodoForm"); // Switch to the edit view
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

  // Adjust filteredTodos logic
  const filteredTodos = todos.filter((todo) => {
    const matchesSearchTerm = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || todo.date === selectedDate;
    return matchesSearchTerm && matchesDate;
  });

  const completedTodos = filteredTodos.filter((todo) => todo.completed);
  const activeTodos = filteredTodos.filter((todo) => !todo.completed);

  const todoBodyStyle = {
    flexGrow: 1,
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#D6D7EF",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const addButtonStyle = {
    position: "fixed",
    bottom: "20%",
    right: "8%",

    width: "65px",
    height: "65px",
    borderRadius: "50%",
    backgroundColor: "#9395D3", // Brighter purple for visibility
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
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
    <div style={todoBodyStyle}>
      {activeTodos.length > 0 ? (
        activeTodos.map((todo) => (
          <TodoItem
            date={todo.date}
            key={todo.id}
            title={todo.title}
            detail={todo.detail}
            subtitle={todo.subtitle}
            completed={todo.completed} // Pass the actual completion status
            onEdit={() => handleEdit(todo.id)}
            onDelete={() => handleDelete(todo.id)}
            onComplete={() => handleComplete(todo.id)} // Add complete handler
          />
        ))
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
          No tasks available.
          <br />
          Add a new task to{" "}
          <span style={{ color: "#FF6B6B", fontWeight: "700" }}>
            GET STARTED !
          </span>
        </p>
      )}

      <FixedBottomBar filter={filter} setFilter={setFilter} />
      {/* Floating Add Button */}
      <div
        style={addButtonStyle}
        onClick={() => setCurrentView("addTodoForm")}
        data-tooltip-id="add"
        data-tooltip-content="add new task"
      >
        +
      </div>
      <ReactTooltip
        id="add"
        place="top"
        effect="solid"
        type="info"
        fontSize={"8px"}
      />

      {/* Show Add Todo Form */}
      {/* {showForm && (
        <AddTodoForm
          onCancel={() => setShowForm(false)}
          onSubmit={handleAddTodo}
        />
      )} */}
      {/* Show Edit Todo Form */}
      {editTodo && (() => setCurrentView("editTodoForm"))}
    </div>
  );
};

export default TodoBody;
