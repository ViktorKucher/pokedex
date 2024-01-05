import React from "react"

interface IButton {
    children:React.ReactNode
    onClick?:React.MouseEventHandler<HTMLButtonElement>,
    type?:"submit" | "reset" | "button"
}
export const Button = ({children,type,onClick}:IButton)=>{
    return<button type={type} onClick={onClick} className="rounded-lg border-2 border-white p-3">{children}</button>
}