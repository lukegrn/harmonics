import { TagsInput } from "@mantine/core";
import { Genre } from "../../types/genre";

interface GenreSearchProps {
  genres: Genre[];
  setGenreFilters: (g: string[]) => void;
}

export const GenreSearch = ({ genres, setGenreFilters }: GenreSearchProps) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <TagsInput
        placeholder="Filter by genres"
        data={genres.map((g) => g.name)}
        onChange={setGenreFilters}
        clearable
      />
    </div>
  );
};
