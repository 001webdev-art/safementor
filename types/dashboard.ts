import { Profile, Gender, RelativeToChildren, Theme } from './database';

export type Section = 'overview' | 'notifications' | 'personal-data' | 'children-data' | 'privacy' | 'children' | 'help';

export interface Child {
    id: string;
    parent_id: string;
    childrenname: string;
    nickname: string | null;
    age: number | null;
    gender: string | null; // Male, Female, Diverse, Prefer Not to Say
    email: string | null;
    phone: string | null;
    medical_has_allergies: boolean;
    medical_has_mental_disorders: boolean;
    medical_has_physical_disorders: boolean;
    date_birth: string | null;
    language: string | null;
    updated_at: string;
    updated_by: string | null;
}

export interface DashboardClientProps {
    user: {
        id: string;
        email?: string;
        created_at: string;
    };
}

export interface FormProps {
    profile: Partial<Profile>;
    onProfileChange: (profile: Partial<Profile>) => void;
    isCollapsed: boolean;
    onToggle: () => void;
    t: (key: string) => string;
}

export interface ChildFormProps {
    child: Partial<Child>;
    onChildChange: (child: Partial<Child>) => void;
    t: (key: string) => string;
}

export interface SectionProps {
    profile: Partial<Profile>;
    onProfileChange: (profile: Partial<Profile>) => void;
    isLoading: boolean;
    isSaving: boolean;
    onSave: () => void;
    collapsedGroups: Record<string, boolean>;
    toggleGroup: (id: string) => void;
    t: (key: string) => string;
}

export interface ChildrenSectionProps extends Omit<SectionProps, 'onProfileChange' | 'profile'> {
    childList: Child[];
    selectedChildId: string | null;
    onSelectChild: (id: string | null) => void;
    isAddingChild: boolean;
    onSetAddingChild: (val: boolean) => void;
    onUpsertChild: (child: Partial<Child>) => Promise<void>;
    onDeleteChild: (id: string) => Promise<void>;
}

export interface CollapsibleCardProps {
    id: string;
    title: string;
    icon: React.ReactNode;
    isCollapsed: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}
