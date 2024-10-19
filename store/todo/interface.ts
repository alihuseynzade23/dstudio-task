export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoCreatePayload {
  title: string;
  description: string;
  dueDate: string;
}

export interface TodoUpdatePayload {
  id: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: string;
}
