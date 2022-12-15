import React, { ButtonHTMLAttributes } from "react";
import "./button.scss";
export default function EZButton({type = "button" ,text, disabled}: {type?: any, text?: any, disabled: boolean}) {


    return (
        <button 
            className="ez-button"
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    )
}