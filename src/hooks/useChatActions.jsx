import { useOutletContext } from 'react-router-dom';

export function useChatActions() {
    const { setIsChatOpen } = useOutletContext();
    return {
        openChat: () => setIsChatOpen(true),
        closeChat: () => setIsChatOpen(false),
    };
}