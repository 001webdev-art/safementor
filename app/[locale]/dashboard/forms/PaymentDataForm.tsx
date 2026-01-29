'use client';

import React from 'react';
import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import { CreditCard, Check } from 'lucide-react';
import { FormProps } from '@/types/dashboard';

const PaymentDataForm = ({ t }: any) => {
    if (!t) return null;
    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-xl font-bold">{t('payment.title')}</h3>
                <p className="text-gray-500 text-sm">{t('payment.subtitle')}</p>
            </div>
            
            <Card shadow="none" className="border border-divider bg-white p-4">
                <CardBody className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">{t('payment.currentMethod')}</span>
                        <Chip 
                            startContent={<Check size={14} />} 
                            variant="flat" 
                            color="success" 
                            size="sm"
                            className="bg-green-50 text-green-700 border-green-200"
                        >
                            {t('payment.active')}
                        </Chip>
                    </div>
                    
                    <div className="space-y-1">
                        <p className="font-bold text-sm">Visa •••• 4242</p>
                        <p className="text-xs text-gray-400">{t('payment.expires')}: 12/26</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 pt-2">
                        <Button 
                            variant="bordered" 
                            className="flex-1 border-gray-200 font-medium"
                        >
                            {t('payment.update')}
                        </Button>
                        <Button 
                            variant="bordered" 
                            className="flex-1 border-red-200 text-red-500 hover:bg-red-50 font-medium"
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
