import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { DetailsProvider } from "@/contexts/DetailsContext";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
    return (
        <>
            <DetailsProvider>
                <ToastContainer />
                <ScrollToTop/>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </DetailsProvider>
        </>
    );
}
