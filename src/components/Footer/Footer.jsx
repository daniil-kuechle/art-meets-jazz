import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <ul>
            <li>Franz-Kobinger-Straße 11A</li>
            <li>86157 Augsburg</li>
          </ul>
          <ul>
            <li>Impressum</li>
            <li>Datenschutzerklärung</li>
          </ul>
        </div>
        <div className={styles.right}>
          <ul>
            <a href="">kontakt@art-meets-jazz.com</a>
            <li>+49 821 99 98 140</li>
          </ul>
          <ul>
            <Link to={`/Contact`}>
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
          className={styles.button}
        >
          <div>&uarr;</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
