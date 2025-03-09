import styles from "./Logo.module.css";

function Logo() {
  return (
    <a href="/">
      <img className={styles.logo} src={"/AMJ_LOGO.png"} />
    </a>
  );
}

export default Logo;
