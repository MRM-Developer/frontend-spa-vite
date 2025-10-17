// Import styles and libraries
import '../../styles/com-ui.button.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Button = ({
    cssClass,
    disabled = false,
    icon,
    onClick,
    text,
    to,
    type = 'button',
    ariaLabel = 'none',
    ...props
}) => {
    // States for translations
    const { t } = useTranslation();

    // Render content of the button
    const renderContent = () => {
        return (
            <>
                {icon && icon}
                {text && t(text)}
            </>
        )
    }

    return (
        <>
            {to && (
                <NavLink className={cssClass} to={to} onClick={onClick} type={type} disabled={disabled} aria-label={ariaLabel} {...props} >
                    {renderContent()}
                </NavLink>
            )}
            {!to && (
                <button  className={cssClass} onClick={onClick} type={type} disabled={disabled} aria-label={ariaLabel} {...props} >
                    {renderContent()}
                </button>
            )}
        </>
    )
}

export default Button;