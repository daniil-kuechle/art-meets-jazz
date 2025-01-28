import { useState, memo } from "react";
import PropTypes from "prop-types";
// import { useFavorites } from "../contexts/FavoritesContext";
import { usePainting } from "../contexts/PaintingContext";

import PureStar from "./Star";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  flexDirection: "column",
  gap: "10px",
};

const starContainerStyle = {
  display: "flex",
  alignItems: "center",
  alignContent: "center",
  // gap: "2px",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
  showText: PropTypes.bool,
};

function StarRating({ color = "#fcc419", size = 28, className = "", id }) {
  const { favorites, setFavorites } = usePainting();
  const [starFull, setStarFull] = useState(favorites.includes(id));
  const [tempRating, setTempRating] = useState(false);

  function handleRating() {
    if (favorites.includes(id)) {
      const deleteFav = favorites.filter((fav) => fav !== id);
      setFavorites(deleteFav);
    } else setFavorites((cur) => [...cur, id]);

    setStarFull((cur) => !cur);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        <PureStar
          onHandleRating={handleRating}
          key={id}
          onHoverIn={() => setTempRating(true)}
          onHoverOut={() => setTempRating(0)}
          full={tempRating ? tempRating : starFull}
          // full={starFull}
          color={color}
          size={size}
        />
      </div>
    </div>
  );
}

const PureStarRating = memo(StarRating);

export default PureStarRating;
