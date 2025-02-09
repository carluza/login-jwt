import React, { useState } from "react";

export const App = () => {
  const [tasks, setTasks] = useState([
    "Walk the dog",
    "Pay the taxes",
    "Go on vacation",
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>My Todos</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </li>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <i
              className="fa-solid fa-trash"
              onClick={() => removeTask(index)}
            ></i>
          </li>
        ))}
      </ul>
      <div>{tasks.length} Tasks</div>
    </div>
  );
};
