// Import styles and libraries
import '../../styles/com-ui.carousel.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import hooks
import useDragToSlide from '../../hooks/useDragToSlide';


const Carousel = ({ slides, autoSlideInterval = 10000 }) => {
    // States for translations
    const { t } = useTranslation();

    // States for slide index
    const [currentIndex, setCurrentIndex] = useState(0);
    // State for current slide
    const currentSlide = slides[currentIndex];

    // State for hovered items
    const [isHovered, setIsHovered] = useState(false);

    // Decide whether dragging should be enabled (disable when there's only one slide)
    const dragEnabled = Array.isArray(slides) ? slides.length > 1 : false;

    // Set use drag hook (pass enabled flag so the hook itself short-circuits when disabled)
    const { bind: dragBind, offset, isDragging } = useDragToSlide({
        enabled: dragEnabled,
        // Horizontal-only dragging; the hook handles intent locking & a11y
        fractionOfSize: 0.15,
        velocityThreshold: 0.65,
        onCommit: (dir) => {
            setCurrentIndex(prev => {
            const len = slides.length;
            if (!len) return prev;
            return (prev + (dir === 'next' ? 1 : -1) + len) % len;
            });
        },
        onCancel: () => {},          // optional
    });

    // Auto-slide
    useEffect(() => {
        // Pause auto slide while hovered or dragging, and when there’s only one slide
        if (isHovered || isDragging || slides.length <= 1) return;
        // Set interval for auto scroll
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [slides.length, autoSlideInterval, isHovered, isDragging]);

    // Manual navigation
    const goToSlide = (index) => setCurrentIndex(index);

    // Render text in the image
    const renderText = () => {
        return (
            <>
                {currentSlide.text && currentSlide.link && (
                    <NavLink className="carousel-text carousel-link" to={currentSlide.link}>
                        {currentSlide.text}
                        <p>{t(currentSlide.cta)}</p>
                    </NavLink>
                )}
                {currentSlide.text && !currentSlide.link && (
                    <p className="carousel-text">
                        {currentSlide.text}
                    </p>
                )}
            </>
        )
    }

    // Render carousel navigation dots
    const renderNavigationDots = () => {
        return (
            <>
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </>
        )
    }

    return (
        <div
            className={`carousel ${dragEnabled ? "carousel-draggable" : ""} ${isDragging ? "carousel-drag" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...(dragEnabled ? dragBind : {})}
            style={{
                transform: `translateX(${dragEnabled ? offset : 0}px)`,
                transition: isDragging ? 'none' : 'transform 200ms ease-out',
            }}
        >
            <img src={currentSlide.image} alt={currentSlide.alt} width={currentSlide.width} height={currentSlide.height} className="carousel-image" />
            {renderText()}
            {slides.length > 1 && renderNavigationDots()}
        </div>
    );
};

export default Carousel;