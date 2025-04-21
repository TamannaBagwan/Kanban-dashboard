import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskCard = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          variant="outlined"
          sx={{
            backgroundColor: snapshot.isDragging ? "#e3f2fd" : "#fdfdfd",
            cursor: "grab",
            boxShadow: snapshot.isDragging ? 6 : 1,
            borderLeft: `4px solid ${
              task.status === "todo"
                ? "#fb8c00"
                : task.status === "inprogress"
                ? "#1e88e5"
                : "#43a047"
            }`,
            transition: "all 0.2s ease-in-out",
            borderRadius: 2,
            "&:hover": {
              boxShadow: 3,
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                mb: 0.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {task.title}
              <IconButton
                onClick={() => onDelete(task.id)} 
                sx={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap" }}
            >
              {task.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
