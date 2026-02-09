import { Button, Group, Loader, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateBand } from "../../hooks/api/useCreateBand";

interface CreateBandProps {
  onSuccess: () => void;
}

export const CreateBand = ({ onSuccess }: CreateBandProps) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      genres: [],
    },
  });

  const mutation = useCreateBand();

  const submit = () => {
    mutation.mutate(form.getValues(), { onSuccess });
  };

  return (
    <>
      <TextInput
        {...form.getInputProps("name")}
        label="Name"
        placeholder="Name"
      />
      <TextInput label="Genre tags" placeholder="Genres" />
      <Space h="md" />
      <Group justify="flex-end">
        <Button disabled={mutation.isPending} onClick={submit}>
          {mutation.isPending ? <Loader color="teal" /> : "Create Band"}
        </Button>
      </Group>
    </>
  );
};
