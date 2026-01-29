'use client';

import React from 'react';
import { Card, CardBody, Divider } from '@nextui-org/react';
import { FormProps } from '@/types/dashboard';

const BillingInformationForm = ({ t }: any) => {
    if (!t) return null;

    return (
        <Card shadow="none" className="border border-divider bg-default-50/30 p-2 overflow-hidden">
            <CardBody className="p-0">
                <div className="bg-gray-100/50 px-4 py-2 border-b border-divider">
                    <span className="font-bold text-sm text-gray-900">{t('billing.title')}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('billing.plan')}:</span>
                    <span className="font-bold text-sm">{t('billing.familyPlan')} (€19.99/month)</span>
                </div>
            </CardBody>
        </Card>
    );
};

export default React.memo(BillingInformationForm);
