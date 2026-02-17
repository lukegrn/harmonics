import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Band } from "../../types/band";

const fetchBands = async (name?: string): Promise<Band[]> => {
  const url = `/api/bands${name ? `?name=${name}` : ""}`;
  const res = await axios.get(url);
  return res.data;
};

export const useListBands = (name?: string) => {
  return useQuery({
    queryKey: ["bands", name],
    queryFn: ({ queryKey }) => fetchBands(queryKey[1]),
  });
};
