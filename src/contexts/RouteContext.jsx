import { createContext, useContext, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import Painting from "../components/Painting";
import paintings from "/public/paintings";

const routes = paintings.map(function (painting, index) {
  const artistLink = painting.artist.replaceAll(/\s+/g, "");
  const titleLink = painting.title.replaceAll(/\s+/g, "");
  return (
    <Route
      key={artistLink + titleLink}
      path={`${artistLink}/${titleLink}`}
      element={
        <Painting
          {...painting}
          routeIndex={index}
          key={artistLink + titleLink + index}
        />
      }
    />
  );
});

const RouteContext = createContext();

function RouteProvider({ children }) {
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const navigate = useNavigate();

  const goToNextRoute = () => {
    const nextIndex = (currentRouteIndex + 1) % routes.length;
    setCurrentRouteIndex(nextIndex);
    navigate(routes[nextIndex].path);
  };

  return (
    <RouteContext.Provider
      value={{
        currentRouteIndex,
        setCurrentRouteIndex,
        goToNextRoute,
        routes,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

function useRoute() {
  const context = useContext(RouteContext);
  if (context === undefined)
    throw new Error("RouteContext was used outside of the RouteProvider");
  return context;
}

export { RouteProvider, useRoute };
