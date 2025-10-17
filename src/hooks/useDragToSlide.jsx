// src/hooks/useDragToSlide.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * useDragToSlide (horizontal-only)
 * A generic “click/hold & drag (or finger drag)” hook for carousels and horizontally draggable UIs.
 *
 * HOW TO USE (typical):
 * - Call the hook inside your component and spread the returned `bind` onto the draggable lane (or active card wrapper).
 * - While dragging, apply `style={{ transform: \`translateX(${offset}px)\` }}` to your lane or card(s).
 * - On release, we call `onCommit('next'|'prev')` if the swipe is strong/long enough; otherwise we call `onCancel()`.
 * - The hook does NOT manage your slide index; keep that in your component.
 *
 * This version is strictly horizontal (X axis) to avoid vertical-scroll conflicts and keep the API focused.
 */

export function useDragToSlide({
  // --- Configuration options (horizontal only) ---
  enabled = true,              // Enable/disable the whole behavior
  thresholdPx,                 // Absolute px distance to trigger (if omitted, uses fractionOfSize)
  fractionOfSize = 0.25,       // Fallback threshold (25% of width) when thresholdPx is not provided
  velocityThreshold = 0.65,    // px/ms to trigger on quick flick
  rubberband = true,           // Add gentle resistance on large pulls
  lockScroll = true,           // Prevent vertical page scroll once horizontal intent is detected
  getSize,                     // Optional: () => number; if not provided, uses target.clientWidth
  onCommit,                    // (dir: 'next' | 'prev') => void
  onCancel,                    // () => void
} = {}) {
  // === State & Refs ==========================================================
  /** Live drag offset in pixels (apply to translateX for visual feedback) */
  const [offset, setOffset] = useState(0);

  /** Whether a drag is currently active */
  const [isDragging, setDragging] = useState(false);

  /** The element we bind handlers to */
  const elRef = useRef(null);

  /** "Pointer is down" flag */
  const downRef = useRef(false);

  /** Start position/time of the current drag */
  const startPosRef = useRef({ x: 0, y: 0, t: 0 });

  /** Last known pointer position/time (used for velocity) */
  const lastRef = useRef({ x: 0, y: 0, t: 0 });

  /** Whether we've locked the intent to horizontal vs vertical */
  const intentLockedRef = useRef(false);

  /** Whether we've already prevented vertical scrolling */
  const preventedScrollRef = useRef(false);

  // === Helpers ===============================================================
  /** High-resolution timestamp */
  const now = () => performance.now();

  /**
   * Compute the "size" used to determine thresholds.
   * If `getSize` is provided, we use it; otherwise, we use the element's clientWidth.
   */
  const computeSize = useCallback(
    (target) => {
      if (typeof getSize === 'function') return getSize();
      if (!target) return 1;
      return target.clientWidth || 1;
    },
    [getSize]
  );

  /**
   * Distance threshold to consider the swipe "committed".
   * Uses either an absolute `thresholdPx` or a fraction of the element width.
   */
  const getThreshold = useCallback(
    (target) => {
      if (typeof thresholdPx === 'number') return Math.max(4, thresholdPx);
      const size = computeSize(target);
      return Math.max(8, Math.round(size * fractionOfSize));
    },
    [thresholdPx, computeSize, fractionOfSize]
  );

  // === Programmatic swipe (optional convenience) =============================
  /**
   * Programmatically trigger a commit in a direction.
   * Example: `swipe('next')` to advance without dragging.
   */
  const swipe = useCallback(
    (dir) => {
      if (!enabled) return;
      if (dir !== 'next' && dir !== 'prev') return;
      onCommit?.(dir);
    },
    [enabled, onCommit]
  );

  // === Pointer handlers: DOWN ================================================
  /**
   * Begin tracking a drag when the primary (left) button or a touch starts.
   * Also sets a `touch-action` hint to keep vertical scrolling available until horizontal intent is clear.
   */
  const onPointerDown = useCallback(
    (e) => {
      if (!enabled) return;
      if (e.button !== undefined && e.button !== 0) return; // left-click only

      const target = elRef.current || e.currentTarget;
      if (!target) return;

      const x = e.clientX ?? 0;
      const y = e.clientY ?? 0;
      const t = now();

      downRef.current = true;
      setDragging(true);

      startPosRef.current = { x, y, t };
      lastRef.current = { x, y, t };
      intentLockedRef.current = false;
      preventedScrollRef.current = false;

      // Hint the browser to keep vertical panning enabled until we prove otherwise
      if (lockScroll && target.style) {
        // You can also set this in CSS: `touch-action: pan-y;`
        target.style.touchAction = 'pan-y';
      }
    },
    [enabled, lockScroll]
  );

  // === Pointer handlers: MOVE ================================================
  /**
   * While dragging:
   * - Lock the interaction to horizontal when movement is decisive
   * - Prevent default to stop vertical page scroll once horizontal intent is locked
   * - Update live offset (with optional rubberband resistance)
   */
  const onPointerMove = useCallback(
    (e) => {
      if (!enabled || !downRef.current) return;

      const { x: sx, y: sy } = startPosRef.current;
      const { x: lx, y: ly } = lastRef.current;

      const cx = e.clientX ?? lx;
      const cy = e.clientY ?? ly;

      const dx = cx - sx;
      const dy = cy - sy;

      // Lock intent (horizontal vs vertical) to avoid scroll conflicts
      if (!intentLockedRef.current) {
        if (Math.abs(dx) + Math.abs(dy) > 6) {
          intentLockedRef.current = true;

          // Once horizontal intent is clear, prevent vertical scrolling
          if (lockScroll && Math.abs(dx) > Math.abs(dy) && !preventedScrollRef.current) {
            e.preventDefault?.();
            preventedScrollRef.current = true;
          }

          // Capture subsequent pointer events to this element
          (elRef.current || e.currentTarget)?.setPointerCapture?.(e.pointerId);
        }
      } else if (preventedScrollRef.current) {
        // Keep preventing scroll while we drag horizontally
        e.preventDefault?.();
      }

      // Update last-known pointer
      lastRef.current = { x: cx, y: cy, t: now() };

      // Horizontal-only delta
      const rawDelta = dx;

      // Optionally apply gentle resistance as the drag grows
      let nextOffset = rawDelta;
      if (rubberband) {
        const abs = Math.abs(rawDelta);
        const k = 0.0008; // resistance factor
        nextOffset = Math.sign(rawDelta) * (abs - Math.log(1 + k * abs) / k);
        // Small drags are ~1:1; very large pulls gain resistance.
      }

      setOffset(nextOffset);
    },
    [enabled, lockScroll, rubberband]
  );

  // === Pointer handlers: UP/CANCEL ===========================================
  /**
   * Finish the drag:
   * - Decide commit vs cancel using distance and velocity
   * - Call onCommit('next' | 'prev') or onCancel()
   * - Reset visual offset to 0 (consumer can animate the snap-back)
   */
  const onPointerUp = useCallback(
    (e) => {
      if (!enabled || !downRef.current) return;

      const target = elRef.current || e.currentTarget;
      const { x: sx, t: st } = startPosRef.current;
      const { x: ex, t: et } = lastRef.current;

      downRef.current = false;
      setDragging(false);

      // Distance and velocity along X
      const dist = ex - sx;
      const dt = Math.max(1, et - st); // avoid divide-by-zero
      const v = dist / dt; // px per ms

      const absDist = Math.abs(dist);
      const thresh = getThreshold(target);
      const strongFlick = Math.abs(v) >= velocityThreshold;
      const passedDistance = absDist >= thresh;

      if (strongFlick || passedDistance) {
        if (dist < 0) onCommit?.('next');
        else onCommit?.('prev');
      } else {
        onCancel?.();
      }

      // Smoothly snap back UI offset (consumer can animate)
      setOffset(0);

      // Release capture if we have it
      if (target?.hasPointerCapture?.(e.pointerId)) {
        target.releasePointerCapture(e.pointerId);
      }
    },
    [enabled, getThreshold, velocityThreshold, onCommit, onCancel]
  );

  // === Props binder (spread these on your draggable element) =================
  /**
   * The bind object includes:
   * - ref: element ref to attach
   * - pointer handlers: down/move/up/cancel
   * - keyboard affordances: ArrowRight/ArrowLeft trigger next/prev
   * - a11y roles
   */
  const bind = useMemo(
    () => ({
      ref: elRef,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onKeyDown: (e) => {
        if (!enabled) return;
        if (e.key === 'ArrowRight') swipe('next');
        if (e.key === 'ArrowLeft') swipe('prev');
      },
      tabIndex: 0,
      role: 'application',
      'aria-roledescription': 'carousel',
    }),
    [enabled, onPointerDown, onPointerMove, onPointerUp, swipe]
  );

  // === Cleanup on unmount ====================================================
  /**
   * Ensure internal flags are reset if the component unmounts mid-drag.
   */
  useEffect(() => {
    return () => {
      downRef.current = false;
      setDragging(false);
    };
  }, []);

  // === Public API ============================================================
  return {
    // Spread these on your draggable element: <div {...bind}>…</div>
    bind,

    // Live drag offset (px). Apply to your lane/card transform for feedback.
    offset,

    // Whether we are currently dragging
    isDragging,

    // Expose setters/utilities for advanced cases
    setOffset,
    swipe,
  };
}

export default useDragToSlide;
