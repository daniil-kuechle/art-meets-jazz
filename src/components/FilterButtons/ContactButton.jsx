import { Link } from "react-router-dom";
import styles from "./ContactButton.module.css";

function ContactButton({ link, content }) {
  return (
    <Link to={link}>
      <div className={styles.contact}>
        <p className={styles.contactText}>{content}</p>
      </div>
    </Link>
  );
}

export default ContactButton;
