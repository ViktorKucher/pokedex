export const formatCounterDate = (count?: number) => (count? count>=99?99:count : 0);
export const formatRate = (rate?:number)=>rate?Math.round(rate * 10)/10:0
export const isZero = (data:number)=>data===0