import React, { BaseSyntheticEvent, createContext, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";

import DefaultTitleIcon from "../../assets/icons/default-title.svg";
import { getFaucetNetwork, mintFaucetToken } from "../../utils/api/faucet";
import EZButton from "../common/button/button";
import Divider from "../common/divider";
import EZModal from "../common/modal/modal";
import { TextInput, Select, Box, LoadingOverlay, Loader } from '@mantine/core';

import "./index.scss";

export const ActionCtx = createContext<any | null>(null);

interface INetwork {
    name: string,
    tokens: string[]
}
interface IToken {
    name: string,
    address: string,
}
const initialState: INetwork[] = [];
const InputFields = () => {

    const form = useForm({
        initialValues: { wallet: '', network: '', token: '' },
        validate: {
            wallet: (value) => (!/^(0x)?[0-9a-f]{40}$/i.test(value) ? 'Wallet address invalid (EIP-55 format only)' : null),
            network: (value) => !value ? 'Network Chain not selected' : null,
            token: (value) => !value && network ? 'Token not selected' : null,
        }
    })

    const [setEnableOverlay] = useContext(OverlayCtx);

    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const [visible, setVisible] = useState(false);

    const [faucetNetwork, setFaucetNetwork] = useState<INetwork[]>(initialState);
    const [network, setNetwork] = useState<string[]>([]);
    const [token, setToken] = useState<string[]>([]);
    const onLoadFaucetNetwork = async () => {
        setEnableOverlay(true);
        setVisible(true);
        try {
            const { data } = await getFaucetNetwork();
            let mapNetwork: any[] = [];
            data.forEach((item: INetwork, index: number) => {
                mapNetwork.push(item.name)
            })
            setFaucetNetwork(data);
            setNetwork(mapNetwork);
            
            setEnableOverlay(false);
        } catch (error) {
            console.log('[Error onLoadFaucetNetwork]', error)
            setEnableOverlay(false);
        }
    }

    const [tokenType, setTokenType] = useState("200 tokens (TOKEN_NAME)");


    // const type = {
    //     "USDC": 
    //     "WBTC": "200 ERC-20 tokens (TOKEN_NAME)",
    //     "WETH": "200 ERC-20 tokens (TOKEN_NAME)"
    // }

    useEffect(() => {
        const networkTokens: INetwork | undefined = faucetNetwork.find((network: any) => network.name === form.values.network)
        if(networkTokens && networkTokens.tokens.length > 0) {
            let mapToken: any[] = [];
            networkTokens.tokens.forEach((token: any) => {
                mapToken.push(token.name);
            })
            setToken(mapToken);
        }
    }, [form.values.network])

    useEffect(() => {
        const selectedToken: string | undefined = token.find((item: any) => item === form.values.token);
        
    }, [form.values.token])

    useEffect(() => {
        onLoadFaucetNetwork();
    }, [])

    const [wallet, setWallet] = useState<any>();
    const [isSubmit, setIsSubmit] = useState(false);
    const submitHandler = async () => {
        setIsSubmit(true)
        
        setWallet(form.values.wallet);

        const payload = {
            wallet: form.values.wallet,
            network: form.values.network,
            token: form.values.token
        }
        try {
            await mintFaucetToken(payload);
            setIsSubmit(false);
            setOpenModal(true);
            setIsSuccess(true); 
        } catch (error: any) {
            const { data } = error.response;
            setErrorMsg(data.reason);
            setIsSubmit(false);
            setOpenModal(true);
            setIsSuccess(false);
        }
    }

    const stringTitle: {[key: string]: string} = {
        "": "200 tokens (TOKEN_NAME)",
        "USDC": "200 tokens (USDC)",
        "USDT": "200 tokens (USDT)",
        "WBTC": "1 token (WBTC)",
        "WETH": "1 token (WETH)",
    }

    return (
        <>
        <form onSubmit={form.onSubmit(() => submitHandler())}>
            <div className="flex flex-col gap-[20px]">
            <Box className="flex-box">
                <div className="label">Wallet Address<span className="text-required">*</span></div>
                <TextInput 
                    className="injectable-input" 
                    placeholder="Enter your Wallet Address" 
                    {...form.getInputProps('wallet')}
                />
            </Box>
            <Box className="flex-box">
                <div className="label">Network<span className="text-required">*</span></div>
                <Select
                    placeholder="Select the network"
                    className="injectable-input"
                    data={network}
                    {...form.getInputProps('network')}
                    clearable
                    dropdownPosition="bottom"
                />
            </Box>
            <Box className="flex-box">
                <div className="label">Token ERC-20 ({stringTitle[form.values.token]} per hour)<span className="text-required">*</span></div>
                <Select
                    placeholder={!form.values.network ? "Select the network first" : "Select the token"}
                    className="injectable-input"
                    disabled={!form.values.network}
                    data={token}
                    {...form.getInputProps('token')}
                    clearable
                    dropdownPosition="bottom"
                />
            </Box>
            </div>
            <div className="mt-8">
                <EZButton type="submit" disabled={isSubmit} text={!isSubmit ? <div>Submit</div>: <div><Loader style={{width: "20px"}}/></div>}/>
            </div>
        </form>
        <ActionCtx.Provider value={[isSuccess, setOpenModal, wallet, errorMsg]}>
            <EZModal open={openModal}/>
        </ActionCtx.Provider>
        </>
    )
}
const OverlayCtx = createContext<any>("");
export default function FaucetForm ({enableTitle = true}: {enableTitle?: boolean}) {
    
    const [enableOverlay, setEnableOverlay] = useState(false);
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
                    <OverlayCtx.Provider value={[setEnableOverlay]}>
                        <InputFields/>
                    </OverlayCtx.Provider>
                </div>
                {enableOverlay &&
                    <Box style={{position: "absolute", top: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: '100%'}}>
                        <div><LoadingOverlay visible={enableOverlay}/></div>
                        <div style={{marginTop: "15%", zIndex: '9999'}} className="fade">Loading resources</div>
                    </Box>
                }
            </div>
        </div>
        </>
    )
}

