// Import styles and libraries
import '../../styles/com-se.faq.scss';
import { useTranslation } from 'react-i18next';
// Import hooks
import useButtonChatActions from '../../hooks/useButtonChatActions';
// Import components
import Accordion from '../ui/Accordion';
import Button from '../ui/Button';


const Faq = ({text, buttons, faqs}) => {
    // States for translations
    const { t } = useTranslation();

    // Use hook chat button actions
    const { mapButtons } = useButtonChatActions();

    // Render buttons
    const renderButtons = () => {
        return (
            <>
                <div className='buttons-container'>
                    {mapButtons(buttons).map(({ key, text, cssClass, to, onClick, icon, ariaLabel }) => (
                        <Button
                            key={key}
                            text={text}
                            cssClass={cssClass}
                            to={to}
                            onClick={onClick}
                            icon={icon}
                            aria-label={ariaLabel}
                        />
                    ))}
                </div>
            </>
        )
    }

    return (
        <section className='section secion-faq'>
            <div className='faq-container'>
                <div className='text-container'>
                    <h4 className='title'>{t(text.title)}</h4>
                    <p className='font-normal'>{t(text.paragraph)}</p>
                    {buttons && renderButtons()}
                </div>
                <div className='accordion-container'>
                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Faq