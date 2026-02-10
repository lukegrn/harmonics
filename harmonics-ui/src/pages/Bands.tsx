import { Button, Group, Modal, Space, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { BandsTable } from "../components/bands/BandsTable";
import { CreateBand } from "../forms/bands/Create";
import { usePrefetchListGenres } from "../hooks/api/useListGenres";

export const Bands = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // Prefetch genres, as they are likely to be used and rarely change
  usePrefetchListGenres();

  return (
    <>
      <Group justify="space-between">
        <Title order={2}>All Bands</Title>
        <Button onClick={open}>Create Band</Button>
      </Group>

      <Space h="md" />

      <BandsTable />

      <Modal opened={opened} onClose={close} title="Create Band" centered>
        <CreateBand onSuccess={() => close()} />
      </Modal>
    </>
  );
};
