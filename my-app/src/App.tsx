import React, { FC, ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline  };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDealine(0);
    setFlashMessage('Task added successfully!');
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
    setFlashMessage('Task deleted successfully!');
  };

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 3000); // Clear the flash message after 3 seconds

      // Clear the timeout if the component is unmounted
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
      {flashMessage && <div className="flash-message">{flashMessage}</div>}
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
      
    </div>
  );
};

export default App;

