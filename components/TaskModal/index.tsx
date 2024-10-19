"use client";
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useCreateTodoMutation, useUpdateTodoMutation } from "@/store/todo";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TaskModalProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
}

const TaskModal = ({ task, onSave, onClose }: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted || false);

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!title.trim() || !dueDate) return;

    const newTask: Task = {
      id: task?.id || uuidv4(),
      title,
      description,
      dueDate,
      isCompleted,
      createdAt: task?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (task) {
        await updateTodo({
          ...newTask,
        }).unwrap();
      } else {
        await createTodo(newTask).unwrap();
      }

      onSave(newTask);
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {task ? "Edit Task" : "Create Task"}
        </Typography>

        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="standard"
          margin="normal"
          required
        />

        <TextField
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="standard"
          margin="normal"
        />

        <TextField
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          variant="standard"
          margin="normal"
          required
          InputProps={{
            inputProps: {
              min: today,
            },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
          }
          label="Mark as Completed"
          sx={{ mt: 2 }}
        />

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={
              !title.trim() || !dueDate || new Date(dueDate) < new Date(today)
            }
          >
            {task ? "Update Task" : "Save Task"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
