import React from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

const getColumnStyle = (columnId) => {
  switch (columnId) {
    case "todo":
      return {
        backgroundColor: "#FFF3E0",
        border: "2px solid #FB8C00",
        titleColor: "#FB8C00",
      };
    case "inprogress":
      return {
        backgroundColor: "#E3F2FD",
        border: "2px solid #1E88E5",
        titleColor: "#1E88E5",
      };
    case "done":
      return {
        backgroundColor: "#E8F5E9",
        border: "2px solid #43A047",
        titleColor: "#43A047",
      };
    default:
      return {};
  }
};

const Column = ({ title, tasks, columnId, onDelete  }) => {
  const columnStyles = getColumnStyle(columnId);
  const taskCount = tasks.length;

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        width: "100%",
        minHeight: "350px",
        borderRadius: 3,
        ...columnStyles,
        transition: "all 0.3s ease",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={columnStyles.titleColor}
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {taskCount} {taskCount === 1  ? "task" : "tasks"}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minHeight: "200px",
              backgroundColor: snapshot.isDraggingOver ? "#f5f5f5" : "transparent",
              p: 1,
              borderRadius: 2,
              transition: "background-color 0.2s ease-in-out",
            }}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index}  onDelete={onDelete}  />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default Column;
