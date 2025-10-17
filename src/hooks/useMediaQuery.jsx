import { useState, useEffect } from 'react';

/**
    Custom hook to detect if a media query matches
    @param {string} query - CSS media query string (e.g., '(min-width: 768px)')
    @returns {boolean} - true if the media query currently matches, false otherwise
**/

function useMediaQuery(query) {
    // Initialize state with whether the media query matches or not.
    // The function inside useState is lazy initialization: it runs only once on mount.
    const [matches, setMatches] = useState(() => {
        // Check if 'window' is defined to avoid errors during server-side rendering (SSR).
        if (typeof window !== 'undefined') {
            // Use the browser's matchMedia API to check if the media query matches now.
            return window.matchMedia(query).matches;
        }
        // If window is not defined (SSR or other environment), default to false (no match).
        return false;
    });

    // Effect to listen for changes to the media query status
    useEffect(() => {
        // Again, check for window because this effect only runs on the client
        if (typeof window === 'undefined') return;

        // Create a MediaQueryList object for the query, to track changes
        const mediaQueryList = window.matchMedia(query);

        // Define a listener function that updates state when the media query's match changes
        const listener = (event) => {
            setMatches(event.matches);
        };

        // Add the listener to the MediaQueryList for changes.
        // Use addEventListener if available, otherwise fallback to addListener for older browsers.
        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', listener);
        } else {
            mediaQueryList.addListener(listener);
        }

        // Cleanup function to remove the listener when the component unmounts or query changes
        return () => {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener('change', listener);
            } else {
                mediaQueryList.removeListener(listener);
            }
        };
    }, [query]); // Re-run effect if the media query string changes

    // Return whether the media query currently matches or not
    return matches;
}

export default useMediaQuery;
