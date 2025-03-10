import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaYoutube,
} from "react-icons/fa";

const Footer = () => {
    const { services, companyDetails } = useDetails();

    return (
        <footer className="footer-section">
            <Container>
                <Row>
                    {/* Logo & About Section */}
                    <Col lg={4} md={6} className="footer-logo-main">
                        <div className="footer-logo">
                            {/* Updated logo image */}
                            <img src="/assets/footer-logo.png" alt="Filings Center" />
                        </div>
                        <p className="footer-about">
                            Filings Corner is a part of Viha Global Filings Pvt. Ltd. Which is registered under the Companies Act, 2013
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
                                <FaYoutube />
                            </a>
                        </div>
                    </Col>

                    {/* Services List */}
                    <Col lg={3} md={6} className="footer-service-main">
                        <h5 className="footer-title">Our Services</h5>
                        {services && services.length > 0 ? (
                            <>
                                <ul className="footer-links">
                                    {services.slice(0, 6).map((service, index) => (
                                        <li key={index}>
                                            <Link href={`/services?groupName=${service.groupName}`}>
                                                {service.groupName}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link href="/services">All Services</Link>
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
                                <Link href="/services">List of Services</Link>
                            </li>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/terms-and-condition">Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/refund-policy">Refund Policy</Link>
                            </li>
                            <li>
                                <Link href="/careers">Careers</Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact Info */}
                    <Col lg={2} md={6} className="footer-contact-main">
                        <h5 className="footer-title">Contact</h5>
                        <ul className="footer-contact">
                            <li>
                                <FaPhoneAlt /> +91 {companyDetails?.ContactNo_Office}
                            </li>
                            <li>
                                <FaEnvelope /> {companyDetails?.EmailID_Office}
                            </li>
                            <li>
                                <FaMapMarkerAlt /> {companyDetails?.Address}
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h5 className="font-weight-bold">Disclaimer</h5>
                        <p className="text-justify">
                            This website is privately operated and not affiliated with any government entity. We do not represent or are affiliated with, endorsed by, or in any way connected to any government body or department. The form provided is not for official registration purposes; rather, it is designed to gather information from our clients to help us better understand their business or needs. By continuing to use this website, you acknowledge that we are a private company. We offer assistance based on customer requests, and the fees collected on this website are for consultancy services. We reserve the right to outsource cases/matters as deemed necessary.
                        </p>
                    </Col>
                </Row>
            </Container>

            {/* Footer Bottom Section */}
            <div className="footer-bottom">
                <Container>
                    <Row>
                        <Col md={6}>
                            <p>
                                Copyright © 2025 Filings Corner | All rights reserved.
                            </p>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <p>
                                Design By : <span>Barodaweb - The E-Catalogue Designer</span>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
