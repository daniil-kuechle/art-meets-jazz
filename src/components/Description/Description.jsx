import styles from "./Description.module.css";
import { motion, useInView } from "framer-motion";
import { opacity } from "./anim";
import { useRef } from "react";

const phrase =
  "“When art meets jazz, something special has to emerge. Something profound? Something chaotic? Something experienced? Something extreme? Harald Zickhard attaches a lot of emphasis on a relationship between his pictures and motives. The observer has to be able to see everything in the faces of the people. The dedication. The responsibility. The perfectionism. To be exact, the jazz. Art and Jazz.";

const phraseTWO = "Harald Zickhardt has hit on them both.”";

function Description() {
  const imgRef = useRef(null);
  const container = useRef(null);
  const isInView = useInView(container);
  const imgInView = useInView(imgRef);

  return (
    <div ref={container} className={styles.description}>
      <div className={styles.body}>
        <p className={styles.containerWords}>
          <motion.span
            variants={opacity}
            initial="initial"
            animate={isInView ? "open" : "closed"}
          >
            {phrase}
          </motion.span>
        </p>
        <p className={styles.containerWords}>
          <motion.span
            variants={opacity}
            initial="initial"
            animate={isInView ? "open" : "closed"}
          >
            {phraseTWO}
          </motion.span>
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
