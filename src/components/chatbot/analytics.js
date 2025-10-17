// src/components/chatbot/analytics.js

const STORAGE_KEY = "chatbot_events";

// --- Guardar en localStorage como buffer ---
function loadEvents() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveEvents(events) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-200)));
    } catch (err) {
        console.error("Analytics save error:", err);
    }
}

// --- API principal ---
export function logEvent(type, payload = {}) {
    const event = {
        type,
        payload,
        ts: new Date().toISOString(),
    };

    // Guardar en buffer local
    const all = loadEvents();
    all.push(event);
    saveEvents(all);

    // Log en consola (debug)
    console.info("[Chatbot Event]", event);

  // 🔮 FUTURO: enviar a backend con fetch('/api/metrics')
}

// --- Exportar buffer completo ---
export function exportEvents() {
    return loadEvents();
}
