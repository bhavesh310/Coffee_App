import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    // Use event delegation so dynamically rendered elements are covered
    const over = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, select, textarea, label')) {
        cursorRef.current?.classList.add('cursor-hover');
      }
    };
    const out = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, select, textarea, label')) {
        cursorRef.current?.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
