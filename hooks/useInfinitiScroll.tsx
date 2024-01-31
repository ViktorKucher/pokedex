import { getPokemonData } from "@/constants/api";
import { isZero } from "@/functions/default";
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
        if (isZero(res.data.length) || res.data.length < limit) {
          setMaxLenght(true);
        } else if (isZero(offset)) {
          setData(res.data);
        } else {
          setData((pre) => [...pre, ...res.data]);
        }
        setLoading(true);
      })
      .catch(() => {
        setLoading(true);
        setData([]);
      });

    
  };
  const search = (text: string) => {
    if (isLoading) {
      if (text?.length > 0) {
        setLoading(false);
        setData([]);
        getPokemonData(text, session?.data?.user.id)
          .then((res) => {
            setData([res.data.pokemon]);
            setMaxLenght(true)
            setLoading(true);
          })
          .catch(() => {
            setLoading(true);
          });
      } else {
        setMaxLenght(false)
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
