// src/components/chatbot/antibot.js

let lastMessageTime = 0;
let messageCount = 0;
let blockedUntil = 0;

export function checkSpam(message) {
    const now = Date.now();

    // Si está bloqueado, no dejar interactuar
    if (now < blockedUntil) {
        return { ok: false, reason: "blocked" };
    }

    // --- Rule 1: Rate limiting (máx 8 mensajes por minuto)
    messageCount++;
    setTimeout(() => messageCount--, 60000); // cuenta atrás
    if (messageCount > 8) {
        blockedUntil = now + 5 * 60 * 1000; // bloquear 5 minutos
        return { ok: false, reason: "rate-limit" };
    }

    // --- Rule 2: Cadencia (muy rápido = sospechoso)
    const diff = now - lastMessageTime;
    lastMessageTime = now;
    if (diff < 200) {
        return { ok: false, reason: "too-fast" };
    }

    // --- Rule 3: Contenido sospechoso
    if ((message.match(/https?:\/\//g) || []).length > 2) {
        return { ok: false, reason: "too-many-links" };
    }

    if (message.length > 500) {
        return { ok: false, reason: "too-long" };
    }

    return { ok: true };
}
