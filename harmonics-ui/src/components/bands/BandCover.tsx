import { Badge, Card, Group, Image, Space, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { Band } from "../../types/band";

interface BandCoverProps {
  band: Band;
}

export const BandCover = ({ band }: BandCoverProps) => {
  const navigate = useNavigate();
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={() => navigate(`../${band.name}`)}
    >
      <Card.Section>
        <Image src={`/static/${band.name}`} height={160} alt={band.name} />
      </Card.Section>

      <Space h="xs" />

      <Text td="underline" fw={500}>
        {band.name}
      </Text>

      {band.genres.length != 0 && (
        <>
          <Space h="xs" />
          <Group gap="xs">
            {band.genres.map((g) => (
              <Badge>{g.name}</Badge>
            ))}
          </Group>
        </>
      )}
    </Card>
  );
};
