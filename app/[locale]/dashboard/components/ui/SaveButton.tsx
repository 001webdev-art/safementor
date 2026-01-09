<<<<<<< HEAD
'use client';

import React from 'react';
import { Button } from '@nextui-org/react';

interface SaveButtonProps {
    isLoading: boolean;
    onClick: () => void;
    label: string;
    loadingLabel: string;
}

export default function SaveButton({ isLoading, onClick, label, loadingLabel }: SaveButtonProps) {
    return (
        <div className="flex justify-end sticky bottom-6 z-10 mt-6 pointer-events-none">
            <Button
                color="primary"
                className="font-bold shadow-lg h-14 px-8 pointer-events-auto"
                isLoading={isLoading}
                onClick={onClick}
                size="lg"
            >
                {isLoading ? loadingLabel : label}
            </Button>
        </div>
    );
}
=======
'use client';

import React from 'react';
import { Button } from '@nextui-org/react';

interface SaveButtonProps {
    isLoading: boolean;
    onClick: () => void;
    label: string;
    loadingLabel: string;
}

export default function SaveButton({ isLoading, onClick, label, loadingLabel }: SaveButtonProps) {
    return (
        <div className="flex justify-end sticky bottom-6 z-10 mt-6 pointer-events-none">
            <Button
                color="primary"
                className="font-bold shadow-lg h-14 px-8 pointer-events-auto"
                isLoading={isLoading}
                onClick={onClick}
                size="lg"
            >
                {isLoading ? loadingLabel : label}
            </Button>
        </div>
    );
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9
