import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api-client";

export const useLinkWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (walletAddress: string) => {
      console.log("Try to link wallet", walletAddress);

      const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
      console.log("Is address valid:", isValidAddress, walletAddress);

      if (!isValidAddress) {
        console.error("Address does not match required format");
        throw new Error("Invalid wallet address format");
      }

      try {
        return await apiClient.post("/api/wallet/link", { wallet_address: walletAddress });
      } catch (error) {
        console.error("Complete error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Wallet successfully linked", data);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["tradingVolumes"] });
    },
    onError: (error) => {
      console.error("Error while linking wallet", error);
    },
  });
};