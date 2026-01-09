export async function callLLM(provider: string, messages: any[]) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''; // Example for client-side if needed, but better server-side

    // This should probably be an API route to keep secrets safe
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, messages }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'LLM Error');
    }

    return response.json();
}
