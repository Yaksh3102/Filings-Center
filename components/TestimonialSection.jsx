import React from "react";
import { Container, Card } from "react-bootstrap";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const testimonialsData = [
    {
        name: "Naveen Chandra Raju",
        position: "LAVEN TECHNOLOGIES PRIVATE LIMITED",
        review: "Legal Dev is a one-stop platform for all accounting & invoice billing solutions, making our life easy.",
    },
    {
        name: "Arvind Gupta",
        position: "Manager",
        review: "They have consistently provided me with prompt and excellent services from qualified professionals.",
    },
    {
        name: "Monika Bansal",
        position: "Manager",
        review: "The cooperation of LegalDev's team is amazing. Their compliance follow-ups are excellent.",
    },
];

const TestimonialsSection = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3, // Default: show 3 reviews
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }, // Show 2 on tablets
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 }, // Show 1 on mobile
            },
        ],
    };

    return (
        <section className="testimonials-section">
            {/* <div className="testimonial-bg"></div> */}
            <Container>
                <div className="testimonial-header">
                    <p className="testimonial-subtitle">CUSTOMER FEEDBACKS</p>
                    <h2 className="testimonial-title">
                        See What Our Clients Have To Say
                    </h2>
                </div>
                <div className="testimonial-slider-container">
                    <Slider {...settings}>
                        {testimonialsData.map((testimonial, index) => (
                            <div key={index} className="testimonial-slide">
                                <Card className="testimonial-card">
                                    <p className="testimonial-text">
                                        “{testimonial.review}”
                                    </p>
                                    <div className="testimonial-footer">
                                        <div className="testimonial-info">
                                            <h4 className="testimonial-name">
                                                {testimonial.name}
                                            </h4>
                                            <p className="testimonial-position">
                                                {testimonial.position}
                                            </p>
                                        </div>
                                        <FaQuoteLeft className="testimonial-quote" />
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default TestimonialsSection;
