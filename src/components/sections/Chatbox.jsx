// Import styles and libraries
import '../../styles/com-se.chatbox.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import components
import ChatPanel from '../chatbot/ChatPanel';
import Button from '../ui/Button';
// Images and icons
import ImgContactCta from '../../assets/img/contact-cta.webp';


const Chatbox = () => {
    // States for translations
    const { t } = useTranslation();

    // States for chatpanel
    const [panelInitialForm, setPanelInitialForm] = useState(null);
    const [panelInitialPrefill, setPanelInitialPrefill] = useState({});
    const [panelToken, setPanelToken] = useState(0);
    // Track active form as reported by ChatPanel
    const [activeFormFromPanel, setActiveFormFromPanel] = useState(null);

    // Function to open form in chat panel
    function openFormInPanel(formId, prefill = {}) {
        setPanelInitialForm(formId);
        setPanelInitialPrefill(prefill);
        // bump token so ChatPanel re-triggers even if same formId is used twice
        setPanelToken((s) => s + 1);
    }

    return (
        <section className='section section-chatbox'>
            <div className='intro-container'>
                <img src={ImgContactCta} alt='phone illustration' aria-hidden='true' />
                <div className='text-container'>
                    <h2 className='title'>{t('section.salesConsultant.title')}</h2>
                    <p className='description'>{t('section.salesConsultant.description')}</p>
                </div>
                <div className='buttons-container'>
                    <Button text= "ui.buttons.lead" cssClass={`${activeFormFromPanel === 'lead' ? 'btn-solid-red' : 'btn-solid-light'} btn-inner-shadow btn-full-width`} onClick={() => openFormInPanel('lead')} />
                    <Button text= "ui.buttons.trial" cssClass={`${activeFormFromPanel === 'trial' ? 'btn-solid-red' : 'btn-solid-light'} btn-inner-shadow btn-full-width`} onClick={() => openFormInPanel('trial')} />
                    <Button text= "ui.buttons.register" cssClass={`${activeFormFromPanel === 'register' ? 'btn-solid-red' : 'btn-solid-light'} btn-inner-shadow btn-full-width`} onClick={() => openFormInPanel('register')} />
                    <Button text= "ui.buttons.issue" cssClass={`${activeFormFromPanel === 'issue' ? 'btn-solid-red' : 'btn-solid-light'} btn-inner-shadow btn-full-width`} onClick={() => openFormInPanel('issue')} />
                </div>
            </div>
                <div className='chatbox-container'>
                <ChatPanel
                    initialForm={panelInitialForm}
                    initialPrefill={panelInitialPrefill}
                    initialFormToken={panelToken}
                    onActiveFormChange={(formId) => setActiveFormFromPanel(formId)}
                    autoFocus={false}
                />
            </div>
        </section>
    )
}

export default Chatbox