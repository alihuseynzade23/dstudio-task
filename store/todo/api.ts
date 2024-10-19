import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { Todo, TodoCreatePayload, TodoUpdatePayload } from "./interface";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  }),
  endpoints: (builder) => ({
    // Get all todos
    getTodos: builder.mutation<Todo[], void>({
      query: () => ({
        url: `Todos`,
        method: "GET",
      }),
    }),

    // Create a new todo
    createTodo: builder.mutation<Todo, TodoCreatePayload>({
      query: (todo) => ({
        url: `Todos`,
        method: "POST",
        body: todo,
      }),
    }),

    // Update an existing todo by ID
    updateTodo: builder.mutation<Todo, TodoUpdatePayload>({
      query: ({ id, ...todo }) => ({
        url: `Todos/${id}`,
        method: "PUT",
        body: todo,
      }),
    }),
  }),
});

export const {
  useGetTodosMutation,
  useCreateTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
