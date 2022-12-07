import React, { useEffect } from 'react';
import { useState } from "react";
import { Generic } from './generic';


export default function Layout({ head, body, footer }: { head?: JSX.Element, body?: JSX.Element, footer?: JSX.Element}): JSX.Element {
    const [layout, setLayout] = useState<JSX.Element>(<></>);

    useEffect(() => {
        setLayout(
            Generic({children: {
                body: body,
                footer: footer
            }})
        )
    }, [])

    return layout
}