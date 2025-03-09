import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { slideUp, opacity } from "./anim";
import styles from "./Description.module.css";

const phrase =
  "“When art meets jazz, something special has to emerge. Something profound? Something chaotic? Something experienced? Something extreme? Harald Zickhard attaches a lot of emphasis on a relationship between his pictures and motives. The observer has to be able to see everything in the faces of the people. The dedication. The responsibility. The perfectionism. To be exact, the jazz. Art and Jazz.";

const phraseTWO = "Harald Zickhardt has hit on them both.”";

function Description() {
  const imgRef = useRef(null);
  const container = useRef(null);
  const container2 = useRef(null);
  const isInView = useInView(container, { once: true });
  const imgInView = useInView(imgRef, { once: true });

  return (
    <div className={styles.description}>
      <div className={styles.body}>
        <p className={styles.containerWords}>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  ref={container}
                  variants={slideUp}
                  initial="initial"
                  animate={isInView ? "open" : "closed"}
                  custom={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <p className={styles.containerWords}>
          {phraseTWO.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  ref={container2}
                  variants={slideUp}
                  initial="initial"
                  animate={isInView ? "open" : "closed"}
                  custom={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
      </div>
      <motion.img
        ref={imgRef}
        variants={opacity}
        initial="initial"
        animate={imgInView ? "open" : "closed"}
        className={styles.harald}
        src="./harald_zickhardt.jpg"
        alt=""
      />
    </div>
  );
}

export default Description;
