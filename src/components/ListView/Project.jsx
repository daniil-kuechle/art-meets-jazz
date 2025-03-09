import { Link } from "react-router-dom";
import { memo } from "react";

function Project(props) {
  const artistLink = props.artist.replaceAll(/\s+/g, "");
  const titleLink = props.title.replaceAll(/\s+/g, "");

  return (
    <Link
      // className={styles.linkWrapper}
      style={{ width: "100%", paddingLeft: "8px" }}
      to={`${artistLink}/${titleLink}`}
    >
      <div
        className="list"
        onMouseLeave={() =>
          props.setModal({ active: false, index: props.index })
        }
        onMouseEnter={() =>
          props.setModal({ active: true, index: props.index })
        }
      >
        <div className="project">
          <span className="artist">{props.artist}</span>
          <span className="title">&apos;{props.title}&apos;</span>

          <div className="wrapper">
            {props.signed && <span className="signed">SIGNED&nbsp;</span>}
            {props.price === "SOLD" && <span className="sold">SOLD&nbsp;</span>}
            <span className="info">
              {props.technique} ({props.size})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const PureProject = memo(Project);

export default PureProject;
