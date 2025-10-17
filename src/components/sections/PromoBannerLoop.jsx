// Import styles and libraries
import "../../styles/com-se.promo.scss";
import { useTranslation } from 'react-i18next';


const PromoBannerLoop = ({text}) => {
    // States for translations
    const { t } = useTranslation();

    let promoText = t(text);

    let capitalizedText = promoText.toUpperCase();

    return (
        <div className="promo-banner-container">
            <div className="content-wrapper">
                {Array.from({ length: 28 }, (_, i) => (
                    <>
                        <span className="content" key={i}>
                            {promoText}
                        </span>
                        <span className="content" key={i}>
                            {capitalizedText}
                        </span>
                    </>
                ))}
            </div>
        </div>
    )
}

export default PromoBannerLoop