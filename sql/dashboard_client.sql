--the table is based on the Supabase plubic.profile table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,

  -- Personal Information - Group Box 1
  firstname VARCHAR(150) NOT NULL,
  lastname VARCHAR(100),
  nickname VARCHAR(25),
  gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'diverse', 'prefer_not_to_say')),
  relative_to_children VARCHAR(20) default 'Mother', --Drop down Box contains: "Mother", "Father", "Uncle", "Aunt", "Grandfather", "Grandmother", "Other"
  
  -- Contact Information - Group Box 2
  email VARCHAR(254) UNIQUE NOT NULL,
  phone VARCHAR(20),
  phone_is_verified BOOLEAN DEFAULT false,

  -- Address - Group Box 3
  address_line1 VARCHAR(255),
  address_additional_info VARCHAR(100),
  address_city VARCHAR(100),
  address_state VARCHAR(100),
  address_country VARCHAR(2) DEFAULT 'US',
  address_postal_code VARCHAR(20),
  address_timezone VARCHAR(50) DEFAULT 'UTC',
  billing_same_as_shipping_address BOOLEAN DEFAULT true,

-- Billing Address - Group Box 4
  billing_address_line1 VARCHAR(255),
  billing_address_additional_info VARCHAR(100),
  billing_city VARCHAR(100),
  billing_state VARCHAR(100),
  billing_country VARCHAR(2) DEFAULT 'US',
  billing_postal_code VARCHAR(20),
  
  -- Parent-Specific Settings - Group Box 5
  is_subscribed BOOLEAN DEFAULT true,
  subscription_tier VARCHAR(20) DEFAULT 'free',

  --- Parent-Specific Privacy & Security ettings - Group Box 6
  --- down, separate the security fields in the UI with a simple separator

  communication_preferences JSONB DEFAULT '{
    "marketing_emails": false,
    "newsletter": false,
    "product_updates": false,   
    "security_alerts": true,
    "security_alerts_via_sms": false,
    "security_alerts_via_email": true,
    "security_alerts_via_push": false,
    "security_alerts_via_whatsapp": false    
  }',

  -- Privacy & Security - Group Box 7
  two_factor_enabled BOOLEAN DEFAULT false,
  last_password_change TIMESTAMPTZ,

  -- UI/App Preferences - Group Box 8
  theme VARCHAR(20) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  language VARCHAR(10) DEFAULT 'en',
  date_format VARCHAR(20) DEFAULT 'MM/DD/YYYY',
  time_format VARCHAR(20) DEFAULT '12h',

  -- Social Media - Group Box 8
  profile_picture_url VARCHAR(500),
  bio TEXT, -- mantido: pode ser longo

  -- Metadata - Group Box 9
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_country ON profiles(address_country);
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);