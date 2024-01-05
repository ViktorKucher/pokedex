import { ReactNode } from "react"

export const Title = ({children}:{children:ReactNode}) =>{
    return <span className='text text-center uppercase text-2xl'>{children}</span>
}