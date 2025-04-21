import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddTaskModal = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const handleSubmit = () => {
    if (title.trim()) {
      onSave({ title, description, status });
      setTitle("");
      setDescription("");
      setStatus("todo");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Add New Task</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="inprogress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 1, borderRadius: 2, py: 1 }}
        >
          Save Task
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
