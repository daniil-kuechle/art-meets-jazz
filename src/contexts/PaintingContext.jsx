import { createContext, useContext, useState } from "react";
import paintings from "/public/paintings";
import { useLocalStorageState } from "../customHooks/useLocalStorageState";

const PaintingContext = createContext();

function PaintingProvider({ children }) {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useLocalStorageState([], "ID");
  const [toggleFavorites, setToggleFavorites] = useState(false);

  let displayedPaintings = [];
  let filteredPaintings = [];

  let displayedFavorites = [];
  let filteredFavorites = [];

  let listPaintings = [];

  if (favorites.length === 0 && toggleFavorites) {
    setToggleFavorites(false);
  }

  if (toggleFavorites) {
    for (let i = 0; i < favorites.length; i++) {
      paintings.forEach((painting) => {
        if (painting.ID === favorites[i]) {
          displayedFavorites.push(painting);
        }
      });
    }

    listPaintings = displayedFavorites;

    if (query !== "" && query.length >= 2) {
      // filteredFavorites = [];
      listPaintings = [];
      filteredFavorites = displayedFavorites.filter(
        (painting) =>
          painting.artist.toLowerCase().includes(query.toLowerCase()) ||
          painting.title.toLowerCase().includes(query.toLowerCase())
      );
      listPaintings = filteredFavorites;
    }
  }

  if (!toggleFavorites) {
    displayedPaintings = paintings;
    listPaintings = displayedPaintings;

    if (query !== "" && query.length >= 2) {
      listPaintings = [];
      filteredPaintings = displayedPaintings.filter(
        (painting) =>
          painting.artist.toLowerCase().includes(query.toLowerCase()) ||
          painting.title.toLowerCase().includes(query.toLowerCase())
      );
      listPaintings = filteredPaintings;
    }
  }

  return (
    <PaintingContext.Provider
      value={{
        listPaintings,
        query,
        setQuery,
        favorites,
        setFavorites,
        toggleFavorites,
        setToggleFavorites,
      }}
    >
      {children}
    </PaintingContext.Provider>
  );
}

function usePainting() {
  const context = useContext(PaintingContext);
  if (context === undefined)
    throw new Error("PaintingContext was used outside of the PaintingProvider");
  return context;
}

export { PaintingProvider, usePainting };
