'use client';

import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useTranslations } from 'next-intl';

interface LoginLegalModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export const LoginLegalModal = ({ isOpen, onOpenChange }: LoginLegalModalProps) => {
    const t = useTranslations('LoginLegal');
    const tImprint = useTranslations('Imprint');
    const tPrivacy = useTranslations('Privacy');

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
                                {/* Combine actual Imprint and Privacy content or use the placeholder if preferred based on instructions. 
                                    Using the real content keys for better "adapted" feel as requested by "angepasst" usually implying context specific, 
                                    but since user said "adapted text", using the translation keys allows editing. 
                                    I will render the Imprint keys here as a good base. 
                                */}
                                <div>
                                    <h3 className="font-bold text-lg mb-2">{tImprint('title')}</h3>
                                    <p className="font-semibold">{tImprint('provider')}</p>
                                    <p>{tImprint('names')}</p>
                                    <p>{tImprint('address')}</p>
                                    <div className="mt-2" dangerouslySetInnerHTML={{ __html: tImprint('contactInfo') }} />
                                </div>
                                
                                <div>
                                     <h3 className="font-bold text-lg mb-2">{tPrivacy('title')}</h3>
                                     <p>{tPrivacy('intro')}</p>
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
