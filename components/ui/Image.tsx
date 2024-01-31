import { Skeleton } from "antd";
import ImageNext from "next/image";
import { useState } from "react";
export const Image = ({src,style,alt}:{src:string,style?:string,alt:string}) => {
  const [isLoading, setLoading] = useState(false);
  const [isActive,setActive]=useState(true)
  if(!src){
    return <Skeleton.Image style={{ width: 250, height: 250 }} active={false}/>
  }
  return (
    <div>
      <ImageNext
        src={src}
        alt={alt}
        width="0"
        height="0"
        sizes="100%"
        className={`${style} `}
        onLoad={()=>setLoading(true)}
        onError={()=>setActive(false)}
        loading="lazy"
      />
      {!isLoading && <Skeleton.Image style={{ width: 250, height: 250 }} active={isActive}/>}
    </div>
  );
};
