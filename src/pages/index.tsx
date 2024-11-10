import React from "react";


export default function Index() {

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
                    onClick={() => console.log("Tap!")}
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