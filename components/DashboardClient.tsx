<<<<<<< HEAD
'use client';

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Divider,
    Listbox,
    ListboxItem,
    User,
    Avatar,
    Chip,
    Spacer,
    Select,
    SelectItem,
    Switch,
    Textarea
} from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    HelpCircle,
    MapPin,
    UserCircle,
    Mail,
    Phone,
    CreditCard,
    Settings,
    Globe,
    Shield,
    Image as ImageIcon,
    ChevronDown
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Profile, Gender, RelativeToChildren, Theme } from '@/types/database';

interface DashboardClientProps {
    user: {
        id: string;
        email?: string;
        created_at: string;
    };
}

type Section = 'overview' | 'children' | 'privacy' | 'help';

export default function DashboardClient({ user }: DashboardClientProps) {
    const t = useTranslations('Dashboard');
    const tErrors = useTranslations('Errors');
    const supabase = createClient();
    const [activeSection, setActiveSection] = useState<Section>('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [profile, setProfile] = useState<Partial<Profile>>({});
    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

    const userInitial = user.email?.charAt(0).toUpperCase();

    // Load collapsed states from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('dashboard_collapsed_groups');
        if (saved) {
            try {
                setCollapsedGroups(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse collapsed groups:', e);
            }
        }
    }, []);

    // Save collapsed states to localStorage
    const toggleGroup = (groupId: string) => {
        const newState = {
            ...collapsedGroups,
            [groupId]: !collapsedGroups[groupId]
        };
        setCollapsedGroups(newState);
        localStorage.setItem('dashboard_collapsed_groups', JSON.stringify(newState));
    };

    useEffect(() => {
        async function loadProfile() {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setProfile(data);
            } else if (error && error.code === 'PGRST116') {
                // Profile doesn't exist yet, we'll initialize with user data
                setProfile({
                    id: user.id,
                    email: user.email || '',
                    firstname: '',
                    lastname: '',
                    address_timezone: 'UTC',
                    address_country: 'US',
                    billing_country: 'US',
                    billing_same_as_shipping_address: true,
                    is_subscribed: true,
                    subscription_tier: 'free',
                    communication_preferences: {
                        marketing_emails: false,
                        newsletter: false,
                        product_updates: false,
                        security_alerts: true,
                        security_alerts_via_sms: false,
                        security_alerts_via_email: true,
                        security_alerts_via_push: false,
                        security_alerts_via_whatsapp: false
                    },
                    theme: 'light',
                    language: 'en',
                    date_format: 'MM/DD/YYYY',
                    time_format: '12h'
                } as Partial<Profile>);
            }
            setIsLoading(false);
        }
        loadProfile();
    }, [user.id, user.email, supabase]);

    const handleUpdate = async () => {
        setIsSaving(true);
        const { error } = await supabase
            .from('profiles')
            .upsert({
                ...profile,
                id: user.id,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Error updating profile:', error);
            alert(tErrors('generic'));
        }
        setIsSaving(false);
    };

    const renderSection = () => {
        if (isLoading) return <div className="flex justify-center p-10"><Spacer y={10} /><p>Loading profile...</p></div>;

        switch (activeSection) {
            case 'overview':
                return (
                    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
                        <h2 className="text-2xl font-bold">{t('sections.overview')}</h2>

                        {/* Group Box 1 - Personal Information */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('personalInfo')}
                            >
                                <UserCircle className="text-primary" />
                                <p className="text-lg font-bold flex-1">{t('sections.personalInfo')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['personalInfo'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['personalInfo'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <Input
                                            label={t('fields.firstname')}
                                            placeholder={t('placeholders.firstname')}
                                            value={profile.firstname || ''}
                                            onValueChange={(v) => setProfile({ ...profile, firstname: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={150}
                                            isRequired
                                        />
                                        <Input
                                            label={t('fields.lastname')}
                                            placeholder={t('placeholders.lastname')}
                                            value={profile.lastname || ''}
                                            onValueChange={(v) => setProfile({ ...profile, lastname: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={100}
                                        />
                                        <Input
                                            label={t('fields.nickname')}
                                            placeholder={t('placeholders.nickname')}
                                            value={profile.nickname || ''}
                                            onValueChange={(v) => setProfile({ ...profile, nickname: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={25}
                                        />
                                        <Select
                                            label={t('fields.gender')}
                                            placeholder={t('fields.gender')}
                                            selectedKeys={profile.gender ? [profile.gender] : []}
                                            onSelectionChange={(keys) => setProfile({ ...profile, gender: Array.from(keys)[0] as Gender })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        >
                                            <SelectItem key="male" value="male">{t('options.genders.male')}</SelectItem>
                                            <SelectItem key="female" value="female">{t('options.genders.female')}</SelectItem>
                                            <SelectItem key="diverse" value="diverse">{t('options.genders.diverse')}</SelectItem>
                                            <SelectItem key="prefer_not_to_say" value="prefer_not_to_say">{t('options.genders.prefer_not_to_say')}</SelectItem>
                                        </Select>
                                        <Select
                                            label={t('fields.relative_to_children')}
                                            placeholder={t('fields.relative_to_children')}
                                            selectedKeys={profile.relative_to_children ? [profile.relative_to_children] : ['Mother']}
                                            onSelectionChange={(keys) => setProfile({ ...profile, relative_to_children: Array.from(keys)[0] as RelativeToChildren })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            className="md:col-span-2"
                                        >
                                            {['Mother', 'Father', 'Uncle', 'Aunt', 'Grandfather', 'Grandmother', 'Other'].map(r => (
                                                <SelectItem key={r} value={r}>{t(`options.relations.${r}`)}</SelectItem>
                                            ))}
                                        </Select>
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 2 - Contact Information */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('contactInfo')}
                            >
                                <Mail className="text-success" />
                                <p className="text-lg font-bold flex-1">{t('sections.contactInfo')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['contactInfo'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['contactInfo'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <Input
                                            label={t('fields.email')}
                                            value={profile.email || ''}
                                            variant="bordered"
                                            isDisabled
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.phone')}
                                            placeholder={t('placeholders.phone')}
                                            value={profile.phone || ''}
                                            onValueChange={(v) => setProfile({ ...profile, phone: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={20}
                                            startContent={profile.phone_is_verified && <Chip size="sm" color="success" variant="flat">Verified</Chip>}
                                        />
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 3 - Shipping Address */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('address')}
                            >
                                <MapPin className="text-secondary" />
                                <p className="text-lg font-bold flex-1">{t('sections.address')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['address'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['address'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                        <Input
                                            label={t('fields.address_line1')}
                                            placeholder={t('placeholders.address_line1')}
                                            value={profile.address_line1 || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_line1: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            className="md:col-span-2"
                                            maxLength={255}
                                        />
                                        <Input
                                            label={t('fields.address_additional_info')}
                                            value={profile.address_additional_info || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_additional_info: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={100}
                                        />
                                        <Input
                                            label={t('fields.address_city')}
                                            placeholder={t('placeholders.city')}
                                            value={profile.address_city || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_city: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.address_state')}
                                            value={profile.address_state || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_state: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.address_postal_code')}
                                            placeholder={t('placeholders.zip')}
                                            value={profile.address_postal_code || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_postal_code: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.address_country')}
                                            value={profile.address_country || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_country: v.toUpperCase() })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={2}
                                        />
                                        <Input
                                            label={t('fields.address_timezone')}
                                            value={profile.address_timezone || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_timezone: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            className="md:col-span-2"
                                        />
                                        <div className="md:col-span-3 pt-2">
                                            <Switch
                                                isSelected={profile.billing_same_as_shipping_address}
                                                onValueChange={(v) => setProfile({ ...profile, billing_same_as_shipping_address: v })}
                                            >
                                                {t('fields.billing_same_as_shipping')}
                                            </Switch>
                                        </div>
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 4 - Billing Address (if different) */}
                        {!profile.billing_same_as_shipping_address && (
                            <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md animate-in slide-in-from-top-2">
                                <CardHeader
                                    className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                    onClick={() => toggleGroup('billingAddress')}
                                >
                                    <CreditCard className="text-warning" />
                                    <p className="text-lg font-bold flex-1">{t('sections.billingAddress')}</p>
                                    <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['billingAddress'] ? '-rotate-90' : ''}`} />
                                </CardHeader>
                                {!collapsedGroups['billingAddress'] && (
                                    <>
                                        <Divider />
                                        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                            <Input
                                                label={t('fields.billing_address_line1')}
                                                value={profile.billing_address_line1 || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_address_line1: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                                className="md:col-span-2"
                                            />
                                            <Input
                                                label={t('fields.billing_address_additional_info')}
                                                value={profile.billing_address_additional_info || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_address_additional_info: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                            />
                                            <Input
                                                label={t('fields.billing_city')}
                                                value={profile.billing_city || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_city: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                            />
                                            <Input
                                                label={t('fields.billing_state')}
                                                value={profile.billing_state || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_state: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                            />
                                            <Input
                                                label={t('fields.billing_postal_code')}
                                                value={profile.billing_postal_code || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_postal_code: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                            />
                                        </CardBody>
                                    </>
                                )}
                            </Card>
                        )}

                        {/* Group Box 5 - Subscription */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('settings')}
                            >
                                <Settings className="text-default-500" />
                                <p className="text-lg font-bold flex-1">{t('sections.settings')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['settings'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['settings'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        <div className="flex flex-col justify-center">
                                            <Switch
                                                isSelected={profile.is_subscribed}
                                                onValueChange={(v) => setProfile({ ...profile, is_subscribed: v })}
                                            >
                                                {t('fields.is_subscribed')}
                                            </Switch>
                                        </div>
                                        <Input
                                            label={t('fields.subscription_tier')}
                                            value={profile.subscription_tier || 'free'}
                                            variant="bordered"
                                            isDisabled
                                            labelPlacement="outside"
                                        />

                                        <div className="md:col-span-2 pt-2">
                                            <div className="flex justify-between items-center bg-default-50/50 p-4 rounded-xl border border-divider">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm">{t('fields.two_factor_enabled')}</span>
                                                    <span className="text-xs text-default-400">Add an extra layer of security to your account.</span>
                                                </div>
                                                <Switch
                                                    isSelected={profile.two_factor_enabled}
                                                    onValueChange={(v) => setProfile({ ...profile, two_factor_enabled: v })}
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 6 - Communication Preferences (JSONB) */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('communication')}
                            >
                                <Mail className="text-primary-400" />
                                <p className="text-lg font-bold flex-1">{t('sections.communication_preferences') || 'Communication Preferences'}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['communication'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['communication'] && (
                                <>
                                    <Divider />
                                    <CardBody className="pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {profile.communication_preferences && Object.entries(profile.communication_preferences).map(([key, val]) => (
                                                <div key={key} className="flex flex-col gap-2 p-3 rounded-lg border border-divider hover:bg-default-50 transition-colors">
                                                    <Switch
                                                        size="sm"
                                                        isSelected={val as boolean}
                                                        onValueChange={(v) => setProfile({
                                                            ...profile,
                                                            communication_preferences: {
                                                                ...profile.communication_preferences!,
                                                                [key]: v
                                                            }
                                                        })}
                                                    >
                                                        <span className="text-sm font-medium">
                                                            {key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                        </span>
                                                    </Switch>
                                                </div>
                                            ))}
                                        </div>
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 8 - Social Media & Bio */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('social')}
                            >
                                <ImageIcon className="text-default-500" />
                                <p className="text-lg font-bold flex-1">{t('sections.social')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['social'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['social'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 gap-6 pt-4">
                                        <Input
                                            label={t('fields.profile_picture_url')}
                                            placeholder="https://example.com/photo.jpg"
                                            value={profile.profile_picture_url || ''}
                                            onValueChange={(v) => setProfile({ ...profile, profile_picture_url: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            startContent={<ImageIcon size={18} className="text-default-400" />}
                                        />
                                        <Textarea
                                            label={t('fields.bio')}
                                            placeholder={t('placeholders.bio')}
                                            value={profile.bio || ''}
                                            onValueChange={(v) => setProfile({ ...profile, bio: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            minRows={3}
                                        />
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 8 - App Preferences */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('preferences')}
                            >
                                <Globe className="text-primary-300" />
                                <p className="text-lg font-bold flex-1">{t('sections.preferences')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['preferences'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['preferences'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <Select
                                            label={t('fields.theme')}
                                            selectedKeys={profile.theme ? [profile.theme] : ['light']}
                                            onSelectionChange={(keys) => setProfile({ ...profile, theme: Array.from(keys)[0] as Theme })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        >
                                            <SelectItem key="light" value="light">{t('options.themes.light')}</SelectItem>
                                            <SelectItem key="dark" value="dark">{t('options.themes.dark')}</SelectItem>
                                            <SelectItem key="system" value="system">{t('options.themes.system')}</SelectItem>
                                        </Select>
                                        <Input
                                            label={t('fields.language')}
                                            value={profile.language || 'en'}
                                            onValueChange={(v) => setProfile({ ...profile, language: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.date_format')}
                                            value={profile.date_format || 'MM/DD/YYYY'}
                                            onValueChange={(v) => setProfile({ ...profile, date_format: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.time_format')}
                                            value={profile.time_format || '12h'}
                                            onValueChange={(v) => setProfile({ ...profile, time_format: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            className="md:col-span-2"
                                        />
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        <div className="flex justify-end sticky bottom-6 z-10">
                            <Button
                                color="primary"
                                className="font-bold shadow-lg h-14 px-8"
                                isLoading={isSaving}
                                onClick={handleUpdate}
                                size="lg"
                            >
                                {isSaving ? t('actions.loading') : t('actions.saveChanges')}
                            </Button>
                        </div>
                    </div>
                );
            case 'children':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold">{t('sections.children')}</h2>
                        <Card className="p-12 items-center justify-center text-center border-dashed border-2">
                            <Users size={48} className="text-default-300 mb-4" />
                            <p className="text-default-500">{t('content.noChildren')}</p>
                            <Button color="primary" variant="flat" className="mt-4">{t('content.addChild')}</Button>
                        </Card>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
                        <h2 className="text-2xl font-bold">{t('sections.privacySecurity') || t('sections.privacy')}</h2>

                        {/* Group Box 7 - Privacy & Security */}
                        <Card className="p-6 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader className="flex gap-3 pb-2">
                                <Shield className="text-danger" />
                                <p className="text-lg font-bold">{t('sections.privacySecurity')}</p>
                            </CardHeader>
                            <Divider />
                            <CardBody className="space-y-6 pt-4">
                                <p className="text-default-500">{t('content.privacyDescription')}</p>
                                <div className="flex justify-between items-center bg-default-50 p-4 rounded-xl border border-divider">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{t('fields.two_factor_enabled')}</span>
                                        <span className="text-xs text-default-400">Add an extra layer of security to your account.</span>
                                    </div>
                                    <Switch
                                        isSelected={profile.two_factor_enabled}
                                        onValueChange={(v) => setProfile({ ...profile, two_factor_enabled: v })}
                                    />
                                </div>
                                <div className="bg-default-50 p-4 rounded-xl border border-divider">
                                    <p className="text-sm font-semibold mb-1">Last Password Change</p>
                                    <p className="text-sm text-default-500">{profile.last_password_change ? new Date(profile.last_password_change).toLocaleString() : 'Never'}</p>
                                </div>
                            </CardBody>
                        </Card>

                        <div className="flex justify-end">
                            <Button
                                color="primary"
                                className="font-bold shadow-lg"
                                isLoading={isSaving}
                                onClick={handleUpdate}
                            >
                                {isSaving ? t('actions.loading') : t('actions.saveChanges')}
                            </Button>
                        </div>
                    </div>
                );
            case 'help':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold">{t('sections.help')}</h2>
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <HelpCircle className="text-primary" />
                                <p>{t('content.helpDescription')}</p>
                            </div>
                            <Button color="primary" className="mt-6">{t('content.supportTicket')}</Button>
                        </Card>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden relative">
            {/* Mobile Top Header */}
            <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-divider z-40 flex items-center px-4 justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        isIconOnly
                        variant="light"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <LayoutDashboard size={24} />
                    </Button>
                    <span className="font-bold text-lg text-gray-800">{t(`sections.${activeSection}`)}</span>
                </div>
                <Avatar
                    name={userInitial}
                    size="sm"
                    color="primary"
                    isBordered
                />
            </div>

            {/* Mobile Sidebar Overlay (Backdrop) */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Responsive Sidebar (Drawer on Mobile, Static on Desktop) */}
            <aside className={`
                w-64 border-r border-divider p-4 bg-white z-50 md:z-30 flex flex-col gap-6
                fixed top-0 bottom-0 left-0 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:top-auto md:bottom-auto
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="px-2 flex justify-between items-center md:block">
                    <User
                        name={profile.nickname || profile.firstname || user.email}
                        description={t('user.role')}
                        avatarProps={{
                            src: profile.profile_picture_url || undefined,
                            name: userInitial,
                            color: "primary",
                            isBordered: true
                        }}
                    />
                    {/* Close button for mobile */}
                    <Button isIconOnly variant="light" size="sm" className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </Button>
                </div>

                <Divider />

                <Listbox
                    aria-label="Navigation"
                    onAction={(key) => {
                        setActiveSection(key as Section);
                        setIsMobileMenuOpen(false); // Close menu on selection
                    }}
                    variant="flat"
                    color="primary"
                    className="p-0 gap-1"
                    itemClasses={{
                        base: "px-3 rounded-lg gap-3 h-12 data-[hover=true]:bg-default-100",
                        title: "text-base font-medium",
                    }}
                >
                    <ListboxItem
                        key="overview"
                        startContent={<LayoutDashboard size={20} />}
                        className={activeSection === 'overview' ? "bg-primary-50 text-primary" : ""}
                    >
                        {t('sections.overview')}
                    </ListboxItem>
                    <ListboxItem
                        key="children"
                        startContent={<Users size={20} />}
                        className={activeSection === 'children' ? "bg-primary-50 text-primary" : ""}
                    >
                        {t('sections.children')}
                    </ListboxItem>
                    <ListboxItem
                        key="privacy"
                        startContent={<ShieldCheck size={20} />}
                        className={activeSection === 'privacy' ? "bg-primary-50 text-primary" : ""}
                    >
                        {t('sections.privacy')}
                    </ListboxItem>
                    <ListboxItem
                        key="help"
                        startContent={<HelpCircle size={20} />}
                        className={activeSection === 'help' ? "bg-primary-50 text-primary" : ""}
                    >
                        {t('sections.help')}
                    </ListboxItem>
                </Listbox>

                <div className="mt-auto p-2">
                    <Chip color="success" variant="dot" size="sm">{t('user.status')}</Chip>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50/50 pt-20 md:pt-10">
                <div className="max-w-4xl mx-auto">
                    {renderSection()}
                </div>
            </main>
        </div>
    );
}
=======
'use client';

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Divider,
    Listbox,
    ListboxItem,
    User,
    Avatar,
    Chip,
    Spacer,
    Select,
    SelectItem,
    Switch,
    Textarea
} from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    HelpCircle,
    MapPin,
    UserCircle,
    Mail,
    Phone,
    CreditCard,
    Settings,
    Globe,
    Shield,
    Image as ImageIcon,
    ChevronDown
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Profile, Gender, RelativeToChildren, Theme } from '@/types/database';

interface DashboardClientProps {
    user: {
        id: string;
        email?: string;
        created_at: string;
    };
}

type Section = 'overview' | 'children' | 'privacy' | 'help';

export default function DashboardClient({ user }: DashboardClientProps) {
    const t = useTranslations('Dashboard');
    const tErrors = useTranslations('Errors');
    const supabase = createClient();
    const [activeSection, setActiveSection] = useState<Section>('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [profile, setProfile] = useState<Partial<Profile>>({});
    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

    const userInitial = user.email?.charAt(0).toUpperCase();

    // Load collapsed states from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('dashboard_collapsed_groups');
        if (saved) {
            try {
                setCollapsedGroups(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse collapsed groups:', e);
            }
        }
    }, []);

    // Save collapsed states to localStorage
    const toggleGroup = (groupId: string) => {
        const newState = {
            ...collapsedGroups,
            [groupId]: !collapsedGroups[groupId]
        };
        setCollapsedGroups(newState);
        localStorage.setItem('dashboard_collapsed_groups', JSON.stringify(newState));
    };

    useEffect(() => {
        async function loadProfile() {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setProfile(data);
            } else if (error && error.code === 'PGRST116') {
                // Profile doesn't exist yet, we'll initialize with user data
                setProfile({
                    id: user.id,
                    email: user.email || '',
                    firstname: '',
                    lastname: '',
                    address_timezone: 'UTC',
                    address_country: 'US',
                    billing_country: 'US',
                    billing_same_as_shipping_address: true,
                    is_subscribed: true,
                    subscription_tier: 'free',
                    communication_preferences: {
                        marketing_emails: false,
                        newsletter: false,
                        product_updates: false,
                        security_alerts: true,
                        security_alerts_via_sms: false,
                        security_alerts_via_email: true,
                        security_alerts_via_push: false,
                        security_alerts_via_whatsapp: false
                    },
                    theme: 'light',
                    language: 'en',
                    date_format: 'MM/DD/YYYY',
                    time_format: '12h'
                } as Partial<Profile>);
            }
            setIsLoading(false);
        }
        loadProfile();
    }, [user.id, user.email, supabase]);

    const handleUpdate = async () => {
        setIsSaving(true);
        const { error } = await supabase
            .from('profiles')
            .upsert({
                ...profile,
                id: user.id,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Error updating profile:', error);
            alert(tErrors('generic'));
        }
        setIsSaving(false);
    };

    const renderSection = () => {
        if (isLoading) return <div className="flex justify-center p-10"><Spacer y={10} /><p>Loading profile...</p></div>;

        switch (activeSection) {
            case 'overview':
                return (
                    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
                        <h2 className="text-2xl font-bold">{t('sections.overview')}</h2>

                        {/* Group Box 1 - Personal Information */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('personalInfo')}
                            >
                                <UserCircle className="text-primary" />
                                <p className="text-lg font-bold flex-1">{t('sections.personalInfo')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['personalInfo'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['personalInfo'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <Input
                                            label={t('fields.firstname')}
                                            placeholder={t('placeholders.firstname')}
                                            value={profile.firstname || ''}
                                            onValueChange={(v) => setProfile({ ...profile, firstname: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={150}
                                            isRequired
                                        />
                                        <Input
                                            label={t('fields.lastname')}
                                            placeholder={t('placeholders.lastname')}
                                            value={profile.lastname || ''}
                                            onValueChange={(v) => setProfile({ ...profile, lastname: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={100}
                                        />
                                        <Input
                                            label={t('fields.nickname')}
                                            placeholder={t('placeholders.nickname')}
                                            value={profile.nickname || ''}
                                            onValueChange={(v) => setProfile({ ...profile, nickname: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={25}
                                        />
                                        <Select
                                            label={t('fields.gender')}
                                            placeholder={t('fields.gender')}
                                            selectedKeys={profile.gender ? [profile.gender] : []}
                                            onSelectionChange={(keys) => setProfile({ ...profile, gender: Array.from(keys)[0] as Gender })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        >
                                            <SelectItem key="male" value="male">{t('options.genders.male')}</SelectItem>
                                            <SelectItem key="female" value="female">{t('options.genders.female')}</SelectItem>
                                            <SelectItem key="diverse" value="diverse">{t('options.genders.diverse')}</SelectItem>
                                            <SelectItem key="prefer_not_to_say" value="prefer_not_to_say">{t('options.genders.prefer_not_to_say')}</SelectItem>
                                        </Select>
                                        <Select
                                            label={t('fields.relative_to_children')}
                                            placeholder={t('fields.relative_to_children')}
                                            selectedKeys={profile.relative_to_children ? [profile.relative_to_children] : ['Mother']}
                                            onSelectionChange={(keys) => setProfile({ ...profile, relative_to_children: Array.from(keys)[0] as RelativeToChildren })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            className="md:col-span-2"
                                        >
                                            {['Mother', 'Father', 'Uncle', 'Aunt', 'Grandfather', 'Grandmother', 'Other'].map(r => (
                                                <SelectItem key={r} value={r}>{t(`options.relations.${r}`)}</SelectItem>
                                            ))}
                                        </Select>
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 2 - Contact Information */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('contactInfo')}
                            >
                                <Mail className="text-success" />
                                <p className="text-lg font-bold flex-1">{t('sections.contactInfo')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['contactInfo'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['contactInfo'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <Input
                                            label={t('fields.email')}
                                            value={profile.email || ''}
                                            variant="bordered"
                                            isDisabled
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.phone')}
                                            placeholder={t('placeholders.phone')}
                                            value={profile.phone || ''}
                                            onValueChange={(v) => setProfile({ ...profile, phone: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={20}
                                            startContent={profile.phone_is_verified && <Chip size="sm" color="success" variant="flat">Verified</Chip>}
                                        />
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 3 - Shipping Address */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('address')}
                            >
                                <MapPin className="text-secondary" />
                                <p className="text-lg font-bold flex-1">{t('sections.address')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['address'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['address'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                        <Input
                                            label={t('fields.address_line1')}
                                            placeholder={t('placeholders.address_line1')}
                                            value={profile.address_line1 || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_line1: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            className="md:col-span-2"
                                            maxLength={255}
                                        />
                                        <Input
                                            label={t('fields.address_additional_info')}
                                            value={profile.address_additional_info || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_additional_info: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={100}
                                        />
                                        <Input
                                            label={t('fields.address_city')}
                                            placeholder={t('placeholders.city')}
                                            value={profile.address_city || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_city: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.address_state')}
                                            value={profile.address_state || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_state: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.address_postal_code')}
                                            placeholder={t('placeholders.zip')}
                                            value={profile.address_postal_code || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_postal_code: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.address_country')}
                                            value={profile.address_country || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_country: v.toUpperCase() })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            maxLength={2}
                                        />
                                        <Input
                                            label={t('fields.address_timezone')}
                                            value={profile.address_timezone || ''}
                                            onValueChange={(v) => setProfile({ ...profile, address_timezone: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            className="md:col-span-2"
                                        />
                                        <div className="md:col-span-3 pt-2">
                                            <Switch
                                                isSelected={profile.billing_same_as_shipping_address}
                                                onValueChange={(v) => setProfile({ ...profile, billing_same_as_shipping_address: v })}
                                            >
                                                {t('fields.billing_same_as_shipping')}
                                            </Switch>
                                        </div>
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 4 - Billing Address (if different) */}
                        {!profile.billing_same_as_shipping_address && (
                            <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md animate-in slide-in-from-top-2">
                                <CardHeader
                                    className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                    onClick={() => toggleGroup('billingAddress')}
                                >
                                    <CreditCard className="text-warning" />
                                    <p className="text-lg font-bold flex-1">{t('sections.billingAddress')}</p>
                                    <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['billingAddress'] ? '-rotate-90' : ''}`} />
                                </CardHeader>
                                {!collapsedGroups['billingAddress'] && (
                                    <>
                                        <Divider />
                                        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                            <Input
                                                label={t('fields.billing_address_line1')}
                                                value={profile.billing_address_line1 || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_address_line1: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                                className="md:col-span-2"
                                            />
                                            <Input
                                                label={t('fields.billing_address_additional_info')}
                                                value={profile.billing_address_additional_info || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_address_additional_info: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                            />
                                            <Input
                                                label={t('fields.billing_city')}
                                                value={profile.billing_city || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_city: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                            />
                                            <Input
                                                label={t('fields.billing_state')}
                                                value={profile.billing_state || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_state: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                            />
                                            <Input
                                                label={t('fields.billing_postal_code')}
                                                value={profile.billing_postal_code || ''}
                                                onValueChange={(v) => setProfile({ ...profile, billing_postal_code: v })}
                                                variant="bordered"
                                                labelPlacement="outside"
                                            />
                                        </CardBody>
                                    </>
                                )}
                            </Card>
                        )}

                        {/* Group Box 5 - Subscription */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('settings')}
                            >
                                <Settings className="text-default-500" />
                                <p className="text-lg font-bold flex-1">{t('sections.settings')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['settings'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['settings'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        <div className="flex flex-col justify-center">
                                            <Switch
                                                isSelected={profile.is_subscribed}
                                                onValueChange={(v) => setProfile({ ...profile, is_subscribed: v })}
                                            >
                                                {t('fields.is_subscribed')}
                                            </Switch>
                                        </div>
                                        <Input
                                            label={t('fields.subscription_tier')}
                                            value={profile.subscription_tier || 'free'}
                                            variant="bordered"
                                            isDisabled
                                            labelPlacement="outside"
                                        />

                                        <div className="md:col-span-2 pt-2">
                                            <div className="flex justify-between items-center bg-default-50/50 p-4 rounded-xl border border-divider">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm">{t('fields.two_factor_enabled')}</span>
                                                    <span className="text-xs text-default-400">Add an extra layer of security to your account.</span>
                                                </div>
                                                <Switch
                                                    isSelected={profile.two_factor_enabled}
                                                    onValueChange={(v) => setProfile({ ...profile, two_factor_enabled: v })}
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 6 - Communication Preferences (JSONB) */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('communication')}
                            >
                                <Mail className="text-primary-400" />
                                <p className="text-lg font-bold flex-1">{t('sections.communication_preferences') || 'Communication Preferences'}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['communication'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['communication'] && (
                                <>
                                    <Divider />
                                    <CardBody className="pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {profile.communication_preferences && Object.entries(profile.communication_preferences).map(([key, val]) => (
                                                <div key={key} className="flex flex-col gap-2 p-3 rounded-lg border border-divider hover:bg-default-50 transition-colors">
                                                    <Switch
                                                        size="sm"
                                                        isSelected={val as boolean}
                                                        onValueChange={(v) => setProfile({
                                                            ...profile,
                                                            communication_preferences: {
                                                                ...profile.communication_preferences!,
                                                                [key]: v
                                                            }
                                                        })}
                                                    >
                                                        <span className="text-sm font-medium">
                                                            {key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                        </span>
                                                    </Switch>
                                                </div>
                                            ))}
                                        </div>
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 8 - Social Media & Bio */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('social')}
                            >
                                <ImageIcon className="text-default-500" />
                                <p className="text-lg font-bold flex-1">{t('sections.social')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['social'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['social'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 gap-6 pt-4">
                                        <Input
                                            label={t('fields.profile_picture_url')}
                                            placeholder="https://example.com/photo.jpg"
                                            value={profile.profile_picture_url || ''}
                                            onValueChange={(v) => setProfile({ ...profile, profile_picture_url: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            startContent={<ImageIcon size={18} className="text-default-400" />}
                                        />
                                        <Textarea
                                            label={t('fields.bio')}
                                            placeholder={t('placeholders.bio')}
                                            value={profile.bio || ''}
                                            onValueChange={(v) => setProfile({ ...profile, bio: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            minRows={3}
                                        />
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        {/* Group Box 8 - App Preferences */}
                        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader
                                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                                onClick={() => toggleGroup('preferences')}
                            >
                                <Globe className="text-primary-300" />
                                <p className="text-lg font-bold flex-1">{t('sections.preferences')}</p>
                                <ChevronDown className={`transition-transform duration-300 ${collapsedGroups['preferences'] ? '-rotate-90' : ''}`} />
                            </CardHeader>
                            {!collapsedGroups['preferences'] && (
                                <>
                                    <Divider />
                                    <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <Select
                                            label={t('fields.theme')}
                                            selectedKeys={profile.theme ? [profile.theme] : ['light']}
                                            onSelectionChange={(keys) => setProfile({ ...profile, theme: Array.from(keys)[0] as Theme })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        >
                                            <SelectItem key="light" value="light">{t('options.themes.light')}</SelectItem>
                                            <SelectItem key="dark" value="dark">{t('options.themes.dark')}</SelectItem>
                                            <SelectItem key="system" value="system">{t('options.themes.system')}</SelectItem>
                                        </Select>
                                        <Input
                                            label={t('fields.language')}
                                            value={profile.language || 'en'}
                                            onValueChange={(v) => setProfile({ ...profile, language: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.date_format')}
                                            value={profile.date_format || 'MM/DD/YYYY'}
                                            onValueChange={(v) => setProfile({ ...profile, date_format: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label={t('fields.time_format')}
                                            value={profile.time_format || '12h'}
                                            onValueChange={(v) => setProfile({ ...profile, time_format: v })}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            className="md:col-span-2"
                                        />
                                    </CardBody>
                                </>
                            )}
                        </Card>

                        <div className="flex justify-end sticky bottom-6 z-10">
                            <Button
                                color="primary"
                                className="font-bold shadow-lg h-14 px-8"
                                isLoading={isSaving}
                                onClick={handleUpdate}
                                size="lg"
                            >
                                {isSaving ? t('actions.loading') : t('actions.saveChanges')}
                            </Button>
                        </div>
                    </div>
                );
            case 'children':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold">{t('sections.children')}</h2>
                        <Card className="p-12 items-center justify-center text-center border-dashed border-2">
                            <Users size={48} className="text-default-300 mb-4" />
                            <p className="text-default-500">{t('content.noChildren')}</p>
                            <Button color="primary" variant="flat" className="mt-4">{t('content.addChild')}</Button>
                        </Card>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
                        <h2 className="text-2xl font-bold">{t('sections.privacySecurity') || t('sections.privacy')}</h2>

                        {/* Group Box 7 - Privacy & Security */}
                        <Card className="p-6 border-none bg-white/70 backdrop-blur-md">
                            <CardHeader className="flex gap-3 pb-2">
                                <Shield className="text-danger" />
                                <p className="text-lg font-bold">{t('sections.privacySecurity')}</p>
                            </CardHeader>
                            <Divider />
                            <CardBody className="space-y-6 pt-4">
                                <p className="text-default-500">{t('content.privacyDescription')}</p>
                                <div className="flex justify-between items-center bg-default-50 p-4 rounded-xl border border-divider">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{t('fields.two_factor_enabled')}</span>
                                        <span className="text-xs text-default-400">Add an extra layer of security to your account.</span>
                                    </div>
                                    <Switch
                                        isSelected={profile.two_factor_enabled}
                                        onValueChange={(v) => setProfile({ ...profile, two_factor_enabled: v })}
                                    />
                                </div>
                                <div className="bg-default-50 p-4 rounded-xl border border-divider">
                                    <p className="text-sm font-semibold mb-1">Last Password Change</p>
                                    <p className="text-sm text-default-500">{profile.last_password_change ? new Date(profile.last_password_change).toLocaleString() : 'Never'}</p>
                                </div>
                            </CardBody>
                        </Card>

                        <div className="flex justify-end">
                            <Button
                                color="primary"
                                className="font-bold shadow-lg"
                                isLoading={isSaving}
                                onClick={handleUpdate}
                            >
                                {isSaving ? t('actions.loading') : t('actions.saveChanges')}
                            </Button>
                        </div>
                    </div>
                );
            case 'help':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold">{t('sections.help')}</h2>
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <HelpCircle className="text-primary" />
                                <p>{t('content.helpDescription')}</p>
                            </div>
                            <Button color="primary" className="mt-6">{t('content.supportTicket')}</Button>
                        </Card>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden relative">
            {/* Mobile Top Header */}
            <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-divider z-40 flex items-center px-4 justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        isIconOnly
                        variant="light"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <LayoutDashboard size={24} />
                    </Button>
                    <span className="font-bold text-lg text-gray-800">{t(`sections.${activeSection}`)}</span>
                </div>
                <Avatar
                    name={userInitial}
                    size="sm"
                    color="primary"
                    isBordered
                />
            </div>

            {/* Mobile Sidebar Overlay (Backdrop) */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Responsive Sidebar (Drawer on Mobile, Static on Desktop) */}
            <aside className={`
                w-64 border-r border-divider p-4 bg-white z-50 md:z-30 flex flex-col gap-6
                fixed top-0 bottom-0 left-0 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:top-auto md:bottom-auto
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="px-2 flex justify-between items-center md:block">
                    <User
                        name={profile.nickname || profile.firstname || user.email}
                        description={t('user.role')}
                        avatarProps={{
                            src: profile.profile_picture_url || undefined,
                            name: userInitial,
                            color: "primary",
                            isBordered: true
                        }}
                    />
                    {/* Close button for mobile */}
                    <Button isIconOnly variant="light" size="sm" className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </Button>
                </div>

                <Divider />

                <Listbox
                    aria-label="Navigation"
                    onAction={(key) => {
                        setActiveSection(key as Section);
                        setIsMobileMenuOpen(false); // Close menu on selection
                    }}
                    variant="flat"
                    color="primary"
                    className="p-0 gap-1"
                    itemClasses={{
                        base: "px-3 rounded-lg gap-3 h-12 data-[hover=true]:bg-default-100",
                        title: "text-base font-medium",
                    }}
                >
                    <ListboxItem
                        key="overview"
                        startContent={<LayoutDashboard size={20} />}
                        className={activeSection === 'overview' ? "bg-primary-50 text-primary" : ""}
                    >
                        {t('sections.overview')}
                    </ListboxItem>
                    <ListboxItem
                        key="children"
                        startContent={<Users size={20} />}
                        className={activeSection === 'children' ? "bg-primary-50 text-primary" : ""}
                    >
                        {t('sections.children')}
                    </ListboxItem>
                    <ListboxItem
                        key="privacy"
                        startContent={<ShieldCheck size={20} />}
                        className={activeSection === 'privacy' ? "bg-primary-50 text-primary" : ""}
                    >
                        {t('sections.privacy')}
                    </ListboxItem>
                    <ListboxItem
                        key="help"
                        startContent={<HelpCircle size={20} />}
                        className={activeSection === 'help' ? "bg-primary-50 text-primary" : ""}
                    >
                        {t('sections.help')}
                    </ListboxItem>
                </Listbox>

                <div className="mt-auto p-2">
                    <Chip color="success" variant="dot" size="sm">{t('user.status')}</Chip>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50/50 pt-20 md:pt-10">
                <div className="max-w-4xl mx-auto">
                    {renderSection()}
                </div>
            </main>
        </div>
    );
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9
