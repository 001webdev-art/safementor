'use client';

import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useTranslations } from 'next-intl';

interface AccessLegalModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export const AccessLegalModal = ({ isOpen, onOpenChange }: AccessLegalModalProps) => {
    const t = useTranslations('AccessLegal');
    const tImprint = useTranslations('Imprint'); // fallback to general imprint for details if needed

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="2xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-[#4A4540]">
                            {t('modalTitle')}
                        </ModalHeader>
                        <ModalBody className="text-[#4A4540] opacity-80">
                            <div className="space-y-6">
                                <p>{t('intro')}</p>
                                
                                <div>
                                    <h3 className="font-bold text-lg mb-2">{tImprint('title')}</h3>
                                    <p>{t('provider')}</p>
                                    <p>{tImprint('address')}</p>
                                    <div className="mt-2" dangerouslySetInnerHTML={{ __html: tImprint('contactInfo') }} />
                                </div>
                                
                                <div>
                                     <h3 className="font-bold text-lg mb-2">{tImprint('disputeResolution')}</h3>
                                </div>

                                <div>
                                     <h3 className="font-bold text-lg mb-2">Datenschutz</h3>
                                     <p>{t('privacy')}</p>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
