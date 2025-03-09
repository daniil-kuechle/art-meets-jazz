import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../Navbar";
import Logo from "../Logo";
import ContactButton from "../FilterButtons/ContactButton";
import MyForm from "./MyForm";
import styles from "./FormPage.module.css";
const text = "Interested in \na painting?";

function FormPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [response, setResponse] = useState("");

  function handleOpen(text) {
    setIsOpen();
    setResponse(text);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.5, 1, 0.89, 1] }}
      className={styles.wrapper}
    >
      <Navbar>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ContactButton link={`/`} content={`Go Back`} />
        </div>
      </Navbar>
      <div className={styles.container}>
        {!isOpen && (
          <div className={styles.textContainer}>
            <p className={styles.response}>{response}</p>
          </div>
        )}
        {isOpen && (
          <div className={styles.textContainer}>
            <p className={styles.small}>LET&#39;S TALK</p>
            <p className={styles.big}>{text}</p>
          </div>
        )}
        {isOpen && <MyForm handleSetIsOpen={handleOpen} />}
      </div>
    </motion.div>
  );
}

export default FormPage;
