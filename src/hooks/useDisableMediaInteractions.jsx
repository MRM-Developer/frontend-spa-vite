import { useEffect } from 'react';

/**
 * Globally discourages saving/dragging media by:
 *  - preventing dragstart on media
 *  - preventing contextmenu (right-click) on media
 *  - preventing selectstart on media
 *
 * NOTE: This cannot *truly* prevent downloads (DevTools / screenshots).
 *
 * @param {Object} opts
 * @param {string} [opts.selector='img, picture, video, svg, canvas']
 *        CSS selector that identifies “media” to protect.
 * @param {boolean} [opts.contextMenuEverywhere=false]
 *        If true, blocks right-click on the whole document.
 */
export default function useDisableMediaInteractions(
    opts = { selector: 'img, picture, video, svg, canvas', contextMenuEverywhere: false }
    ) {
    const selector =
        typeof opts.selector === 'string'
        ? opts.selector
        : 'img, picture, video, svg, canvas';

    const contextMenuEverywhere = Boolean(opts.contextMenuEverywhere);

    useEffect(() => {
        // SSR/Non-DOM guard
        if (typeof document === 'undefined') return undefined;

        // Safely get an Element from an EventTarget (targets can be text nodes)
        const getElement = (t) => {
            if (!t || typeof t !== 'object') return null;
            // If it already looks like an Element (has .closest), use it
            if ('closest' in t) return t;
            // Text nodes, etc. – try parentElement
            if ('parentElement' in t) return t.parentElement;
            return null;
        };

        const isMedia = (t) => {
            const el = getElement(t);
            return !!(el && el.closest && el.closest(selector));
        };

        const onDragStart = (e) => {
            if (isMedia(e.target)) e.preventDefault();
        };

        const onSelectStart = (e) => {
            if (isMedia(e.target)) e.preventDefault();
        };

        const onContextMenu = (e) => {
            if (contextMenuEverywhere || isMedia(e.target)) e.preventDefault();
        };

        // Add listeners (passive must be false for preventDefault to work)
        document.addEventListener('dragstart', onDragStart, { passive: false });
        document.addEventListener('selectstart', onSelectStart, { passive: false });
        document.addEventListener('contextmenu', onContextMenu);

        // Cleanup
        return () => {
            document.removeEventListener('dragstart', onDragStart);
            document.removeEventListener('selectstart', onSelectStart);
            document.removeEventListener('contextmenu', onContextMenu);
        };
    }, [selector, contextMenuEverywhere]);
}
