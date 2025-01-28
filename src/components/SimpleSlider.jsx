import Slider from "react-slick";

function CenterMode(props) {
  const settings = {
    className: "center",
    slidesToShow: 3,
    // slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    infinite: true,
    // centerPadding: "60px",
    speed: 350,
    easing: "0.77, 0, 0.175, 1",
    autoplay: true,
    autoplaySpeed: 2200,
    adaptiveHeight: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
    ],
  };
  return (
    <div style={{ backgroundColor: "var(--color-18MATTGREY)" }}>
      <div
        style={{ maxWidth: "80vw", margin: "auto" }}
        className="slider-container"
      >
        <Slider {...settings}>
          {props.other.map(function (data) {
            return (
              <div key={data.path}>
                <img
                  style={{
                    backgroundColor: "#7c7c7c",
                    maxHeight: "18rem",
                    padding: "0.5rem",
                  }}
                  src={data.path}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default CenterMode;
