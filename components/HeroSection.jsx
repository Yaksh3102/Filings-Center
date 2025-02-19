import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Col, Container, Row } from "reactstrap";

const HeroSection = ({ heroData }) => {
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${encodeURI(
        heroData?.bannerImage
    )}`;

    return (
        <div
            className="hero-container mt-5"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "600px",
                position: "relative",
            }}
        >
            <div className="hero-wrapper">
                <Container>
                    <Row>
                        <Col md={7} className="hero-content">
                            <div className="vertical-links">
                                <Link
                                    href="https://facebook.com"
                                    target="_blank"
                                >
                                    <FaFacebook /> FACEBOOK
                                </Link>
                                <Link
                                    href="https://instagram.com"
                                    target="_blank"
                                >
                                    <FaInstagram /> INSTAGRAM
                                </Link>
                                <Link
                                    href="https://youtube.com"
                                    target="_blank"
                                >
                                    <FaYoutube /> YOUTUBE
                                </Link>
                                <Link
                                    href="https://linkedin.com"
                                    target="_blank"
                                >
                                    <FaLinkedin /> LINKEDIN
                                </Link>
                            </div>
                            <div
                                className="hero-text"
                                dangerouslySetInnerHTML={{
                                    __html: heroData?.content,
                                }}
                            />
                            <Link href="/about" className="hero-btn">
                                ABOUT US
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default HeroSection;
