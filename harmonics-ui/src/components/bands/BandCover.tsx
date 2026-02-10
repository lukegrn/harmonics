import { Card, Image, Space, Text } from "@mantine/core";
import { Band } from "../../types/band";

interface BandCoverProps {
  band: Band;
}

export const BandCover = ({ band }: BandCoverProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={`/static/${band.name}`} height={160} alt="Norway" />
      </Card.Section>

      <Space h="md" />
      <Text td="underline" fw={500}>
        {band.name}
      </Text>
    </Card>
  );
};
