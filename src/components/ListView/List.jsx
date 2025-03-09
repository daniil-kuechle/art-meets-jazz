import { useState, memo } from "react";
import { usePainting } from "../../contexts/PaintingContext";
import PureStarRating from "../StarRating";
import PureProject from "./Project";
import Modal from "./Modal";
import styles from "./List.module.css";

function List() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { listPaintings } = usePainting();

  return (
    <>
      <div className="listContainer">
        {listPaintings.map((project, index) => {
          return (
            <div key={project.ID} className={styles.wrapper}>
              <PureStarRating
                key={project.title}
                size={19}
                color="#dedc00"
                id={project.ID}
              />
              <PureProject
                {...project}
                key={project.ID}
                index={index}
                setModal={setModal}
              />
            </div>
          );
        })}
      </div>
      <Modal modal={modal} projects={listPaintings} />
    </>
  );
}

const PureList = memo(List);

export default PureList;
