import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const { isLoading: isFetchingUser, error: userError } = useQuery("currentUser", async () => {
    const response = await fetch("https://your-breeze-api.com/users/current", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setUser(data);
    return data;
  });

  const {
    mutate: login,
    isLoading: isLoggingIn,
    error: loginError
  } = useMutation(
    async (credentials) => {
      const response = await fetch("https://your-breeze-api.com/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser(data.user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("currentUser");
      }
    }
  );

  const {
    mutate: logout,
    isLoading: isLoggingOut,
    error: logoutError
  } = useMutation(
    async () => {
      const response = await fetch("https://your-breeze-api.com/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      localStorage.removeItem("token");
      setUser(null);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("currentUser");
      }
    }
  );

  return {
    user,
    isFetchingUser,
    userError,
    login,
    isLoggingIn,
    loginError,
    logout,
    isLoggingOut,
    logoutError
  };
};
