export type Gender = 'male' | 'female' | 'diverse' | 'prefer_not_to_say';
export type RelativeToChildren = 'Mother' | 'Father' | 'Uncle' | 'Aunt' | 'Grandfather' | 'Grandmother' | 'Other';
export type Theme = 'light' | 'dark' | 'system';

export interface Profile {
    id: string;

    // Group Box 1 - Personal Information
    firstname: string;
    lastname: string | null;
    nickname: string | null;
    gender: Gender | null;
    relative_to_children: RelativeToChildren;

    // Group Box 2 - Contact Information
    email: string;
    phone: string | null;
    phone_is_verified: boolean;

    // Group Box 3 - Address
    address_line1: string | null;
    address_additional_info: string | null;
    address_city: string | null;
    address_state: string | null;
    address_country: string;
    address_postal_code: string | null;
    address_timezone: string;
    billing_same_as_shipping_address: boolean;

    // Group Box 4 - Billing Address
    billing_address_line1: string | null;
    billing_address_additional_info: string | null;
    billing_city: string | null;
    billing_state: string | null;
    billing_country: string;
    billing_postal_code: string | null;

    // Group Box 5 - Parent-Specific Settings
    is_subscribed: boolean;
    subscription_tier: string;

    // Group Box 6 & 7 - Communication & Security
    communication_preferences: {
        marketing_emails: boolean;
        newsletter: boolean;
        product_updates: boolean;
        security_alerts: boolean;
        security_alerts_via_sms: boolean;
        security_alerts_via_email: boolean;
        security_alerts_via_push: boolean;
        security_alerts_via_whatsapp: boolean;
    };
    two_factor_enabled: boolean;
    last_password_change: string | null;

    // Group Box 8 - UI/App Preferences & Social
    theme: Theme;
    language: string;
    date_format: string;
    time_format: string;
    profile_picture_url: string | null;
    bio: string | null;

    // Metadata
    created_at: string;
    updated_at: string;
    last_login_at: string | null;

    // Compliance
    terms_agreed1: boolean;
    terms_help_improve: boolean;
    terms_allow_anonymous_safety_analysis: boolean;
}

