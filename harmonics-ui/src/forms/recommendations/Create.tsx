import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Autocomplete,
  Button,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCreateRecommendation } from "../../hooks/api/useCreateRecommendation";
import { useListBands } from "../../hooks/api/useListBands";
import { useListCategories } from "../../hooks/api/useListCategories";
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

  const { data: bands, isLoading: areBandsLoading } = useListBands({});
  const { data: categories, isLoading: areCategoriesLoading } =
    useListCategories();

  const mutation = useCreateRecommendation();
  const submit = () => {
    const value = form.getValues();
    mutation.mutate(value, { onSuccess });
  };

  if (areBandsLoading || areCategoriesLoading)
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
          description={
            <Group>
              <Text size="xs">
                Pick a band from the list, or click the + to add a new one
              </Text>
            </Group>
          }
          data={bands
            ?.map((b) => b.name)
            .filter(
              (n) =>
                n != band?.name &&
                (!band?.recommendations ||
                  band?.recommendations?.findIndex((r) => r.band.name == n) ==
                    -1),
            )}
          searchable
        />
        <Stack>
          <Tooltip
            multiline
            w={200}
            label="If you don't see the band you want here, it either doesn't exist or has already been recommended. If it has already been recommended, go add your vouch for it!"
          >
            <Text ta="center">
              <FontAwesomeIcon icon={faCircleQuestion} />
            </Text>
          </Tooltip>
          <Button onClick={open}>+</Button>
        </Stack>
      </Group>

      <Autocomplete
        label="Because of their: "
        placeholder="Pick a reason or type your own"
        data={categories?.map((c) => c.name) || []}
        {...form.getInputProps("category")}
      />

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
