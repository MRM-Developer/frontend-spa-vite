// Import styles and libraries
import './../../styles/com-se.hero.scss';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
// Import hooks
import useMediaQuery from '../../hooks/useMediaQuery';
import useButtonChatActions from '../../hooks/useButtonChatActions';
// Import components
import Carousel from '../ui/Carousel';
import Button from '../ui/Button';
// Images and icons
import { IconCheck } from '../../components/ui/Icons';

const Hero = ({text, slides, buttons, cssClass}) => {
    // States for translations
    const { t } = useTranslation();

    // Use Media query hook
    const isDesktop = useMediaQuery('(min-width: 480px)');

    // Use hook chat button actions
    const { mapButtons } = useButtonChatActions();

    // Render intro text
    const renderIntroText = () => {
        return (
            <>
                <span className='font-small'>
                    <Trans i18nKey={text.intro}
                        components={{
                            bold: <span className='font-bold' />,
                            boldRed: <strong className='font-red'/>,
                        }}
                    />
                </span>
                <hr className='line-red'/>
            </>
        )
    }

    // Render claimer text
    const renderClaimerText = () => {
        return (
            <>
                <p className='claimer'>
                    <Trans i18nKey={text.claimer}
                        components={{
                            bold: <span className='font-bold' />,
                            boldRed: <span className='font-bold font-red' />
                        }}
                    />
                </p>
            </>
        )
    }

    // Render bullets text
    const renderBulletsText = () => {
        return (
            <>
                <ul className='bullets-container'>
                    {text.bullets.map((bullet, index) => (
                        <li key={index} className='bullet'>
                            <IconCheck className='icon' />
                            <Trans i18nKey={bullet}
                                components={{
                                    bold: <span className='font-bold' />,
                                    boldRed: <span className='font-bold font-red' />
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </>
        )
    }

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
        <section className={`section section-hero ${cssClass}`}>
            <div className='section-content text-container'>
                {text.intro && renderIntroText()}
                <h1 className='title'>{t(text.title)}</h1>
                <h2 className='subtitle'>{t(text.subtitle)}</h2>
                {text.claimer && renderClaimerText()}
                {text.bullets && renderBulletsText()}
            </div>
            <div className='section-content carousel-container'>
                {isDesktop ? <Carousel slides={slides} /> : null}
                {buttons && renderButtons()}
            </div>
        </section>
    )
}

export default Hero;