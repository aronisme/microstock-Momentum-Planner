/**
 * AI Service - Unified interface for Gemini and Groq APIs
 * Primary: Google Gemini 2.5 Flash
 * Fallback: Groq (Llama 3.3 70B Versatile)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

/**
 * Call Gemini 2.5 Flash API
 */
async function callGeminiAPI(prompt) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
        throw new Error('GEMINI_API_KEY not configured');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`);
        }

        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error('No content in Gemini response');
        }

        return text;
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
}

/**
 * Call Groq API (Llama 3.3 70B Versatile)
 */
async function callGroqAPI(prompt) {
    if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
        throw new Error('GROQ_API_KEY not configured');
    }

    const url = 'https://api.groq.com/openai/v1/chat/completions';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.9,
                max_tokens: 2048,
                top_p: 0.95
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
        }

        const result = await response.json();
        const text = result.choices?.[0]?.message?.content;

        if (!text) {
            throw new Error('No content in Groq response');
        }

        return text;
    } catch (error) {
        console.error('Groq API Error:', error);
        throw error;
    }
}

/**
 * Main AI service with automatic fallback
 * @param {string} prompt - The prompt to send to the AI
 * @returns {Promise<string>} - The AI response
 */
export async function generateAIContent(prompt) {
    // Try Gemini first
    try {
        console.log('🤖 Trying Gemini 2.5 Flash...');
        const response = await callGeminiAPI(prompt);
        console.log('✅ Gemini success!');
        return response;
    } catch (geminiError) {
        console.warn('⚠️ Gemini failed, trying Groq fallback...', geminiError.message);

        // Fallback to Groq
        try {
            const response = await callGroqAPI(prompt);
            console.log('✅ Groq fallback success!');
            return response;
        } catch (groqError) {
            console.error('❌ Both AI providers failed');

            // Return user-friendly error message
            const errorMessage = `Maaf, layanan AI sedang bermasalah:\n\n` +
                `• Gemini: ${geminiError.message}\n` +
                `• Groq: ${groqError.message}\n\n` +
                `Silakan periksa API key Anda atau coba lagi nanti.`;

            return errorMessage;
        }
    }
}

/**
 * Check if AI service is properly configured
 */
export function isAIConfigured() {
    const hasGemini = GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here';
    const hasGroq = GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here';

    return {
        configured: hasGemini || hasGroq,
        providers: {
            gemini: hasGemini,
            groq: hasGroq
        }
    };
}
