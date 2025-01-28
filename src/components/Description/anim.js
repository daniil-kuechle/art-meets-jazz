import { delay } from "motion";

export const opacity = {
  inital: {
    scale: 0.9,
    opacity: 0,
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  closed: {
    opacity: 0,
    scale: 0.9,
  },
};

export const slideUp = {
  inital: {
    y: "100%",
  },
  open: (index) => ({
    y: 0,
    transition: { duration: 0.4 },
  }),
  closed: {
    y: "100%",
  },
};

export const slideUpLast = {
  inital: {
    y: "100%",
  },
  open: (index) => ({
    y: 0,
    transition: { duration: 0.8, delay: 7 },
  }),
  closed: {
    y: "100%",
  },
};

// transition: { duration: 0.5, delay: 0.06 * index },
// delay: 0.125 * index
