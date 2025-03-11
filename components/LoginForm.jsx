"use client";

import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    InputGroup,
} from "react-bootstrap";
import { useDetails } from "@/contexts/DetailsContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router"; // Updated for Next.js 13+
import LoadingOverlay from "./LoadingOverlay";
import Link from "next/link";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });

    const router = useRouter();
    const { redirect } = router.query;

    const { BASE_URL_API, setUserDetails } = useDetails();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.phone) newErrors.phone = "Phone Number is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.phone || formData.phone.length !== 10)
            newErrors.phone = "Phone must be 10 digits";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const res = await fetch(`${BASE_URL_API}/login/client`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();
                if (data.isOk) {
                    if (redirect) {
                        router.push(redirect);
                    }
                    toast.success("Login Successful!");
                    setFormData({
                        phone: "",
                        password: "",
                    });
                    setErrors({});
                    setUserDetails(data.data);
                    localStorage.setItem("token", data.token);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Container className="login-container p-5">
            {isLoading && <LoadingOverlay />}
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card className="login-card">
                        <Card.Body>
                            <h2 className="text-center login-title">Sign In</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        maxLength={10}
                                    />
                                    {errors.phone && (
                                        <small className="text-danger">
                                            {errors.phone}
                                        </small>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <InputGroup>
                                        <Form.Control
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </Button>
                                    </InputGroup>
                                    {errors.password && (
                                        <small className="text-danger">
                                            {errors.password}
                                        </small>
                                    )}
                                </Form.Group>

                                <div className="text-center">
                                    <Button type="submit" className="login-btn">
                                        Login
                                    </Button>
                                </div>

                                <div className="text-center mt-3">
                                    <p className="mb-0">
                                        Don't have an account?{" "}
                                        <Link
                                            href={`/register?redirect=${redirect}`}
                                            style={{
                                                color: "#003049",
                                                fontWeight: 600,
                                            }}
                                            className="text-decoration-none"
                                        >
                                            Sign Up
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
