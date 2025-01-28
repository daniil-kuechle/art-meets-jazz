import { HashRouter, Route, Routes } from "react-router-dom";
import { PaintingProvider } from "./contexts/PaintingContext";
import { RouteProvider } from "./contexts/RouteContext";
import Homepage from "./Homepage";
import FormPage from "./components/Form/FormPage";
import "./index.css";

import { routes } from "./contexts/AllRoutes";

function App() {
  return (
    <HashRouter>
      <RouteProvider>
        <PaintingProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="Contact" element={<FormPage />} />
            {routes}
          </Routes>
        </PaintingProvider>
      </RouteProvider>
    </HashRouter>
  );
}

export default App;
