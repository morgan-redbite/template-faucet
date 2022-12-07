import React, { ButtonHTMLAttributes } from "react";
import "./button.scss";
export default function EZButton({type = "button" ,text}: {type?: any, text?: string}) {


    return (
        <button 
            className="ez-button"
            type={type}
        >
            {text}
        </button>
    )
}