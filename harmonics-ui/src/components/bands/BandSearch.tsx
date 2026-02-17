import { TextInput } from "@mantine/core";

interface BandSearchProps {
  search?: string;
  setSearch: (name: string) => void;
}

export const BandSearch = ({ search, setSearch }: BandSearchProps) => {
  return (
    <TextInput
      placeholder="Search band by name"
      value={search}
      onChange={(e) => {
        setSearch(e.currentTarget.value);
      }}
    />
  );
};
