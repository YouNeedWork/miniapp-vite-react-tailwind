import React, { useEffect } from "react";
import { useTelegram } from "../hooks/useTelegram";

export default function Index() {
    const { ready } = useTelegram();

    useEffect(() => {
        if (ready) {
            console.log("We are in telegram");
        } else {
            console.log("We are not in telegram");
        }
    }, [ready]);


    return <>
        <h1>Hello world</h1>
    </>
}