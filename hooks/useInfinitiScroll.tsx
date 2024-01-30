import { getPokemonData } from "@/constants/api";
import { PokemonType } from "@/types/pokemon";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useInfinitiScroll = () => {
  const limit = 20;
  const [data, setData] = useState<PokemonType[]>([]);
  const [offset, setOffset] = useState(0);
  const [isMaxLenght, setMaxLenght] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const session = useSession();

  const getListPokemons = () => {
    setLoading(false);
    axios
      .get(
        `http://localhost:3000/api/pokemon/all?limit=${limit}&offset=${offset}&user_id=${session.data?.user.id}`
      )
      .then((res) => {
        if (res.data.length === 0 || res.data.length < limit) {
          setMaxLenght(true);
        } else if (offset === 0) {
          setData(res.data);
        } else {
          setData((pre) => [...pre, ...res.data]);
        }
      })
      .catch(() => {
        setLoading(true);
        setData([]);
      });

    setLoading(true);
  };
  const search = (text: string) => {
    if (isLoading) {
      if (text?.length > 0) {
        setLoading(false);
        getPokemonData(text, session?.data?.user.id)
          .then((res) => {
            setData([res.data.pokemon]);
            setLoading(true);
          })
          .catch(() => {
            setData([]);
            setLoading(true);
          });
      } else {
        setOffset(0);
        getListPokemons();
      }
    }
  };

  useEffect(() => {
    !isMaxLenght && getListPokemons();
  }, [offset]);

  useEffect(() => {
    const handleScroll = (e: any) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight === scrollHeight && !isMaxLenght && isLoading) {
        setOffset((prev) => prev + limit);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { data, isLoading, search };
};
