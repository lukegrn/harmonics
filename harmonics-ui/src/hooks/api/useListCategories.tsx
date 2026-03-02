import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Category } from "../../types/category";

const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get("/api/categories");
  return res.data;
};

export const useListCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
