import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          {/* Phần thông tin công ty */}
          <Col md={3} sm={6} className="mb-3">
            <h5>Về Chúng Tôi</h5>
            <p>
              Chúng tôi cung cấp các sản phẩm chất lượng cao với giá cả hợp lý,
              luôn đặt khách hàng lên hàng đầu.
            </p>
          </Col>

          {/* Phần liên kết nhanh */}
          <Col md={3} sm={6} className="mb-3">
            <h5>Liên Kết Nhanh</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">Giới Thiệu</a></li>
              <li><a href="/shop" className="text-light text-decoration-none">Sản Phẩm</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Liên Hệ</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">Câu Hỏi Thường Gặp</a></li>
            </ul>
          </Col>

          {/* Phần mạng xã hội */}
          <Col md={3} sm={6} className="mb-3">
            <h5>Theo Dõi Chúng Tôi</h5>
            <ul className="list-unstyled">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Twitter</a></li>
            </ul>
          </Col>

          {/* Phần thông tin liên hệ */}
          <Col md={3} sm={6} className="mb-3">
            <h5>Liên Hệ</h5>
            <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
            <p>Điện thoại: 0123-456-789</p>
            <p>Email: support@example.com</p>
          </Col>
        </Row>
        <hr className="bg-light" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Công Ty ABC. Tất cả các quyền được bảo lưu.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;