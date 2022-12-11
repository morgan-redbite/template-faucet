import React, { BaseSyntheticEvent, createContext, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";

import DefaultTitleIcon from "../../assets/icons/default-title.svg";
import { getFaucetNetwork, mintFaucetToken } from "../../utils/api/faucet";
import EZButton from "../common/button/button";
import Divider from "../common/divider";
import EZModal from "../common/modal/modal";
import { TextInput, Select, Box, LoadingOverlay } from '@mantine/core';

import "./index.scss";

export const ActionCtx = createContext<any | null>(null);

interface INetwork {
    name: string,
    tokens: string[]
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
        onLoadFaucetNetwork();
    }, [])

    const [wallet, setWallet] = useState<any>();

    const submitHandler = async () => {
        setEnableOverlay(true)
        
        setWallet(form.values.wallet);

        const payload = {
            wallet: form.values.wallet,
            network: form.values.network,
            token: form.values.token
        }
        try {
            await mintFaucetToken(payload);
            setEnableOverlay(false);
            setOpenModal(true);
            setIsSuccess(true); 
        } catch (error: any) {
            const { data } = error.response;
            setErrorMsg(data.reason);
            setEnableOverlay(false);
            setOpenModal(true);
            setIsSuccess(false);
        }
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
                <div className="label">Token (200 ERC-20 tokens (TOKEN_NAME) per hour)<span className="text-required">*</span></div>
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
                <EZButton type="submit" text="Submit"/>
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
            </div>
        </div>
        <LoadingOverlay style={{position: "fixed"}} visible={enableOverlay} overlayBlur={2} />
        </>
    )
}

