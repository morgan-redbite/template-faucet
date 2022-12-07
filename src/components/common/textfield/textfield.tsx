import React, { CSSProperties, useEffect, useImperativeHandle, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { useCaller } from "../../form";
import { IImplementation, ISetTitle } from "../../interfaces/EZInterface";
import "./textfield.scss";

const initialTitle: ISetTitle = {
    show: false,
    text: ""
}

const initialImplementation: IImplementation = {
    required: false,
    errorText: ""
}

interface EZTypeCheck {register?: any, name?: string, placeholder?: string, setTitle?: ISetTitle, implementation?: IImplementation}

export default function EZField({
    register,
    name,
    placeholder = "",
    setTitle = initialTitle,
    implementation = initialImplementation}: EZTypeCheck) {

    const [error, setError] = useState(false);

    return (
        <div>
            {setTitle.show &&
                <div className="title-placement">{setTitle.text}{implementation.required && <span className="text-required">*</span>}</div>
            }
            <input
                className="injectable-input"
                placeholder={placeholder}
                {...register(name, {
                    required: implementation.required,
                })}
            />
            {(implementation.errorText) && <div>Input your wallet</div>}
        </div>
    )
}