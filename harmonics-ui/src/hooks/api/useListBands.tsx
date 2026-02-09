import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Band } from "../../types/band";

const fetchBands = async (): Promise<Band[]> => {
  const res = await axios.get("/api/bands");
  return res.data;
};

export const useListBands = () => {
  return useQuery({
    queryKey: ["bands"],
    queryFn: fetchBands,
  });
};
