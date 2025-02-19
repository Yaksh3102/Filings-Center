import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    const { services, companyDetails, fetchCMS } = useDetails();

    return (
        <footer className="footer-section">
            <Container>
                <Row>
                    {/* Logo & About Section */}
                    <Col lg={4} md={6} className="footer-logo-main">
                        <div className="footer-logo">
                            <img src="/assets/logo.png" alt="Filings Center" />
                        </div>
                        <p className="footer-about">
                            Text will be coming soon Text will be coming soon
                            Text will be coming soon Text will be coming soon
                        </p>
                        {/* Social Media Icons */}
                        <div className="footer-social">
                            <a href="#">
                                <FaFacebookF />
                            </a>
                            <a href="#">
                                <FaTwitter />
                            </a>
                            <a href="#">
                                <FaLinkedinIn />
                            </a>
                            <a href="#">
                                <FaInstagram />
                            </a>
                        </div>
                    </Col>

                    {/* Services List */}
                    <Col lg={3} md={6} className="footer-service-main">
                        <h5 className="footer-title">Our Services</h5>{" "}
                        {/* Will be styled via CSS */}
                        {services && services.length > 0 ? (
                            <>
                                <ul className="footer-links">
                                    {services
                                        .slice(0, 6)
                                        .map((service, index) => (
                                            <li key={index}>
                                                <Link href={`/services?groupName=${service.groupName}`}>
                                                    {service.groupName}
                                                </Link>
                                            </li>
                                        ))}
                                    <li>
                                        <Link href="/services">
                                            All Services
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <p className="text-center">No services available</p>
                        )}
                    </Col>

                    {/* Quick Links */}
                    <Col lg={3} md={6} className="footer-links-main">
                        <h5 className="footer-title">Quick Links</h5>
                        <ul className="footer-links">
                            <li>
                                <a href="#">List of Services</a>
                            </li>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">Career</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact Info */}
                    <Col lg={2} md={6} className="footer-contact-main">
                        <h5 className="footer-title">Contact</h5>
                        <ul className="footer-contact">
                            <li>
                                <FaPhoneAlt /> +91{" "}
                                {companyDetails?.ContactNo_Office}
                            </li>
                            <li>
                                <FaEnvelope /> {companyDetails?.EmailID_Office}
                            </li>
                            <li>
                                <FaMapMarkerAlt />
                                {companyDetails?.Address}
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            {/* Footer Bottom Section */}
            <div className="footer-bottom">
                <Container>
                    <Row>
                        <Col md={6}>
                            <p>
                                Copyright © 2025 Filings Corner | All rights
                                reserved.
                            </p>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <p>
                                Design By :{" "}
                                <span>
                                    Barodaweb - The E-Catalogue Designer
                                </span>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
