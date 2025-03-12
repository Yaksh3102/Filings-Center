import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Accordion,
} from "react-bootstrap";
import { Country, State, City } from "country-state-city";
// import { toast } from "react-toastify";
// import LoadingOverlay from "@/components/LoadingOverlay";

const FranchiseEnquiry = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    city: "",
    description: "",
    franchise: "", //  Franchise field
    whatsapp: "", //  WhatsApp number field
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const franchiseOptions = ["Franchise 1", "Franchise 2", "Franchise 3"]; // ADDED: Franchise options for dropdown

  // Fetch list of countries, states, and cities
  const countries = Country.getAllCountries();
  const selectedCountry = countries.find((c) => c.name === formData.country);
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];
  const selectedState = states.find((s) => s.name === formData.state);
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode)
    : [];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Only allow numeric input for phone
    if (name === "phone") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length > 10) return; // Restrict to 10 digits
    }

    // ADDED: Handle WhatsApp number input similar to phone
    if (name === "whatsapp") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length > 10) return; // Restrict WhatsApp number to 10 digits
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.phone || formData.phone.length !== 10) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    if (!formData.state) {
      newErrors.state = "State is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Example: POST to your server or API
      // console.log("Enquiry Data:", formData);
      alert("Franchise enquiry submitted successfully!");

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        country: "",
        state: "",
        city: "",
        description: "",
        franchise: "", //  Reset franchise field
        whatsapp: "", //  Reset WhatsApp number field
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      // toast.error("An error occurred while submitting.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="enquiry-container">
      {/* If you have a loading overlay */}
      {/* {isLoading && <LoadingOverlay />} */}

      {/* 1) align-items-stretch ensures both columns share the same height */}
      <Row className="g-4 align-items-stretch">
        {/* Left Column: Franchise Enquiry Form - NO changes here */}
        <Col md={6}>
          <Card className="enquiry-card">
            <Card.Body>
              <h2 className="text-center enquiry-title">Franchise Enquiry</h2>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      {errors.fullName && (
                        <small className="text-danger">{errors.fullName}</small>
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
                        <small className="text-danger">{errors.phone}</small>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* ADDED: WhatsApp Number Field */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="whatsapp"
                        placeholder="WhatsApp Number"
                        value={formData.whatsapp}
                        onChange={handleChange}
                      />
                      {/* Optionally, add error display for WhatsApp if needed */}
                    </Form.Group>
                  </Col>

                  {/* ADDED: Franchise Dropdown Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Select
                        name="franchise"
                        value={formData.franchise}
                        onChange={handleChange}
                      >
                        <option value="">Select Franchise</option>
                        {franchiseOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
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
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c.isoCode} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.country && (
                        <small className="text-danger">{errors.country}</small>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        disabled={!states.length}
                      >
                        <option value="">Select State</option>
                        {states.map((s) => (
                          <option key={s.isoCode} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.state && (
                        <small className="text-danger">{errors.state}</small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!cities.length}
                      >
                        <option value="">Select City</option>
                        {cities.map((ct) => (
                          <option key={ct.name} value={ct.name}>
                            {ct.name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.city && (
                        <small className="text-danger">{errors.city}</small>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Describe your enquiry *"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && (
                    <small className="text-danger">{errors.description}</small>
                  )}
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" className="enquiry-btn">
                    Submit Enquiry
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: FAQ with forced same height & scroll if needed */}
        <Col md={6}>
          {/* 2) "h-100" makes the FAQ card fill the same row height 
              3) "enquiry-faq-scroll" => height:100%; overflow-y:auto; */}
          <Card className="enquiry-card h-100 enquiry-faq-scroll">
            <Card.Body>
              <h2 className="text-center enquiry-title">
                Frequently Asked Questions
              </h2>
              <Accordion className="mt-4" defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    What is the time frame for completing proprietorship
                    registration?
                  </Accordion.Header>
                  <Accordion.Body>
                    The time frame can vary from a few days to a couple of weeks
                    depending on local authorities and the required documents.
                    Typically, it can be completed within 7-10 business days.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    Is GST registration mandatory for all proprietorships?
                  </Accordion.Header>
                  <Accordion.Body>
                    If your business crosses the threshold turnover for GST or
                    you deal in inter-state transactions, you must register for
                    GST. Otherwise, it’s optional.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Can a proprietorship have employees?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, a proprietorship can have employees. The owner is
                    personally liable for all labor law compliances and related
                    obligations.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    Can a proprietorship be converted into a private limited
                    company later?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, you can convert your proprietorship into a private
                    limited company if your business expands or you require
                    additional benefits.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    What are the tax benefits of a proprietorship?
                  </Accordion.Header>
                  <Accordion.Body>
                    Proprietors are taxed as individuals, which can be
                    beneficial if your income is below certain slabs. However,
                    there’s no separate business entity advantage as in a
                    company or LLP.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    Is it necessary to open a separate bank account for a
                    proprietorship?
                  </Accordion.Header>
                  <Accordion.Body>
                    It’s strongly recommended to maintain a separate bank
                    account for clarity in transactions, though not strictly
                    mandatory. It helps streamline bookkeeping and financial
                    records.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                    Can a foreign national register a proprietorship in India?
                  </Accordion.Header>
                  <Accordion.Body>
                    Foreign nationals generally cannot register a sole
                    proprietorship in India unless they meet certain residency
                    requirements. Often, they opt for alternative structures
                    like a private limited company.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FranchiseEnquiry;
