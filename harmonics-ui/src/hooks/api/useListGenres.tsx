import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Genre } from "../../types/genre";

const fetchGenres = async (): Promise<Genre[]> => {
  const res = await axios.get("/api/genres");
  return res.data;
};

export const usePrefetchListGenres = async () => {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });
};

export const useListGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });
};
