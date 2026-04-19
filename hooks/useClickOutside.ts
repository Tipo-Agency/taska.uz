import { useEffect, useRef, type RefObject } from 'react';

/**
 * Вызывает `onOutside` при `mousedown` вне любого из переданных DOM-узлов.
 * Актуальные `ref.current` и колбэк читаются на каждое событие (без лишних переподписок).
 */
export function useClickOutside(
  refs: readonly RefObject<HTMLElement | null>[],
  onOutside: () => void,
  enabled = true,
): void {
  const onOutsideRef = useRef(onOutside);
  onOutsideRef.current = onOutside;

  const refsRef = useRef(refs);
  refsRef.current = refs;

  useEffect(() => {
    if (!enabled) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      for (const r of refsRef.current) {
        if (r.current?.contains(target)) return;
      }
      onOutsideRef.current();
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [enabled]);
}
