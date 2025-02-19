import { useDetails } from "@/contexts/DetailsContext";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingOverlay from "./LoadingOverlay";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactForm = () => {
    const { query } = useRouter().query;
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        service: query ? query : "",
        description: "",
    });
    const { services, BASE_URL_API } = useDetails();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const dataToSent = {
            contactPersonName: formData.name,
            contactPersonEmail: formData.email,
            contactPersonPhone: formData.mobile,
            serviceId: formData.service,
            requirement: formData.description,
        };
        try {
            const response = await fetch(`${BASE_URL_API}/create/inquiry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSent),
            });

            const data = await response.json();
            if (data.isOk) {
                toast.success("Your inquiry has been submitted successfully.");
                setFormData({
                    name: "",
                    mobile: "",
                    email: "",
                    service: "",
                    description: "",
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-section w-100">
            {loading && <LoadingOverlay />}
            <Container className="w-100">
                <Row className="w-100 contact-info-wrapper">
                    <Col lg={6} md={12}>
                        <div className="contact-info-left">
                            <h2 className="contact-info-title">Lets Work Together!</h2>
                            <div className="contact-info-text">
                                Have any questions? Feel free to reach out. We
                                are here to help you with all your inquiries.
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} md={12} className="contact-info-right mx-auto">
                        <Card className="contact-card">
                            <Card.Body>
                                <div className="contact-header">
                                    <h2>Get in Touch with Filings Corner</h2>
                                </div>
                                <Form
                                    onSubmit={handleSubmit}
                                    className="contact-form"
                                >
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="tel"
                                                    placeholder="Enter Mobile No."
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter E-mail ID"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Select
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">
                                                        Select Service
                                                    </option>
                                                    {services.reduce(
                                                        (acc, service) => {
                                                            return [
                                                                ...acc,
                                                                ...service.services.map(
                                                                    (item) => (
                                                                        <option
                                                                            key={
                                                                                item._id
                                                                            }
                                                                            value={
                                                                                item._id
                                                                            }
                                                                        >
                                                                            {
                                                                                item.serviceName
                                                                            }
                                                                        </option>
                                                                    )
                                                                ),
                                                            ];
                                                        },
                                                        []
                                                    )}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Describe Your Requirement.."
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <div className="contact-btn-wrapper">
                                        <Button
                                            type="submit"
                                            className="contact-btn"
                                        >
                                            SUBMIT
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactForm;
