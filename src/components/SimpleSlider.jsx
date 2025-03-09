import Slider from "react-slick";

function CenterMode(props) {
  const settings = {
    accessibility: false,
    className: "center",
    slidesToShow: 3,
    // slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    infinite: true,
    // centerPadding: "60px",
    speed: 500,
    easing: "0.25, 1, 0.5, 1",
    autoplay: true,
    autoplaySpeed: 3000,
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
