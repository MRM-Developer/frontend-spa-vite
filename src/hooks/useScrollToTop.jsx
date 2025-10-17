import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop({ delay = 200 } = {}) {
    const { pathname } = useLocation();

    // Reset scroll on route change
    useEffect(() => {
        const id = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "auto" });
        }, delay);
        return () => clearTimeout(id);
    }, [pathname, delay]);

    // Smooth scroll on logo clicks when already on "/"
    useEffect(() => {
        const logos = document.querySelectorAll(".header .logo, .footer .logo");
        if (!logos.length) return;

        const handleLogoClick = (e) => {
            if (pathname === "/") {
                e.preventDefault(); // prevent re-navigation to "/" if already there
                const reduce = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
                ).matches;
                window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            }
        };

        logos.forEach((logo) => logo.addEventListener("click", handleLogoClick));

        return () => {
            logos.forEach((logo) =>
                logo.removeEventListener("click", handleLogoClick)
            );
        };
    }, [pathname]);
}
