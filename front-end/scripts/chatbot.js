const sidebarToggleButton = document.getElementById("sidebar-toggle-button");
const chatSidebar = document.getElementById("chat-sidebar");
const mainContent = document.getElementById("main-content");

if (sidebarToggleButton && chatSidebar && mainContent) {
    sidebarToggleButton.addEventListener("click", () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            chatSidebar.classList.toggle("open");
            if (mainContent) {
                mainContent.classList.toggle("sidebar-open-overlay");
            }
        } else {
            mainContent.classList.toggle("sidebar-desktop-collapsed");
        }
    });
}

document.addEventListener("click", (event) => {
    if (window.innerWidth < 768 && chatSidebar && chatSidebar.classList.contains("open")) {
        const isClickInsideSidebar = chatSidebar.contains(event.target);
        const isClickOnToggleButton = sidebarToggleButton && sidebarToggleButton.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnToggleButton) {
            chatSidebar.classList.remove("open");
            if (mainContent) {
                mainContent.classList.remove("sidebar-open-overlay");
            }
        }
    }
});

const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const newChatButton = document.getElementById("new-chat-button");

const originalSystemInstructions = `Você é a **GabirIA**, uma assistente de inteligência artificial **amigável, especialista e motivacional**, com foco total em auxiliar estudantes na **preparação para o ENEM**.

Sua missão é fornecer **informações claras, precisas e úteis**, sempre com um tom **encorajador, acessível e conversacional**.

### Diretrizes de Comunicação:

- Utilize **formatação em Markdown** para tornar suas respostas mais legíveis. Use \`**\` para **negrito**, \`*\` para *itálico* e listas com \`-\` ou \`*\` quando apropriado.
- **Mantenha a conversa fluida e natural.** Sempre que o usuário responder a uma pergunta sua, reconheça a resposta (ex: "Entendi!", "Perfeito!", "Boa!") e **dê continuidade ao diálogo com base nas informações fornecidas.**
- **Nunca inicie um novo tópico abruptamente** se o usuário estiver claramente respondendo ou continuando um assunto anterior. Priorize **coesão e progressão lógica** na conversa.
- Estruture suas respostas de forma **clara, organizada e objetiva**, podendo incluir:
    - Listas
    - Tabelas (se necessário)
    - Exemplos práticos
    - Explicações passo a passo
- **Evite respostas longas demais.** Seja direto ao ponto, mantendo o conteúdo relevante e aplicável.

### Instruções Específicas:

- Se o usuário fizer uma pergunta **fora do tema ENEM ou estudos**, responda com **educação** e **redirecione suavemente** a conversa para o tema de estudos e preparação.

- Se o usuário solicitar um **plano de estudos**, sua resposta DEVE SER EXCLUSIVAMENTE UM OBJETO JSON VÁLIDO. Não inclua nenhum texto, saudação, ou explicação fora da estrutura JSON. O JSON deve seguir esta estrutura:
  \`\`\`json
  {
    "titulo": "Meu Plano de Estudos Personalizado para o ENEM",
    "introducao": "Este plano foi cuidadosamente elaborado para otimizar seus estudos, focando nas áreas mais importantes e distribuindo o conteúdo de forma equilibrada ao longo das semanas.",
    "semanas": [
      {
        "semana": 1,
        "foco": "Revisão de Matemática Básica e Introdução à Redação",
        "dias": [
          { "dia": "Segunda-feira", "materias": ["Operações Fundamentais (Matemática)", "Estrutura do Texto Dissertativo-Argumentativo (Redação)"] },
          { "dia": "Terça-feira", "materias": ["Porcentagem e Juros Simples (Matemática)", "Coesão e Coerência (Redação)"] },
          { "dia": "Quarta-feira", "materias": ["Revisão Matemática", "Prática de Introdução (Redação)"] },
          { "dia": "Quinta-feira", "materias": ["Interpretação de Gráficos e Tabelas (Matemática)", "Tipos de Argumento (Redação)"] },
          { "dia": "Sexta-feira", "materias": ["Resolução de Problemas (Matemática)", "Análise de Temas Anteriores (Redação)"] },
          { "dia": "Sábado", "materias": ["Simulado Rápido (Matemática)", "Leitura e Atualidades"] },
          { "dia": "Domingo", "materias": ["Descanso e Planejamento da Próxima Semana"] }
        ]
      },
      {
        "semana": 2,
        "foco": "Aprofundamento em Linguagens e Ciências Humanas",
        "dias": [
          { "dia": "Segunda-feira", "materias": ["Interpretação de Texto (Linguagens)", "História do Brasil Colonial (Humanas)"] }
        ]
      }
    ],
    "dicasFinais": "Lembre-se de manter a consistência, fazer pausas regulares e revisar o conteúdo periodicamente. Boa sorte nos seus estudos!"
  }
  \`\`\`
  Adapte o conteúdo (foco, matérias, número de semanas) às necessidades específicas do usuário, mas MANTENHA A ESTRUTURA JSON INALTERADA.

- Se o usuário solicitar um **simulado**, forneça um **JSON contendo perguntas de múltipla escolha**, baseadas em provas anteriores do ENEM, com alternativas e a resposta correta. A estrutura deve ser:
  \`\`\`json
  {
    "titulo": "Título do Simulado",
    "perguntas": [
      {
        "enunciado": "Enunciado da pergunta 1",
        "alternativas": {
          "a": "Alternativa A",
          "b": "Alternativa B",
          "c": "Alternativa C",
          "d": "Alternativa D"
        },
        "respostaCorreta": "a"
      },
      {
        "enunciado": "Enunciado da pergunta 2",
        "alternativas": {
          "a": "Alternativa A",
          "b": "Alternativa B",
          "c": "Alternativa C",
          "d": "Alternativa D"
        },
        "respostaCorreta": "b"
      }
    ]
  }
  \`\`\`
  Sua resposta DEVE SER EXCLUSIVAMENTE este objeto JSON.

- Se o usuário solicitar uma **explicação de conteúdo** (ex: "o que é mitose?", "explique a Revolução Industrial"), forneça uma explicação clara e objetiva. A resposta deve ser **exclusivamente no formato JSON**, seguindo esta estrutura:
  \`\`\`json
  {
    "topico": "Mitose",
    "explicacao": "A mitose é um processo de divisão celular em que uma célula mãe origina duas células filhas geneticamente idênticas a ela e com o mesmo número de cromossomos...",
    "pontosChave": [
      "Uma célula mãe -> duas células filhas idênticas.",
      "Mantém o número de cromossomos."
    ],
    "dicasExtras": [
      "Lembre-se que a mitose é diferente da meiose.",
      "A mitose é importante para o crescimento e reparo de tecidos."
    ],
    "recursosAdicionais": [
      {
        "titulo": "Vídeo sobre Mitose",
        "link": "https://www.youtube.com/watch?v=..."
      }
    ],
    "exemploPratico": "Quando você se corta, a mitose é responsável pela regeneração da pele..."
  }
  \`\`\`
  Sua resposta DEVE SER EXCLUSIVAMENTE este objeto JSON.

- Se o usuário pedir **dicas de estudo**, ofereça sugestões **práticas e motivacionais**. (Markdown normal)

- Se o usuário solicitar um **resumo de matéria**, entregue um resumo **conciso e direto**. (Markdown normal)

Lembre-se: **Você é a GabirIA, a melhor aliada do estudante rumo ao ENEM.** 🌟`;

