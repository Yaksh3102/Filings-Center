"use client";
import DashboardLayout from "@/components/DashboardLayout";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import { useDetails } from "@/contexts/DetailsContext";
import { toast } from "react-toastify";
import LoadingOverlay from "@/components/LoadingOverlay";
// import "@/styles/profilePage.css"; // Import the external CSS

const ProfileSection = () => {
  const { BASE_URL_API, userDetails, setUserDetails } = useDetails();
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        phone: userDetails.phone || "",
        country: userDetails.country || "",
        state: userDetails.state || "",
        city: userDetails.city || "",
        address: userDetails.address || "",
        pincode: userDetails.pincode || "",
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "phone" || name === "pincode") {
      newValue = newValue.replace(/\D/g, "");
      if (name === "pincode" && newValue.length > 6) return;
    }
    setFormData({ ...formData, [name]: newValue });
    setIsUpdated(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL_API}/update/client/${userDetails._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.isOk) {
        setUserDetails(data.data);
        toast.success("Profile updated successfully");
        setIsUpdated(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const countries = Country.getAllCountries();
  const selectedCountry = countries.find((c) => c.name === formData.country);
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];
  const selectedState = states.find((s) => s.name === formData.state);
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode)
    : [];

  return (
    <DashboardLayout>
      {loading && <LoadingOverlay />}
      <Container className="profile-page-container">
        <Row>
          <Col md={12}>
            <Card className="profile-page-card">
              <Card.Body className="profile-page-card-body">
                <h3 className="profile-page-header">My Profile</h3>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="profile-page-col-padding">
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="profile-page-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="profile-page-col-padding">
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="profile-page-form-control"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="profile-page-col-padding">
                      <Form.Group>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          disabled
                          className="profile-page-form-control profile-page-form-control-disabled"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="profile-page-col-padding">
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="Phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="profile-page-form-control"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} className="profile-page-col-padding">
                      <Form.Group>
                        <Form.Select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="profile-page-form-control"
                        >
                          <option value="">Select Country</option>
                          {countries.map((c) => (
                            <option key={c.isoCode} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4} className="profile-page-col-padding">
                      <Form.Group>
                        <Form.Select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          disabled={!states.length}
                          className={`profile-page-form-control ${
                            states.length
                              ? "profile-page-select-enabled"
                              : "profile-page-select-disabled"
                          }`}
                        >
                          <option value="">Select State</option>
                          {states.map((s) => (
                            <option key={s.isoCode} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4} className="profile-page-col-padding">
                      <Form.Group>
                        <Form.Select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          disabled={!cities.length}
                          className={`profile-page-form-control ${
                            cities.length
                              ? "profile-page-select-enabled"
                              : "profile-page-select-disabled"
                          }`}
                        >
                          <option value="">Select City</option>
                          {cities.map((ct) => (
                            <option key={ct.name} value={ct.name}>
                              {ct.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="profile-page-col-padding">
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          name="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleChange}
                          className="profile-page-form-control profile-page-textarea"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="profile-page-col-padding" style={{ textAlign: "center" }}>
                      <Button
                        type="submit"
                        className={
                          isUpdated
                            ? "profile-page-button"
                            : "profile-page-button profile-page-button-disabled"
                        }
                        disabled={!isUpdated}
                      >
                        Update Profile
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default ProfileSection;
