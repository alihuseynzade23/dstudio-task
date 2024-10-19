"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Grid2 as Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import TodoItem from "@/components/TodoItem";
import TaskModal from "../TaskModal";
import { useGetTodosMutation } from "@/store/todo";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}
const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const [getTodos, { isLoading }] = useGetTodosMutation();

  const fetchTodos = useCallback(async () => {
    try {
      const response = await getTodos().unwrap();
      setTasks(response);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, [getTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const openNewTaskModal = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  const openEditTaskModal = (task: Task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleSaveTask = (task: Task) => {
    if (currentTask) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === currentTask.id ? task : t))
      );
    } else {
      setTasks([...tasks, task]);
    }
    setShowModal(false);
  };

  const markTaskAsCompleted = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: true } : task
      )
    );
  };

  return (
    <Box p={5}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <Button variant="contained" onClick={openNewTaskModal} sx={{ mb: 2 }}>
        Create New Task
      </Button>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid key={task.id}>
              <TodoItem
                {...task}
                onComplete={markTaskAsCompleted}
                onEdit={openEditTaskModal}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {showModal && (
        <TaskModal
          task={currentTask}
          onSave={handleSaveTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </Box>
  );
};

export default TodoList;
