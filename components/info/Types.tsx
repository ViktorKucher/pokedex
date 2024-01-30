import { listStyleType } from "@/constants/list";
import { useEffect, useState } from "react";

export const TypeValue = ({value}:{ value: string }) =>{
  const [color,setColor]=useState('')
  useEffect(()=>{
    setColor(listStyleType[value as keyof typeof listStyleType])
    console.log(color)
  },[])
  return (
    <div className={`p-1 rounded-lg ${color}`} key={value}>
      {value}
    </div>
  );
}
export const Types = ({ list }: { list?: string[] }) =>{
  return list?.length && (
    <>
    <div className="flex flex-col gap-2">
      <div>Types: </div>
      <div className="flex flex-row gap-2">
        {list.map((item, index) => <TypeValue value={item} key={index}/>)}
      </div>
    </div>
    </>
  )
}