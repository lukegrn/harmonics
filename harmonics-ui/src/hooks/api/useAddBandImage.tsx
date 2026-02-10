import { FileWithPath } from "@mantine/dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddBandImage = () => {
  return useMutation({
    mutationFn: ({ f, name }: { f: FileWithPath; name: string }) =>
      axios.postForm(`/api/bands/${name}/img`, { img: f }),
  });
};
