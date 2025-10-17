// Import styles and libraries
import '../../styles/com-la.chat-badge.scss';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
// Import hooks
import { useStyler } from './style';
import { useIntents } from './intents';
// Import forms
import LeadForm from './forms/LeadForm';
import TrialForm from './forms/TrialForm';
import RegisterForm from './forms/RegisterForm';
import IssueForm from './forms/IssueForm';
// Import generators
import { paraphraseRuleBased, paraphraseGemini } from "./generators/index.js";
// Import ...
import { getTopMatches } from './retrieval';
import { checkSpam } from './antibot';
// import { saveConversation, loadConversations } from './store';
import { saveConversation } from './store';
import { logEvent } from "./analytics";


// ───────────────────────────────────────────────────────────────────────────────
// ChatPanel.jsx
// Purpose: Chat UI + logic (intents, FAQ/Gemini fallback, action flows, forms)
// Notes:
// - Supports "options" messages (buttons inside chat).
// - Supports "action" flows (e.g., open a form automatically).
// - Supports external triggers (initialForm/initialPrefill from ChatBadge).
// - Form contract: { onSubmit, onCancel, prefill }.
// ───────────────────────────────────────────────────────────────────────────────

// Declare forms
const FORM_REGISTRY = {
    lead: LeadForm,
    trial: TrialForm,
    register: RegisterForm,
    issue: IssueForm,
};

// Declare options
const DEFAULT_OPTIONS = [
    { label: "Start free trial", formId: "trial" },
    { label: "Create account", formId: "lead" },
    { label: "Report an issue", formId: "lead" },
];



