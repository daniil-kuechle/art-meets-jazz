import { motion } from "motion/react";

const transition = (OGComponent) => {
  return () => {
    <>
      <OGComponent />
      <motion.div
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      />
      <motion.div
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      />
    </>;
  };
};

export default transition;
