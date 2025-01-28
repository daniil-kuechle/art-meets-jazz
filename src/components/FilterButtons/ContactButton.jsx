import styles from "./ContactButton.module.css";
import { Link } from "react-router-dom";

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
