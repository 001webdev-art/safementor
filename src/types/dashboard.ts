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
    // date_birth: string | null;
    birth_month: number | null;
    birth_year: number | null;
    language: string | null;
    device?: string;
    avatar?: string;
    updated_at: string;
    updated_by: string | null;
}

export interface SafetyAlert {
    id: string;
    type: 'info' | 'yellow' | 'red';
    title: string;
    description: string;
    timestamp: string;
    childId?: string;
    quote?: string;
}

export interface EmotionTrend {
    date: string;
    score: number;
    label: string;
}

export class DashboardService {
    static async getChildren(): Promise<Child[]> {
        return [
            {
                id: 'child-1',
                parent_id: 'parent-1',
                nickname: 'Alex',
                childrenname: 'Alex Johnson',
                email: 'alex@example.com',
                phone: null,
                age: null,
                gender: null,
                medical_has_allergies: false,
                medical_has_mental_disorders: false,
                medical_has_physical_disorders: false,
                birth_month: 5,
                birth_year: 2018,
                language: 'en',
                updated_at: new Date().toISOString(),
                updated_by: null
            },
            {
                id: 'child-2',
                parent_id: 'parent-1',
                nickname: 'Sam',
                childrenname: 'Sam Smith',
                email: 'sam@example.com',
                phone: null,
                age: null,
                gender: null,
                medical_has_allergies: false,
                medical_has_mental_disorders: false,
                medical_has_physical_disorders: false,
                birth_month: 12,
                birth_year: 2020,
                language: 'en',
                updated_at: new Date().toISOString(),
                updated_by: null
            }
        ];
    }

    static async getAlerts(): Promise<SafetyAlert[]> {
        return [
            {
                id: '1',
                type: 'red',
                title: 'Self-Harm Mention Detected',
                description: 'Immediate attention required',
                timestamp: '2 hours ago',
                childId: 'child-1',
                quote: 'I just want to disappear...'
            },
            {
                id: '2',
                type: 'yellow',
                title: 'Sleep Pattern Change',
                description: 'Child mentioned difficulty sleeping',
                timestamp: '1 day ago',
                childId: 'child-2'
            }
        ];
    }

    static async getEmotionTrends(_childId: string, days: number): Promise<EmotionTrend[]> {
        const data: EmotionTrend[] = [];
        for (let i = days - 1; i >= 0; i -= 1) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            data.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                score: 60 + Math.random() * 30,
                label: 'Positive'
            });
        }
        return data;
    }
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
    isCollapsed?: boolean;
    onToggle?: () => void;
    t: (key: string) => string;
    countries?: { country_id: number; country_name: string }[];
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
