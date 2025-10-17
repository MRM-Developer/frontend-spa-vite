// Import styles and libraries
import { useState, useRef } from 'react';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
// Import hooks
import useMediaQuery from '../../hooks/useMediaQuery';
// Import components
import Button from './Button';
// Import icons & images
import { IconArrow } from './Icons';
import { IconCheck } from './Icons';


const PricingCards = ({intro, cardsData}) => {
    // States for translations
    const { t } = useTranslation();

    // Use Media query hook
    const isPhone = useMediaQuery('(max-width: 690px)');

    // Use ref for timeout
    const timeoutRef = useRef(null);

    // State to disble button. Debouncce
    const [isDisabled, setIsDisabled] = useState(false);

    // State to show/hide includes
    const [isIncludes, setIsIncludes] = useState(false)

    // State to track collapsing animation
    const [isCollapsing, setIsCollapsing] = useState({})

    // States for tariff
    const [isTariff, setIsTariff] = useState(true)

    // Handle tariff
    function handleTariffOption() {
        if (isDisabled) return;

        setIsTariff(!isTariff);
        setIsDisabled(true);

        // allow clicks again after 300ms
        timeoutRef.current = setTimeout(() => {
            setIsDisabled(false);
        }, 600);
    }

    // Handle includes
    function handleIncludes(index) {
        if (isIncludes[index]) {
            // Start collapsing animation
            setIsCollapsing(prev => ({ ...prev, [index]: true }));
            // Wait for animation to complete before hiding
            setTimeout(() => {
                setIsIncludes(prev => ({ ...prev, [index]: false }));
                setIsCollapsing(prev => ({ ...prev, [index]: false }));
            }, 300);
        } else {
            // Expanding - show immediately
            setIsIncludes(prev => ({ ...prev, [index]: true }));
        }
    }

    // Render intro text
    const renderIntroText = () => {
        return (
            <div className='intro-text'>
                <h2 className='title'>
                    <Trans i18nKey={intro.title}
                        components={{
                            bold: <span className='font-bold' />,
                            boldRed: <strong className='font-red'/>,
                        }}
                    />
                </h2>
                <p className='description'>
                    <Trans i18nKey={intro.description}
                        components={{
                            bold: <span className='font-bold' />,
                            boldRed: <strong className='font-red'/>,
                        }}
                    />
                </p>
            </div>
        )
    }

    // Render buttons
    const renderButtons = () => {
        return (
            <div className='tariff-selection-container'>
                <div className='buttons-container'>
                    <Button
                        text='ui.buttons.monthly'
                        cssClass={`btn-solid-light btn-inner-shadow ${!isTariff ? 'btn-gradient-red' : ''}`}
                        onClick={() => handleTariffOption()}
                    />
                    <Button
                        text='ui.buttons.annual'
                        cssClass={`btn-solid-light btn-inner-shadow ${isTariff ? 'btn-gradient-red' : ''}`}
                        onClick={() => handleTariffOption()}
                    />
                </div>
                <p className='font-smaller'>{t('section.pricing.common.saveMoney')}</p>
            </div>
        )
    }

    // Render cards
    const renderCards = (card, index) => {
        return (
            <div className={`pricing-card ${card.cssClass === 'highlighted' ? 'pricing-card-highlighted' : ''}`} key={index}>
                <h4 className='title'>{t(card.title)}</h4>
                <p className='description'>{t(card.description)}</p>
                {!isTariff ?
                    <>
                        <p className='price'>{t(card.price.annual)}</p>
                    </>
                    :
                    <>
                        <p className='price'>{t(card.price.monthly)}</p>
                    </>
                }
                <div className='complementary-text'>
                    <p className='font-smaller'>{t('section.pricing.common.perMonth')}</p>
                    <p className='font-smaller'>{t('section.pricing.common.saveMoney')}</p>
                </div>
                {isPhone ?
                    <Button
                        text={'ui.buttons.included'}
                        cssClass={`includes-button btn-solid-light btn-inner-shadow btn-full-width ${isIncludes[index] ? 'includes-button-active' : ''}`}
                        onClick={() => handleIncludes(index)}
                        icon={<IconArrow />}
                    />
                    :
                    <div className={`features-container ${isCollapsing[index] ? 'collapsing' : ''}`}>
                        {card.featureIncluded.map((bullet, bulletIndex) =>
                            <p key={bulletIndex} className='bullet'>
                                <IconCheck className='icon' />
                                <Trans i18nKey={bullet}
                                    components={{
                                        bold: <span className='font-bold' />,
                                        boldRed: <strong className='font-red'/>,
                                    }}
                                />
                            </p>
                        )}
                        {card.featureNotIncluded.map((bullet, bulletIndex) =>
                            <p key={bulletIndex} className='bullet not-included'>
                                <Trans i18nKey={bullet}
                                    components={{
                                        bold: <span className='font-bold' />,
                                        boldRed: <strong className='font-bold'/>,
                                    }}
                                />
                            </p>
                        )}
                    </div>
                }
                {isIncludes[index] && isPhone &&
                    <div className={`features-container ${isCollapsing[index] ? 'collapsing' : ''}`}>
                        {card.featureIncluded.map((bullet, bulletIndex) =>
                            <p key={bulletIndex} className='bullet'>
                                <IconCheck className='icon' />
                                <Trans i18nKey={bullet}
                                    components={{
                                        bold: <span className='font-bold' />,
                                        boldRed: <strong className='font-red'/>,
                                    }}
                                />
                            </p>
                        )}
                        {card.featureNotIncluded.map((bullet, bulletIndex) =>
                            <p key={bulletIndex} className='bullet not-included'>
                                {t(bullet)}
                            </p>
                        )}
                    </div>
                }
                {card.cssClass === 'highlighted' ?
                    <Button text={'ui.buttons.select'} cssClass={'btn-gradient-red btn-full-width'} to={'/pricing'} />
                    :
                    <Button text={'ui.buttons.select'} cssClass={'btn-solid-light btn-inner-shadow btn-full-width'} to={'/pricing'} />
                }
            </div>
        )
    }

    return (
        <>
            {intro && renderIntroText()}
            {renderButtons()}
            <div className='pricing-cards-container'>
                {cardsData.map(renderCards)}
            </div>
        </>
    )
}

export default PricingCards