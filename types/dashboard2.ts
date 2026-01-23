// types/dashboard2.ts
// Tipos para o Dashboard SafeMentor

export interface Child {
    id: string;
    nickname: string;
    device?: string;
    avatar?: string;
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
    score: number; // 0-100
    label: string;
}

// Mock services (substitua pelos seus serviços reais)
export class DashboardService {
    static async getChildren(): Promise<Child[]> {
        // Simula dados mock
        return [
            { id: 'child-1', nickname: 'Alex', device: 'iPhone 13' },
            { id: 'child-2', nickname: 'Sam', device: 'iPad Air' },
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
                quote: 'I just want to disappear...',
            },
            {
                id: '2',
                type: 'yellow',
                title: 'Sleep Pattern Change',
                description: 'Child mentioned difficulty sleeping',
                timestamp: '1 day ago',
                childId: 'child-2',
            },
        ];
    }

    static async getEmotionTrends(childId: string, days: number): Promise<EmotionTrend[]> {
        // Gera dados mock para o gráfico
        const data: EmotionTrend[] = [];
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            data.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                score: 60 + Math.random() * 30, // 60-90% positivo
                label: 'Positive',
            });
        }
        return data;
    }
}
