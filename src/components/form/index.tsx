import React, { BaseSyntheticEvent, createContext, FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import DefaultTitleIcon from "../../assets/icons/default-title.svg";
import EZButton from "../common/button/button";
import Divider from "../common/divider";
import EZModal from "../common/modal/modal";
import EZSelect from "../common/select-options/select-options";
import EZField from "../common/textfield/textfield";

import "./index.scss";

export const useCaller = (ref?: any) => {
    const [stater, setStater] = useState();

    useEffect(() => {
        setStater(ref);
    }, [stater])

    return <div>{stater}</div>;
}

export const ActionCtx = createContext<any | null>(null);

const InputFields = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const availableNetworks = {
        0: "ERC20",
        1: "ADX-W2",
        2: "PETR-2",
        3: "KRO50"
    }

    const availableTokens = {
        0: "USDT",
        1: "APE",
        2: "SAND",
        3: "MAGE"
    }

    const [wallet, setWallet] = useState<any>();

    console.log('err_network', errors?.network)
    const submitHandler = async (dataInput: any) => {
        console.log('em', dataInput.network)
        setWallet(dataInput.wallet)
        console.log(wallet)
        setIsSuccess(true)
    }

    return (
        <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col gap-[20px]">
            <EZField
                register={register}
                name="wallet"
                setTitle={{show: true, text: "Wallet Address"}} 
                placeholder="Enter your Wallet Address"
                implementation={{
                    required: false,
                    errorText: errors?.wallet === undefined ? null : "Required"
                }}
            />
            <EZSelect
                register={register}
                name="network"
                setTitle={{show: true, text: "Network"}} 
                placeholder="Select the network" 
                data={availableNetworks}
                implementation={{
                    required: true,
                    errorText: errors?.wallet === undefined ? null : "Required"
                }}
            />
            <EZSelect
                register={register}
                name="token"
                setTitle={{show: true, text: "Token (200 ERC-20 tokens (TOKEN_NAME) per hour)"}} 
                placeholder="Select the token" 
                data={availableTokens}
                implementation={{
                    required: false,
                    errorText: errors?.wallet === undefined ? null : "Required"
                }}
            />
            </div>
            <div className="mt-8">
                <EZButton type="submit" text="Submit"/>
            </div>
        </form>
        <ActionCtx.Provider value={[isSuccess, setIsSuccess, wallet]}>
            <EZModal open={isSuccess}/>
        </ActionCtx.Provider>
        </>
    )
}

export default function FaucetForm ({enableTitle = true}: {enableTitle?: boolean}) {

    return (
        <>
        <div className="faucet-form">
            {enableTitle &&<div><DefaultTitleIcon/></div>}
            <div className="faucet-form-container">
                <div className="info-text">
                    <span className="focused">Get Test Tokens</span>
                    <span className="description">This faucet transfers Test Token on Securo testnets. Confirm details before submitting.</span>
                </div>
                <Divider/>
                <div className="form-container">
                    <InputFields/>
                </div>
            </div>
        </div>
        </>
    )
}

