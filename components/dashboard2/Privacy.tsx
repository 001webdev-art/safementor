'use client';

import { Card, CardBody, CardHeader, Button, Chip } from '@nextui-org/react';
import { Lock, Shield, Globe, Trash2, Download, ShieldAlert } from 'lucide-react';

import { useTranslations } from 'next-intl';

export function Privacy() {
    const t = useTranslations('Dashboard.privacy_new');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
                <p className="text-gray-600">{t('subtitle')}</p>
            </div>

            {/* Section 1: Legal Basis */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold">{t('basis.title')}</h3>
                            <p className="text-gray-500 text-xs">{t('basis.subtitle')}</p>
                        </div>
                        <Chip size="sm" variant="flat" className="bg-default-100 text-default-600 font-bold border-none uppercase text-[10px]">
                            {t('basis.badge')}
                        </Chip>
                    </div>

                    <div className="space-y-3 bg-default-50/50 p-4 rounded-xl border border-divider">
                        <div className="border-l-4 border-green-700 pl-4 py-1">
                            <p className="font-bold text-sm">{t('basis.safety.title')}</p>
                            <p className="text-xs text-gray-500">{t('basis.safety.desc')}</p>
                        </div>
                        <div className="border-l-4 border-green-700 pl-4 py-1">
                            <p className="font-bold text-sm">{t('basis.service.title')}</p>
                            <p className="text-xs text-gray-500">{t('basis.service.desc')}</p>
                        </div>
                        <div className="border-l-4 border-green-700 pl-4 py-1">
                            <p className="font-bold text-sm">{t('basis.interest.title')}</p>
                            <p className="text-xs text-gray-500">{t('basis.interest.desc')}</p>
                        </div>
                    </div>

                    <div className="bg-default-100/50 p-4 rounded-xl text-center">
                        <p className="text-xs font-medium">
                            {t('basis.consent')}
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* Section 2: Data Access, visibility and deletion */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div>
                        <h3 className="text-xl font-bold">{t('access.title')}</h3>
                        <p className="text-gray-500 text-xs text-uppercase">{t('access.subtitle')}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                            <p className="font-bold text-sm text-green-800 mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-default-400" /> {t('access.visibility.title')}
                            </p>
                            <ul className="text-xs text-green-700 space-y-1 list-none ml-6">
                                <li>• {t('access.visibility.items.0')}</li>
                                <li>• {t('access.visibility.items.1')}</li>
                                <li>• {t('access.visibility.items.2')}</li>
                            </ul>
                        </div>

                        <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                            <p className="font-bold text-sm text-orange-800 mb-2 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-default-400" /> {t('access.request.title')}
                            </p>
                            <ul className="text-xs text-orange-700 space-y-1 list-none ml-6">
                                <li>• {t('access.request.items.0')}</li>
                                <li>• {t('access.request.items.1')}</li>
                                <li>• {t('access.request.items.2')}</li>
                                <li>• {t('access.request.items.3')}</li>
                            </ul>
                        </div>

                        <div className="bg-default-100/50 p-4 rounded-xl border border-divider">
                            <p className="font-bold text-sm mb-1 flex items-center gap-2">
                                <Trash2 className="w-4 h-4 text-default-400" /> {t('access.deletion.title')}
                            </p>
                            <p className="text-xs text-gray-500 ml-6">{t('access.deletion.desc')}</p>
                        </div>
                    </div>

                    <Button variant="bordered" className="w-full font-bold border-divider">
                        {t('access.request.button')}
                    </Button>
                </CardBody>
            </Card>

            {/* Section 3: Your GDPR Rights */}
            <div className="space-y-4 mt-8">
                <div>
                    <h3 className="text-xl font-bold">{t('rights.title')}</h3>
                    <p className="text-gray-500 text-sm">{t('rights.subtitle')}</p>
                </div>

                <div className="space-y-3">
                    <div className="bg-default-50/50 p-4 rounded-xl border border-divider flex justify-between items-center group hover:bg-default-100/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-default-100 rounded-lg text-default-400">
                                <Download size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-sm">{t('rights.access.title')}</p>
                                <p className="text-xs text-gray-600">{t('rights.access.desc')}</p>
                            </div>
                        </div>
                        <Button size="sm" variant="bordered" className="font-bold border-divider">{t('rights.access.button')}</Button>
                    </div>

                    <div className="bg-default-50/50 p-4 rounded-xl border border-divider flex justify-between items-center group hover:bg-default-100/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-danger-50 rounded-lg text-danger-400">
                                <Trash2 size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-danger">{t('rights.erasure.title')}</p>
                                <p className="text-xs text-gray-600">{t('rights.erasure.desc')}</p>
                            </div>
                        </div>
                        <Button size="sm" variant="bordered" color="danger" className="font-bold border-danger-100">{t('rights.erasure.button')}</Button>
                    </div>

                    <div className="bg-default-50/50 p-4 rounded-xl border border-divider flex justify-between items-center group hover:bg-default-100/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-warning-50 rounded-lg text-warning-400">
                                <ShieldAlert size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-sm">{t('rights.object.title')}</p>
                                <p className="text-xs text-gray-600">{t('rights.object.desc')}</p>
                            </div>
                        </div>
                        <Button size="sm" variant="bordered" color="warning" className="font-bold border-warning-100">{t('rights.object.button')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
