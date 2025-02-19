import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const ServicePackageCard = ({ packageData }) => {
    const { card, recommended } = packageData;
    const { title, includes, excludes, ratecard } = card;

    const marketPrice = includes.reduce(
        (total, item) => total + (item.rateCardData?.rate || 0),
        0
    );

    const [selectedRateCard, setSelectedRateCard] = useState(
        ratecard?.length > 0 ? ratecard[0].ourPrice : null
    );

    return (
        <div className="service-package-card" style={{ border: recommended ? '1px solid red' : 'none' }}>
            {recommended && (
                <div className="recommended-badge">Recommended</div>
            )}

            {/* Title Section */}
            <div className="package-header">{title}</div>

            {/* Main Content Area */}
            <div className="package-main-content">
                {/* Includes Section */}
                <div className="content-section">
                    <h6 className="section-title">Package Includes</h6>
                    <div className="package-section">
                        {includes.map((item) => (
                            <div key={item._id} className="package-item">
                                <FaCheckCircle className="check-icon" />
                                <div style={{ flex: 1 }}>
                                    <p className="package-text">
                                        {item.serviceName}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "#3131312a" }} />

                {/* Excludes Section */}
                {excludes.length > 0 && (
                    <>
                        <div className="content-section">
                            <h6 className="section-title">Excludes</h6>
                            <div className="package-section">
                                {excludes.map((item, index) => (
                                    <div key={index} className="package-item">
                                        <ImCross className="cross-icon" />
                                        <p className="package-text">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            style={{
                                height: "1px",
                                backgroundColor: "#3131312a",
                            }}
                        />
                    </>
                )}

                {/* Market Price */}
                <div className="content-section">
                    <h6 className="section-title">Market Price</h6>
                    <p className="market-price">₹{marketPrice}</p>
                </div>
            </div>

            <div
                style={{
                    height: "1px",
                    backgroundColor: "#3131312a",
                    margin: "15px",
                }}
            />

            {/* Pricing Section */}
            <div className="package-pricing-section">
                <h6 className="section-title">Choose Your Plan</h6>
                <Form className="rate-selection">
                    {ratecard?.map((rate, idx) => (
                        <Form.Check
                            key={idx}
                            type="radio"
                            label={`₹${rate.ourPrice} (${rate.frequency.frequencyType})`}
                            name="rateCard"
                            value={rate.ourPrice}
                            checked={selectedRateCard === rate.ourPrice}
                            onChange={() => setSelectedRateCard(rate.ourPrice)}
                            className="rate-option"
                        />
                    ))}
                </Form>
                <Button variant="primary" className="buy-now-btn">
                    BUY NOW
                </Button>
            </div>
        </div>
    );
};

export default ServicePackageCard;
