import {
  Button,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router";
import { BandCover } from "../components/bands/BandCover";
import { BandOverview } from "../components/bands/BandOverview";
import { Create } from "../forms/recommendations/Create";
import { useShowBand } from "../hooks/api/useShowBand";

export const Band = () => {
  const params = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: band,
    isLoading,
    isError,
    error,
  } = useShowBand(params.name || "");

  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (isError) {
    if (error.message.includes("404")) {
      return <Center>Whoops! Band "{params.name}" not found</Center>;
    }
    return <Center>Whoops! Something went wrong</Center>;
  }

  if (band)
    return (
      <>
        <Group align="start" justify="space-between">
          <BandOverview band={band} />
          <Button onClick={open}>Add recommendation</Button>
        </Group>

        <Divider my="xl" />

        {band.recommendations.length > 0 && (
          <>
            <Title order={3}>You might also like</Title>

            <Space h="md" />

            <SimpleGrid cols={4}>
              {band.recommendations.map((r) => (
                <BandCover band={r} />
              ))}
            </SimpleGrid>
          </>
        )}

        {band.recommendations.length == 0 && (
          <Center>
            <Text>No recommendations for this band, please add one!</Text>
          </Center>
        )}

        <Modal
          opened={opened}
          onClose={close}
          title="Add Recommendation"
          centered
        >
          <Create band={band} onSuccess={close} />
        </Modal>
      </>
    );

  return <></>;
};
