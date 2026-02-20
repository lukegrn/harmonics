import { Genre } from "./genre";

export interface Band {
  name: string;
  genres: Genre[];
  img?: File;
  recommendations: Band[];
}
