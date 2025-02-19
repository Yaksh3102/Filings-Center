import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CounterSection from "@/components/CounterSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialSection";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import { useEffect, useState } from "react";
import WhyChooseUsHome from "@/components/WhyChooseUsHome";

export default function Home() {
    const { services, companyDetails, fetchBannerCMS, fetchCMS } = useDetails();
    const [heroData, setHeroData] = useState(null);
    const [aboutData, setAboutData] = useState(null);
    const [whyChooseUs, setWhyChooseUs] = useState(null);

    useEffect(() => {
        if (!heroData) {
            fetchBannerCMS({ slug: "/banner" }).then((data) =>
                setHeroData(data)
            );
        }
        if (!aboutData) {
            fetchCMS({ slug: "/home-about" }).then((data) =>
                setAboutData(data)
            );
        }
        if (!whyChooseUs) {
            fetchCMS({ slug: "/home-why-choose-us" }).then((data) =>
                // console.log(data)
                setWhyChooseUs(data.data)
            );
        }
    }, [heroData, aboutData, whyChooseUs]);

    // If any required data is missing, show the overlay
    const isLoading =
        !services.length || !companyDetails || !heroData || !aboutData || !whyChooseUs;

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <Head>
                <title>Filings Corner</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <HeroSection heroData={heroData} />
                <AboutSection aboutData={aboutData} />
                <CounterSection />
                <ServicesSection />
                <WhyChooseUsHome data={whyChooseUs}/>
                <TestimonialsSection />
            </div>
        </>
    );
}
