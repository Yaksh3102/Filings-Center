import React, { useState } from "react";
import { Tab, Tabs, Card, Row, Col, Button } from "react-bootstrap";
import Slider from "react-slick";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServicePackagesSection = ({ packages, handleBuyNowPackage }) => {
    const [activeTab, setActiveTab] = useState(
        packages.length > 0 ? packages[0]._id : ""
    );

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const cardStyle = {
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        margin: '0 auto'
    };

    const packageHeaderStyle = {
        background: '#26b16b',
        color: 'white',
        fontSize: '18px',
        fontWeight: '600',
        padding: '15px',
        textAlign: 'center'
    };

    const sectionTitleStyle = {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#002f499d',
        // marginTop: '15px',
        textAlign: 'center',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '10px'
    };

    const packageListStyle = {
        listStyleType: 'none',
        padding: '0 15px',
        margin: 0
    };

    const packageItemStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '10px',
        fontSize: '14px'
    };

    const checkIconStyle = {
        color: '#26b16b',
        fontSize: '16px',
        marginRight: '10px',
        width: '16px',
        height: '16px',
        minWidth: '16px',
        minHeight: '16px'
    };

    const crossIconStyle = {
        color: '#dc3545',
        fontSize: '16px',
        marginRight: '10px',
        width: '16px',
        height: '16px',
        minWidth: '16px',
        minHeight: '16px'
    };

    const contentSectionStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 0'
    };

    const packageMainContentStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        // marginBottom: '15px',
        padding: '0 15px'
    };

    const packageFooterStyle = {
        marginTop: 'auto',
        padding: '15px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f9f9f9',
        textAlign: 'center'
    };

    const marketPriceStyle = {
        fontSize: '14px',
        fontWeight: 'normal',
        color: '#888',
        textDecoration: 'line-through',
        // marginBottom: '5px'
    };

    const sellingPriceStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#004080',
        marginBottom: '8px'
    };

    const buyNowButtonStyle = {
        backgroundColor: '#004080',
        color: 'white',
        fontWeight: 'bold',
        padding: '10px',
        borderRadius: '6px',
        textTransform: 'uppercase',
        transition: 'background-color 0.3s ease-in-out',
        width: '100%',
        border: 'none'
    };

    return (
        <div className="service-packages-section">
            <h3 className="section-title-service" style={{ marginBottom: '30px'}}>Packages</h3>
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3 service-tabs"
            >
                {packages.map((pkgGroup) => (
                    <Tab
                        key={pkgGroup._id}
                        eventKey={pkgGroup._id}
                        title={pkgGroup.packageGroupName}
                    >
                        <Slider {...sliderSettings} className="package-slider">
                            {pkgGroup.packageList.map((pkg) => (
                                <div key={pkg._id} className="p-3" style={{ height: '100%' }}>
                                    <Card style={cardStyle}>
                                        <div style={packageHeaderStyle}>
                                            {pkg.packageName}
                                        </div>
                                        <div style={{...packageMainContentStyle, flexGrow: 1}}>
                                            <div style={contentSectionStyle}>
                                                <h6 style={sectionTitleStyle}>
                                                    Includes
                                                </h6>
                                                <ul style={packageListStyle}>
                                                    {pkg.includes.map((item, index) => (
                                                        <li key={index} style={packageItemStyle}>
                                                            <FaCheckCircle style={checkIconStyle} />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {pkg.excludes && pkg.excludes.length > 0 && (
                                                <div style={contentSectionStyle}>
                                                    <h6 style={sectionTitleStyle}>
                                                        Excludes
                                                    </h6>
                                                    <ul style={packageListStyle}>
                                                        {pkg.excludes.map((item, index) => (
                                                            <li
                                                                key={index}
                                                                style={packageItemStyle}
                                                            >
                                                                <ImCross style={crossIconStyle} />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {pkg.features && pkg.features.length > 0 && (
                                                <div style={contentSectionStyle}>
                                                    <h6 style={sectionTitleStyle}>Features</h6>
                                                    <ul style={packageListStyle}>
                                                        {pkg.features.map((feature, index) => (
                                                            <li
                                                                key={index}
                                                                style={packageItemStyle}
                                                            >
                                                                <FaCheckCircle style={checkIconStyle} />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {pkg.requiredDocuments && pkg.requiredDocuments.length > 0 && (
                                                <div style={contentSectionStyle}>
                                                    <h6 style={sectionTitleStyle}>
                                                        Required Documents
                                                    </h6>
                                                    <ul style={packageListStyle}>
                                                        {pkg.requiredDocuments.map((doc) => (
                                                            <li
                                                                key={doc._id}
                                                                style={packageItemStyle}
                                                            >
                                                                <FaCheckCircle style={checkIconStyle} />
                                                                {doc.documentName}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        <div style={packageFooterStyle}>
                                            <div style={marketPriceStyle}>
                                                Market Price: ₹{pkg.marketPrice}
                                            </div>
                                            <div style={sellingPriceStyle}>
                                                ₹{pkg.sellingPrice} <span style={{fontSize: '14px', fontWeight: 'normal'}}>(One-Time)</span>
                                            </div>
                                            <Button
                                                style={buyNowButtonStyle}
                                                onClick={() =>
                                                    handleBuyNowPackage(pkg._id)
                                                }
                                            >
                                                BUY NOW
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </Slider>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
};

export default ServicePackagesSection;