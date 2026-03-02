import { Card, Image, Space, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { Band } from "../../types/band";
import { Category } from "../../types/category";
import { CategoryTags } from "../categories/CategoryTags";
import { GenreTags } from "../genres/GenreTags";

interface BandCoverProps {
  band: Band;
  categories?: Category[];
}

export const BandCover = ({ band, categories }: BandCoverProps) => {
  const navigate = useNavigate();
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={() => navigate(`/bands/${band.name}`)}
    >
      <Card.Section>
        <Image
          src={`/static/${band.name}`}
          h="100%"
          alt={band.name}
          fallbackSrc={`https://placehold.co/600x600?text=${band.name}`}
        />
      </Card.Section>

      <Space h="xs" />

      <Text td="underline" fw={500}>
        {band.name}
      </Text>

      <GenreTags genres={band.genres || []} />

      {categories && <CategoryTags categories={categories} />}
    </Card>
  );
};
