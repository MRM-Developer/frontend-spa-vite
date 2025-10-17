// Import styles and libraries
import '../../styles/com-la.chat-badge.scss';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// Import components
import ChatPanel from '../chatbot/ChatPanel.jsx';
import TermsModal from '../chatbot/TermsModal.jsx';
// Images and icons
import ImgChatBadge from '../../assets/img/chat-badge.webp';


const ChatBadge = ({isOpen, setIsOpen}) => {
    // State to open chat
    const [internalOpen, setInternalOpen] = useState(false);
    const open = isOpen !== undefined ? isOpen : internalOpen;
    const toggleOpen = setIsOpen || setInternalOpen;
    // State to accept terms
    const [accepted, setAccepted] = useState(false);

    // State to open with options
    const [openWithOptions, setOpenWithOptions] = useState(false);

    // State to know if options have being shown
    const [optionsSeen, setOptionsSeen] = useState(
        () => localStorage.getItem("chatbot_options_seen") === "true"
    );

    // State to set form
    const [pendingForm, setPendingForm] = useState(null);

    // Handle open chat
    useEffect(() => {
        function handleOpenChat(e) {
            const { formId, prefill, openWithOptions: showOptions } = e.detail || {};

            const wantsOptions =
                !!showOptions || formId === 'open' || formId === 'options';

            if (wantsOptions) {
                setPendingForm(null);
                setOpenWithOptions(true);
            } else {
                setPendingForm({
                    formId: formId || null,
                    prefill: prefill || {}
                });
                setOpenWithOptions(false);
            }

            toggleOpen(true);
        }

        window.addEventListener("chat:open", handleOpenChat);
        return () => window.removeEventListener("chat:open", handleOpenChat);
    }, [toggleOpen]);

    // Lock/unlock background scroll by intercepting scroll events.
    useEffect(() => {
        if (!open) return;

        // Allow keys (space, page up/down, arrows, home/end) when focus is
        // anywhere inside the chatbox (including footer/input) or when the
        // target is a form control (input, textarea, button, select).
        const allowScrollSelector = '.chatbox';

        function isInsideAllow(el) {
            if (!el) return false;
            try {
                if (el.closest?.(allowScrollSelector)) return true;
            } catch {
                // ignore malformed elements
            }
            const tag = el.tagName?.toLowerCase?.();
            if (tag === 'input' || tag === 'textarea' || tag === 'button' || tag === 'select') return true;
            // allow contenteditable regions as well
            if (el.isContentEditable) return true;
            return false;
        }

        function onWheel(e) {
            if (!isInsideAllow(e.target)) {
                e.preventDefault();
            }
        }

        function onTouchMove(e) {
            if (!isInsideAllow(e.target)) {
                e.preventDefault();
            }
        }

        function onKeyDown(e) {
            // prevent page up/down, space, home/end unless focus (or event target) is inside chat
            const navigationKeys = ['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown'];
            const isSpace = e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space';

            const shouldBlock = (isSpace || navigationKeys.includes(e.key)) &&
                !isInsideAllow(document.activeElement) &&
                !isInsideAllow(e.target);

            if (shouldBlock) {
                e.preventDefault();
            }
        }

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('keydown', onKeyDown, { passive: false });

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    // State for touch devices
    const [isTouch, setIsTouch] = useState(false);

    // Detect if it is touch device
    useEffect(() => {
        const touch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        setIsTouch(touch);
    }, []);
    useEffect(() => {
        // Throttled setter to avoid jank on rapid resize
        let raf = null;
        const setVH = () => {
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const vvHeight = window.visualViewport?.height || window.innerHeight;
                const windowInner = window.innerHeight;
                // Visual viewport height as a pixel value
                document.documentElement.style.setProperty('--vvh', `${vvHeight}px`);
                // Keyboard height (approx) = window.innerHeight - visualViewport.height
                const kb = Math.max(0, windowInner - vvHeight);
                document.documentElement.style.setProperty('--keyboard-height', `${kb}px`);
                // Chat bottom offset: 10px above keyboard (minimum 10px)
                const chatBottom = Math.max(10, kb + 10);
                document.documentElement.style.setProperty('--chat-bottom', `${chatBottom}px`);
            });
        };
        setVH();
        window.addEventListener('resize', setVH);
        window.visualViewport?.addEventListener('resize', setVH);
        // Some Androids fire 'scroll' on keyboard, this keeps it stable
        window.visualViewport?.addEventListener('scroll', setVH);
        return () => {
            window.removeEventListener('resize', setVH);
            window.visualViewport?.removeEventListener('resize', setVH);
            window.visualViewport?.removeEventListener('scroll', setVH);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    // Render chat box
    const renderChatBox = () => {
        return (
            <div className='chat-overlay'>
                <div className='chat-overlay-bg' onClick={() => toggleOpen(false)}></div>
                <div className={`chatbox ${isTouch ? 'chatbox--touch' : 'chatbox--desktop'}`}>
                    { !accepted
                        ?
                            <TermsModal
                                onAccept={() => {
                                    localStorage.setItem("chatbot_terms", "true");
                                    setAccepted(true);
                                    if (!optionsSeen) {
                                        localStorage.setItem("chatbot_options_seen", "true");
                                        setOptionsSeen(true);
                                    }
                                    // mark options as *not yet shown* until ChatPanel injects the
                                    localStorage.removeItem("chatbot_options_seen");
                                    setOptionsSeen(false);
                                    // first post-terms open should show the options
                                    setOpenWithOptions(true);
                                }}
                                onDecline={() => toggleOpen(false)}
                            />
                        :
                            <ChatPanel
                                onClose={() => {
                                    toggleOpen(false);
                                    setOpenWithOptions(false);
                                }}
                                initialForm={pendingForm?.formId}
                                initialPrefill={pendingForm?.prefill}
                                openWithOptions={!pendingForm?.formId && openWithOptions}
                            />
                    }
                </div>
            </div>
        )
    }

    return (
        <>
            <button
                className='chat-badge'
                aria-label='Open chat support'
                onClick={() => {
                    setPendingForm(null);
                    const wantOptions = accepted ? !optionsSeen : true;
                    setOpenWithOptions(wantOptions);
                    toggleOpen(true);
                }}
            >
                <img src={ImgChatBadge} alt='chat bubble image' aria-hidden='true' />
            </button>
            {open && createPortal(renderChatBox(), document.body)}
        </>
    )
}

export default ChatBadge