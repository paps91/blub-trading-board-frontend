import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./api-client";

interface TradingVolumeResponse {
  username: string | null;
  display_name: string | null;
  profile_image_url: string | null;
  balance: string;
  volume_in: string;
  volume_out: string;
  trading_points: string;
  transfer_count: number;
  presale_type: string[];
  wallet_addresses: string[];
}

// Interface pour les volumes de trading par adresse
interface AddressTradingVolumeResponse {
  id: number;
  wallet_address: string;
  balance: string;
  volume_in: string;
  volume_out: string;
  trading_points: string;
  transfer_count: number;
  presale_type: string;
  created_at: string;
  updated_at: string;
  username?: string | null;
  display_name?: string | null;
  profile_image_url?: string | null;
}

export const useTradingVolumes = () => {
  return useQuery<TradingVolumeResponse[], Error>({
    queryKey: ["tradingVolumes"],
    queryFn: async () => {
      try {
        const data = await apiClient.get("/api/trading-volumes/");
        console.log("Data received:", data);
        return data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
  });
};

export const useWalletTradingVolumes = (walletAddress: string | null) => {
  return useQuery<AddressTradingVolumeResponse[], Error>({
    queryKey: ["walletTradingVolumes", walletAddress],
    queryFn: async () => {
      if (!walletAddress) {
        return [];
      }

      try {
        const data = await apiClient.get(`/api/trading-volumes/${walletAddress}`);
        console.log("Wallet volumes data received:", data);
        return data;
      } catch (error) {
        console.error("Error fetching wallet trading volumes:", error);
        throw error;
      }
    },
    enabled: !!walletAddress,
  });
};
