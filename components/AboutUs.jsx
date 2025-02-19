import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="about-us">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Image */}
          <Col md={6}>
            <div className="about-image">
              <Image
                src="/assets/port-1.jpg"
                width={500}
                height={400}
                alt="About Us"
                className="about-main-img"
              />
            </div>
          </Col>

          {/* Right Side - Text Content */}
          <Col md={6}>
            <div className="about-content">
              <h2 className="section-title-about">
                Your Trusted Partner in <span className="highlight-text">Legal & Business Solutions</span>
              </h2>
              <p className="section-text">
                We provide comprehensive business and legal services, ensuring a smooth and compliant experience 
                for all our clients. Our experienced team specializes in company registration, tax filings, compliance, 
                and financial advisory services.
              </p>

              <div className="key-highlights">
                <div className="highlight-item">
                  <FaCheckCircle className="highlight-icon" />
                  <p>Experienced &amp; Professional Team</p>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle className="highlight-icon" />
                  <p>End-to-End Business Compliance</p>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle className="highlight-icon" />
                  <p>Customer-Centric Approach</p>
                </div>
              </div>

              <div className="about-actions">
                <Link href="/contact-us" className="cta-btn">
                  Learn More
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
