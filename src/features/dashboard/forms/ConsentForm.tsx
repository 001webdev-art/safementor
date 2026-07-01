'use client';

import React, { useState } from 'react';
import { Card, CardBody, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { Check } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ConsentFormProps {
    t: any;
}

const ConsentForm = ({ t }: ConsentFormProps) => {
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!t) return null;

    const handleWithdrawClick = () => {
        setModalStep(1);
        setFeedback('');
        setIsOpen(true);
    };

    const handleCancelContract = () => {
        setModalStep(2);
    };

    const handleFeedbackClick = () => {
        setModalStep(3);
    };

    const handleFeedbackSubmit = async () => {
        setIsSubmitting(true);
        // Simulate sending feedback
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setIsOpen(false);
    };

    return (
        <div className="space-y-5 animate-in slide-in-from-top-2 duration-300">
            <div>
                <h3 className="text-xl font-bold text-gray-900">{t('consent.title')}</h3>
            </div>
            
            <Card className="border border-gray-100 bg-white shadow-sm rounded-2xl overflow-hidden">
                <CardBody className="p-6 md:p-8 space-y-6">
                    {/* Item 1: Datenschutzerklärung */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                        <div className="space-y-1">
                            <p className="font-bold text-gray-950">{t('consent.privacyTitle')}</p>
                            <p className="text-sm text-gray-500">{t('consent.privacySubtitle')}</p>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <Chip 
                                startContent={<Check size={14} className="text-[#889A7F]" />} 
                                className="bg-[#889A7F]/10 text-[#889A7F] border-none font-semibold"
                                size="sm"
                            >
                                {t('consent.active')}
                            </Chip>
                            <div className="flex items-center gap-3">
                                <Button 
                                    className="bg-white border border-gray-200 text-gray-700 font-semibold h-10 px-4 rounded-xl hover:bg-gray-50 transition-colors"
                                    onPress={() => window.open(`/${locale}/privacy`, '_blank')}
                                >
                                    {t('consent.view')}
                                </Button>
                                <Button 
                                    className="bg-white border border-gray-200 text-red-500 font-semibold h-10 px-4 rounded-xl hover:bg-red-50 transition-colors"
                                    onPress={handleWithdrawClick}
                                >
                                    {t('consent.withdraw')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Item 2: AGB */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                        <div className="space-y-1">
                            <p className="font-bold text-gray-950">{t('consent.termsTitle')}</p>
                            <p className="text-sm text-gray-500">{t('consent.termsSubtitle')}</p>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <Chip 
                                startContent={<Check size={14} className="text-[#889A7F]" />} 
                                className="bg-[#889A7F]/10 text-[#889A7F] border-none font-semibold"
                                size="sm"
                            >
                                {t('consent.active')}
                            </Chip>
                            <div className="flex items-center gap-3">
                                <Button 
                                    className="bg-white border border-gray-200 text-gray-700 font-semibold h-10 px-4 rounded-xl hover:bg-gray-50 transition-colors"
                                    onPress={() => window.open(`/${locale}/terms`, '_blank')}
                                >
                                    {t('consent.view')}
                                </Button>
                                <Button 
                                    className="bg-white border border-gray-200 text-red-500 font-semibold h-10 px-4 rounded-xl hover:bg-red-50 transition-colors"
                                    onPress={handleWithdrawClick}
                                >
                                    {t('consent.withdraw')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Modal 
                isOpen={isOpen} 
                onOpenChange={setIsOpen}
                placement="center"
                backdrop="blur"
                classNames={{
                    base: "border border-gray-100 shadow-xl rounded-2xl bg-white max-w-md mx-4",
                    header: "border-b border-gray-50 p-6",
                    body: "p-6",
                    footer: "border-t border-gray-50 p-6"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-xl font-bold text-gray-900">
                                {t('consent.modalTitle')}
                            </ModalHeader>
                            <ModalBody>
                                {modalStep === 1 && (
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {t('consent.modalWarning')}
                                    </p>
                                )}
                                {modalStep === 2 && (
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {t('consent.thankYou')}
                                    </p>
                                )}
                                {modalStep === 3 && (
                                    <div className="space-y-4">
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {t('consent.thankYou')}
                                        </p>
                                        <textarea
                                            placeholder={t('consent.feedbackPlaceholder')}
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            className="w-full border border-gray-200 hover:border-[#889A7F] focus:border-[#889A7F] transition-colors rounded-xl p-3 bg-white outline-none min-h-[100px] text-gray-900 text-sm"
                                            maxLength={500}
                                        />
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter className="flex gap-3">
                                {modalStep === 1 && (
                                    <>
                                        <Button 
                                            className="flex-1 bg-white border border-gray-200 text-gray-700 font-semibold h-11 rounded-xl hover:bg-gray-50 transition-colors"
                                            onPress={onClose}
                                        >
                                            {t('consent.back')}
                                        </Button>
                                        <Button 
                                            className="flex-1 bg-red-500 text-white font-semibold h-11 rounded-xl hover:bg-red-600 transition-colors"
                                            onPress={handleCancelContract}
                                        >
                                            {t('consent.cancel')}
                                        </Button>
                                    </>
                                )}
                                {modalStep === 2 && (
                                    <>
                                        <Button 
                                            className="flex-1 bg-white border border-gray-200 text-gray-700 font-semibold h-11 rounded-xl hover:bg-gray-50 transition-colors"
                                            onPress={onClose}
                                        >
                                            {t('consent.close')}
                                        </Button>
                                        <Button 
                                            className="flex-1 bg-[#889A7F] text-white font-semibold h-11 rounded-xl hover:bg-[#748866] transition-colors"
                                            onPress={handleFeedbackClick}
                                        >
                                            {t('consent.feedbackBtn')}
                                        </Button>
                                    </>
                                )}
                                {modalStep === 3 && (
                                    <>
                                        <Button 
                                            className="flex-1 bg-white border border-gray-200 text-gray-700 font-semibold h-11 rounded-xl hover:bg-gray-50 transition-colors"
                                            onPress={onClose}
                                            disabled={isSubmitting}
                                        >
                                            {t('consent.close')}
                                        </Button>
                                        <Button 
                                            className="flex-1 bg-[#889A7F] text-white font-semibold h-11 rounded-xl hover:bg-[#748866] transition-colors"
                                            onPress={handleFeedbackSubmit}
                                            isLoading={isSubmitting}
                                        >
                                            {t('consent.submitFeedback')}
                                        </Button>
                                    </>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default React.memo(ConsentForm);
