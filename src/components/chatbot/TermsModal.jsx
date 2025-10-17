// Import styles and libraries
import '../../styles/com-la.chat-badge.scss';
import { useTranslation } from 'react-i18next';
// Import icons & images
import ImgContactCta from '../../assets/img/contact-cta.webp';


const TermsModal = ({ onAccept, onDecline }) => {
    // States for translations
    const { t } = useTranslation();

    return (
        <div className="chatbox-terms">
            <img src={ImgContactCta} width="150" height="150" alt="contact image" />
            <p>{t("forms.termsUse")}</p>
            <button className="btn-solid-red btn-full-width" onClick={onAccept} >
                {t("forms.accept")}
            </button>
            <button className="btn-solid-dark btn-full-width" onClick={onDecline} >
                {t("forms.decline")}
            </button>
        </div>
    )
}

export default TermsModal