import React from "react";
import { Todo } from "../../../../typings";
import { notFound } from "next/navigation";

export const dynamicParams = true;

type PageProps = {
  params: {
    todoId: string;
  };
};

// This is doing the same job as SSR - if you run npm run build you can see that it's being rendered server-side at runtime
const fetchTodoById = async (todoId: string) => {
  const response = await fetch(
    // if we want to force SSR - then use no cache
    // if we want static site generation - then use cache: "force-cache"
    // if we want isr / revalidate - then use {next: { revalidate: 10 }}
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    // After using pre-rendering, at the bottom of page, we use ISR
    { next: { revalidate: 60 } }
  );
  const todo: Todo = await response.json();
  return todo;
};

async function TodoPage({ params: { todoId } }: PageProps) {
  // todoId prop comes from [todoId]
  const todo = await fetchTodoById(todoId);

  if (!todo.id) {
    return notFound();
  }

  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>Completed: {todo.completed ? "Yes" : "No"} </p>

      <p className="border-t border-black mt-5 text-right">
        By user: {todo.userId}
      </p>
    </div>
  );
}

export default TodoPage;

// use this function to pre-render the rest of the static paths
export async function generateStaticParams() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await response.json();

  // remove 10 elements at index 0
  const trimmedTodos = todos.splice(0, 10);

  return trimmedTodos.map((todo) => ({
    todoId: todo.id.toString(),
  }));

  // [{ todoId: "1" }, { todoId: "2" }, ...]
}
