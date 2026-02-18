import { Button, Group, Modal, Space, Title } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { BandSearch } from "../components/bands/BandSearch";
import { BandsTable } from "../components/bands/BandsTable";
import { GenreSearch } from "../components/genres/GenreSearch";
import { CreateBand } from "../forms/bands/Create";
import { useListBands } from "../hooks/api/useListBands";
import { useListGenres } from "../hooks/api/useListGenres";

export const Bands = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [nameSearch, setNameSearch] = useDebouncedState("", 200);
  const [genreFilters, setGenreFilters] = useState<string[]>([]);

  const {
    data: bands,
    isLoading,
    isError,
  } = useListBands({ name: nameSearch, genreFilters });
  const { data: genres } = useListGenres();

  return (
    <>
      <Group justify="space-between">
        <div style={{ flexGrow: 1 }}>
          <Group>
            <Title order={2}>All Bands</Title>
            <BandSearch setSearch={setNameSearch} />
            <GenreSearch
              genres={genres || []}
              setGenreFilters={setGenreFilters}
            />
          </Group>
        </div>
        <Space w="xl" />
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
