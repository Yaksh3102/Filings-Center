// components/DashboardLayout.js
"use client"

import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <Container style={{ marginTop: '150px', marginBottom: '50px' }}>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={9}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}