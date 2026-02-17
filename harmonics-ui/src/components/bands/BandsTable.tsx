import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Center, Loader, SimpleGrid } from "@mantine/core";
import { Band } from "../../types/band";
import { BandCover } from "./BandCover";

interface BandsTableProps {
  bands: Band[];
  isError: boolean;
  isLoading: boolean;
}

export const BandsTable = ({ bands, isError, isLoading }: BandsTableProps) => {
  if (isError) {
    return (
      <Alert icon={<FontAwesomeIcon icon={faInfoCircle} />} color="red">
        Something went wrong listing bands, please refresh and try again.
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <SimpleGrid cols={4}>
      {bands?.map((band) => <BandCover band={band} />)}
    </SimpleGrid>
  );
};
