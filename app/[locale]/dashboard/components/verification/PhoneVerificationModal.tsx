'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { createClient } from '@/lib/supabase/client';
import { X } from 'lucide-react';

interface PhoneVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    phoneNumber: string;
    onSuccess: () => void;
}

export default function PhoneVerificationModal({
    isOpen,
    onClose,
    phoneNumber,
    onSuccess
}: PhoneVerificationModalProps) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(20);
    const [canResend, setCanResend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isOpen && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [isOpen, timer]);

    // Send SMS on open
    useEffect(() => {
        if (isOpen) {
            sendSms();
            setTimer(20);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }
    }, [isOpen]);

    const sendSms = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/twilio/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to send SMS');
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = () => {
        if (!canResend) return;
        sendSms();
        setTimer(20);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
    };

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value[0]; // Allow only one char
        if (!/^\d*$/.test(value)) return; // Allow only numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check completion
        if (newOtp.every(digit => digit !== '') && index === 5 && value !== '') {
            verifyCode(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verifyCode = async (code: string) => {
        // Demostration Logic: Always accept regardless of code, as requested
        // "Even if the typed code is wrong, fill the database field... with true"

        setIsLoading(true);
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { error } = await supabase
                    .from('profiles')
                    .update({ phone_is_verified: true })
                    .eq('id', user.id);

                if (error) throw error;
            }

            // Close and notify parent
            onSuccess();
            onClose();

        } catch (err: any) {
            setError(err.message);
            console.error('Verification error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl p-8 relative overflow-hidden"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <X size={24} />
                    </button>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">Verify Phone Number</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            We sent a code to <span className="font-semibold text-gray-900 dark:text-white">{phoneNumber}</span>
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-between gap-2 mb-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                disabled={isLoading}
                                className="w-12 h-16 sm:w-16 sm:h-20 border-2 border-gray-200 rounded-xl text-center text-2xl sm:text-3xl font-bold focus:border-primary focus:outline-none transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="text-sm">
                            {timer > 0 ? (
                                <span className="text-gray-500">
                                    Resend code in <span className="font-mono font-medium text-primary">{timer}s</span>
                                </span>
                            ) : (
                                <button
                                    onClick={handleResend}
                                    className="text-primary hover:underline font-medium"
                                    disabled={isLoading}
                                >
                                    Re-Send the Code
                                </button>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-sm hover:underline"
                            disabled={isLoading}
                        >
                            Cancel Operation
                        </button>
                    </div>

                    {isLoading && (
                        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
