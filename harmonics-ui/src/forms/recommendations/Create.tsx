import {
  Button,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  Select,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCreateRecommendation } from "../../hooks/api/useCreateRecommendation";
import { useListBands } from "../../hooks/api/useListBands";
import { Band } from "../../types/band";
import { CreateBand } from "../bands/Create";

interface CreateProps {
  band?: Band;
  onSuccess: () => void;
}

export const Create = ({ band, onSuccess }: CreateProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<{ a: string; b: string; category: string }>({
    mode: "uncontrolled",
    initialValues: {
      a: band?.name || "",
      b: "",
      category: "",
    },
  });

  const { data: bands, isLoading: areBandsLoading } = useListBands();

  const mutation = useCreateRecommendation();
  const submit = () => {
    const value = form.getValues();
    mutation.mutate(value, { onSuccess });
  };

  if (areBandsLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  return (
    <>
      <TextInput
        {...form.getInputProps("a")}
        label="If you like"
        disabled={band?.name != undefined}
      />
      <Space h="xs" />
      <Group align="end" justify="space-between">
        <Select
          {...form.getInputProps("b", { type: "checkbox" })}
          label="You might also like"
          description="Pick a band from the list, or click the + to add a new one"
          data={bands
            ?.map((b) => b.name)
            .filter(
              (n) =>
                n != band?.name &&
                (!band?.recommendations ||
                  band?.recommendations?.findIndex((r) => r.name == n) == -1),
            )}
          searchable
        />
        <Button onClick={open}>+</Button>
      </Group>

      <Divider my="md" />

      <Group justify="flex-end">
        <Button disabled={mutation.isPending} onClick={submit}>
          {mutation.isPending ? <Loader color="teal" /> : "Add recommendation"}
        </Button>
      </Group>

      <Modal opened={opened} onClose={close} title="Create Band" centered>
        <CreateBand onSuccess={() => close()} />
      </Modal>
    </>
  );
};
