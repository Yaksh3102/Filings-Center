import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const WhyChooseUsHome = ({ data }) => {
    // Parse the backend HTML while keeping styles intact
    const parseContent = (htmlString) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = htmlString;

        // Extract heading and description (keeping original styles)
        const heading = tempElement.querySelector("p strong")?.outerHTML || "";
        const description = tempElement.querySelectorAll("p span")?.[0]?.outerHTML || "";

        // Extract list items and their descriptions
        const listItems = [];
        const ulElements = tempElement.querySelectorAll("ul");

        ulElements.forEach((ul) => {
            const listItemElement = ul.querySelector("li strong");
            const descriptionElement = ul.nextElementSibling && ul.nextElementSibling.tagName === "P"
                ? ul.nextElementSibling.outerHTML // Keep paragraph with styles
                : "";

            if (listItemElement) {
                listItems.push({ title: listItemElement.outerHTML, description: descriptionElement });
            }
        });

        return { heading, description, listItems };
    };

    const { heading, description, listItems } = parseContent(data.content);

    return (
        <section className="why-choose-us">
            <Container>
                <Row className="align-items-center">
                    {/* Content Section */}
                    <Col md={6} className="why-content">
                        <div dangerouslySetInnerHTML={{ __html: heading }} />
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                        <div className="why-features">
                            {listItems.map((item, index) => (
                                <div key={index} className="custom-list-item">
                                    <FaCheckCircle className="feature-icon" />
                                    <div>
                                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>

                    {/* Image Section */}
                    <Col md={6} className="why-image-container">
                        <Image
                            src="/assets/pro-7.jpg"
                            alt="Why Choose Us"
                            width={500}
                            height={450}
                            className="why-main-img"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default WhyChooseUsHome;
