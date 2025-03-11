"use client";

import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import Link from "next/link";
import LoadingOverlay from "./LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        address: "",
        pincode: "",
        gst: "",
        policy: false,
    });

    const router = useRouter();
    const { redirect } = router.query;
    const { BASE_URL_API, setUserDetails } = useDetails();

    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState({});
    const countries = Country.getAllCountries();
    const selectedCountry = countries.find((c) => c.name === formData.country);
    const states = selectedCountry
        ? State.getStatesOfCountry(selectedCountry.isoCode)
        : [];

    // Find selected state ISO code
    const selectedState = states.find((s) => s.name === formData.state);
    const cities = selectedState
        ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode)
        : [];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        if (name === "phone" || name === "pincode") {
            newValue = newValue.replace(/\D/g, ""); // Allow only numeric input
        }
        if (name === "phone" && newValue.length > 10) return;
        if (name === "pincode" && newValue.length > 6) return;

        setFormData({ ...formData, [name]: newValue });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstname) newErrors.firstname = "First name is required";
        if (!formData.lastname) newErrors.lastname = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.confirmPassword)
            newErrors.confirmPassword = "Confirm password is required";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (!formData.phone || formData.phone.length !== 10)
            newErrors.phone = "Phone must be 10 digits";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.pincode || formData.pincode.length !== 6)
            newErrors.pincode = "Pincode must be 6 digits";
        if (!formData.policy) newErrors.policy = "You must accept the policy";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const dataToSend = {
                firstName: formData.firstname,
                lastName: formData.lastname,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                country: formData.country,
                state: formData.state,
                city: formData.city,
                address: formData.address,
                pincode: formData.pincode,
                gst: formData.gst,
            };
            setIsLoading(true);
            try {
                const res = await fetch(`${BASE_URL_API}/register/client`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataToSend),
                });

                const data = await res.json();
                if (data.isOk) {
                    if(redirect){
                        router.push(redirect);
                    }else{
                        router.push("/");
                    }
                    toast.success(data.message);
                    setFormData({
                        firstname: "",
                        lastname: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        phone: "",
                        country: "",
                        state: "",
                        city: "",
                        address: "",
                        pincode: "",
                        gst: "",
                        policy: false,
                    });
                    setErrors({});
                    setUserDetails(data.data);
                    localStorage.setItem("token", data.token);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Container className="signup-container">
            {isLoading && <LoadingOverlay />}
            <Row className="">
                <Col md={10}>
                    <Card className="signup-card">
                        <Card.Body>
                            <h2 className="text-center signup-title">
                                Sign Up
                            </h2>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="firstname"
                                                placeholder="First Name *"
                                                value={formData.firstname}
                                                onChange={handleChange}
                                            />
                                            {errors.firstname && (
                                                <small className="text-danger">
                                                    {errors.firstname}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Password *"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            {errors.password && (
                                                <small className="text-danger">
                                                    {errors.password}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="lastname"
                                                placeholder="Last Name *"
                                                value={formData.lastname}
                                                onChange={handleChange}
                                            />
                                            {errors.lastname && (
                                                <small className="text-danger">
                                                    {errors.lastname}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Confirm Password *"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                            />
                                            {errors.confirmPassword && (
                                                <small className="text-danger">
                                                    {errors.confirmPassword}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Email *"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && (
                                                <small className="text-danger">
                                                    {errors.email}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                placeholder="Phone *"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                            {errors.phone && (
                                                <small className="text-danger">
                                                    {errors.phone}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select Country
                                                </option>
                                                {countries.map((c) => (
                                                    <option
                                                        key={c.isoCode}
                                                        value={c.name}
                                                    >
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.country && (
                                                <small className="text-danger">
                                                    {errors.country}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                disabled={!states.length}
                                            >
                                                <option value="">
                                                    Select State
                                                </option>
                                                {states.map((s) => (
                                                    <option
                                                        key={s.isoCode}
                                                        value={s.name}
                                                    >
                                                        {s.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.state && (
                                                <small className="text-danger">
                                                    {errors.state}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                disabled={!cities.length}
                                            >
                                                <option value="">
                                                    Select City
                                                </option>
                                                {cities.map((ct) => (
                                                    <option
                                                        key={ct.name}
                                                        value={ct.name}
                                                    >
                                                        {ct.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.city && (
                                                <small className="text-danger">
                                                    {errors.city}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="pincode"
                                                placeholder="Pincode *"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                            />
                                            {errors.pincode && (
                                                <small className="text-danger">
                                                    {errors.pincode}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        name="address"
                                        placeholder="Address *"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    {errors.address && (
                                        <small className="text-danger">
                                            {errors.address}
                                        </small>
                                    )}
                                </Form.Group>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="gst"
                                            placeholder="GST"
                                            value={formData.gst}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Form.Group className="mb-3">
                                    {/* <Form.Check type="checkbox" label={`I accept the ${<Link href={"/terms-and-conditions"}>Terms & Conditions</Link>} and policy`} name="policy" checked={formData.policy} onChange={handleChange} /> */}
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="policy"
                                            checked={formData.policy}
                                            onChange={handleChange}
                                            className="me-2"
                                        />
                                        <label htmlFor="policy">
                                            I accept the{" "}
                                            <Link
                                                href="/terms-and-condition"
                                                target="_blank"
                                                className=" text-decoration-none"
                                                style={{
                                                    color: "#003049",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Terms & Conditions
                                            </Link>{" "}
                                            and{" "}
                                            <Link
                                                href="/privacy-policy"
                                                target="_blank"
                                                className=" text-decoration-none"
                                                style={{
                                                    color: "#003049",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Privacy Policy
                                            </Link>
                                        </label>
                                    </div>
                                    {errors.policy && (
                                        <small className="text-danger">
                                            {errors.policy}
                                        </small>
                                    )}
                                </Form.Group>
                                <div className="text-center">
                                    <Button
                                        type="submit"
                                        className="signup-btn"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                                <div className="text-center mt-3">
                                    <p className="mb-0">
                                        Already have an account?{" "}
                                        <Link
                                            href="/login"
                                            style={{
                                                color: "#003049",
                                                fontWeight: 600,
                                            }}
                                            className="text-decoration-none"
                                        >
                                            Sign In
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

export default SignUpForm;
