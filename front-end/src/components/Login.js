import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9999/auth/login", {
        username: username,
        password: password,
      });
      // Lưu _id vào localStorage
      const userId = res.data._id;
      localStorage.setItem("userId", userId);

      setMessage("Đăng nhập thành công!");
      setError(false);
      alert("Login successfully");
      navigate("/");
    } catch (error) {
      setError(true);
      setMessage(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Đăng Nhập</h2>
              {message && (
                <Alert variant={error ? "danger" : "success"}>{message}</Alert>
              )}
              <Form onSubmit={login}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Tên người dùng</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên người dùng"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Đăng Nhập
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <Link to="/register">Đăng ký ngay</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;