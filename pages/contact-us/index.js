import ContactForm from "@/components/ContactForm";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const index = () => {
    const {services, companyDetails} = useDetails();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!services.length || !companyDetails) {
            setLoading(true);
        }
        if (services.length > 0 && companyDetails) {
            setLoading(false); 
        }
    }, [services, companyDetails]);

    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div className="about-header">
                <Container>
                    <div className="about-header-content">
                        <h1 className="about-header-title">Contact Us</h1>
                    </div>
                </Container>
                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt; <span>Contact Us</span>
                    </span>
                </div>
            </div>
            <ContactForm/>
        </>
    );
};

export default index;
