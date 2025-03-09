import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import ModalIMG from "./ModalImage";
import styles from "./Modal.module.css";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  open: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.6, ease: [0.45, 0, 0.55, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] },
  },
};

function Modal(props) {
  const { active, index } = props.modal;
  const container = useRef(null);

  useEffect(() => {
    const moveContainerX = gsap.quickTo(container.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const moveContainerY = gsap.quickTo(container.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      moveContainerX(clientX);
      moveContainerY(clientY);
    });
  }, []);

  return (
    <motion.div
      ref={container}
      variants={scaleAnimation}
      initial={"initial"}
      animate={active ? "open" : "closed"}
      className={styles.modalContainer}
    >
      <div style={{ top: index * -100 + "%" }} className={styles.modalSlider}>
        {props.projects.map((project) => {
          return (
            <div
              key={project.ID}
              style={{ backgroundColor: "#7c7c7c" }}
              className={styles.modal}
            >
              <ModalIMG src={project.path} alt="image" />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Modal;
