import React from "react";
import { Container, Card } from "react-bootstrap";
import Slider from "react-slick";
import { useDetails } from "@/contexts/DetailsContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

/* Custom Navigation Arrows */
const CustomPrevArrow = ({ onClick }) => (
    <div className="custom-arrow custom-prev" onClick={onClick}>
        ❮
    </div>
);

const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrow custom-next" onClick={onClick}>
        ❯
    </div>
);

const ServicesSection = () => {
    const { services } = useDetails();

    const allServices = services.reduce(
        (acc, group) => [...acc, ...group.services],
        []
    );

    const displayedServices = allServices;

    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 4, // 4 cards in a row
        slidesToScroll: 2, // Scroll by 2 at a time
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 2 },
            }, 
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            }, 
            {
                breakpoint: 576,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            }, 
        ],
    };

    return (
        <section className="services-section">
            <Container>
                <div className="text-center mb-4">
                    <h2 className="services-heading">Our Services</h2>
                    <p className="services-subheading">
                        We offer a wide range of professional services to
                        support your business.
                    </p>
                </div>
                <Slider {...settings}>
                    {displayedServices.map((service, index) => (
                        <div key={index} className="service-slide">
                            <Card className="service-card">
                                <Card.Img
                                    variant="top"
                                    src={
                                        service.bannerImage
                                            ? `${process.env.NEXT_PUBLIC_BASE_URL}/${service.bannerImage}`
                                            : "/assets/services_fallback.png"
                                    }
                                    className="service-img"
                                />
                                <Card.Body>
                                    <Card.Title className="service-title">
                                        {service.serviceName}
                                    </Card.Title>
                                    <Card.Text className="service-description">
                                        {service.description ||
                                            "Learn more about this service."}
                                    </Card.Text>
                                    <Link
                                        href={`/services/${service._id}`}
                                        className="read-more"
                                    >
                                        READ MORE
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    );
};

export default ServicesSection;
