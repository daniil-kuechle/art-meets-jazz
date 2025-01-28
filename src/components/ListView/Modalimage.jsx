function ModalIMG(props) {
  return (
    <img
      style={{
        maxWidth: 300,
        maxHeight: 300,
      }}
      src={props.src}
    ></img>
  );
}

export default ModalIMG;
