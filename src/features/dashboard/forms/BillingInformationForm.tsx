'use client';

import React from 'react';
import { Card, CardBody, Divider, Chip } from '@nextui-org/react';
import { FormProps } from '@/types/dashboard';

const BillingInformationForm = ({ t }: any) => {
    if (!t) return null;

    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden animate-in slide-in-from-top-2 duration-300">
            <div className="bg-[#889A7F]/5 px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900">{t('billing.title')}</span>
                <Chip size="sm" className="bg-[#889A7F] text-white font-bold h-5 px-2">Family</Chip>
            </div>
            <div className="px-6 py-5 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{t('billing.plan')}</span>
                    <span className="font-bold text-gray-900">{t('billing.familyPlan')}</span>
                </div>
                <div className="text-right">
                    <span className="text-lg font-black text-gray-900">€19.99</span>
                    <span className="text-xs text-gray-400 font-medium ml-1">/ mo</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(BillingInformationForm);
