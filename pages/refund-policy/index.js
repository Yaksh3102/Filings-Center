import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const index = () => {
    const { services, companyDetails, fetchCMS } = useDetails();
    const [refundData, setRefundData] = useState(null);

    useEffect(() => {
        if (!refundData) {
            fetchCMS({ slug: "/refund-policy" }).then((data) =>
                setRefundData(data)
            );
        }
    }, [refundData]);

    // If any required data is missing, show the overlay
    const isLoading = !services.length || !companyDetails || !refundData;

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div className="about-header">
                <Container>
                    <div className="about-header-content">
                        <h1 className="about-header-title">
                            Refund Policy
                        </h1>
                    </div>
                </Container>

                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt;{" "}
                        <span>Refund Policy</span>
                    </span>
                </div>
            </div>
            <Container className="mt-4">
                <div dangerouslySetInnerHTML={{__html : refundData?.data?.content}} />
            </Container>
        </>
    );
};

export default index;
