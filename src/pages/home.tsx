import { BarChart3, Wallet2, Pickaxe, Users, User, Diamond, Coins, Bitcoin, Gem } from "lucide-react";
import React from "react";


export default function Home() {
    return <div className="min-h-screen bg-[#6B62B6] relative overflow-hidden">
        {/* Top Currency Display */}
        <div className="p-4 pt-8">
            <div className="flex items-center justify-center gap-2 p-2 rounded-full backdrop-blur-sm bg-white/10">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 rounded-full">
                    <span className="font-bold text-yellow-600">G</span>
                </div>
                <span className="text-2xl font-bold text-white">2,019,012</span>
            </div>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center gap-8 mt-4">
            {[
                { label: "Profit/h", value: "+100", icon: "🐷" },
                { label: "Energy", value: "+3", icon: "⚡" },
                { label: "Tool", value: "+3", icon: "🔨" },
            ].map((item) => (
                <div key={item.label} className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 bg-[#FFE4C4] rounded-full flex items-center justify-center">
                            <span className="text-2xl">{item.icon}</span>
                        </div>
                        <div className="absolute px-2 text-sm text-white bg-green-400 rounded-full -top-2 -right-2">
                            {item.value}
                        </div>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">{item.label}</p>
                </div>
            ))}
        </div>

        {/* Main Game Area */}
        <div className="relative mt-8 h-96">
            <div className="absolute bottom-0 w-full">
                <div className="relative h-48 bg-[#4A4178] rounded-t-full mx-4">
                    {/* Decorative Elements */}
                    <div className="absolute w-32 h-32 transform rounded-lg bottom-20 left-1/4 -rotate-12 bg-black/20" />
                    <div className="absolute w-24 h-24 rotate-45 bottom-24 right-1/3 bg-yellow-400/30" />
                </div>
            </div>
        </div>

        {/* Level Indicator */}
        <div className="absolute right-8 bottom-32">
            <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-full">
                <div className="font-bold text-white">
                    <div className="text-2xl">1</div>
                    <div className="text-xs">LEVEL</div>
                </div>
            </div>
        </div>

        {/* Connect Wallet Button */}
        <div className="absolute left-0 right-0 flex justify-center bottom-20">
            <button className="bg-white text-[#FF6B6B] font-bold py-4 px-8 rounded-full shadow-lg text-lg">
                Connect Wallet
            </button>
        </div>

        {/* Floating Coins */}
        <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                >
                    <Bitcoin className="w-6 h-6 text-yellow-400" />
                </div>
            ))}
        </div>

        {/* Floating Gems */}
        <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                >
                    <Gem className="w-8 h-8 text-purple-400" />
                </div>
            ))}
        </div>

        <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s infinite;
        }
      `}</style>

    </div>
}
