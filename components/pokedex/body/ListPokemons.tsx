"use client";
import { SearchInput } from "@/components/ui/Input";
import { CardPokemon } from "../../ui/Card";
import { useInfinitiScroll } from "@/hooks/useInfinitiScroll";
import { Spin } from "antd";
import { FilledBox } from "@/components/ui/FilledBox";
import { Suspense } from "react";

export const ListPokemons = () => {
  const { data, isLoading, search } = useInfinitiScroll();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        <SearchInput getDataInput={search} />
      </div>
      <div className="flex flex-wrap object-contain">
        {data?.map((item, index) => (
          <CardPokemon key={index} cardData={item} />
        ))}
      </div>
      {isLoading ? (
        <div className="m-20">
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        data.length === 0 && <FilledBox />
      )}
    </div>
  );
};
