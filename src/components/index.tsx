import React from "react"
import useStrategyPerformance from "../hooks/settings"
import Layout from "../layout"
import EZModal from "./common/modal/modal"
import Faucet from "./faucet"
import Body from "./general/body"
import Footer from "./general/footer/footer"

export default function App() {
    useStrategyPerformance();
    return (
        <>
        <Layout 
            body={<Body element={<Faucet/>}/>}
            footer={<Footer/>}
        />
        </>
    )
}