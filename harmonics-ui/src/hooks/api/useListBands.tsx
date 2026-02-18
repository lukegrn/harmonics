import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Band } from "../../types/band";

const fetchBands = async (
  name?: string,
  genreFilters?: string[],
): Promise<Band[]> => {
  const queryParams = new URLSearchParams();

  if (name && typeof name == "string") queryParams.append("name", name);
  if (genreFilters && typeof genreFilters != "string") {
    genreFilters.forEach((g) => queryParams.append("genre", g));
  }

  const url = `/api/bands?${queryParams}`;
  const res = await axios.get(url);
  return res.data;
};

interface useListBandQueryOpts {
  name?: string;
  genreFilters?: string[];
}

export const useListBands = ({ name, genreFilters }: useListBandQueryOpts) => {
  return useQuery({
    queryKey: ["bands", name, genreFilters],
    queryFn: async ({ queryKey }) =>
      fetchBands(
        queryKey[1] as string | undefined,
        queryKey[2] as string[] | undefined,
      ),
  });
};
