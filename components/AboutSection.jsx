import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

const AboutSection = ({aboutData}) => {
  return (
    <section className="about-section">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Images */}
          <Col md={6} sm={12} className=" text-center text-md-start">
            <div className="main-image">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${aboutData?.data?.image}`}
                width={550}
                height={550}
                className="img-fluid home-about-image"
                alt="About Main Image"
              />
            </div>
          </Col>

          {/* Right Side - Text Content */}
          <Col md={6} className="text-md-start">
            <div className="about-content">
              <div className="about-text-content my-2" dangerouslySetInnerHTML={{ __html: aboutData?.data?.content }}>
              </div>
              <Link className="about-btn" href={"/about"}>
                EXPLORE ABOUT US
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
