import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <Container>
        <Row className="align-items-center">
          {/* Left Content */}
          <Col md={6}>
            <div className="why-content">
              <h2 className="section-title-about">
                We Provide <span className="highlight-text">Trusted & Quality Services</span>
              </h2>
              <p className="section-text">
                Our team of experienced professionals ensures the highest level of quality and accuracy 
                in every service we provide. From legal consulting to financial advisory, we offer 
                end-to-end solutions tailored to your needs.
              </p>

              {/* Key Features */}
              <div className="why-features">
                <div className="feature-item">
                  <FaCheckCircle className="feature-icon" />
                  <p>Highly Experienced Team</p>
                </div>
                <div className="feature-item">
                  <FaCheckCircle className="feature-icon" />
                  <p>Customer-Centric Approach</p>
                </div>
                <div className="feature-item">
                  <FaCheckCircle className="feature-icon" />
                  <p>Reliable & Transparent Services</p>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Image with Floating Blobs */}
          <Col md={6} className="position-relative">
            <div className="why-image-container">
              <div className="floating-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
              </div>
              <Image
                src="/assets/blog-s-2.jpg"
                width={500}
                height={400}
                alt="Why Choose Us"
                className="why-main-img"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
