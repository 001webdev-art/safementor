'use client';

import React from 'react';
import { Spacer } from '@nextui-org/react';

interface LoadingStateProps {
    message?: string;
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
    return (
        <div className="flex justify-center p-10 flex-col items-center">
            <Spacer y={10} />
            <div className="animate-pulse flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <p className="text-default-500 font-medium">{message}</p>
            </div>
        </div>
    );
}