function formatConversationHistoryForPrompt() {
    let history = "";
    const messages = chatMessages.querySelectorAll(".message");
    messages.forEach((msgElement) => {
        const sender = msgElement.classList.contains("user") ? "Usuário" : "IA";
        if (msgElement.id && msgElement.id.startsWith("bot-thinking-")) {
            return;
        }
        const text = msgElement.textContent || msgElement.innerText;
        if (text) {
            history += `${sender}: ${text}\n`;
        }
    });
    return history.trim();
}

function detectAndProcessJSON(text, userQuery = "") {
    try {
        const jsonRegex = /```json\s*([\s\S]*?)\s*```|(\{[\s\S]*?\})/g;
        let match;
        let jsonData;

        while ((match = jsonRegex.exec(text)) !== null) {
            try {
                const jsonString = match[1] || match[2];
                console.log('jsonString:', jsonString);
                jsonData = JSON.parse(jsonString);
                console.log('jsonData:', jsonData);

                if (jsonData.titulo && jsonData.semanas && Array.isArray(jsonData.semanas)) {
                    localStorage.setItem("studyPlanData", JSON.stringify(jsonData));
                    return {
                        type: "plano-estudos",
                        data: jsonData,
                        redirectUrl: "../pages/plano-estudos.html", 
                    };
                } else if (jsonData.titulo && jsonData.perguntas && Array.isArray(jsonData.perguntas)) {
                    localStorage.setItem("gabarIA_simuladoData", JSON.stringify(jsonData));
                    window.location.href = "../pages/simulados.html";
                    return {
                        type: "simulado",
                        data: jsonData,
                        redirectUrl: "../pages/simulados.html", 
                    };
                } else if (jsonData.topico && (jsonData.explicacao || jsonData.pontosChave)) {
                    const dataToStore = { ...jsonData, userQuery: userQuery };
                    localStorage.setItem("gabarIA_explicacaoData", JSON.stringify(dataToStore));
                    return {
                        type: "materia",
                        data: dataToStore,
                        redirectUrl: "../pages/materias.html", 
                    };
                }
            } catch (parseError) {
                console.warn("Encontrado bloco JSON, mas falhou ao analisar:", parseError, "Bloco:", match[0]);
            }
        }
        return null; 
    } catch (error) {
        console.error("Erro geral em detectAndProcessJSON:", error);
        return null;
    }
}

