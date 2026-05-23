import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Infinite scroll hook using Intersection Observer.
 * Returns a ref to attach to a sentinel element at the bottom of the list.
 */
export function useInfiniteScroll(callback, options = {}) {
  const { threshold = 0.1, rootMargin = '200px' } = options;
  const sentinelRef = useRef(null);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callbackRef.current();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return sentinelRef;
}

export default useInfiniteScroll;
