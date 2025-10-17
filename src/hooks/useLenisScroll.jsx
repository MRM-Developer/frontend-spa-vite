import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

function isAppleSafari() {
    if (typeof navigator === "undefined") return false;

    const ua = navigator.userAgent;
    const isMac = /Macintosh|Mac OS X/i.test(ua);
    const isIOS =
        /iP(hone|ad|od)/i.test(ua) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); // iPadOS

    // "Safari" appears in many UAs; exclude Chromium/Edge/Opera/Firefox shells (incl. iOS variants)
    const isPureSafari =
        /Safari/i.test(ua) &&
        !/Chrome|CriOS|Chromium|Edg|EdgiOS|OPR|OPiOS|FxiOS/i.test(ua);

    return isPureSafari && (isMac || isIOS);
}

export default function useLenisScroll() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Respect accessibility
        const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        // Only enable on Apple Safari (macOS/iOS). Everywhere else: native scroll.
        if (!isAppleSafari()) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            smoothTouch: false, // keep native touch on iOS unless you want to override
        });

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
}
