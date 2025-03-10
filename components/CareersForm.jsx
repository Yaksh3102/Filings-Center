import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingOverlay from "./LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";

const CareersForm = () => {
    const { BASE_URL_API } = useDetails();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        resume: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.type !== "application/pdf") {
                toast.error("Only PDF files are allowed.");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size must be under 2MB.");
                return;
            }
            setFormData({ ...formData, resume: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("resume", formData.resume);

        try {
            const response = await fetch(`${BASE_URL_API}/apply/careers`, {
                method: "POST",
                body: formDataToSend,
            });

            const data = await response.json();
            if (data.isOk) {
                toast.success("Application submitted successfully.");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    resume: null,
                });
            } else {
                toast.error("Something went wrong. Try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error submitting form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-section">
            {loading && <LoadingOverlay />}
            <Container className="d-flex justify-content-center">
                <Card className="contact-card">
                    <Card.Body>
                        <div className="contact-header">
                            <h2>Apply for a Career at Filings Corner</h2>
                        </div>
                        <Form onSubmit={handleSubmit} className="contact-form">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
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
                                            placeholder="Enter Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="tel"
                                            placeholder="Enter Phone No."
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Upload Resume (PDF, max 2MB)
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Form.Group>
                            <div className="contact-btn-wrapper">
                                <Button type="submit" className="contact-btn">
                                    SUBMIT APPLICATION
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    );
};

export default CareersForm;
