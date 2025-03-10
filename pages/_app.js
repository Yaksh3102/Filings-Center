import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { DetailsProvider } from "@/contexts/DetailsContext";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [position, setPosition] = useState({ top: "10px", right: "20px" });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTotal =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollTotal) * 100;
            setScrollProgress(scrolled);

            if (window.scrollY > 100) {
                setIsVisible(true);
                setPosition({ top: "auto", right: "20px", bottom: "30px" });
            } else {
                setIsVisible(false);
                setPosition({ top: "10px", right: "20px", bottom: "auto" });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <DetailsProvider>
                {!isMenuOpen && <div>
                    <Link
                        href={`https://api.whatsapp.com/send?phone=+919173577444&text=LET'S CHAT WITH FILINGS CORNER`}
                        target="_blank"
                    >
                        <Image
                            src={"/assets/whatsapp.png"}
                            height={50}
                            width={50}
                            style={{
                                position: "fixed",
                                bottom: isVisible ? 100 : 10,
                                right: 25,
                                zIndex: 9999,
                                cursor: "pointer",
                            }}
                        />
                    </Link>
                </div>}
                <ToastContainer />
                <ScrollToTop
                    isVisible={isVisible}
                    position={position}
                    scrollProgress={scrollProgress}
                />
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <Component {...pageProps} />
                <Footer />
            </DetailsProvider>
        </>
    );
}
