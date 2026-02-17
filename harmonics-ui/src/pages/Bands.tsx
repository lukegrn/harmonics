import { Button, Group, Modal, Space, Title } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { BandSearch } from "../components/bands/BandSearch";
import { BandsTable } from "../components/bands/BandsTable";
import { CreateBand } from "../forms/bands/Create";
import { useListBands } from "../hooks/api/useListBands";

export const Bands = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useDebouncedState("", 200);
  const { data: bands, isLoading, isError } = useListBands(search);

  return (
    <>
      <Group justify="space-between">
        <Group>
          <Title order={2}>All Bands</Title>
          <BandSearch setSearch={setSearch} />
        </Group>
        <Button onClick={open}>Create Band</Button>
      </Group>

      <Space h="md" />

      <BandsTable bands={bands || []} isLoading={isLoading} isError={isError} />

      <Modal opened={opened} onClose={close} title="Create Band" centered>
        <CreateBand onSuccess={() => close()} />
      </Modal>
    </>
  );
};
