import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import AboutUs from "@/components/AboutUs";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import CertificateSection from "@/components/CertificateSection";

const About = () => {
    const { services, companyDetails, fetchCarouselCMS } = useDetails();

    const [loading, setLoading] = useState(false);

    const [certificates, setCertificates] = useState([]);

    const fetchCertificates = async () => {
        try {
            const data = await fetchCarouselCMS({ slug: "/certificates" });
            if (data.isOk) {
                setCertificates(data.data);
            } else {
                setCertificates([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const isLoading =
        !services.length || !companyDetails || setCertificates.length === 0;

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div className="about-header">
                <Container>
                    <div className="about-header-content">
                        <h1 className="about-header-title">About</h1>
                    </div>
                </Container>

                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt; <span>About Us</span>
                    </span>
                </div>
            </div>
            <AboutUs />
            {/* <CertificateSection certificates={certificates} /> */}
            <WhyChooseUs />
            <TestimonialsSection />
        </>
    );
};

export default About;
