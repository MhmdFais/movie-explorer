import { useEffect, useRef } from "react";

// Put the returned ref on an empty div at the bottom of the list.
// When it comes within 300px of the screen, onHit() runs.
export default function useInfiniteScroll(onHit, enabled = true) {
  const ref = useRef(null);
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && onHit(), {
      rootMargin: "300px",
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [onHit, enabled]);
  return ref;
}
