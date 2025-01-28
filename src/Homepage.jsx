import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Search } from "./components/Search";
import Logo from "./components/Logo";
import Footer from "./components/Footer/Footer";
import PureList from "./components/ListView/List";
import ContactButton from "./components/FilterButtons/ContactButton";
import Toggle from "./components/FilterButtons/Toggle";
import FilterContainer from "./components/FilterButtons/FilterContainer";
import Description from "./components/Description/Description";

import "./index.css";
import { usePainting } from "./contexts/PaintingContext";

function Homepage() {
  const { query, toggleFavorites, setToggleFavorites } = usePainting();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [query, toggleFavorites, setToggleFavorites]);

  return (
    <>
      <Navbar>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ContactButton link={`/Contact`} content={`Contact Us`} />
        </div>
      </Navbar>
      <FilterContainer>
        <Search />
        <Toggle />
      </FilterContainer>
      <PureList />
      <Description />
      <Footer />
    </>
  );
}

export default Homepage;
