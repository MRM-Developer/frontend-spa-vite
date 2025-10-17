// Import hooks
import { useChatActions } from './useChatActions';


export default function useButtonChatActions() {
    // Use hook chat actions
    const { openChat } = useChatActions();

    // Open chat with a specific form
    const openChatWithForm = (formId, prefill = {}) => {
        window.dispatchEvent(new CustomEvent("chat:open", {
        detail: { formId, prefill }
        }));
    };

    // Open chat with specific options
    const openChatWithOptions = () => {
        window.dispatchEvent(new CustomEvent("chat:open", {
            detail: { openWithOptions: true }
        }));
    };

    // Handler function from an action string
    const getClickHandler = (action) => {
        if (typeof action === 'function') return action;
        if (typeof action !== 'string') return () => {};
        if (!action.startsWith('openChat')) return () => {};

        const [, param] = action.split(':'); // e.g. "lead", "open"
        if (!param) return openChat;
        if (param === 'open' || param === 'options') return openChatWithOptions;
        return () => openChatWithForm(param); // e.g. "lead"
    };

    // Map buttons
    const mapButtons = (buttons) => {
        // Guard for non arrays
        if (!Array.isArray(buttons)) return [];
        // return the button
        return buttons.map((btn, i) => {
            let clickHandler = btn.onClick;
            let toProp = btn.to;

            if (typeof btn.onClick === 'string' && btn.onClick.startsWith('openChat')) {
                const [, param] = btn.onClick.split(':'); // "lead", "open", etc.
                if (!param) {
                    // plain "openChat" (no options, no form)
                    clickHandler = openChat;
                } else if (param === 'open' || param === 'options') {
                    // open with options
                    clickHandler = openChatWithOptions;
                } else {
                    // open with form
                    clickHandler = () => openChatWithForm(param);
                }
                toProp = undefined;
            }

            return { ...btn, key: i, onClick: clickHandler, to: toProp };
        });
    };

    return { mapButtons, getClickHandler };
}
