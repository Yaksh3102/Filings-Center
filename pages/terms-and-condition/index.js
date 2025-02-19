import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const index = () => {
    const { services, companyDetails, fetchCMS } = useDetails();
    const [termsData, setTermsData] = useState(null);

    useEffect(() => {
        if (!termsData) {
            fetchCMS({ slug: "/terms-and-conditions" }).then((data) =>
                setTermsData(data)
            );
        }
    }, [termsData]);

    // If any required data is missing, show the overlay
    const isLoading = !services.length || !companyDetails || !termsData;

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div className="about-header">
                <Container>
                    <div className="about-header-content">
                        <h1 className="about-header-title">
                            Terms & Conditions
                        </h1>
                    </div>
                </Container>

                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt;{" "}
                        <span>Terms & Conditions</span>
                    </span>
                </div>
            </div>
            <Container className="mt-4">
                <div dangerouslySetInnerHTML={{__html : termsData.data.content}} />
            </Container>
        </>
    );
};

export default index;
