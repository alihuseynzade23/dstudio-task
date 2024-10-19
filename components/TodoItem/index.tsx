import { Button, Card, CardContent, Typography, Box } from "@mui/material";

interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  onComplete: (id: string) => void;
  onEdit: (task: { id: string; title: string; description: string; dueDate: string; isCompleted: boolean }) => void;
}
const TodoItem = ({
  id,
  title,
  description,
  dueDate,
  isCompleted,
  onEdit,
}: TodoItemProps) => {
  const formattedDueDate = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          Due Date: {formattedDueDate}
        </Typography>
        <Typography variant="body2" color={isCompleted ? "green" : "red"}>
          Status: {isCompleted ? "Completed" : "Not Completed"}
        </Typography>

        <Box mt={2} sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" color="primary" onClick={() => onEdit({ id, title, description, dueDate, isCompleted })}>
            Edit Task
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};


export default TodoItem;
