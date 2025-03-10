"use client";

import Invoice from "@/components/Invoice";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const index = () => {
    const router = useRouter();

    if (!router.isReady) return <div>Loading...</div>;

    const { _id, data } = router.query;

    const { userDetails, companyDetails, BASE_URL_API, fetchUserDetails } =
        useDetails();

    const [rateCardDetails, setRateCardDetails] = useState(null);
    const [packageRateDetails, setPackageRateDetails] = useState(null);

    const inGujarat = userDetails?.state === "Gujarat";
    const [loading, setLoading] = useState(false);

    const fetchEstimate = async () => {
        try {
            const res = await fetch(
                `${BASE_URL_API}/auth/get-estimate/service-package-group`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({
                        _id: _id,
                        ratecard: data,
                        inGujarat: inGujarat,
                    }),
                }
            );
            const result = await res.json();
            if (result.isOk) {
                setRateCardDetails(result.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPackageEstimate = async () => {
        try {
            const res = await fetch(`${BASE_URL_API}/get-estimate/package`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    packageId: _id,
                    inGujarat: inGujarat,
                }),
            });
            const result = await res.json();
            if (result.isOk) {
                setPackageRateDetails(result.data);
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleMakePayment = async () => {
        setLoading(true);
        try {
            const html2pdf = (await import("html2pdf.js")).default;
            const element = document.getElementById("invoice");
            const opt = {
                margin: 0.5,
                filename: "invoice.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
                jsPDF: {
                    unit: "in",
                    format: "letter",
                    orientation: "portrait",
                },
            };
            const pdfInstance = html2pdf().set(opt).from(element);
            const pdfBlob = await pdfInstance.outputPdf("blob");

            const formData = new FormData();
            formData.append("clientId", userDetails._id);
            if (rateCardDetails) {
                formData.append("packageId", _id);
            }
            if (packageRateDetails) {
                formData.append("servicePackageId", _id);
            }

            formData.append(
                "invoiceId",
                rateCardDetails
                    ? rateCardDetails.invoice._id
                    : packageRateDetails.invoice._id
            );
            formData.append("invoicePdf", pdfBlob, "invoice.pdf");

            const res = await fetch(`${BASE_URL_API}/auth/create/order`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (data.isOk) {
                toast.success("Payment Successful");
                await fetchUserDetails();
                router.push(`/dashboard/orders`);
            } else {
                toast.error("Payment Failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("Payment Failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data && _id) {
            fetchEstimate();
        } else {
            fetchPackageEstimate();
        }
    }, [data, _id]);

    const isLoading =
        !companyDetails ||
        !userDetails ||
        (data ? !rateCardDetails : !packageRateDetails);

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            {loading && <LoadingOverlay />}
            <Invoice
                userDetails={userDetails}
                companyDetails={companyDetails}
                inGujarat={inGujarat}
                rateCardDetails={rateCardDetails}
                packageRateDetails={packageRateDetails}
                handleMakePayment={handleMakePayment}
            />
        </>
    );
};

export default index;
