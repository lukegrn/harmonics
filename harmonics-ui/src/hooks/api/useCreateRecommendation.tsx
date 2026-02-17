import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CreateRecommendationRequest } from "../../types/requests";

export const useCreateRecommendation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: CreateRecommendationRequest) => {
      return axios.post("/api/recommendations", req);
    },
    onSuccess: (_, req) => {
      queryClient.invalidateQueries({ queryKey: ["bands"] });
      queryClient.invalidateQueries({ queryKey: ["band", req.a] });
      queryClient.invalidateQueries({ queryKey: ["band", req.b] });

      // This may create a new category
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
