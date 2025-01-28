import styles from "./Painting.module.css";
import Navbar from "./Navbar";
import { motion } from "motion/react";
import Logo from "./Logo";
import { talkData } from "../../public/talkData";
import CenterMode from "./SimpleSlider";
import { useEffect, useRef } from "react";
import TitleFavorite from "./TitleFavorite";
import { useRoute } from "../contexts/RouteContext";
import { Route, Link } from "react-router-dom";
import paintings from "../../public/paintings";

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

const transitionIMG = {
  duration: 1,
  delay: 0,
  ease: [0.77, 0, 0.175, 1],
};

const transition = {
  duration: 1,
  ease: [0.23, 1, 0.32, 1],
};

function Painting(props) {
  const otherPictures = [];
  const { setCurrentRouteIndex } = useRoute();
  // console.log(props.routeIndex);
  // console.log(routes.length);

  const prevIndex = props.routeIndex <= 0 ? routes.length : props.routeIndex;
  const prevPath = routes[(prevIndex - 1) % routes.length].props.path;
  const nextPath = routes[(props.routeIndex + 1) % routes.length].props.path;

  const single = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  talkData.filter(function (data) {
    if (data.artist === props.artist) {
      otherPictures.push(data);
    }
  });

  return (
    <>
      <div className={styles.paintingContainer}>
        <Navbar>
          <Logo />
          <TitleFavorite {...props} />
        </Navbar>

        <div className={styles.painting}>
          <motion.img
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transitionIMG}
            className={styles.artistPainting}
            src={props.path}
          ></motion.img>
        </div>

        <motion.div className={styles.information}>
          <div className={styles.outer}>
            <Link
              to={`/${prevPath}`}
              onClick={() => setCurrentRouteIndex(props.routeIndex - 1)}
            >
              <motion.button
                initial={{ opacity: 0, y: "50%" }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ ...transitionIMG, delay: 0.25 }}
                className={styles.navigate}
              >
                <p className={styles.buttonLeftText}>&#8249;</p>
              </motion.button>
            </Link>
            <Link
              to={`/${nextPath}`}
              onClick={() => setCurrentRouteIndex(props.routeIndex + 1)}
            >
              <motion.button
                initial={{ opacity: 0, y: "50%" }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ ...transitionIMG, delay: 0.25 }}
                className={styles.navigate}
              >
                <p className={styles.buttonRightText}>&#8250;</p>
              </motion.button>
            </Link>
          </div>
          <div className={styles.inner}>
            <motion.div
              initial={{ opacity: 0, y: "50%" }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ ...transition, delay: 0.5 }}
              className={styles.left}
            >
              <p>{props.technique}</p>
              <p className={styles.title}>&apos;{props.title}&apos;</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: "50%" }}
              animate={{
                y: "0%",
                opacity: 1,
              }}
              transition={{ ...transition, delay: 0.75 }}
              className={styles.left}
            >
              <p>Dimensions</p>
              <p className={styles.title}>{props.size}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: "50%" }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ ...transition, delay: 1 }}
              className={styles.left}
            >
              <p>Price</p>
              <p className={styles.title}>
                {props.price.toLowerCase() === "sold!"
                  ? props.price.slice(0, -1).toLowerCase()
                  : props.price.toLowerCase()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: "50%" }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ ...transition, delay: 1.25 }}
              className={styles.left}
            >
              <p>Signature</p>
              <p className={styles.title}>
                {props.signed ? "signed by the musician" : "not signed"}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {otherPictures.length !== 0 && (
          <motion.div
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            style={{
              textAlign: "center",
              // marginTop: "auto",
              // marginBottom: "auto",
              fontSize: "3rem",
              marginBottom: "1rem",
              color: "var(--color-AMJ)",
            }}
            initial={{ opacity: 0, y: "50%" }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ ...transition, delay: 2 }}
          >
            <span
              style={{
                cursor: "pointer",
              }}
            >
              &darr;
            </span>
          </motion.div>
        )}
      </div>

      {otherPictures.length !== 0 && otherPictures.length > 2 && (
        <CenterMode other={otherPictures} />
      )}
      {otherPictures.length !== 0 && otherPictures.length <= 2 && (
        <div style={{ backgroundColor: "var(--color-18MATTGREY)" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
              maxWidth: "95vw",
              margin: "auto",
              paddingBottom: "2rem",
              flex: "0 1 1",
            }}
          >
            {otherPictures.map(function (picture) {
              return (
                <div key={picture.path} className={styles.single}>
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    transition={transition}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.4 }}
                    ref={single}
                    className={styles.talkIMG}
                    src={picture.path}
                  ></motion.img>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Painting;
