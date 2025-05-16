// ... (código existente do chat UI) ...

const sidebarToggleButton = document.getElementById('sidebar-toggle-button');
const chatSidebar = document.getElementById('chat-sidebar');
// Certifique-se de que mainContentForChatPage selecione o elemento <main> corretamente.
// Se você adicionou um ID "main-content" ao <main>, use:
// const mainContent = document.getElementById('main-content');
// Caso contrário, o querySelector que você tem pode funcionar, mas um ID é mais robusto.
// Vamos assumir que você tem <main id="main-content">
const mainContent = document.getElementById('main-content'); 

if (sidebarToggleButton && chatSidebar && mainContent) { // Adicionado mainContent à verificação
    sidebarToggleButton.addEventListener('click', () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) { // Mobile/Tablet breakpoint (Tailwind's md)
            chatSidebar.classList.toggle('open'); // Para o slide-in/out do mobile
            // Opcional: overlay para mobile
            // if (mainContent) { // Usar mainContent aqui também
            //     mainContent.classList.toggle('sidebar-open-overlay'); 
            // }
        } else { // Desktop
            mainContent.classList.toggle('sidebar-desktop-collapsed');
        }
    });
}

// Opcional: Fechar sidebar mobile ao clicar fora dela
document.addEventListener('click', function(event) {
    // Verifique se estamos no mobile antes de aplicar esta lógica
    if (window.innerWidth < 768 && chatSidebar && chatSidebar.classList.contains('open')) {
        const isClickInsideSidebar = chatSidebar.contains(event.target);
        const isClickOnToggleButton = sidebarToggleButton && sidebarToggleButton.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnToggleButton) {
            chatSidebar.classList.remove('open');
            // if (mainContent) { // Usar mainContent aqui também
            //    mainContent.classList.remove('sidebar-open-overlay');
            // }
        }
    }
});


// --- Código existente da UI do Chat ---
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const newChatButton = document.getElementById('new-chat-button');


function addMessage(text, sender) {
    if (!chatMessages) return; 
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; 
}

if (sendButton && chatInput && chatMessages) {
    sendButton.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatInput.value = '';
            
            setTimeout(() => {
                addMessage("Estou processando sua pergunta...", 'bot');
                setTimeout(() => {
                    addMessage("Recebi sua mensagem: '" + userMessage + "'. Em um sistema real, eu enviaria isso para a IA.", 'bot');
                }, 1500);
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
}

if (newChatButton && chatMessages) {
    newChatButton.addEventListener('click', () => {
        // 1. Limpa a área de mensagens
        chatMessages.innerHTML = ''; 
        
        // 2. Adiciona a mensagem inicial do bot
        addMessage("Olá! Como posso te ajudar com seus estudos para o ENEM hoje?", 'bot'); 

        // 3. Fecha a sidebar se estiver aberta (lógica para mobile e desktop)
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) { // Mobile
            if (chatSidebar && chatSidebar.classList.contains('open')) {
                chatSidebar.classList.remove('open');
                if (mainContentForChatPage) { // mainContentForChatPage é o seu mainContent
                    mainContentForChatPage.classList.remove('sidebar-open-overlay');
                }
            }
        } else { // Desktop
            // Se a sidebar desktop puder ser colapsada e você quiser fechá-la ao iniciar nova conversa:
            // (Assumindo que mainContent é o elemento <main> que recebe a classe de colapso)
            // const mainContent = document.getElementById('main-content'); // Ou o seletor que você usa
            // if (mainContent && mainContent.classList.contains('sidebar-desktop-collapsed')) {
            //     // Se já estiver colapsada, talvez não precise fazer nada, ou pode querer garantir que está aberta e depois colapsar
            // } else if (mainContent) {
            //     // Se estiver aberta, colapsa:
            //     // mainContent.classList.add('sidebar-desktop-collapsed');
            // }
            // Por enquanto, vamos manter simples e não mexer no estado da sidebar desktop ao clicar em "Nova Conversa"
            // a menos que você queira um comportamento específico aqui.
        }
    });
}