import { Route, Routes, useLocation } from "react-router-dom";
import { PaintingProvider } from "./contexts/PaintingContext";
import { AnimatePresence } from "motion/react";
import Homepage from "./Homepage";
import FormPage from "./components/Form/FormPage";
import Painting from "./components/Painting";
import paintings from "/public/paintings";
import "./index.css";

function App() {
  const location = useLocation();

  return (
    <PaintingProvider>
      <AnimatePresence mode="wait" exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Homepage />} />
          <Route path="Contact" element={<FormPage />} />
          {paintings.map(function (painting, index) {
            const artistLink = painting.artist.replaceAll(/\s+/g, "");
            const titleLink = painting.title.replaceAll(/\s+/g, "");
            return (
              <Route
                key={artistLink - titleLink}
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
          })}
        </Routes>
      </AnimatePresence>
    </PaintingProvider>
  );
}

export default App;