function addMessage(text, sender, messageId = null) {
    if (!chatMessages) return;

    const messageDiv = document.createElement("div");

    if (messageId) {
        messageDiv.id = messageId;
    }

    if (sender === "bot") {
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,
                gfm: true,
                sanitize: false,
                smartLists: true,
                headerIds: false,
            });
            const formattedText = marked.parse(text)
                .replace(/<p>/g, '<p class="mb-2">')
                .replace(/<ul>/g, '<ul class="list-disc ml-4 mb-2">')
                .replace(/<ol>/g, '<ol class="list-decimal ml-4 mb-2">')
                .replace(/<h2>/g, '<h2 class="text-xl font-bold mb-2 mt-3">')
                .replace(/<h3>/g, '<h3 class="text-lg font-bold mb-2 mt-2">')
                .replace(/<code>/g, '<code class="bg-gray-800 text-green-400 px-1 rounded">')
                .replace(/<pre>/g, '<pre class="bg-gray-800 p-2 rounded mb-2 overflow-x-auto">');
            messageDiv.innerHTML = formattedText;
        } else {
            console.error("Marked.js não está carregado. Exibindo texto puro.");
            messageDiv.textContent = text;
        }
        messageDiv.classList.add("bg-gray-700", "text-white", "p-3", "rounded-lg", "mb-2", "max-w-xl", "mr-auto");
    } else {
        messageDiv.textContent = text;
        messageDiv.classList.add("bg-indigo-600", "text-white", "p-3", "rounded-lg", "mb-2", "max-w-xl", "ml-auto");
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeMessage(messageId) {
    const messageToRemove = document.getElementById(messageId);
    if (messageToRemove) {
        messageToRemove.remove();
    }
}

if (sendButton && chatInput && chatMessages) {
    sendButton.addEventListener("click", async () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, "user");
            chatInput.value = "";
            chatInput.style.height = "auto";
            chatInput.focus();

            const thinkingId = "bot-thinking-" + Date.now();
            addMessage("Pensando...", "bot", thinkingId);

            try {
                let systemPromptForThisTurn = originalSystemInstructions;

                const criticalInstruction = "\n\n### INSTRUÇÃO CRÍTICA PARA ESTA RESPOSTA:\nSua resposta DEVE SER EXCLUSIVAMENTE UM OBJETO JSON VÁLIDO, conforme detalhado nas instruções gerais. Não inclua nenhum texto, saudação, ou explicação fora da estrutura JSON. Verifique a validade do JSON antes de responder.";

                const lowerUserMessage = userMessage.toLowerCase();
                if (lowerUserMessage.includes("plano de estudo") || lowerUserMessage.includes("cronograma de estudo")) {
                    systemPromptForThisTurn += `${criticalInstruction} (Contexto: Plano de Estudos)`;
                } else if (lowerUserMessage.includes("simulado") || lowerUserMessage.includes("prova") || lowerUserMessage.includes("teste de conhecimento")) {
                    systemPromptForThisTurn += `${criticalInstruction} (Contexto: Simulado)`;
                } else if (
                    lowerUserMessage.includes("explique") ||
                    lowerUserMessage.includes("explicação de") ||
                    lowerUserMessage.includes("o que é") ||
                    lowerUserMessage.includes("resumo") || 
                    lowerUserMessage.includes("resuma") ||   
                    (lowerUserMessage.includes("fale sobre") && (lowerUserMessage.includes("matéria") || lowerUserMessage.includes("conteúdo") || lowerUserMessage.includes("tópico"))) ||
                    lowerUserMessage.includes("como funciona")
                ) {
                    systemPromptForThisTurn += `${criticalInstruction} (Contexto: Explicação de Conteúdo/Resumo)`;
                }

                const conversationHistory = formatConversationHistoryForPrompt();
                const finalSystemPromptContent = `${systemPromptForThisTurn}\n\n---HISTÓRICO DA CONVERSA ANTERIOR (SE HOUVER)---\n${conversationHistory}\n\n---MENSAGEM ATUAL DO USUÁRIO---\n${userMessage}`;
                
                const generationSettings = {
                    maxOutputTokens: 8192,
                    temperature: 0.7,
                    topP: 0.9,
                    topK: 40,
                };

                if (typeof generateContentWithGemini === 'undefined') {
                    console.error("generateContentWithGemini não está definida. Verifique gemini-api.js");
                    removeMessage(thinkingId);
                    addMessage("Erro de configuração: A função de IA não está disponível.", "bot");
                    return;
                }
                
                const botResponseText = await generateContentWithGemini(finalSystemPromptContent, generationSettings);
                removeMessage(thinkingId);

                if (botResponseText) {
                    const jsonResult = detectAndProcessJSON(botResponseText, userMessage);

                    if (jsonResult) {
                        let redirectMessage = "";
                        if (jsonResult.type === "plano-estudos") {
                            redirectMessage = "**Plano de estudos criado!** Redirecionando...";
                        } else if (jsonResult.type === "simulado") {
                            redirectMessage = "**Simulado criado!** Redirecionando...";
                        } else if (jsonResult.type === "materia") {
                            redirectMessage = "**Explicação criada!** Redirecionando...";
                        }
                        addMessage(redirectMessage, "bot");
                        setTimeout(() => {
                            window.location.href = jsonResult.redirectUrl;
                        }, 2000);
                    } else {
                        console.log("Resposta do bot não resultou em redirecionamento JSON:", botResponseText);
                        addMessage(botResponseText, "bot");
                    }
                } else {
                    addMessage("Não recebi uma resposta do assistente. Tente novamente.", "bot");
                }
            } catch (error) {
                console.error("Erro no processamento do envio:", error);
                removeMessage(thinkingId);
                addMessage("Desculpe, tive um problema para responder. Tente novamente.", "bot");
            }
            if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendButton.click();
        }
    });
}

if (newChatButton && chatMessages) {
    newChatButton.addEventListener("click", () => {
        if (chatMessages) chatMessages.innerHTML = "";
        addMessage("Olá! Como posso te ajudar com seus estudos para o ENEM hoje?", "bot");

        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            if (chatSidebar && chatSidebar.classList.contains("open")) {
                chatSidebar.classList.remove("open");
                if (mainContent) {
                    mainContent.classList.remove("sidebar-open-overlay");
                }
            }
        }
    });
}
