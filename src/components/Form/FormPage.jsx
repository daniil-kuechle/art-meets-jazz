import MyForm from "./MyForm";
import Navbar from "../Navbar";
import Logo from "../Logo";
import ContactButton from "../FilterButtons/ContactButton";
import styles from "./FormPage.module.css";
import { useState } from "react";

const text = "Interested in \na painting?";

function FormPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [response, setResponse] = useState("");

  function handleOpen(text) {
    setIsOpen();
    setResponse(text);
  }

  return (
    <div className={styles.wrapper}>
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
    </div>
  );
}

export default FormPage;
