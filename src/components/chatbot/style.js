// src/components/chatbot/style.js
import { useTranslation } from "react-i18next";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Hook que devuelve un envoltorio conversacional basado en traducciones i18n
 */
export function useStyler() {
    const { t } = useTranslation();

    function toConversational(answer, intent) {
        // Recupera listas desde i18n
        const intros = t("chatbot.responses.intros", { returnObjects: true });
        const outros = t("chatbot.responses.outros", { returnObjects: true });

        let intro = Array.isArray(intros) ? pick(intros) : "";
        let outro = Array.isArray(outros) ? pick(outros) : "";

        // Personalización por intent
        if (intent === "pricing") {
            const pricingOutros = t("chatbot.responses.pricingOutro", { returnObjects: true });
            outro = Array.isArray(pricingOutros) ? pick(pricingOutros) : pricingOutros || "";
        }
        if (intent === "support") {
            const supportOutros = t("chatbot.responses.supportOutro", { returnObjects: true });
            outro = Array.isArray(supportOutros) ? pick(supportOutros) : supportOutros || "";
        }

        return `${intro} ${answer} ${outro}`;
    }

    return { toConversational };
}
