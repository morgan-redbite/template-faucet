import React from "react"
import BG from "../../assets/default/background.svg";
import FaucetForm from "../form";
import * as styles from "./index.module.scss";

export default function Faucet() {
    return (
        <div className={styles.faucet}>
            <BG className={styles.bg}/>
            <FaucetForm/>
        </div>
    )
}