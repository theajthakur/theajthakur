import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  triggerOnce = true,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          document.body.style.overflow = "hidden";
          setTimeout(() => {
            document.body.style.overflow = "auto";
          }, 500);
          if (triggerOnce) observer.unobserve(ref.current);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin, triggerOnce]);

  return [ref, isVisible];
}
