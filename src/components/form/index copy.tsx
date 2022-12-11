import React, { BaseSyntheticEvent, createContext, FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import DefaultTitleIcon from "../../assets/icons/default-title.svg";
import { getFaucetNetwork } from "../../utils/api/faucet";
import EZButton from "../common/button/button";
import Divider from "../common/divider";
import EZModal from "../common/modal/modal";
import EZSelect from "../common/select-options/select-options";
import EZField from "../common/textfield/textfield";
import { Select } from '@chakra-ui/react';

import "./index.scss";

export const ActionCtx = createContext<any | null>(null);

interface INetwork {
    name: string,
    tokens: string[]
}
const InputFields = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const [faucetNetwork, setFaucetNetwork] = useState();
    const [network, setNetwork] = useState<INetwork[]>();
    const onLoadFaucetNetwork = async () => {
        try {
            const { data } = await getFaucetNetwork();
            let mapNetwork: any;
            data.forEach((item: INetwork, index: number) => {
                mapNetwork = {
                    ...mapNetwork,
                    [index]: item.name
                }
            })
            setFaucetNetwork(data);
            setNetwork(mapNetwork);
        } catch (error) {
            console.log('[Error onLoadFaucetNetwork]', error)
        }
    }

    useEffect(() => {
        onLoadFaucetNetwork();
    },[])

    const availableNetworks = {
        A: "ERC20",
        B: "ADX-W2",
        C: "PETR-2",
        D: "KRO50"
    }
    
    const availableTokens = {
        0: "GoerliETH",
        1: "USDC",
        2: "WBTC"
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
            <ActionCtx.Provider value={setNetwork}>
            <EZSelect
                name="network"
                setTitle={{show: true, text: "Network"}} 
                placeholder="Select the network" 
                data={network}
                implementation={{
                    required: true,
                    errorText: errors?.network === undefined ? null : "Required"
                }}
            />
            </ActionCtx.Provider>
            <EZSelect
                name="token"
                setTitle={{show: true, text: "Token (200 ERC-20 tokens (TOKEN_NAME) per hour)"}} 
                placeholder="Select the token" 
                data={availableTokens}
                implementation={{
                    required: false,
                    errorText: errors?.token === undefined ? null : "Required"
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

