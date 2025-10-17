// Import styles and libraries
import '../../styles/com-se.contactcta.scss';
import { useTranslation } from 'react-i18next';
// Import hooks
import useButtonChatActions from '../../hooks/useButtonChatActions';
// Import components
import Button from '../ui/Button';
// Images and icons
import ImgContactCta from '../../assets/img/contact-cta.webp';

const ContactCTA = ({text, buttons, image, cssClass, backgroundOverflow}) => {
    // States for translations
    const { t } = useTranslation();

    // Use hook chat button actions
    const { mapButtons } = useButtonChatActions();
    // const { mapButtons, getClickHandler } = useButtonChatActions();


    // Render overflow background
    const renderBackgroundOverflow = () => {
        return (
            <div className={`${backgroundOverflow}`}></div>
        )
    }

    return (
        <section className={`section secion-contact-cta ${cssClass}`} >
            {backgroundOverflow && renderBackgroundOverflow()}
            <div className='content-wrapper'>
                <div className='text-container'>
                    <h4 className='title'>{t(text.title)}</h4>
                    <p className='font-normal'>{t(text.paragraph)}</p>
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
                    { buttons >= 1 && <p className='font-smaller'>We’ll contact you within 24 hours</p> }
                </div>
                <div className='image-contact-info-container'>
                    <img src={image.image} alt={image.alt} width={image.width} height={image.height} />
                    <div className='text-container'>
                        <p className='font-bold'>Diego Pérez</p>
                        <p className='font-smaller'>{t("section.contact.founder")} <span className='font-red font-bold'>MyRestaurantMenu</span></p>
                        <p className='font-normal'>+49 0176 62 67 69 49</p>
                        <p className='font-smaller'>Mon-Fri. 09:00 - 17:00</p>
                        <p className='font-normal'>contact@myrestaurantapp.com</p>
                        <Button
                            text= "ui.buttons.chatAssistant"
                            cssClass='btn-solid-red'
                            to={'/salesconsultant'}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactCTA