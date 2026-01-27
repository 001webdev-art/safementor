// --- TYPES ---

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child';
  token?: string;
}

export interface Child {
  id: string;
  nickname: string;
  device: string;
  status: 'connected' | 'paused' | 'disconnected';
  lastSession: string;
  riskLevel: 'safe' | 'yellow' | 'red';
}

export interface SafetyAlert {
  id: string;
  childId: string;
  type: 'info' | 'yellow' | 'red';
  title: string;
  description: string;
  timestamp: string;
  details?: string;
  isAcknowledged: boolean;
}

export interface EmotionTrend {
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number; // 0-100
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isSafetyWarning?: boolean;
}

// --- CONFIGURATION ---

// Update this URL to point to your Antygravity backend
const API_BASE_URL = "http://localhost:8000";

// Set to FALSE when integrating with the real backend
const USE_MOCK_DATA = false;

// --- API CLIENT HELPERS ---

const headers = {
  'Content-Type': 'application/json',
  // Add auth tokens here if needed: 'Authorization': `Bearer ${token}`
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- SERVICES ---

export const AuthService = {
  login: async (email: string, password: string): Promise<User> => {
    if (USE_MOCK_DATA) {
      await delay(1000);
      if (email === "error@test.com") throw new Error("Invalid credentials");
      return { id: "p1", name: "Parent User", email, role: "parent", token: "mock-jwt" };
    }
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  signup: async (data: { name: string; email: string; password: string }): Promise<User> => {
    if (USE_MOCK_DATA) {
      await delay(1500);
      return { id: "p1", name: data.name, email: data.email, role: "parent", token: "mock-jwt" };
    }
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Signup failed');
    return res.json();
  },

  verifyIdentity: async (method: string, data: any): Promise<boolean> => {
    if (USE_MOCK_DATA) {
      await delay(2000);
      // Simulate verification success
      return true;
    }
    const res = await fetch(`${API_BASE_URL}/auth/verify-vpc`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ method, data })
    });
    return res.ok;
  }
};

export const ParentService = {
  getChildren: async (): Promise<Child[]> => {
    if (USE_MOCK_DATA) {
      await delay(600);
      return [
        { id: '1', nickname: 'PrincessElsa', device: 'iPhone 13', status: 'connected', lastSession: 'Today', riskLevel: 'safe' },
        { id: '2', nickname: 'Popeye', device: 'Android', status: 'connected', lastSession: 'Yesterday', riskLevel: 'safe' }
      ];
    }
    const res = await fetch(`${API_BASE_URL}/parent/children`, { headers });
    if (!res.ok) throw new Error('Failed to fetch children');
    return res.json();
  },

  getAlerts: async (childId?: string): Promise<SafetyAlert[]> => {
    if (USE_MOCK_DATA) {
      await delay(800);
      return [
        {
          id: '101',
          childId: '1',
          type: 'yellow',
          title: 'School anxiety mentioned',
          description: 'Pattern detected in recent conversations regarding math class.',
          timestamp: 'Yesterday, 4:15 PM',
          isAcknowledged: false
        },
        {
          id: '102',
          childId: '1',
          type: 'info',
          title: 'Positive mood patterns',
          description: 'Increased positive sentiment detected this week.',
          timestamp: 'Jan 5, 10:20 AM',
          isAcknowledged: true
        }
      ];
    }
    const url = childId ? `${API_BASE_URL}/parent/alerts?childId=${childId}` : `${API_BASE_URL}/parent/alerts`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
  },

  getEmotionTrends: async (childId: string, days: number = 7): Promise<EmotionTrend[]> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return [
        { date: 'Mon', sentiment: 'neutral', score: 50 },
        { date: 'Tue', sentiment: 'positive', score: 75 },
        { date: 'Wed', sentiment: 'positive', score: 80 },
        { date: 'Thu', sentiment: 'neutral', score: 60 },
        { date: 'Fri', sentiment: 'negative', score: 40 },
        { date: 'Sat', sentiment: 'positive', score: 85 },
        { date: 'Sun', sentiment: 'positive', score: 90 },
      ];
    }
    const res = await fetch(`${API_BASE_URL}/parent/emotions?childId=${childId}&days=${days}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch trends');
    return res.json();
  },

  pauseChildAccess: async (childId: string): Promise<boolean> => {
    if (USE_MOCK_DATA) {
      console.log(`[MOCK] Pausing child ${childId}...`);
      await delay(300);
      return true;
    }
    const res = await fetch(`${API_BASE_URL}/parent/children/${childId}/pause`, {
      method: 'POST',
      headers
    });
    return res.ok;
  }
};

export const ChildService = {
  sendMessage: async (text: string): Promise<ChatMessage> => {
    if (USE_MOCK_DATA) {
      await delay(1000);
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: "Mock AI Response",
        timestamp: new Date().toISOString()
      };
    }

    // Call Python Backend
    try {
      const res = await fetch(`${API_BASE_URL}/mentor`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: text,
          child_age: "10",
          safety_prompt: "Be supportive."
        })
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: data.reply,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Backend Error:", error);
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: "⚠️ I can't reach my brain. Please ask an adult to look at the terminal (launch backend).",
        timestamp: new Date().toISOString()
      };
    }
  },

  sendSafetyAlert: async (type: 'yellow' | 'red', details: string): Promise<boolean> => {
    if (USE_MOCK_DATA) {
      console.log(`[MOCK] Child Safety Alert: ${type}`, details);
      return true;
    }
    const res = await fetch(`${API_BASE_URL}/child/alert`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ type, details })
    });
    return res.ok;
  }
};
