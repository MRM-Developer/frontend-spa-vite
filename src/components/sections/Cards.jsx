// Import styles and libraries
import { useState, useRef, useEffect } from 'react';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
// Import hooks
import useMediaQuery from '../../hooks/useMediaQuery';
import useGsapHorizontalScroll from '../../hooks/useGsapHorizontalScroll';
// Import components
import Card from '../ui/Card';


const Cards = ({ intro, cardsData, cssClass = '' }) => {
    // Use i18n translations hook
    useTranslation();

    // State for card active
    const [openId, setOpenId] = useState(null);

    // Declare state for responsive design using custom hook
    const isDesktop = useMediaQuery('(min-width: 786px)');

    // Declare scroll horizontal hook
    const scrollHorizontalHook = useGsapHorizontalScroll({
        extraScrollAmount: 80,
        wrapperSelector: '.cards-scroll-wrapper',
        startTrigger: 'top 25%',
        contentLength: cssClass === '' ? cssClass.length : 0, // Disable if cssClass exists
        enabled: cssClass === '' // Pass a flag to disable internally
    });

    // Create a fallback ref in case we don't use horizontal scroll
    const fallbackRef = useRef(null);

    // Use the hook's ref if no cssClass, otherwise use fallbackRef
    const sectionRef = cssClass === '' && isDesktop ? scrollHorizontalHook.sectionRef : fallbackRef;
    const isCentered = cssClass === '' && isDesktop ? scrollHorizontalHook.isCentered : false;

    // useRef to check first card
    const firstCardRef = useRef(null);
    const hasAutoFlippedRef = useRef(false);
    const flipBackTimeoutRef = useRef(null);
    // useEffect to autoflip first card
    useEffect(() => {
        const firstId = cardsData?.[0]?.id;
        const node = firstCardRef.current;
        if (!node || !firstId || hasAutoFlippedRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAutoFlippedRef.current) {
                    hasAutoFlippedRef.current = true;

                    // Flip to back
                    setOpenId(firstId);

                    // Flip back after ~1.5s
                    flipBackTimeoutRef.current = setTimeout(() => {
                        // Only close if user hasn't changed to a different card
                        setOpenId((prev) => (prev === firstId ? null : prev));
                    }, 1500);

                    // We only want this once
                    observer.unobserve(node);
                }
            },
            {
                threshold: 0.6 // adjust sensitivity if needed
            }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
            if (flipBackTimeoutRef.current) {
                clearTimeout(flipBackTimeoutRef.current);
            }
        };
    }, [cardsData, setOpenId]);


    return (
        <section
            className={`section section-cards ${isCentered ? 'centered-cards' : ''} ${cssClass} ${cssClass === '' && !isDesktop ? 'scroll-active' : ''}`}
            ref={sectionRef}
        >
            {intro &&
                <div className='text-container'>
                    {intro.title && (
                        <h3 className='text-title'>
                            <Trans i18nKey={intro.title}
                                components={{
                                    bold: <span className='font-bold' />,
                                    boldRed: <strong className='font-red'/>,
                                }}
                                />
                        </h3>
                    )}
                    {intro.description && (
                        <p className='text-description'>
                            <Trans i18nKey={intro.description}
                                components={{
                                    bold: <span className='font-bold' />,
                                    boldRed: <strong className='font-red'/>,
                                }}
                            />
                        </p>
                    )}
                </div>
            }
            <div className="cards-scroll-wrapper">
                {cardsData.map((card, index) => (
                    <Card
                        ref={index === 0 ? firstCardRef : null}
                        key={card.id}
                        {...card}
                        currentOpenId={openId}
                        setOpenId={setOpenId}
                    />
                ))}
            </div>
        </section>
    );
};

export default Cards;