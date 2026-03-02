import { Badge, Group, Space } from "@mantine/core";
import { Category } from "../../types/category";

interface CategoryTagsProps {
  categories: Category[];
}

export const CategoryTags = ({ categories }: CategoryTagsProps) => {
  return (
    (categories.length != 0 && (
      <>
        <Space h="xs" />
        <Group gap="xs">
          {categories.map((g) => (
            <Badge color="orange">{g.name}</Badge>
          ))}
        </Group>
      </>
    )) || <></>
  );
};
