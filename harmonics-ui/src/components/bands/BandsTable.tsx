import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Center, Loader, Text } from "@mantine/core";
import { useListBands } from "../../hooks/api/useListBands";

export const BandsTable = () => {
  const { data: bands, isLoading, isError } = useListBands();

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

  return <>{bands?.map((band) => <Text>{band.name}</Text>)}</>;
};
