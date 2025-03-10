"use client";

import Image from "next/image";
import React from "react";
import { Col, Container, Row, Table, Card } from "react-bootstrap";
const numberToText = require("number-to-text");
require("number-to-text/converters/en-us");
import { MdDownload } from "react-icons/md";

const Invoice = ({
    userDetails,
    companyDetails,
    inGujarat,
    rateCardDetails,
    packageRateDetails,
    handleMakePayment,
}) => {
    const handleDownload = async () => {
        if (typeof window !== "undefined") {
            const html2pdf = (await import("html2pdf.js")).default;
            const element = document.getElementById("invoice");
            const opt = {
                margin: 0.5,
                filename: "invoice.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 3, useCORS: true, scrollY: 0 },
                jsPDF: {
                    unit: "in",
                    format: "letter",
                    orientation: "portrait",
                },
            };
            html2pdf().set(opt).from(element).save();
        }
    };

    return (
        <>
            <style jsx global>{`
                .invoice-table,
                .invoice-table th,
                .invoice-table td {
                    border: 1px solid black !important;
                    border-collapse: collapse;
                }
            `}</style>

            <Container style={{ marginTop: "120px" }}>
                <div>
                    <p className="text-center fs-2 fw-bold">INVOICE</p>
                </div>
                <Row>
                    <Col md={9}>
                        <div id="invoice" className="p-2">
                            <div
                                style={{ border: "1px solid black" }}
                                className="p-3 text-center"
                            >
                                <Image
                                    src={"/assets/logo.png"}
                                    height={200}
                                    width={200}
                                    className="logo"
                                />
                            </div>
                            <div
                                style={{ border: "1px solid black" }}
                                className="p-3"
                            >
                                <Row>
                                    <Col md={6}>
                                        <p className="m-0 p-0 fw-bold text-primary">
                                            VIHA GLOBAL FILINGS PRIVATE LIMITED
                                        </p>
                                        <p className="m-0 p-0 w-20">
                                            Address: {companyDetails?.Address}
                                        </p>
                                        <p className="m-0 p-0">
                                            Email:{" "}
                                            {companyDetails?.EmailID_Office}
                                        </p>
                                        <p className="m-0 p-0">
                                            Phone:{" "}
                                            {companyDetails?.ContactNo_Office}
                                        </p>
                                        <p className="m-0 p-0">
                                            GST: {companyDetails?.GSTNo}
                                        </p>
                                    </Col>
                                    <Col md={6} className="text-end">
                                        <p className="m-0 p-0 fs-5 fw-bold">
                                            ESTIMATE
                                        </p>
                                        <p>
                                            Invoice No:{" "}
                                            <span className="fw-bold">
                                                {rateCardDetails
                                                    ? rateCardDetails?.invoice
                                                          ?.invoiceNumber
                                                    : packageRateDetails
                                                          ?.invoice
                                                          .invoiceNumber}
                                            </span>
                                        </p>
                                        <p className="m-0 p-0">
                                            Date:{" "}
                                            {new Date().toLocaleDateString()}
                                        </p>
                                        <p className="m-0 p-0">
                                            Validity:{" "}
                                            {new Date().toLocaleDateString()}
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div
                                style={{ border: "1px solid black" }}
                                className="p-3"
                            >
                                <p className="m-0 p-0 fs-4 fw-bold">Customer</p>
                                <p className="m-0 p-0">
                                    {userDetails?.firstName}
                                </p>
                                <p className="m-0 p-0">{userDetails?.phone}</p>
                                <p className="m-0 p-0">{userDetails?.email}</p>
                                <p className="m-0 p-0">
                                    Place Of Supply: {userDetails?.state}
                                </p>
                            </div>
                            <Table
                                bordered
                                hover
                                responsive
                                className="invoice-table"
                                style={{ borderCollapse: "collapse" }}
                            >
                                <thead className="table-dark">
                                    <tr className="text-center">
                                        <th>#</th>
                                        <th className="desc-col">
                                            Description
                                        </th>
                                        <th>Rate</th>
                                        <th>Qty</th>
                                        <th>Taxable Amt</th>
                                        <th>
                                            CGST ({inGujarat ? "9%" : "18%"})
                                        </th>
                                        <th>
                                            SGST ({inGujarat ? "9%" : "18%"})
                                        </th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td className="desc-col">
                                            {packageRateDetails && (
                                                <>
                                                    <em>
                                                        {
                                                            packageRateDetails
                                                                ?.package
                                                                ?.packageGroupId
                                                                .packageGroupName
                                                        }{" "}
                                                        (
                                                        {
                                                            packageRateDetails
                                                                ?.package
                                                                ?.packageGroupId
                                                                .serviceId
                                                                .serviceName
                                                        }
                                                        )
                                                    </em>
                                                    <br />
                                                </>
                                            )}
                                            <strong>
                                                {rateCardDetails
                                                    ? rateCardDetails?.package
                                                          ?.card?.title
                                                    : packageRateDetails.package
                                                          .packageName}
                                            </strong>
                                            <br />
                                            <em>
                                                Includes -{" "}
                                                {rateCardDetails
                                                    ? rateCardDetails?.package?.card?.includes
                                                          .map(
                                                              (item) =>
                                                                  item.serviceName
                                                          )
                                                          .join(", ")
                                                    : packageRateDetails?.package?.includes
                                                          .map((item) => item)
                                                          .join(", ")}
                                            </em>
                                            <br />
                                        </td>
                                        <td className="text-center">
                                            {rateCardDetails
                                                ? rateCardDetails?.subTotal
                                                : packageRateDetails?.subTotal}
                                        </td>
                                        <td className="text-center">1</td>
                                        <td className="text-center">
                                            {rateCardDetails
                                                ? rateCardDetails?.subTotal
                                                : packageRateDetails?.subTotal}
                                        </td>
                                        <td className="text-center">
                                            {rateCardDetails
                                                ? rateCardDetails?.cgstAmount
                                                : packageRateDetails?.cgstAmount}
                                        </td>
                                        <td className="text-center">
                                            {rateCardDetails
                                                ? rateCardDetails?.sgstAmount
                                                : packageRateDetails?.sgstAmount}
                                        </td>
                                        <td className="text-center">
                                            {rateCardDetails
                                                ? rateCardDetails?.grandTotal
                                                : packageRateDetails?.grandTotal}
                                        </td>
                                    </tr>
                                    {/* Grand Total Row */}
                                    <tr className="fw-bold">
                                        <td colSpan="4" className="text-center">
                                            Grand Total
                                        </td>
                                        <td className="text-center">
                                            ₹
                                            {rateCardDetails
                                                ? rateCardDetails?.subTotal
                                                : packageRateDetails?.subTotal}
                                        </td>
                                        <td className="text-center">
                                            ₹
                                            {rateCardDetails
                                                ? rateCardDetails?.cgstAmount
                                                : packageRateDetails?.cgstAmount}
                                        </td>
                                        <td className="text-center">
                                            ₹
                                            {rateCardDetails
                                                ? rateCardDetails?.sgstAmount
                                                : packageRateDetails?.sgstAmount}
                                        </td>
                                        <td className="text-center">
                                            ₹
                                            {rateCardDetails
                                                ? rateCardDetails?.grandTotal
                                                : packageRateDetails?.grandTotal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}></td>
                                        <td className="fw-bold" colSpan={3}>
                                            Sub Total
                                        </td>
                                        <td className="fw-bold text-center">
                                            ₹
                                            {rateCardDetails
                                                ? rateCardDetails?.subTotal
                                                : packageRateDetails?.subTotal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}></td>
                                        <td className="fw-bold" colSpan={3}>
                                            GST Total
                                        </td>
                                        <td className="fw-bold text-center">
                                            ₹
                                            {rateCardDetails
                                                ? rateCardDetails?.gstTotal
                                                : packageRateDetails?.gstTotal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}></td>
                                        <td className="fw-bold" colSpan={3}>
                                            Grand Total
                                        </td>
                                        <td className="fw-bold text-center">
                                            ₹
                                            {rateCardDetails
                                                ? rateCardDetails?.grandTotal
                                                : packageRateDetails?.grandTotal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}></td>
                                        <td colSpan={5} className="fw-bold">
                                            <span className="fw-normal">
                                                Amount in Words :{" "}
                                            </span>
                                            Rupees{" "}
                                            {numberToText.convertToText(
                                                rateCardDetails
                                                    ? rateCardDetails?.grandTotal
                                                    : packageRateDetails?.grandTotal
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    {/* Styled Summary Card on the Right */}
                    <Col md={3}>
                        <Card className="summary-card">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <h5 className="fw-bold">Invoice Summary</h5>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={handleDownload}
                                    >
                                        <MdDownload size={24} />
                                    </div>
                                </div>
                                <hr />
                                <p className="d-flex justify-content-between">
                                    <span>Subtotal:</span>
                                    <span>
                                        ₹{" "}
                                        {rateCardDetails
                                            ? rateCardDetails?.subTotal
                                            : packageRateDetails?.subTotal}
                                    </span>
                                </p>
                                <p className="d-flex justify-content-between">
                                    <span>CGST:</span>
                                    <span>
                                        ₹{" "}
                                        {rateCardDetails
                                            ? rateCardDetails?.cgstAmount
                                            : packageRateDetails?.cgstAmount}
                                    </span>
                                </p>
                                <p className="d-flex justify-content-between">
                                    <span>SGST:</span>
                                    <span>
                                        ₹{" "}
                                        {rateCardDetails
                                            ? rateCardDetails?.sgstAmount
                                            : packageRateDetails?.sgstAmount}
                                    </span>
                                </p>
                                <hr />
                                <h5 className="d-flex justify-content-between fw-bold">
                                    <span>Grand Total:</span>
                                    <span>
                                        ₹{" "}
                                        {rateCardDetails
                                            ? rateCardDetails?.grandTotal
                                            : packageRateDetails?.grandTotal}
                                    </span>
                                </h5>
                                <div
                                    className="text-center mt-3 px-3 py-2 bg-primary text-white fw-bold"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleMakePayment}
                                >
                                    MAKE PAYMENT
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Invoice;
