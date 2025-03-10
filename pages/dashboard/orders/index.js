"use client";
import { Card, Container, Row, Col } from "react-bootstrap";
import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { useDetails } from "@/contexts/DetailsContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";

export default function OrdersPage() {
  const { userDetails } = useDetails();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (userDetails) {
      setOrders(userDetails.orders);
    }
  }, [userDetails]);

  const isLoading = userDetails === null || orders === null;
  if (isLoading) {
    return <LoadingOverlay />;
  }

  // Helper function to get dynamic badge classes based on status
  const getBadgeClass = (status) => {
    switch (status) {
      case "VERIFIED":
        return "orders-page-badge orders-page-badge-verified";
      case "DECLINED":
        return "orders-page-badge orders-page-badge-declined";
      case "PENDING":
        return "orders-page-badge orders-page-badge-pending";
      default:
        return "orders-page-badge orders-page-badge-info";
    }
  };

  return (
    <DashboardLayout>
      <Container className="orders-page-container">
        <Row>
          <Col md={12}>
            {/* Main Card */}
            <Card className="orders-page-main-card">
              <Card.Body>
                <h4 className="orders-page-header">My Orders</h4>

                {orders.length === 0 ? (
                  <p className="orders-page-no-orders">
                    You have no orders yet.
                  </p>
                ) : (
                  <Row>
                    {orders.map((order) => (
                      <Col
                        xs={12}
                        md={4}
                        key={order._id}
                        className="orders-page-col-padding"
                      >
                        {/* Single Order Card */}
                        <div className="orders-page-order-card">
                          <div style={{ flexGrow: 1 }}>
                            <h5 className="orders-page-order-title">
                              {order.packageId
                                ? order.packageId?.card?.title
                                : order.servicePackageId?.packageName}
                            </h5>
                            <div className="orders-page-order-date">
                              <FaCalendarAlt style={{ marginRight: "8px" }} />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                            <span className={getBadgeClass(order.status)}>
                              {order.status}
                            </span>
                          </div>
                          <div
                            style={{
                              marginTop: "auto",
                              textAlign: "right",
                            }}
                          >
                            <Link
                              href={`/dashboard/orders/${order._id}`}
                              className="orders-page-view-details"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
}
