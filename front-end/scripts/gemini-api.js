// Substitua pela sua chave de API:

const API_KEY = '';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

/**
 * Envia um prompt para a API do Gemini e retorna a resposta.
 * @param {string} prompt O prompt para enviar à IA.
 * @param {object} generationConfig Configurações de geração opcionais (temperature, maxOutputTokens, etc.)
 * @param {Array<object>} safetySettings Configurações de segurança opcionais.
 * @returns {Promise<object|null>} A resposta da API ou null em caso de erro.
 */
async function generateContentWithGemini(prompt, generationConfig = {}, safetySettings = []) {
    const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: Object.keys(generationConfig).length > 0 ? generationConfig : undefined,
        safetySettings: safetySettings.length > 0 ? safetySettings : undefined,
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro da API Gemini:', response.status, errorData);
            throw new Error(`Erro da API Gemini: ${response.status} - ${errorData.error?.message || 'Erro desconhecido'}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0 && 
            data.candidates[0].content && data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.warn('Resposta da API Gemini não contém o conteúdo esperado:', data);
            if (data.promptFeedback && data.promptFeedback.blockReason) {
                throw new Error(`Prompt bloqueado pela API Gemini: ${data.promptFeedback.blockReason}`);
            }
            return null;
        }

    } catch (error) {
        console.error('Erro ao chamar a API Gemini:', error);
        throw error;
    }
}