import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";
import { DragDropContext } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "kanban-tasks";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  const [columns, setColumns] = useState(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : { todo: [], inprogress: [], done: [] };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const handleAddTask = (task) => {
    const newTask = { ...task, id: uuidv4() };

    setColumns((prev) => {
      const updatedColumns = { ...prev, [task.status]: [...prev[task.status], newTask] };
      return updatedColumns;
    });
  };

  const handleDeleteTask = (taskId) => {
    setColumns((prev) => {
      const updatedColumns = { ...prev };
      Object.keys(updatedColumns).forEach((col) => {
        updatedColumns[col] = updatedColumns[col].filter((task) => task.id !== taskId);
      });

      return updatedColumns;
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      const newTasks = Array.from(columns[sourceCol]);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);
      setColumns((prev) => {
        const updatedColumns = { ...prev, [sourceCol]: newTasks };
        return updatedColumns;
      });
    } else {
      const sourceTasks = Array.from(columns[sourceCol]);
      const destTasks = Array.from(columns[destCol]);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.status = destCol;
      destTasks.splice(destination.index, 0, movedTask);
      setColumns((prev) => {
        const updatedColumns = {
          ...prev,
          [sourceCol]: sourceTasks,
          [destCol]: destTasks,
        };
        return updatedColumns;
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2e3c48" }}
        >
          Kanban Dashboard
        </Typography>
        <Button variant="contained" sx={{m:2}} onClick={() => setOpenModal(true)}>
          Add New Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: "flex", gap: 2, mt: 3, pr: { xs: 4, sm: 3, md: 0 }, flexDirection: { xs: "column", md: "row" } }}>
          <Column title="To Do" tasks={columns.todo} columnId="todo" onDelete={handleDeleteTask} />
          <Column title="In Progress" tasks={columns.inprogress} columnId="inprogress" onDelete={handleDeleteTask} />
          <Column title="Done" tasks={columns.done} columnId="done" onDelete={handleDeleteTask} />
        </Box>
      </DragDropContext>

      <AddTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(task) => {
          handleAddTask(task);
          setOpenModal(false);
        }}
      />
    </Box>
  );
};

export default Dashboard;
