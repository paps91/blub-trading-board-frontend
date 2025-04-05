import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api-client";

export const useStartTwitterAuth = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        return await apiClient.get("/auth/twitter/start");
      } catch (error) {
        console.error("X auth error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log(data, "data");
      window.location.href = data.auth_url;
    },
    onError: (error) => {
      console.error("X auth error:", error);
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        console.log("Envoi de la requête à /auth/user");
        return await apiClient.get("/auth/user");
      } catch (error) {
        console.error("Error during request:", error);
        return { authenticated: false };
      }
    },
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await apiClient.post("/auth/logout", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Error during logout:", error);
    },
  });
};