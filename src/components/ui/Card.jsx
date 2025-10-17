// Import styles and libraries
import '../../styles/com-ui.card.scss';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const Card = forwardRef (({
    id,
    cssClass = '',
    description,
    image,
    isOnClick,
    size,
    text,
    currentOpenId,
    setOpenId,
}, ref) => {
    // States for translations
    const { t } = useTranslation();

    // State for active card
    const isActive = currentOpenId === id;
    // State for card class to set active
    const cardClass = `card ${cssClass} ${isActive ? 'active' : ''}`.trim();

    // Handle on click to flip ccard
    const handleOnClick = () => {
        // Check props
        if (isOnClick && description) {
            // Conditional to set active card using ID
            setOpenId(isActive ? null : id);
        }
    };


    return (
        <div className={`card ${cssClass} ${cardClass} ${size}`} onClick={handleOnClick} ref={ref} >
            <div className="flip-inner">
                <div className="flip-front">
                    <h3>{t(text)}</h3>
                    <img src={image} alt={t(text)} />
                </div>
                <div className="flip-back">
                    <h3>{t(text)}</h3>
                    <p>{t(description)}</p>
                </div>
            </div>
        </div>
    );
});

export default Card;