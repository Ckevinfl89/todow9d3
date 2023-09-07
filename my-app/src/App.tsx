import React, { useState, useEffect } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';

function App() {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [flashMessage, setFlashMessage] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") setTask(event.target.value);
    if (event.target.name === "deadline") setDeadline(Number(event.target.value));
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
    setFlashMessage("Task added successfully!");
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => task.taskName !== taskNameToDelete));
    setFlashMessage("Task deleted successfully!");
  };

  const editTask = (taskNameToEdit: string, newTaskName: string): void => {
    setTodoList(
      todoList.map((task) =>
        task.taskName === taskNameToEdit ? { ...task, taskName: newTaskName } : task
      )
    );
    setFlashMessage("Task edited successfully!");
  };

  useEffect(() => {
    if (flashMessage !== "") {
      const timer = setTimeout(() => {
        setFlashMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      {flashMessage && <div className="flashMessage">{flashMessage}</div>}
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} editTask={editTask} />;
        })}
      </div>
    </div>
  );
}

export default App;