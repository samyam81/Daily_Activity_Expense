import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [Tasks, setTasks] = useState([]);
  const [TaskInput, setTaskInput] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(Tasks));
  }, [Tasks]);

  const addTask = () => {
    if (TaskInput.trim() === "") {
      return;
    }
    setTasks([...Tasks, { text: TaskInput, completed: false }]);
    setTaskInput("");
  };

  const deleteTask = (index) => {
    const newTasks = Tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleCompletion = (index) => {
    const newTasks = Tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>Daily Activity Tracker</h1>
      <input
        type="text"
        value={TaskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {Tasks.map((task, index) => (
          <li
            key={index}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            <span onClick={() => toggleCompletion(index)}>{task.text}</span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