export default function ChatPanel({ onClose, initialForm = null, initialPrefill = {}, openWithOptions = false, initialFormToken = 0, onActiveFormChange = null, autoFocus = true }) {
    // States for translations
    const { t, i18n } = useTranslation();
    const lang = i18n.language || 'en';

    // Use hooks for conversations
    const { toConversational } = useStyler();
    const { detectIntent, getIntentReply } = useIntents();

    // States for messages and inputs
    const [messages, setMessages] = useState([]);
    // const [messages, setMessages] = useState(() => {
    //     const all = loadConversations();
    //     return all.length > 0 ? all[all.length - 1] : [];
    // });
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // State to ref last message container and input focus
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const inputRef = useRef(null);

    // State for FAQ cache by language
    const [faq, setFaq] = useState([]);

    // State for active form and prefill
    const [activeForm, setActiveForm] = useState(initialForm);
    const [activePrefill, setActivePrefill] = useState(initialPrefill || {});
    const optionsInjectedRef = useRef(false);

    // Notify parent when activeForm changes (if callback provided)
    useEffect(() => {
        if (typeof onActiveFormChange === 'function') {
            try { onActiveFormChange(activeForm); } catch (e) { console.debug('onActiveFormChange callback failed', e); }
        }
    }, [activeForm, onActiveFormChange]);

    // React to external triggers: if parent passes a new `initialForm` (or token)
    // open that form inside the chat. The token allows the parent to re-trigger
    // the same form multiple times.
    useEffect(() => {
        if (initialForm && initialForm !== activeForm) {
            openFormAction({ formId: initialForm, prefill: initialPrefill || {} });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialForm, initialFormToken]);

    // Reset injected ref if localStorage has been cleared
    useEffect(() => {
        const seen = localStorage.getItem("chatbot_options_seen") === "true";
        if (!seen) {
            optionsInjectedRef.current = false;
        }
    }, []);

    // Fetch FAQ
    useEffect(() => {
        fetch(`/faq/faq.${lang}.json`)
        .then((res) => res.json())
        .then((data) => setFaq(data))
        .catch(() => {
            // fallback in english
            fetch('/faq/faq.en.json')
            .then((res) => res.json())
            .then((data) => setFaq(data));
        });
    }, [lang]);

    // Auto-scroll to last message when typing, new message or form changes
    // Use the messages container scroll to avoid forcing the browser to scroll the whole page.
    useEffect(() => {
        const el = messagesContainerRef.current;
        if (!el) return;

        // Scroll-to-bottom helper
        const scrollToBottom = () => {
            try {
                el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
            } catch {
                el.scrollTop = el.scrollHeight;
            }
            try {
                if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            } catch (err) { console.debug('scrollIntoView failed', err); }
        };

        // run a few retries to handle images or dynamically sized content
        scrollToBottom();
        requestAnimationFrame(() => scrollToBottom());
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToBottom()));
        const timer = setTimeout(() => scrollToBottom(), 150);

        // If the messages contain images that load after render, ensure we scroll when they finish loading
        const imgs = Array.from(el.querySelectorAll('img'));
        const onImgLoad = () => scrollToBottom();
        imgs.forEach(img => img.addEventListener('load', onImgLoad));

        return () => {
            clearTimeout(timer);
            imgs.forEach(img => img.removeEventListener('load', onImgLoad));
        };
    }, [messages, isTyping, activeForm]);

    // // Persist conversation on unmount
    useEffect(() => {
        return () => {
            if (messages.length > 0) {
                    saveConversation(messages);
                    // setMessages(messages)
                }
            };
    }, [messages]);

    // If opened from the badge (and no form), show the options once
    useEffect(() => {
        if (!activeForm && messages.length === 0) {
            const greeting = getIntentReply("greeting") || "Hello! 👋";
            const newMessages = [{ role: "bot", text: greeting }];

            if (openWithOptions) {
                optionsInjectedRef.current = true;
                localStorage.setItem("chatbot_options_seen", "true");
                newMessages.push({ role: "bot", type: "options", options: DEFAULT_OPTIONS });
            }
            setMessages(newMessages);

        }
    }, [openWithOptions, activeForm, messages, getIntentReply]);

    // HELPERS - Input focus
    // Focus input
    function focusInputCaretEnd() {
        const el = inputRef.current;
        if (!el) return;
        requestAnimationFrame(() => {
            // Try to focus without causing the browser to scroll the page.
            try {
                el.focus({ preventScroll: true });
            } catch {
                // Some browsers don't support the options object.
                el.focus();
            }
            const len = el.value?.length ?? 0;
            el.setSelectionRange?.(len, len);
        });
    }
    // Focus input on mount
    useEffect(() => {
        if (autoFocus) focusInputCaretEnd();
}, [autoFocus]);
    // Focus to input when bot stops typing and no form is open
    useEffect(() => {
        if (autoFocus && !isTyping && activeForm === null) {
            focusInputCaretEnd();
        }
    }, [autoFocus, isTyping, activeForm]);

    // HELPERS - Action and queues
    // Side-effect actions that do things
    function openFormAction({ formId, prefill = {} }) {
        setActiveForm(formId);
        setActivePrefill(prefill);
    }
    // Message producers
    function pushBotText(text) {
        setMessages((prev) => [...prev, { role: "bot", text }]);
    }
    // Option producers
    function pushOptions(options) {
        setMessages((prev) => [...prev, { role: "bot", type: "options", options }]);
    }
    // Runs a scripted flow of steps
    async function runFlow(steps = []) {
        // typing on while flow runs
        setIsTyping(true);
        for (const step of steps) {
            if (step.type === "delay") {
                await new Promise(r => setTimeout(r, step.ms ?? 600));
                continue;
            }
            if (step.type === "text") {
                await new Promise(r => setTimeout(r, 400)); // small 'thinking' pause
                pushBotText(step.text);
                continue;
            }
            if (step.type === "options") {
                await new Promise(r => setTimeout(r, 400));
                pushOptions(step.options);
                continue;
            }
            if (step.type === "action") {
                if (step.action === "openForm") {
                    openFormAction(step.payload || {});
                }
                // Add more actions later if needed
                continue;
            }
        }
        setIsTyping(false);
    }


    // HANDLE send async
    async function handleSend() {
        if (!input.trim()) return;

        // implement antispam/bots
        const spamCheck = checkSpam(input);
        if (!spamCheck.ok) {
            // Logs for analytics
            logEvent("spam_blocked", { message: input });
            // Use functional set to avoid stale closure
            setMessages(prev => [
                ...prev,
                { role: 'user', text: input },
                { role: 'bot', text: t('chatbot.suspicious') }
            ]);
            setInput('');
            return;
        }

        // USER messages
        // declare user message
        const userMsg = { role: 'user', text: input };
        // Logs for analytics
        logEvent("message_sent", { text: input });
        // add user message
        setMessages((prev) => [...prev, userMsg]);
        // Clear input
        setInput("");
        // Set bot's typing
        setIsTyping(true);

        // build messages snapshot
        let newMessages = [...messages, userMsg];

        // USER messages
        // Use intents hooks to detect intents
        const { intent } = detectIntent(input);
        const intentReply = getIntentReply(intent);
        // FIRST -> Check for intents
        if (intentReply) {
            // Logs for analytics
            logEvent("intent_detected", { intent });
            // Scripted flows per intent to create BOT message
            const flows = {
                support: [
                    { type: "text", text: intentReply },
                    { type: "delay", ms: 300 },
                    { type: "action", action: "openForm", payload: { formId: "lead" } },
                ],
                start: [
                    { type: "text", text: intentReply },
                    { type: "options", options: DEFAULT_OPTIONS },
                ],
                default: [
                    { type: "text", text: intentReply }
                ]
            };
            // keep your staged typing feel
            setTimeout(() => {
                runFlow(flows[intent] || flows.default);
            }, 400);

            // Stop
            return;
        }
        // FALLBACK -> FAQ & AI
        // Find best FAQ match
        const matches = getTopMatches(input, faq, 1);
        // Declare empty bot reply
        let botReply = null;
        // Try FAQ match
        if (matches.length > 0) {
            // Logs for analytics
            logEvent("faq_hit", { faqId: matches[0].id, score: matches[0].score });
            // set bot message
            botReply = {
                role: 'bot',
                text: toConversational(matches[0].a, matches[0].id)
            };
        } else {
        // Try Gemini fallback
            try {
                // Collect last two messages
                const lastTwo = messages
                    .filter(m => m.role !== 'system')
                    .slice(-4);
                // Send USER message + last two messages to AI
                const geminiText = await paraphraseGemini(input, lastTwo);
                // set bot message
                botReply = { role: 'bot', text: geminiText };
            } catch (e) {
                console.error("Gemini fallback failed:", e);
                // set bot message
                botReply = { role: 'bot', text: await paraphraseRuleBased(input) };
            }
        }

        // BOT answer delivery
        // If we got plain text, keep your existing append behavior:
        if (botReply?.text) {
            // setIsTyping(true);
            setTimeout(() => {
                // Place bot reply right after the last built snapshot
                const newMessages2 = [...newMessages, botReply];
                setMessages(newMessages2);
                setIsTyping(false);
            }, 1000);
        } else {
            // If you ever gate Gemini to sometimes return null → guide with options
            runFlow([
                { type: "text", text: t('chatbot.didntUnderstand') || "I didn’t quite get that." },
                { type: "options", options: DEFAULT_OPTIONS }
            ]);
        }
    }

    const renderChatBox = () => {
        return (
            <>
                <header className='chatbox-header'>
                    <h4 className='font-larger'>{t('chatbot.header')}</h4>
                    <button onClick={onClose} aria-label='Close chat' className='chatbox-close font-small font-red font-bold'>✖</button>
                </header>
                <main className='chatbox-messages' ref={messagesContainerRef}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.role}`}>
                            {msg.type === "options" ? (
                            <div className="chat-options">
                                {msg.options.map((opt, j) => (
                                    <button
                                        key={j}
                                        className="chat-option"
                                        onClick={() => openFormAction({ formId: opt.formId })}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                            ) : (
                            msg.text
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message bot typing">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    )}
                    {activeForm && (() => {
                        const Form = FORM_REGISTRY[activeForm];
                        logEvent("form_opened", { formId: activeForm });
                        return (
                            <Form
                                prefill={activePrefill}
                                onSubmit={(data) => {
                                    logEvent("form_submitted", { formId: activeForm, data });
                                    setMessages([...messages, { role: "bot", text: `✅ ${activeForm} form submitted: ${JSON.stringify(data)}` }]);
                                    setActiveForm(null);
                                    setActivePrefill({});
                                }}
                                onCancel={() => {
                                    logEvent("form_cancelled", { formId: activeForm });
                                    setActiveForm(null);
                                    setActivePrefill({});
                                }}
                            />
                        );
                    })()}

                    <div ref={messagesEndRef} />
                </main>
                <footer className='chatbox-footer'>
                    <input
                        ref={inputRef}
                        type='text'
                        placeholder={t('chatbot.placeholder')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            // Only send on Enter when send button would be enabled
                            const sendEnabled = !(isTyping || activeForm !== null) && input.trim().length > 0;
                            if (e.key === 'Enter' && sendEnabled) {
                                handleSend();
                            }
                        }}
                        // Input should remain focusable at all times on mobile to avoid odd behaviour
                    />
                    <button
                        onClick={handleSend}
                        // Disable send when typing, when a form is open, or when there's no input
                        disabled={isTyping || activeForm !== null || input.trim().length === 0}
                    >{t('chatbot.send')}</button>
                    {/* <button onClick={exportConversations}>{t('chatbot.export')}</button> */}
                </footer>
            </>
        )
    }


    return renderChatBox();
}
