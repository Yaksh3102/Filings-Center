"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import SignUpForm from "@/components/SignUpForm";
import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";

const Index = () => {
    const { services, companyDetails, userDetails } = useDetails();
    const router = useRouter();

    useEffect(() => {
        if (userDetails) {
            router.push("/");
        }
    }, [userDetails, router]);

    const isLoading = !services.length || !companyDetails;

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div className="about-header">
                <Container>
                    <div className="about-header-content">
                        <h1 className="about-header-title">Sign Up</h1>
                    </div>
                </Container>

                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt; <span>Sign Up</span>
                    </span>
                </div>
            </div>
            <SignUpForm />
        </>
    );
};

export default Index;
