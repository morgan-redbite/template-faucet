import React, { Dispatch, useContext } from "react";
import Icon from "../../../assets/icons/Securo.svg";
import FailedIcon from "../../../assets/icons/failed-icon.svg";

import { Box } from "@mantine/core";
import { useAppSelector } from "../../../store/hooks";
import { ActionCtx } from "../../form";

import "./modal.scss";

const _modal_state = ({setAction, selectedToken="", wallet, errorMsg}: {setAction?: any, selectedToken?: string, wallet?: string, errorMsg?: string}) => {
    
    const controlAmount: {[key: string]: string} = useAppSelector(
        (state) => state.setting.controlAmount
    );

    const _obj_state: any = {
        success: {
            header: <div className="icon"><Icon/></div>,
            divider: <div className="divider"/>,
            body: 
            <div className="body">
                <div className="msg">Successful!</div>
                <div className="desc">
                {controlAmount[selectedToken]} Token has been delivered to <br/><span className="wallet-address">{wallet}</span>
                </div>
            </div>,
            action: <div className="button-success" onClick={() => setAction(false)}>Confirm</div>
        },
        failed: {
            header: <div className="icon"><FailedIcon/></div>,
            divider: <></>,
            body: 
            <div className="body">
                <div className="msg">Token delivered failed</div>
                <div className="desc">
                Token delivered failed. Please contact soonlai@daoventures.co for assist. Thank You.
                {errorMsg &&
                <><Box mt={"6px"} className="text-[#FF0000]">Reason: {errorMsg}</Box></>
                }
                </div>
            </div>,
            action: <div className="button-failed" onClick={() => setAction(false)}>OK</div>
        },
    }

    return _obj_state;
}

export default function EZModal({open = false}: {open: boolean}) {

    const [isSuccess, setOpenModal, selectedToken, wallet, errorMsg]: [string, any, string, string, string] = useContext(ActionCtx)
    
    const mode: {[key: string]: string} = {
        true: 'success',
        false: 'failed'
    }
    return (
        <>
        {open &&
        <div className="modal-root-absolute">
            <div onClick={() => setOpenModal(false)} className="modal-bg"></div>
            <div className="modal-box">
                {_modal_state({})[mode[isSuccess]].header}
                {_modal_state({})[mode[isSuccess]].divider}
                {_modal_state({selectedToken, wallet, errorMsg})[mode[isSuccess]].body}
                {_modal_state({setAction: setOpenModal})[mode[isSuccess]].action}
            </div>
        </div>
        }
        </>
    )
}