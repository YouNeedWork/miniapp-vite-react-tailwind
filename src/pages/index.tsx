import { Args, normalizeTypeArgsToStr, RoochClient, Transaction } from "@roochnetwork/rooch-sdk";
import { useCreateSessionKey, useCurrentAddress, useCurrentSession } from "@roochnetwork/rooch-sdk-kit";
import React, { useState } from "react";
import { GOLD_TREATURY, PKG } from "../constant/config";


export default function Index() {
    const sessionKey = useCurrentSession()
    const address = useCurrentAddress()

    const { mutateAsync: createSessionKey } = useCreateSessionKey();

    const handleSubmit = async () => {
        try {

            if (!sessionKey) {
                try {
                    await createSessionKey({
                        appName: 'rooch',
                        appUrl: window.location.href,
                        scopes: [
                            '0x1::*::*',
                            '0x3::*::*',
                            `${PKG}::*::*`
                        ],
                        maxInactiveInterval: 60 * 60 * 8,
                    })
                } catch (e: any) {
                }
            }

            // Find object type in address
            const client = new RoochClient({ url: "https://test-seed.rooch.network/" });
            // get object owner by address
            const objects = await client.queryObjectStates({
                filter: {
                    owner: address!.toStr(),
                    //owner: "0x47cfccc41f9506fcbfead991a8fc28641714d58f241a50b8f1d995537f73d8bb",
                    //object_type:  "0x2::account::Account",
                    //object_type: `${PKG}::gold_miner::MineInfo`,
                    //object_type: "0x2::account::Account",
                },
                cursor: null,
                queryOption: {
                    decode: true,
                    descending: false,
                },
            });

            let minerObject = objects.data.find((item) => item.object_type === `${PKG}::gold_miner::MineInfo`)
            console.log("Address objects:", objects);

            const txn = new Transaction();
            txn.callFunction({
                address: PKG,
                module: "gold_miner",
                function: "mine",
                args: [
                    Args.objectId(GOLD_TREATURY),
                    Args.objectId(minerObject!.id),
                    //Args.objectId("0x98bbd9a0fc280ffadef7a7882107e749cba01098ebff0a6b481c4584a91605af"),
                ],
                typeArgs: [
                ],
            });
            console.log("执行交易", sessionKey)
            console.log("执行交易", txn)

            console.log("执行交易", client)
            const result = await client.signAndExecuteTransaction({
                transaction: txn,
                signer: sessionKey as any,
            })

            if (result.execution_info.status.type === 'executed') {
                //message.success(`Executed:${result.execution_info.tx_hash}`)
            }
        } catch (e: any) {
            console.log(e)
        }
    }

    return <>
        <div className="flex flex-col justify-center items-center p-4 min-h-screen bg-gray-100">
            <h1 className="mb-8 text-3xl font-bold">Tap to Earn</h1>
            <div className="p-6 w-full max-w-sm bg-white rounded-lg shadow-lg">
                <div className="mb-6 text-center">
                    <p className="mb-2 text-xl font-semibold">Your Balance</p>
                    <p className="text-3xl font-bold text-green-600">0.00 USDT</p>
                </div>
                <div
                    className="relative w-full h-48 cursor-pointer"
                    onClick={() => handleSubmit()}
                >
                    <div className="flex absolute inset-0 justify-center items-center">
                        <div className="animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-0 transition-opacity duration-200 hover:opacity-10 active:opacity-20"></div>
                </div>
                <p className="mt-4 text-center text-gray-600">
                    Tap every hour to earn rewards
                </p>
            </div>
        </div>
    </>
}