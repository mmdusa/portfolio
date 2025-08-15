// src/utils/motion.js
export const containerStagger = {
  hidden: { opacity: 1 }, // keep layout stable
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

// alternate left/right/up based on index
export const popIn = (i = 0) => {
  const dir = i % 3; // 0:left, 1:right, 2:up
  const offset =
    dir === 0
      ? { x: -40, y: 0 }
      : dir === 1
      ? { x: 40, y: 0 }
      : { x: 0, y: 40 };

  return {
    hidden: { opacity: 0, scale: 0.98, ...offset },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 320, damping: 26 },
    },
  };
};
