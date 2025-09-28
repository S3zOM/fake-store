"use client";
import { Container, Row, Col } from "react-bootstrap";
import { FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-6 bg-white text-blue-700 border-t border-blue-200 shadow-2xl">
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={6}
            className="text-center text-md-start mb-2 mb-md-0">
            <p className="mb-0">
              ©  Fake Shop | By Zori
            </p>
          </Col>

          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center justify-content-md-end gap-3 mt-2 mt-md-0">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaYoutube size={28} color="#2563eb" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaTwitter size={28} color="#2563eb" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaInstagram size={28} color="#2563eb" />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
