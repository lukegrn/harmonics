import { Badge, Group, Space } from "@mantine/core";
import { Genre } from "../../types/genre";

interface GenreTagsProps {
  genres: Genre[];
}

export const GenreTags = ({ genres }: GenreTagsProps) => {
  return (
    (genres.length != 0 && (
      <>
        <Space h="xs" />
        <Group gap="xs">
          {genres.map((g) => (
            <Badge>{g.name}</Badge>
          ))}
        </Group>
      </>
    )) || <></>
  );
};
