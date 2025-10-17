// src/components/chatbot/store.js

const STORAGE_KEY = "chatbot_conversations";

// Recuperar historial completo de conversaciones
export function loadConversations() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error loading conversations:", err);
        return [];
    }
}

// Guardar una conversación completa
export function saveConversation(conversation) {
    try {
        const all = loadConversations();
        all.push(conversation);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all.slice(-50)));
        // guarda solo las últimas 50 conversaciones
    } catch (err) {
        console.error("Error saving conversation:", err);
    }
}

// Exportar como archivo JSON descargable
export function exportConversations() {
    const data = JSON.stringify(loadConversations(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "chatbot_conversations.json";
    a.click();
    URL.revokeObjectURL(url);
}
