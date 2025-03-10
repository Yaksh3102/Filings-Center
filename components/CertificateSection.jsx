import React from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CertificateSection = ({ certificates }) => {
  if (!certificates || !certificates.images || certificates.images.length === 0) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container className="my-5">
      <div className="certificates-title mb-4">{certificates.title}</div>
      <Slider {...settings}>
        {certificates.images.map((img, index) => (
          <div key={index} className="d-flex justify-content-center">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${img}`}
              alt={`Certificate ${index + 1}`}
              style={{ width: "50%", height: "auto" }}
            />
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default CertificateSection;
