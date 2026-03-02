import { Genre } from "./genre";
import { Recommendation } from "./recommendation";

export interface Band {
  name: string;
  genres: Genre[];
  img?: File;
  recommendations: Recommendation[];
}
