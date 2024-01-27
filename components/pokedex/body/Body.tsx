"use client";
import { Select } from "../../ui/Select";
import { SearchInput } from "../../ui/Input";
import { ListPokemons } from "./ListPokemons";
import { listLimitsOptions } from "@/constants/list";
import { ButtonPagination } from "./ButtonPagination";
import { useListPokemons } from "@/hooks/usePokemon";

export const Body=()=> {
  const {updateLimit} = useListPokemons()
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end px-1">
        <Select
          listOptions={listLimitsOptions}
          onChange={(event) => updateLimit(+event.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <SearchInput />
      </div>
      <ListPokemons />
      <ButtonPagination />
    </div>
  );
};

