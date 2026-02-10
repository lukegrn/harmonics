import { FileWithPath } from "@mantine/dropzone";

export interface Band {
  name: string;
  genres: string[];
  img?: FileWithPath;
}
