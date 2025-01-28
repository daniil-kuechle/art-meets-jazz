import styles from "./TitleFavorite.module.css";
import PureStarRating from "./StarRating";

function TitleFavorite(props) {
  return (
    <div className={styles.artistName}>
      <PureStarRating size={25} color="#dedc00" id={props.ID} />
      <p style={{ paddingLeft: "5px" }}>
        <span className={styles.titleTop}>{props.artist}</span>
        <span className={styles.titleTop} style={{ fontWeight: "500" }}>
          &apos;{props.title}&apos;
        </span>
      </p>
    </div>
  );
}

export default TitleFavorite;
