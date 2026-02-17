import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Band } from "../../types/band";

const fetchBand = async (name: string): Promise<Band> => {
  const res = await axios.get(`/api/bands/${name}`);
  return res.data;
};

export const useShowBand = (name: string) => {
  return useQuery({
    queryKey: ["band", name],
    queryFn: ({ queryKey }) => fetchBand(queryKey[1]),
  });
};
