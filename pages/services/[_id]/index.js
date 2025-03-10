import LoadingOverlay from "@/components/LoadingOverlay";
import ServicePackageCard from "@/components/ServicePackageCard";
import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FaqAccordion from "@/components/FaqAccordian";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import ServicePackagesSection from "@/components/ServicePackageSection";

const ServicePage = () => {
    const router = useRouter();
    const { _id } = router.query;
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    const { BASE_URL_API, userDetails } = useDetails();

    useEffect(() => {
        if (!_id) return;
        const fetchService = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL_API}/get/service/${_id}`
                );
                const data = await response.json();
                if (data.isOk) {
                    setService(data.data);
                }
            } catch (error) {
                console.error("Error fetching service details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [_id]);

    if (loading) return <LoadingOverlay />;
    if (!service) return <p className="error">Service not found.</p>;

    const chunkDocuments = (documents, size) => {
        return documents.reduce(
            (acc, _, index) =>
                index % size === 0
                    ? [...acc, documents.slice(index, index + size)]
                    : acc,
            []
        );
    };

    function getId(url) {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11 ? match[2] : null;
    }

    const sliderSettings = {
        dots: true,
        infinite: false, // Set to true for continuous looping if desired
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,         // Enables auto-play
        autoplaySpeed: 3000,    // Sets time (in ms) between slide transitions
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    
    const relatedServicesSettings = {
        dots: true,
        infinite: false, // Consider true if you want continuous looping
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,         // Enables auto-play
        autoplaySpeed: 3000,    // Adjust the speed as needed
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    

    const handleBuyNow = (_id, selectedRateCard) => {
        if (!selectedRateCard || !selectedRateCard.frequency) {
            console.error("selectedRateCard or its frequency is null");
            return; // or handle this case as needed
        }

        if (userDetails) {
            router.push({
                pathname: `/invoice/${_id}`,
                query: { _id: _id, data: selectedRateCard.frequency._id },
            });
        } else {
            router.push(`/login?redirect=/services/${_id}`);
        }
    };

    const handleBuyNowPackage = (_id) => {
        if (userDetails) {
            router.push({
                pathname: `/invoice/${_id}`,
            });
        } else {
            router.push(`/login?redirect=/services/${_id}`);
        }
    }

    const documentChunks = chunkDocuments(service.requiredDocumentDetails, 5);

    return (
        <>
            {/* Page Header */}
            <div className="about-header">
                <Container>
                    <div className="about-header-content">
                        <h1 className="about-header-title">Services</h1>
                    </div>
                </Container>
                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt;{" "}
                        <Link href="/services">Services</Link> &gt;{" "}
                        <span>{service.serviceName}</span>
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <Container className="service-page mt-5">
                <Row>
                    <Col lg={9} className="service-content">
                        {/* Service Name */}
                        <Row>
                            <Col md={8}>
                                <h1 className="services-title">
                                    {service.serviceName}
                                </h1>
                                <h4 className="service-group">
                                    {service.serviceGroupDetails[0]?.groupName}
                                </h4>
                                <div className="d-flex gap-2 align-items-center mt-3">
                                    <Link
                                        href="/terms-and-condition"
                                        className="service-link"
                                    >
                                        Terms & Conditions
                                    </Link>
                                    <Link
                                        href="/privacy-policy"
                                        className="service-link"
                                    >
                                        Privacy Policy
                                    </Link>
                                    <Link
                                        href="/refund-policy"
                                        className="service-link"
                                    >
                                        Refund Policy
                                    </Link>
                                </div>
                            </Col>
                        </Row>

                        {/* Packages Section */}
                        {/* TODO */}
                        {service.packages.length>0 && (
                            <ServicePackagesSection
                                packages={service.packages}
                                handleBuyNowPackage={handleBuyNowPackage}
                            />
                        )}

                        {/* Service Packages Section */}
                        {service.servicePackageGroups.length > 0 && (
                            <div className="service-packages">
                                <h3 className="section-title-service">
                                    Packages
                                </h3>
                                <div className="package-carousel-container">
                                    <Slider {...sliderSettings}>
                                        {service.servicePackageGroups.map(
                                            (pkg) => (
                                                <div
                                                    key={pkg._id}
                                                    className="package-slide p-3"
                                                >
                                                    <ServicePackageCard
                                                        handleBuyNow={
                                                            handleBuyNow
                                                        }
                                                        packageData={pkg}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </Slider>
                                </div>
                            </div>
                        )}

                        {/* About Service Section */}
                        <h3 className="section-title-service">
                            About {service.serviceName}
                        </h3>
                        <div
                            className="services-description"
                            dangerouslySetInnerHTML={{
                                __html: service.serviceDescription,
                            }}
                        />

                        {service.workflow.length > 0 && (
                            <>
                                <h3 className="section-title-service">
                                    Workflow
                                </h3>
                                {/* ADD COMPONENT HERE */}
                                <WorkflowDiagram steps={service.workflow} />
                            </>
                        )}

                        {service.faqs.length > 0 && (
                            <FaqAccordion faqs={service.faqs} />
                        )}

                        {/* Required Documents Section - Moved Below About */}
                        {service.requiredDocumentDetails.length > 0 && (
                            <>
                                <h3 className="section-title-service">
                                    Required Documents
                                </h3>
                                <Row>
                                    {documentChunks.map((chunk, index) => (
                                        <Col md={6} key={index}>
                                            <ul className="document-list">
                                                {chunk.map((doc) => (
                                                    <li
                                                        key={doc._id}
                                                        className="document-item"
                                                    >
                                                        <FaCheckCircle className="document-icon" />
                                                        {doc.documentName}
                                                    </li>
                                                ))}
                                            </ul>
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        )}

                        {service.relatedServices.length > 0 && (
                            <div className="related-services-slider mt-5">
                                <h3 className="section-title-service">
                                    Related Services
                                </h3>
                                <Slider
                                    className="mx-4"
                                    {...relatedServicesSettings}
                                >
                                    {service.relatedServices.map(
                                        (relatedService) => (
                                            <div
                                                key={relatedService._id}
                                                className="px-2"
                                            >
                                                <Card className="related-service-card">
                                                    <div className="related-service-image-wrapper">
                                                        <img
                                                            src={
                                                                relatedService.bannerImage
                                                                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/${relatedService.bannerImage}`
                                                                    : "/assets/services_fallback.png"
                                                            }
                                                            alt={
                                                                relatedService.serviceName
                                                            }
                                                            className="related-service-image"
                                                        />
                                                    </div>
                                                    <Card.Body className="text-center">
                                                        <Card.Title className="related-service-title">
                                                            {
                                                                relatedService.serviceName
                                                            }
                                                        </Card.Title>
                                                        <Link
                                                            href={`/services/${relatedService._id}`}
                                                            className="btn btn-primary btn-sm explore-btn"
                                                        >
                                                            Explore More
                                                        </Link>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        )
                                    )}
                                </Slider>
                            </div>
                        )}
                    </Col>

                    {/* Sidebar with Quotation & Related Services */}
                    <Col lg={3}>
                        {/* Quotation Card */}
                        <Card className="quotation-card p-4">
                            <h4 className="quotation-title text-center">
                                Contact Us
                            </h4>
                            {/* {service.rateCards.map((rate) => {
                                const hasDiscount =
                                    rate.discountedRate != null &&
                                    rate.discountedRate < rate.rate;
                                return (
                                    <div key={rate._id} className="rate-card">
                                        <strong>Price: </strong>
                                        {hasDiscount ? (
                                            <>
                                                <del>₹{rate.rate}</del>{" "}
                                                <span className="discounted-price">
                                                    ₹{rate.discountedRate}
                                                </span>
                                            </>
                                        ) : (
                                            <>₹{rate.rate}</>
                                        )}{" "}
                                        ({rate.frequencyType})
                                    </div>
                                );
                            })} */}
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "#7e7e7e",
                                    fontWeight: "600",
                                }}
                            >
                                Still having doubts? Worry Not, Contact Filings
                                Corner Today !
                            </p>
                            <Link
                                variant="primary"
                                className="mt-3 w-100 inquire-btn"
                                href={`/contact-us?query=${_id}`}
                                // onClick={handleBuyNow}
                            >
                                CONTACT US
                            </Link>
                        </Card>
                        {service.videoLink && (
                            <div className="mt-4 p-1 video-container">
                                <iframe
                                    src={`https://www.youtube.com/embed/${getId(
                                        service.videoLink
                                    )}`}
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        )}

                        {/* Related Services Section */}
                        <div className="related-services mt-4 p-3">
                            <h4 className="related-services-title">
                                Related Services
                            </h4>
                            <ul className="related-services-list">
                                {service.relatedServices.map((rel) => (
                                    <li
                                        key={rel._id}
                                        className="related-service-item"
                                    >
                                        <Link href={`/services/${rel._id}`}>
                                            {rel.serviceName}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ServicePage;
