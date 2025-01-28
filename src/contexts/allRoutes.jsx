import paintings from "/public/paintings";
import Painting from "../components/Painting";
import { Route } from "react-router-dom";

export const routes = paintings.map(function (painting, index) {
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
