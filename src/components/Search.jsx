import { useRef } from "react";
import { useKey } from "../customHooks/useKey";
import { usePainting } from "../contexts/PaintingContext";
import styles from "./Search.module.css";

export function Search() {
  const { query, setQuery } = usePainting();
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className={styles.search}
      type="text"
      placeholder="artists or title.."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
