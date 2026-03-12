import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type AllowedTags = 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';

interface WordRevealProps {
  text: string;
  as?: AllowedTags;
  className?: string;
  /** Stagger delay between words in seconds (default 0.1) */
  stagger?: number;
  /** Delay before the first word starts (default 0) */
  initialDelay?: number;
}

/**
 * Splits `text` into words and reveals each one with a
 * fade + upward slide + blur-clear animation when the element
 * enters the viewport. Supports multi-line text with '\n' breaks.
 *
 * Use `as="span"` when nesting inside an existing heading tag.
 */
export function WordReveal({
  text,
  as: Tag = 'h2',
  className = '',
  stagger = 0.1,
  initialDelay = 0,
}: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Split by newline first, then by space
  const lines = text.split('\n');

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={`overflow-hidden ${className}`}>
      {lines.map((line, li) => {
        const words = line.split(' ');
        const wordsBefore = lines.slice(0, li).reduce((acc, l) => acc + l.split(' ').length, 0);
        return (
          <span key={li} className="flex flex-wrap justify-center gap-x-[0.22em]">
            {words.map((word, wi) => {
              const globalIdx = wordsBefore + wi;
              return (
                <motion.span
                  key={`${li}-${wi}`}
                  initial={{ opacity: 0, y: '55%', filter: 'blur(6px)' }}
                  animate={inView ? { opacity: 1, y: '0%', filter: 'blur(0px)' } : {}}
                  transition={{
                    delay: initialDelay + globalIdx * stagger,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              );
            })}
            {li < lines.length - 1 && <br />}
          </span>
        );
      })}
    </Tag>
  );
}
