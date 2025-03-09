import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePainting } from "./contexts/PaintingContext";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import ContactButton from "./components/FilterButtons/ContactButton";
import FilterContainer from "./components/FilterButtons/FilterContainer";
import { Search } from "./components/Search";
import Toggle from "./components/FilterButtons/Toggle";
import PureList from "./components/ListView/List";
import Description from "./components/Description/Description";
import Footer from "./components/Footer/Footer";
import "./index.css";

function Homepage() {
  const { query, toggleFavorites, setToggleFavorites } = usePainting();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [query, toggleFavorites, setToggleFavorites]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.5, 1, 0.89, 1] }}
    >
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
    </motion.div>
  );
}

export default Homepage;
