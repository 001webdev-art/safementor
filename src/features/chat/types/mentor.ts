export interface IntentAnalysis {
    intensity: number;      // 0-10 emotional intensity
    valence: number;        // -5 to +5 emotional valence
    flag: "violence" | "self_harm" | "distress" | "none" | string;
    means: boolean;         // Has means to execute intent
    actionable: boolean;    // Immediate actionable intent detected
    prob: number;           // 0-100 confidence score
    summary: string;        // Intent summary
}

export type StreamChunk =
    | { type: "intent"; data: IntentAnalysis }
    | { type: "content"; content: string }           // Streaming text token
    | { type: "emotion"; content: string }           // Final [EMOTION: x] extraction
    | { type: "metadata"; emotion: string; summary: string }
    | { type: "model"; content: string }             // "8B" or "70B" (routing info)
    | { type: "metrics"; data: Record<string, string> }
    | { type: "error"; content: string };

export interface MentorRequest {
    message: string;
    child_age?: string;
    child_country?: string;
    child_language?: string;
    chat_history?: Array<{ role: "user" | "assistant"; content: string }>;
    summary_context?: string;
}
