import { Group, Image, Stack, Title } from "@mantine/core";
import { Band } from "../../types/band";
import { GenreTags } from "../genres/GenreTags";

interface BandOverviewProps {
  band: Band;
}

export const BandOverview = ({ band }: BandOverviewProps) => {
  return (
    <>
      <Group align="start">
        <Image
          src={`/static/${band.name}`}
          height={320}
          w={320}
          alt={band.name}
        />
        <Stack gap="xs">
          <Title order={2}>{band.name}</Title>
          <GenreTags genres={band.genres} />
        </Stack>
      </Group>
    </>
  );
};
