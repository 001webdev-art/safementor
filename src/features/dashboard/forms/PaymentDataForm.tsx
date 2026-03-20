'use client';

import React from 'react';
import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import { CreditCard, Check } from 'lucide-react';
import { FormProps } from '@/types/dashboard';

const PaymentDataForm = ({ t }: any) => {
    if (!t) return null;
    return (
        <div className="space-y-5 animate-in slide-in-from-top-2 duration-300">
            <div>
                <h3 className="text-xl font-bold text-gray-900">{t('payment.title')}</h3>
                <p className="text-gray-500 text-sm">{t('payment.subtitle')}</p>
            </div>
            
            <Card className="border border-gray-100 bg-white shadow-sm rounded-2xl overflow-hidden">
                <CardBody className="p-6 md:p-8 space-y-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg text-gray-900">{t('payment.currentMethod')}</span>
                        <Chip 
                            startContent={<Check size={14} />} 
                            className="bg-[#889A7F]/10 text-[#889A7F] border-none font-semibold"
                            size="sm"
                        >
                            {t('payment.active')}
                        </Chip>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg border border-gray-100">
                            <CreditCard className="text-[#889A7F]" size={24} />
                        </div>
                        <div className="space-y-0.5">
                            <p className="font-bold text-gray-900">Visa •••• 4242</p>
                            <p className="text-xs text-gray-500">{t('payment.expires')}: 12/26</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 pt-2">
                        <Button 
                            className="flex-1 bg-white border border-gray-200 text-gray-700 font-semibold h-12 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            {t('payment.update')}
                        </Button>
                        <Button 
                            className="flex-1 bg-white border border-red-100 text-red-500 font-semibold h-12 rounded-xl hover:bg-red-50 transition-colors"
                        >
                            {t('payment.remove')}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default React.memo(PaymentDataForm);
