import { MentorRequest, StreamChunk } from '../types/mentor';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

/**
 * Robust NDJSON stream fetcher for the Mentor API.
 * Handles partial chunks and provides a callback for each parsed chunk.
 */
export async function streamMentorResponse(
    payload: MentorRequest,
    onChunk: (chunk: StreamChunk) => void,
    signal?: AbortSignal
) {
    const response = await fetch(`${BACKEND_URL}/mentor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/x-ndjson',
        },
        body: JSON.stringify(payload),
        signal,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Mentor API Error (${response.status}): ${errorText}`);
    }

    if (!response.body) {
        throw new Error('No response body received from Mentor API');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Decode current chunk and append to buffer
            buffer += decoder.decode(value, { stream: true });

            // Split buffer by newlines to parse complete JSON lines
            const lines = buffer.split('\n');

            // Keep the last part of the split in the buffer (it might be incomplete)
            buffer = lines.pop() || '';

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine) continue;

                try {
                    const chunk: StreamChunk = JSON.parse(trimmedLine);
                    onChunk(chunk);
                } catch (e) {
                    console.warn('Failed to parse NDJSON line:', trimmedLine, e);
                }
            }
        }
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.log('Mentor stream aborted');
        } else {
            throw error;
        }
    } finally {
        reader.releaseLock();
    }
}
