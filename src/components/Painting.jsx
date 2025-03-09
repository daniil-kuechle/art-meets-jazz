import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import TitleFavorite from "./TitleFavorite";
import CenterMode from "./SimpleSlider";
import paintings from "../../public/paintings";
import { talkData } from "../../public/talkData";
import styles from "./Painting.module.css";

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
  const [touchStart, setTouchStart] = useState(null);
  const navigate = useNavigate();
  const single = useRef(null);

  const otherPictures = [];
  talkData.filter(function (data) {
    if (data.artist === props.artist) {
      otherPictures.push(data);
    }
  });

  // Calculate navigation paths only when routeIndex changes
  const { prevPath, nextPath } = useMemo(() => {
    const totalRoutes = paintings.length;

    // Calculate indices
    const prevIndex = (props.routeIndex - 1 + totalRoutes) % totalRoutes;
    const nextIndex = (props.routeIndex + 1) % totalRoutes;

    // Get paintings for the adjacent routes
    const prevPainting = paintings[prevIndex];
    const nextPainting = paintings[nextIndex];

    // Generate paths using the same format as routes
    return {
      prevPath: `/${prevPainting.artist.replaceAll(
        /\s+/g,
        ""
      )}/${prevPainting.title.replaceAll(/\s+/g, "")}`,
      nextPath: `/${nextPainting.artist.replaceAll(
        /\s+/g,
        ""
      )}/${nextPainting.title.replaceAll(/\s+/g, "")}`,
    };
  }, [props.routeIndex]);

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    navigate(prevPath, { replace: true });
  }, [navigate, prevPath]);

  const handleNext = useCallback(() => {
    navigate(nextPath, { replace: true });
  }, [navigate, nextPath]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, handlePrevious]);

  // If you want to add loading states or transitions:
  // const [isTransitioning, setIsTransitioning] = useState(false);

  // const handleNavigation = async (path) => {
  //   setIsTransitioning(true);
  //   await navigate(path, { replace: true });
  //   setIsTransitioning(false);
  // };

  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (touchStart === null) return;

      const currentTouch = e.touches[0].clientX;
      const diff = touchStart - currentTouch;

      if (Math.abs(diff) > 100) {
        // Minimum swipe distance
        if (diff > 0) {
          handleNext();
        } else {
          handlePrevious();
        }
        setTouchStart(null); // Reset after a successful swipe
      }
    },
    [touchStart, handleNext, handlePrevious]
  );

  const handleTouchEnd = useCallback(() => {
    setTouchStart(null); // Reset touch position on touch end
  }, []);

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

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
            <motion.button
              initial={{ opacity: 0, y: "50%" }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ ...transitionIMG, delay: 0.25 }}
              className={styles.navigate}
              onClick={handlePrevious}
              aria-label="Previous painting"
            >
              <p className={styles.buttonLeftText}>&#8249;</p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: "50%" }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ ...transitionIMG, delay: 0.25 }}
              className={styles.navigate}
              onClick={handleNext}
              aria-label="Next painting"
            >
              <p className={styles.buttonRightText}>&#8250;</p>
            </motion.button>
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
              maxWidth: "90vw",
              margin: "auto",
              paddingBottom: "1rem",
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
