import CareersForm from "@/components/CareersForm";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";

const index = () => {
    const { services, companyDetails } = useDetails();

    const isLoading = !services.length || !companyDetails;

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div className="about-header">
                <Container>
                    <div className="about-header-content">
                        <h1 className="about-header-title">Careers</h1>
                    </div>
                </Container>

                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt; <span>Careers</span>
                    </span>
                </div>
            </div>
            <CareersForm />
        </>
    );
};

export default index;
