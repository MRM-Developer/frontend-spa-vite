// src/components/chatbot/intents.js
import { useTranslation } from "react-i18next";

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD") // split accents
        .replace(/[\u0300-\u036f]/g, ""); // remove accents
}

const patterns = {
    greeting: {
        en: /^(hi|hello|hey|good\s(morning|afternoon|evening))/i,
        es: /^(hola|buenas|que tal|buen dia)/i,
        de: /^(hallo|guten\s(tag|morgen|abend)|moin|servus)/i,
        fr: /^(salut|bonjour|bonsoir|coucou)/i,
        it: /^(ciao|buongiorno|buonasera|buon pomeriggio)/i
    },
    thanks: {
        en: /\b(thank(s| you)|appreciate)\b/i,
        es: /\b(gracias|muchas gracias|mil gracias)\b/i,
        de: /\b(danke|vielen dank|dankeschön)\b/i,
        fr: /\b(merci|merci beaucoup)\b/i,
        it: /\b(grazie|mille grazie|grazie mille)\b/i
    },
    goodbye: {
        en: /(bye|goodbye|see you|see ya)/i,
        es: /(adios|adiós|hasta luego|nos vemos|chau)/i,
        de: /(tsch(ü|u)ss|tschüss|auf wiedersehen)/i,
        fr: /(au revoir|a bientot|à bientôt)/i,
        it: /(arrivederci|arrivederla|a presto|ciao)/i
    },
    support: {
        en: /(support|help|need (help|support|assistance))/i,
        es: /(soporte|ayuda|necesito (ayuda|soporte|asistencia))/i,
        de: /(hilfe|support|unterstützung)/i,
        fr: /(aide|support|assistance)/i,
        it: /(aiuto|supporto|assistenza)/i
    },
    start: {
        en: /(start|begin|get (started|going)|try|trial)/i,
        es: /(empezar|comenzar|iniciar|prueba|ensayo)/i,
        de: /(start|anfangen|beginnen|versuch|probe)/i,
        fr: /(d(é|e)marre|commencer|essai|d(é|e)but)/i,
        it: /(inizia|comincia|avvia|prova|tentativo)/i
    }
};

export function useIntents() {
    const { t, i18n } = useTranslation();

    // function detectIntent(message) {
    //     const lang = i18n.language?.split("-")[0] || "en";
    //     const text = normalizeText(message);

    //     for (const [intent, rules] of Object.entries(patterns)) {
    //     const regex = rules[lang] || rules.en;
    //         if (regex.test(text)) {
    //             return { intent };
    //         }
    //     }
    //     return { intent: "unknown" };
    // }
    function detectIntent(message) {
        const text = normalizeText(message);
        for (const [intent, rules] of Object.entries(patterns)) {
            for (const [lang, regex] of Object.entries(rules)) {
                if (regex.test(text)) {
                    if (i18n.language !== lang) {
                        i18n.changeLanguage(lang);
                    }
                    return { intent };
                }
            }
        }
        return { intent: "unknown" };
    }

    function getIntentReply(intent) {
        const replies = t(`chatbot.intents.${intent}`, { returnObjects: true });
        if (Array.isArray(replies) && replies.length > 0) {
            return replies[Math.floor(Math.random() * replies.length)];
        }
        return null;
    }

    return { detectIntent, getIntentReply };
}
