// Import styles and libraries
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
// Import GSAP and pluggings
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Register GSAP pluggings
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom Hook para implementar un scroll horizontal con GSAP ScrollTrigger.
 * Automáticamente detecta si el scroll es necesario y aplica el comportamiento apropiado.
 *
 * @param {object} options - Opciones de configuración para el hook.
 * @param {number} [options.extraScrollAmount=80] - Cantidad extra de desplazamiento para el final.
 * @param {string} [options.wrapperSelector='.cards-scroll-wrapper'] - Selector CSS del contenedor a desplazar horizontalmente.
 * @param {string} [options.startTrigger='top 25%'] - Posición de inicio del ScrollTrigger.
 * @param {number} [options.contentLength] - Longitud del contenido para detectar cambios.
 * @returns {object} Un objeto con la ref de la sección y el estado de si necesita scroll.
 */
const useGsapHorizontalScroll = (options = {}) => {
    const {
        extraScrollAmount = 80,
        wrapperSelector = '.cards-scroll-wrapper',
        startTrigger = 'top 25%',
        contentLength = 0,
    } = options;

    const sectionRef = useRef(null);
    const [needsScroll, setNeedsScroll] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Function to check if scroll is needed
    const checkIfScrollNeeded = () => {
        if (!sectionRef.current) return false;

        const wrapper = sectionRef.current.querySelector(wrapperSelector);
        if (!wrapper) return false;

        // Force a reflow to ensure measurements are accurate
        wrapper.offsetWidth;

        const containerWidth = wrapper.parentElement.clientWidth;
        const scrollWidth = wrapper.scrollWidth;

        return scrollWidth > containerWidth;
    };

    // Set mounted state
    useLayoutEffect(() => {
        setIsMounted(true);
    }, []);

    // Check scroll need after mount and on resize
    useEffect(() => {
        if (!isMounted) return;

        const handleResize = () => {
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                const needsScrolling = checkIfScrollNeeded();
                setNeedsScroll(needsScrolling);
            }, 50);
        };

        // Initial check
        handleResize();

        // Add resize listener
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, contentLength, wrapperSelector]);

    // Apply GSAP scroll when needed
    useLayoutEffect(() => {
        // Don't apply GSAP if scroll is not needed
        if (!needsScroll) return;

        // Make sure current section reference exists
        if (!sectionRef.current) {
            return;
        }

        // Select wrapper
        const scrollWrapper = sectionRef.current.querySelector(wrapperSelector);
        if (!scrollWrapper) {
            return;
        }

        // Get amount to scroll
        const getScrollAmount = () => {
            const scrollAmount = scrollWrapper.scrollWidth - scrollWrapper.clientWidth + extraScrollAmount;
            return -scrollAmount;
        };

        // Declare GSAP to
        let ctx = gsap.context(() => {
            gsap.to(scrollWrapper, {
                x: getScrollAmount,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    pinSpacing: true,
                    scrub: 5,
                    start: startTrigger,
                    end: () => `+=${scrollWrapper.offsetWidth + extraScrollAmount}`,
                    invalidateOnRefresh: true,
                }
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, [needsScroll, extraScrollAmount, wrapperSelector, startTrigger]);

    return {
        sectionRef,
        needsScroll,
        isCentered: !needsScroll
    };
};

export default useGsapHorizontalScroll;