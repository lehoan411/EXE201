import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ API
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:9999/auth/${userId}`);
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // Xóa dữ liệu trong localStorage và điều hướng về trang đăng nhập
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setUsername(null);
    alert("Bạn đã đăng xuất!");
    navigate("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://via.placeholder.com/150x50"
              alt="Logo"
              style={{ width: "150px" }}
            />
          </Navbar.Brand>

          {/* Toggle Button cho mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Thanh điều hướng */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Trang Chủ</Nav.Link>
              <Nav.Link as={Link} to="/product">Sản Phẩm</Nav.Link>
              <Nav.Link as={Link} to="/cart">Giỏ Hàng</Nav.Link>

              {/* Hiển thị dựa trên trạng thái đăng nhập */}
              {username ? (
                <NavDropdown title={`Xin chào, ${username}`} id="account-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">
                    Hồ Sơ
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Đăng Xuất
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title="Tài Khoản" id="account-dropdown">
                  <NavDropdown.Item as={Link} to="/login">
                    Đăng Nhập
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">
                    Đăng Ký
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;