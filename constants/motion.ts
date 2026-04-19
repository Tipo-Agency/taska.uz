import type { Variants } from 'framer-motion';

/** Единый `viewport` для `whileInView`, чтобы не дублировать объекты по компонентам. */
export const viewportOnce = { once: true as const };

export const fadeUp = (y = 12) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
});

export const fadeUpInView = (y = 12) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
});

export const fadeLeft = (x = 12) => ({
  initial: { opacity: 0, x },
  animate: { opacity: 1, x: 0 },
});

export const fadeLeftInView = (x = 12) => ({
  initial: { opacity: 0, x },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewportOnce,
});

/** Родитель для `variants` + `initial="hidden"` / `whileInView="visible"`. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const staggerItem = (y = 12): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0 },
});

/** Появление «окна демо» в hero-мокапах модулей. */
export const heroVisualEntrance = {
  initial: { opacity: 0, y: 28, rotateX: 8 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  transition: { duration: 0.75, delay: 0.25, type: 'spring' as const, stiffness: 80 },
};
