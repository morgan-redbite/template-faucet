import React from "react"
import Layout from "../layout"
import EZModal from "./common/modal/modal"
import Faucet from "./faucet"
import Body from "./general/body"
import Footer from "./general/footer/footer"

export default function App() {

    return (
        <>
        <Layout 
            body={<Body element={<Faucet/>}/>}
            footer={<Footer/>}
        />
        </>
    )
}