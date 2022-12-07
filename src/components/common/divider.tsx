import React, { CSSProperties } from "react";

export default function Divider() {

    const injectable: CSSProperties = {
        width: "100%",
        marginTop: "20px",
        marginBottom: "25px"
    }
    return (
        <hr style={injectable}></hr>
    )
}