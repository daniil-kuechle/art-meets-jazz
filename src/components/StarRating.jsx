import { useState, memo } from "react";
import PropTypes from "prop-types";
// import { useFavorites } from "../contexts/FavoritesContext";
import { usePainting } from "../contexts/PaintingContext";

import PureStar from "./Star";
import { useEffect } from "react";
import { useCallback } from "react";

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
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  showText: PropTypes.bool,
  enableKeyboard: PropTypes.bool,
};

function StarRating({
  color = "#fcc419",
  size = 28,
  className = "",
  id,
  enableKeyboard = false,
}) {
  const { favorites, setFavorites } = usePainting();
  const [starFull, setStarFull] = useState(favorites.includes(id));
  const [tempFull, setTempFull] = useState(false);

  const handleRating = useCallback(() => {
    setFavorites((curFavorites) =>
      curFavorites.includes(id)
        ? curFavorites.filter((fav) => fav !== id)
        : [...curFavorites, id]
    );
    setStarFull((cur) => !cur);
  }, [id, setFavorites]);

  // If rendered in TitleFavorite Enter Works
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleRating();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [enableKeyboard, handleRating]);

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        <PureStar
          onHandleRating={handleRating}
          onHandleTouchEnd={() => setTempFull(false)}
          onHandleTouchCancel={() => setTempFull(false)}
          key={id}
          onHoverIn={() => setTempFull(true)}
          onHoverOut={() => setTempFull(false)}
          full={tempFull ? tempFull : starFull}
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
