import {
  faCheckCircle,
  faImage,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Center,
  Divider,
  Group,
  Loader,
  Space,
  TagsInput,
  Text,
  TextInput,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useAddBandImage } from "../../hooks/api/useAddBandImage";
import { useCreateBand } from "../../hooks/api/useCreateBand";
import { useListGenres } from "../../hooks/api/useListGenres";
import { BandProfileCropper } from "./BandProfileCropper";

interface CreateBandProps {
  onSuccess: () => void;
}

export const CreateBand = ({ onSuccess }: CreateBandProps) => {
  const form = useForm<{ name: string; genres: string[] }>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      genres: [],
    },
  });

  const [originalFile, setOriginalFile] = useState<FileWithPath>();
  const [croppedFile, setCroppedFile] = useState<File>();
  const mutation = useCreateBand();
  const addImage = useAddBandImage();
  const { data: genres, isLoading: areGenresLoading } = useListGenres();

  const submit = () => {
    const value = form.getValues();
    mutation.mutate(
      {
        name: value.name,
        genres: value.genres.map((name) => ({ name, bands: [] })),
        recommendations: [],
      },
      {
        onSuccess: () => {
          if (croppedFile) {
            addImage.mutate({ f: croppedFile, name: value.name });
          }

          onSuccess();
        },
      },
    );
  };

  if (areGenresLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      {!originalFile && (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={(f) => setOriginalFile(f[0])}
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
      )}

      {originalFile && (
        <>
          <BandProfileCropper
            file={originalFile}
            setCroppedFile={setCroppedFile}
          />
          <Space h="md" />
        </>
      )}
      <TextInput
        {...form.getInputProps("name")}
        label="Name"
        placeholder="Name"
      />
      <TagsInput
        label="Genres"
        placeholder="Pick a genre from the list, or add a new one"
        data={genres?.map((g) => g.name)}
        {...form.getInputProps("genres")}
      />

      <Divider my="md" />

      <Group justify="flex-end">
        <Button disabled={mutation.isPending} onClick={submit}>
          {mutation.isPending ? <Loader color="teal" /> : "Create Band"}
        </Button>
      </Group>
    </>
  );
};
