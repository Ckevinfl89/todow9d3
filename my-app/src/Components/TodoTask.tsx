import { ITask } from "../Interfaces";
import { useState } from "react";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
  editTask(taskNameToEdit: string, newTaskName: string): void;
}

const TodoTask = ({ task, completeTask, editTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.taskName);

  const handleEdit = () => {
    editTask(task.taskName, newTaskName);
    setIsEditing(false);
  };

  return (
    <div className="task">
      <div className="content">
        {isEditing ? (
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        ) : (
          <>
            <span>{task.taskName}</span>
            <span>{task.deadline}</span>
          </>
        )}
      </div>
      <button
        onClick={() => {
          completeTask(task.taskName);
        }}
      >
        X
      </button>
      {isEditing ? (
        <button onClick={handleEdit}>Submit</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
};

export default TodoTask;