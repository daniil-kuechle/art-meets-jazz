// import React from "react";
import { usePainting } from "../../contexts/PaintingContext";
import { motion } from "motion/react";
import styles from "./Toggle.module.css";

function Toggle() {
  const { favorites, toggleFavorites, setToggleFavorites } = usePainting();

  function filterPaintings() {
    if (favorites.length === 0) return;
    setToggleFavorites((cur) => !cur);
  }

  const buttonClass = toggleFavorites ? styles.active : styles.ball;

  return (
    <div className={styles.wrapper}>
      <div>
        <span className={styles.favoriteCount}>{favorites.length} </span>
        <span className={styles.favorite}>
          {favorites.length === 1 ? "favorite" : "favorites"}
        </span>
      </div>
      <motion.button
        type="button"
        role="switch"
        aria-checked={toggleFavorites}
        className={styles.toggle}
        onClick={() => filterPaintings()}
        style={{ justifyContent: !toggleFavorites ? "flex-start" : "flex-end" }}
      >
        <motion.span
          initial={false}
          layout={true}
          className={buttonClass}
          transition={{
            type: "spring",
            stiffness: 1000,
            damping: 50,
          }}
        />
      </motion.button>
    </div>
  );
}

export default Toggle;
