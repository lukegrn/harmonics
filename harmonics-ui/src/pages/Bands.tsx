import { Button, Group, Modal, Space, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BandsTable } from "../components/bands/BandsTable";
import { CreateBand } from "../forms/bands/Create";

export const Bands = () => {
  const [opened, { open, close }] = useDisclosure(false);

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
