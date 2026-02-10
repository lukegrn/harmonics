import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Band } from "../../types/band";

export const useCreateBand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (band: Band) => {
      return axios.postForm("/api/bands", band);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bands"] });
    },
  });
};
