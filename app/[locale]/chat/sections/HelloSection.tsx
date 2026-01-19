'use client';

import React from 'react';
import { useChatStore } from '../hooks/useChatStore';

interface HelloSectionProps {
    onNavigate: (view: string) => void;
}

export default function HelloSection({ onNavigate }: HelloSectionProps) {
    const { activeChildNickname } = useChatStore();
    const nickname = activeChildNickname || 'FRIEND';

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#407aa0] overflow-y-auto scrollbar-hide">
            <div className="relative w-full max-w-md flex flex-col items-center gap-10 py-10">
                {/* HELLO */}
                <div
                    className="px-16 py-6 bg-yellow-400 rounded-full border-2 border-black shadow-md
                             animate-[popIn_0.7s_ease-out_both,floatPlayful1_6s_ease-in-out_infinite]
                             transition-transform hover:scale-110 cursor-pointer"
                >
                    <span className="text-4xl font-extrabold text-red-500 drop-shadow-[2px_2px_0px_#000]">
                        HELLO!!!
                    </span>
                </div>

                {/* NICKNAME */}
                <div
                    className="px-20 py-6 bg-[#FFF9E3] rounded-full border-2 border-black shadow-md -mt-6
                             animate-[popIn_0.9s_ease-out_both,floatPlayful2_7s_ease-in-out_infinite]
                             transition-transform hover:scale-110 cursor-pointer"
                >
                    <span className="text-4xl font-extrabold text-red-500 drop-shadow-[2px_2px_0px_#000]">
                        {nickname.toUpperCase()}
                    </span>
                </div>

                {/* Lets chat */}
                <div
                    onClick={() => onNavigate('chat')}
                    className="relative flex items-center animate-popIn delay-300
                             transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer mt-8"
                    role="button"
                    tabIndex={0}
                >
                    <div className="absolute -left-6 bg-purple-400 p-3 rounded-md border-2 border-black z-10 shadow-sm">
                        <span className="text-2xl">📄</span>
                    </div>

                    <div className="pl-14 pr-10 py-5 bg-[#FFF9E3] border-2 border-black rounded-md shadow-sm">
                        <span className="text-xl font-semibold text-black">Lets chat!</span>
                    </div>
                </div>

                {/* Activity */}
                <div
                    onClick={() => onNavigate('contacts')}
                    className="relative flex items-center translate-x-6 animate-popIn delay-500
                             transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                    role="button"
                    tabIndex={0}
                >
                    <div className="absolute -left-6 bg-orange-400 p-3 rounded-md border-2 border-black z-10 shadow-sm">
                        <span className="text-2xl">💡</span>
                    </div>

                    <div className="pl-14 pr-10 py-5 bg-[#FFF9E3] border-2 border-black rounded-md shadow-sm">
                        <span className="text-xl font-semibold text-black">
                            I Would like an Activity!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
