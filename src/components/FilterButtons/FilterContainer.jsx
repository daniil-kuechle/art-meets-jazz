import styles from "./FilterContainer.module.css";

function FilterContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default FilterContainer;
