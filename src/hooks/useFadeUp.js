import { useEffect, useRef } from 'react';

export function useFadeUp(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options },
    );

    const children = el.querySelectorAll('.fade-up');
    children.forEach((child) => observer.observe(child));

    if (el.classList.contains('fade-up')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
