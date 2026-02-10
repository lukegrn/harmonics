import {
  faCheckCircle,
  faImage,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Group,
  Image,
  Loader,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useState } from "react";
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

  const [file, setFile] = useState<FileWithPath>();
  const mutation = useCreateBand();

  const submit = () => {
    mutation.mutate({ ...form.getValues(), img: file }, { onSuccess });
  };

  const Preview = () => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      return (
        <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />
      );
    }

    return <></>;
  };

  return (
    <>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={(f) => setFile(f[0])}
        multiple={false}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <FontAwesomeIcon icon={faCheckCircle} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <FontAwesomeIcon icon={faXmarkCircle} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <FontAwesomeIcon icon={faImage} size="2xl" />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Upload a photo to help identify the band
            </Text>
          </div>
        </Group>
      </Dropzone>

      {file && (
        <>
          <Preview />
          <Space h="md" />
        </>
      )}
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
