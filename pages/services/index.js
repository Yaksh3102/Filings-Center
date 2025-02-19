import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Dropdown,
} from "react-bootstrap";
import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import { FaSearch, FaBars } from "react-icons/fa";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useRouter } from "next/router";

const AllServicesPage = () => {
    const { services, companyDetails } = useDetails();
    const [selectedGroup, setSelectedGroup] = useState("ALL SERVICES");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { groupName } = router.query;

    useEffect(() => {
        if (!services.length || !companyDetails) {
            setLoading(true);
        }
        if (services.length > 0 && companyDetails) {
            setLoading(false);
        }

        if (groupName && services.some(group => group.groupName === groupName)) {
            setSelectedGroup(groupName);
        }
    }, [services, companyDetails, groupName]);

    if (loading) {
        return <LoadingOverlay />;
    }

    // Fix for duplicate services in search
    const getFilteredServices = () => {
        const selectedServices = services.filter(
            (group) =>
                group.groupName === selectedGroup ||
                selectedGroup === "ALL SERVICES"
        );

        const uniqueServices = new Map();
        selectedServices.forEach((group) => {
            group.services.forEach((service) => {
                if (!uniqueServices.has(service._id)) {
                    uniqueServices.set(service._id, service);
                }
            });
        });

        return Array.from(uniqueServices.values()).filter((service) =>
            service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <>
            <div className="about-header">
                <Container>
                    <div className="about-header-content">
                        <h1 className="about-header-title">Services</h1>
                    </div>
                </Container>

                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt; <span>Services</span>
                    </span>
                </div>
            </div>
            <Container className="all-services-container px-4 mb-5" fluid>
                <Row>
                    {/* Sidebar (Desktop) */}
                    <Col lg={2} className="d-none d-lg-block">
                        <div className="services-sidebar sticky-sidebar">
                            <button
                                className={`sidebar-btn ${
                                    selectedGroup === "ALL SERVICES"
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => setSelectedGroup("ALL SERVICES")}
                            >
                                All Services
                            </button>
                            {services.map((group) => (
                                <button
                                    key={group._id}
                                    className={`sidebar-btn ${
                                        selectedGroup === group.groupName
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setSelectedGroup(group.groupName)
                                    }
                                >
                                    {group.groupName}
                                </button>
                            ))}
                        </div>
                    </Col>

                    {/* Main Content */}
                    <Col lg={10}>
                        {/* Mobile Dropdown (Visible below 992px) */}
                        <div className="d-lg-none px-2 mb-3">
                            <Dropdown className="custom-dropdown">
                                <Dropdown.Toggle
                                    variant="primary"
                                    className="w-100 d-flex align-items-center"
                                >
                                    <FaBars className="me-2" /> {selectedGroup}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="custom-dropdown-menu w-100" style={{ maxHeight: "250px", overflowY: "auto" }}>
                                    <Dropdown.Item
                                        onClick={() =>
                                            setSelectedGroup("ALL SERVICES")
                                        }
                                    >
                                        ALL SERVICES
                                    </Dropdown.Item>
                                    {services.map((group) => (
                                        <Dropdown.Item
                                            key={group._id}
                                            onClick={() =>
                                                setSelectedGroup(
                                                    group.groupName
                                                )
                                            }
                                        >
                                            {group.groupName}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        {/* Right Side Content */}
                        <div className="services-content w-100">
                            <div className="services-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-3">
                                <h2 className="mb-2 mb-md-0 all-service-title small-title">
                                    {selectedGroup}
                                </h2>
                                <div className="search-bar d-flex align-items-center w-md-auto">
                                    <FaSearch className="search-icon me-2" />
                                    <Form.Control
                                        type="text"
                                        placeholder="Search services..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="search-input small-search"
                                    />
                                </div>
                            </div>

                            {/* Service Cards */}
                            {getFilteredServices().length === 0 ? (
                                <p className="no-services-text text-center mt-4">
                                    No services found.
                                </p>
                            ) : (
                                <Row className="px-3 mt-1 g-4">
                                    {getFilteredServices().map((service) => (
                                        <Col
                                            key={service._id}
                                            lg={4}
                                            md={6}
                                            sm={12}
                                            className="service-card-container"
                                        >
                                            <Card className="service-card d-flex flex-column h-100">
                                                <Card.Img
                                                    variant="top"
                                                    src={
                                                        service.bannerImage
                                                            ? `${process.env.NEXT_PUBLIC_BASE_URL}/${service.bannerImage}`
                                                            : "/assets/services_fallback.png"
                                                    }
                                                    className="service-img"
                                                />
                                                <Card.Body className="d-flex flex-column flex-grow-1">
                                                    <Card.Title className="service-title">
                                                        {service.serviceName}
                                                    </Card.Title>
                                                    <Card.Text className="service-description flex-grow-1">
                                                        {service.description ||
                                                            "Learn more about this service."}
                                                    </Card.Text>
                                                    <Link
                                                        href={`/services/${service._id}`}
                                                        className="read-more mt-auto"
                                                    >
                                                        READ MORE
                                                    </Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AllServicesPage;
