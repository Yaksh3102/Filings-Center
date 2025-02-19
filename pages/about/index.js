import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import AboutUs from "@/components/AboutUs";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";

const About = () => {

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
                        <h1 className="about-header-title">About</h1>
                    </div>
                </Container>

                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt; <span>About Us</span>
                    </span>
                </div>
            </div>
            <AboutUs/>
            <WhyChooseUs/>
            <TestimonialsSection/>
        </>
    );
};

export default About;
