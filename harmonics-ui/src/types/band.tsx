import { FileWithPath } from "@mantine/dropzone";
import { Genre } from "./genre";

export interface Band {
  name: string;
  genres: Genre[];
  img?: FileWithPath;
  recommendations: Band[];
}
