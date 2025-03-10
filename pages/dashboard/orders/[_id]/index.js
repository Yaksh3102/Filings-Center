"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { useDetails } from "@/contexts/DetailsContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import LoadingOverlay from "@/components/LoadingOverlay";
import { MdDelete, MdEdit } from "react-icons/md";
import { Input, Label } from "reactstrap";

export default function Order() {
  const router = useRouter();
  const { _id } = router.query;
  const { BASE_URL_API } = useDetails();

  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [activeTab, setActiveTab] = useState("details");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [confirmedFiles, setConfirmedFiles] = useState({});

  // Other Documents modal
  const [showOtherDocModal, setShowOtherDocModal] = useState(false);
  const [otherDocTitle, setOtherDocTitle] = useState("");
  const [otherDocFile, setOtherDocFile] = useState(null);
  const [editingOtherDocId, setEditingOtherDocId] = useState(null);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [otherDocToDelete, setOtherDocToDelete] = useState(null);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL_API}/auth/get-details/order/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.isOk) {
        setOrderData(data.data);
      } else {
        toast.error("Cannot get order data");
        router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_id) {
      getOrderData();
    }
  }, [_id]);

  const handleFileUpload = (e, docId) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [docId]: file }));
      setConfirmedFiles((prev) => ({ ...prev, [docId]: false }));
    }
  };

  const confirmUpload = async (docId) => {
    if (uploadedFiles[docId]) {
      setConfirmedFiles((prev) => ({ ...prev, [docId]: true }));
      const formData = new FormData();
      formData.append("document", uploadedFiles[docId]);
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL_API}/auth/update/uploaded-document/${docId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const data = await res.json();
        if (data.isOk) {
          toast.success("Document uploaded successfully");
          getOrderData();
          setUploadedFiles((prev) => ({ ...prev, [docId]: null }));
        } else {
          toast.error("Failed to upload document");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to upload document");
      } finally {
        setLoading(false);
      }
    }
  };

  // Convert status into the appropriate badge class
  const getBadgeClass = (status) => {
    switch (status) {
      case "VERIFIED":
        return "order-details-badge order-details-badge-verified";
      case "DECLINED":
        return "order-details-badge order-details-badge-declined";
      case "PENDING":
        return "order-details-badge order-details-badge-pending";
      default:
        return "order-details-badge order-details-badge-info";
    }
  };

  // Modal logic for Other Documents
  const openOtherDocModal = async (doc) => {
    if (doc) {
      setEditingOtherDocId(doc._id);
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL_API}/auth/get/other-document/${doc._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (data.isOk) {
          setOtherDocFile(data.data.file);
          setOtherDocTitle(data.data.title);
        } else {
          toast.error("Failed to get document data");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to get document data");
      } finally {
        setLoading(false);
      }
    } else {
      // Creating a new document
      setEditingOtherDocId(null);
      setOtherDocTitle("");
      setOtherDocFile(null);
    }
    setShowOtherDocModal(true);
  };

  const closeOtherDocModal = () => {
    setShowOtherDocModal(false);
    setOtherDocTitle("");
    setOtherDocFile(null);
    setEditingOtherDocId(null);
  };

  const handleOtherDocSubmit = async (e) => {
    e.preventDefault();
    if (!otherDocTitle) {
      toast.error("Title is required.");
      return;
    }
    if (!editingOtherDocId && !otherDocFile) {
      toast.error("File is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", otherDocTitle);
    formData.append("file", otherDocFile);
    formData.append("orderId", orderData._id);
    formData.append("clientId", orderData.clientId._id);
    setLoading(true);

    try {
      let response;
      if (editingOtherDocId) {
        // Update
        response = await fetch(
          `${BASE_URL_API}/auth/update/other-document/${editingOtherDocId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
      } else {
        // Create
        response = await fetch(`${BASE_URL_API}/auth/create/other-document`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });
      }

      const data = await response.json();
      if (data.isOk) {
        toast.success(
          editingOtherDocId
            ? "Document updated successfully"
            : "Document added successfully"
        );
        getOrderData();
        closeOtherDocModal();
      } else {
        toast.error(
          editingOtherDocId
            ? "Failed to update document"
            : "Failed to add document"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        editingOtherDocId
          ? "Failed to update document"
          : "Failed to add document"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete other doc
  const handleDeleteOtherDoc = async (docId) => {
    setShowDeleteModal(false);
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL_API}/auth/delete/other-document/${docId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.isOk) {
        toast.success("Document deleted successfully");
        getOrderData();
      } else {
        toast.error("Failed to delete document");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete document");
    } finally {
      setLoading(false);
    }
  };

  // Update draft filing status
  const handleDraftFilingStatusChange = async (docId, newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL_API}/auth/update-status/draft-filing/${docId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      if (data.isOk) {
        toast.success("Draft filing status updated successfully");
        getOrderData();
      } else {
        toast.error("Failed to update draft filing status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating draft filing status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Container className="order-details-container">
        {loading && <LoadingOverlay />}
        <Row>
          <Card className="order-details-main-card">
            <Col md={12}>
              <Row>
                {/* Sidebar */}
                <Col md={3} className="order-details-col-padding">
                  <div className="order-details-sidebar">
                    <Button
                      className={`order-details-sidebar-button ${
                        activeTab === "details"
                          ? "order-details-sidebar-button-active"
                          : "order-details-sidebar-button-inactive"
                      }`}
                      onClick={() => setActiveTab("details")}
                    >
                      Order Details
                    </Button>
                    <Button
                      className={`order-details-sidebar-button ${
                        activeTab === "documents"
                          ? "order-details-sidebar-button-active"
                          : "order-details-sidebar-button-inactive"
                      }`}
                      onClick={() => setActiveTab("documents")}
                    >
                      Documents
                    </Button>
                    <Button
                      className={`order-details-sidebar-button ${
                        activeTab === "draft-filings"
                          ? "order-details-sidebar-button-active"
                          : "order-details-sidebar-button-inactive"
                      }`}
                      onClick={() => setActiveTab("draft-filings")}
                    >
                      Draft Work
                    </Button>
                    <Button
                      className={`order-details-sidebar-button ${
                        activeTab === "filings"
                          ? "order-details-sidebar-button-active"
                          : "order-details-sidebar-button-inactive"
                      }`}
                      onClick={() => setActiveTab("filings")}
                    >
                      Filings
                    </Button>
                  </div>
                </Col>

                {/* Content Section */}
                <Col md={9} className="order-details-col-padding">
                  {/* DETAILS TAB */}
                  {activeTab === "details" && (
                    <Card className="order-details-content-card">
                      <div className="order-details-header-with-button">
                        <h4 className="order-details-header" style={{ margin: 0 }}>
                          Order Details
                        </h4>
                        {orderData?.invoiceId && (
                          <a
                            href={`${process.env.NEXT_PUBLIC_BASE_URL}/${orderData.invoiceId.invoiceUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="order-details-invoice-button"
                            download
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download Invoice
                          </a>
                        )}
                      </div>
                      <div className="order-details-detail-row">
                        <span className="order-details-detail-label">
                          Employee Status:{" "}
                        </span>
                        <span className={getBadgeClass(orderData?.status)}>
                          {orderData?.status}
                        </span>
                      </div>
                      <div className="order-details-detail-row">
                        <span className="order-details-detail-label">
                          Package:{" "}
                        </span>
                        <span>
                          {orderData?.packageId
                            ? orderData?.packageId?.card?.title
                            : orderData?.servicePackageId?.packageName}
                        </span>
                      </div>
                      <div className="order-details-detail-row">
                        <span className="order-details-detail-label">
                          Includes:{" "}
                        </span>
                        <div style={{ marginLeft: "40px" }}>
                          {orderData?.packageId?.card?.includes?.map((el) => (
                            <li key={el.serviceName}>{el.serviceName}</li>
                          ))}
                          {orderData?.servicePackageId?.includes?.map((el) => (
                            <li key={el}>{el}</li>
                          ))}
                        </div>
                      </div>
                      {orderData?.assignedEmployee && (
                        <div style={{ marginTop: "30px" }}>
                          <h5
                            className="order-details-header"
                            style={{ fontSize: "1.1rem" }}
                          >
                            Assigned Employee
                          </h5>
                          <div className="order-details-detail-row">
                            <span className="order-details-detail-label">
                              Name:{" "}
                            </span>
                            <span>
                              {orderData?.assignedEmployee?.firstName}{" "}
                              {orderData?.assignedEmployee?.lastName}
                            </span>
                          </div>
                          <div className="order-details-detail-row">
                            <span className="order-details-detail-label">
                              Email:{" "}
                            </span>
                            <span>{orderData?.assignedEmployee?.email}</span>
                          </div>
                          <div className="order-details-detail-row">
                            <span className="order-details-detail-label">
                              Phone:{" "}
                            </span>
                            <span>{orderData?.assignedEmployee?.phone}</span>
                          </div>
                        </div>
                      )}
                    </Card>
                  )}

                  {/* DOCUMENTS TAB */}
                  {activeTab === "documents" && (
                    <Card className="order-details-content-card">
                      <h4 className="order-details-header">Documents</h4>
                      {orderData?.documents?.length > 0 ? (
                        <Row>
                          {orderData.documents.map((doc) => (
                            <Col md={6} key={doc._id} className="order-details-col-padding">
                              <div className="order-details-document-card">
                                <p
                                  style={{
                                    fontWeight: "600",
                                    color: "#333",
                                    marginBottom: "15px",
                                    fontSize: "1.05rem",
                                  }}
                                >
                                  {doc.documentType?.documentName}
                                </p>
                                {doc.status !== "VERIFIED" && (
                                  <Form.Group className="order-details-file-upload">
                                    <Form.Control
                                      type="file"
                                      onChange={(e) => handleFileUpload(e, doc._id)}
                                      style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        padding: "5px 0",
                                      }}
                                    />
                                  </Form.Group>
                                )}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    marginTop: "10px",
                                  }}
                                >
                                  {uploadedFiles[doc._id] && !confirmedFiles[doc._id] && (
                                    <button
                                      className="order-details-button order-details-button-success"
                                      onClick={() => confirmUpload(doc._id)}
                                    >
                                      Confirm Upload
                                    </button>
                                  )}
                                  {doc.fileUrl && (
                                    <a
                                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/${doc.fileUrl}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="order-details-button order-details-button-primary"
                                    >
                                      Preview
                                    </a>
                                  )}
                                  {doc.fileUrl && (
                                    <span
                                      className={getBadgeClass(doc.status)}
                                      style={{ marginLeft: "auto" }}
                                    >
                                      {doc.status}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <p className="order-details-empty-state">
                          No documents uploaded yet.
                        </p>
                      )}

                      {/* Other Documents Section */}
                      <div style={{ marginTop: "30px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h4 className="order-details-header">Other Documents</h4>
                          <Button
                            className="order-details-sidebar-button-inactive"
                            style={{ width: "auto" }}
                            onClick={() => openOtherDocModal(null)}
                          >
                            Other Documents &#43;
                          </Button>
                        </div>
                        {orderData?.otherDocuments?.length > 0 ? (
                          <Row>
                            {orderData.otherDocuments.map((otherDoc) => (
                              <Col md={6} key={otherDoc._id} className="order-details-col-padding">
                                <div className="order-details-document-card">
                                  <div className="d-flex justify-content-between">
                                    <p
                                      style={{
                                        fontWeight: "600",
                                        color: "#333",
                                        marginBottom: "15px",
                                        fontSize: "1.05rem",
                                      }}
                                    >
                                      {otherDoc.title}
                                    </p>
                                    <div className="d-flex gap-2">
                                      <Button
                                        variant="danger"
                                        className="mt-2 p-1"
                                        onClick={() => {
                                          setOtherDocToDelete(otherDoc);
                                          setShowDeleteModal(true);
                                        }}
                                      >
                                        <MdDelete size={22} />
                                      </Button>
                                      <Button
                                        variant="secondary"
                                        className="mt-2 p-1"
                                        onClick={() => openOtherDocModal(otherDoc)}
                                      >
                                        <MdEdit size={22} />
                                      </Button>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      flexWrap: "wrap",
                                      marginTop: "10px",
                                    }}
                                  >
                                    {otherDoc.fileUrl && (
                                      <a
                                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/${otherDoc.fileUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="order-details-button order-details-button-primary"
                                      >
                                        Preview
                                      </a>
                                    )}
                                    {otherDoc.fileUrl && (
                                      <span
                                        className={getBadgeClass(otherDoc.status)}
                                        style={{ marginLeft: "auto" }}
                                      >
                                        {otherDoc.status}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        ) : (
                          <p className="order-details-empty-state">
                            No other documents added yet.
                          </p>
                        )}
                      </div>
                    </Card>
                  )}

                  {/* DRAFT FILINGS TAB */}
                  {activeTab === "draft-filings" && orderData && (
                    <Card className="order-details-content-card">
                      <h4 className="order-details-header">Draft Filings</h4>
                      {orderData?.draftFilings?.length > 0 ? (
                        <Row>
                          {orderData.draftFilings.map((draft) => (
                            <Col md={6} key={draft._id} className="order-details-col-padding">
                              <div className="order-details-document-card">
                                <p
                                  style={{
                                    fontWeight: "600",
                                    color: "#333",
                                    marginBottom: "15px",
                                    fontSize: "1.05rem",
                                  }}
                                >
                                  {draft.title}
                                </p>
                                {draft.fileUrl && (
                                  <a
                                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/${draft.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="order-details-button order-details-button-primary"
                                  >
                                    Preview
                                  </a>
                                )}
                                <div style={{ marginTop: "10px" }}>
                                  <Label>Status:</Label>
                                  <Input
                                    type="select"
                                    value={draft.status}
                                    onChange={(e) =>
                                      handleDraftFilingStatusChange(
                                        draft._id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="NOT_VERIFIED">
                                      NOT_VERIFIED
                                    </option>
                                    <option value="VERIFIED">VERIFIED</option>
                                    <option value="DECLINED">DECLINED</option>
                                  </Input>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <p className="order-details-empty-state">
                          No draft filings available yet.
                        </p>
                      )}
                    </Card>
                  )}

                  {/* FILINGS TAB */}
                  {activeTab === "filings" && (
                    <Card className="order-details-content-card">
                      <h4 className="order-details-header">Filings</h4>
                      {orderData?.filingDocuments?.length > 0 ? (
                        <Row>
                          {orderData.filingDocuments.map((filing) => (
                            <Col md={6} key={filing._id} className="order-details-col-padding">
                              <div className="order-details-document-card">
                                <p
                                  style={{
                                    fontWeight: "600",
                                    color: "#333",
                                    marginBottom: "15px",
                                    fontSize: "1.05rem",
                                  }}
                                >
                                  {filing.title}
                                </p>
                                {filing.fileUrl && (
                                  <a
                                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/${filing.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="order-details-button order-details-button-primary"
                                  >
                                    Preview
                                  </a>
                                )}
                              </div>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <p className="order-details-empty-state">
                          No filings available yet.
                        </p>
                      )}
                    </Card>
                  )}
                </Col>
              </Row>
            </Col>
          </Card>
        </Row>

        {/* Modal for Adding/Editing Other Documents */}
        <Modal show={showOtherDocModal} onHide={closeOtherDocModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingOtherDocId
                ? "Edit Other Document"
                : "Add Other Document"}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleOtherDocSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={otherDocTitle}
                  onChange={(e) => setOtherDocTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>File</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setOtherDocFile(e.target.files[0])}
                  required={!editingOtherDocId}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeOtherDocModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Modal for Deleting Other Documents */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this document?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteOtherDoc(otherDocToDelete._id);
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </DashboardLayout>
  );
}
