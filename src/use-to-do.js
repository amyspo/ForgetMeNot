import useSWR from "swr";
import { fetcher, sendDelete } from "./to-do-api";

export function useTodos(view) {
  if (view === undefined || view === "undefined") {
    view = "open";
  }

  const ENDPOINT = `/api/todos/${view}`;

  const { data, isLoading, error, mutate } = useSWR(ENDPOINT, fetcher);

  async function createTodo(title, dueDate) {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });

      if (response.ok) {
        const json = await response.json();

        try {
          if (json.id) {
            console.log(json);
            const todoId = json.id;
            const dateResponse = await fetch(`/api/todos/${todoId}/due-date`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                dueDate: dueDate,
              }),
            });
            if (dateResponse.ok) {
              console.log("success");
              mutate();
            }
          } else {
            console.log("error1");
          }
        } catch {
          console.log("error2");
        }
      }
    } catch {
      console.log("error3");
    }
    mutate();
  }

  async function editTodo(newTitle, identifier) {
    try {
      const response = await fetch(`/api/todos/${identifier}/rename`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle: newTitle,
        }),
      });

      const json = await response.json();

      if (json.id) {
        console.log("success");
      } else {
        console.log("error4");
      }
    } catch {
      console.log("error5");
    }
  }

  async function editedDate(newDate, identifier) {
    if (newDate === "" || newDate === undefined) {
      try {
        const response = await fetch(`/api/todos/${identifier}/due-date`, {
          method: "DELETE",
        });

        const json = await response.json();

        if (json.id) {
          console.log("success");
        } else {
          console.log("error6");
        }
      } catch {
        console.log("error7");
      }
    } else {
      try {
        const response = await fetch(`/api/todos/${identifier}/due-date`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dueDate: newDate,
          }),
        });

        const json = await response.json();

        if (json.id) {
          console.log("success");
        } else {
          console.log("error8");
        }
      } catch {
        console.log("error9");
      }
    }
  }

  async function deleteTodo(identifier) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      await sendDelete(identifier);
      mutate();
    } catch {
      console.log("error with deletetodo");
    }
    mutate();
  }

  async function completeTodo(identifier) {
    const confirmed = window.confirm(
      "Are you sure you want to mark this task as complete?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/todos/${identifier}/complete`, {
        method: "POST",
      });

      const json = await response.json();

      if (json.id) {
        console.log("success");
      } else {
        console.log("error10");
      }
    } catch {
      console.log("error11");
    }
    mutate();
  }

  return {
    data,
    isLoading,
    error,
    createTodo,
    editTodo,
    deleteTodo,
    editedDate,
    completeTodo,
  };
}
