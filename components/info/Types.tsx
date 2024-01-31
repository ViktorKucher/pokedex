import { listStyleType } from "@/constants/list";

export const TypeValue = ({value}:{ value: string }) =>{
  return (
    <div style={{backgroundColor:listStyleType[value as keyof typeof listStyleType]}} key={value}>
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