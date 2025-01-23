import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const accountId = localStorage.getItem("userId"); // Lấy userId từ localStorage

  // Fetch danh sách sản phẩm từ server
  useEffect(() => {
    document.title = "Trang Chủ";

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:9999/product");
        setProducts(response.data); // Lưu sản phẩm vào state
        setLoading(false);
      } catch (err) {
        setError("Không thể tải sản phẩm");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = async (productId) => {
    if (!accountId) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9999/cart/add", {
        accountId,
        productId,
        quantity: 1, // Mặc định thêm 1 sản phẩm
      });
      setSuccessMessage("Sản phẩm đã được thêm vào giỏ hàng!");
      setTimeout(() => setSuccessMessage(""), 3000); // Ẩn thông báo sau 3 giây
    } catch (err) {
      alert("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  if (loading) {
    return <div>Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Danh Sách Sản Phẩm</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Row>
        {products.map((product) => (
          <Col md={3} sm={6} key={product._id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>{product.price.toLocaleString("vi-VN")} VNĐ</strong>
                </Card.Text>
                <Link to={`/product/${product._id}`}>
                  <Button variant="primary" className="me-2">
                    Xem Chi Tiết
                  </Button>
                </Link>
                <Button
                  variant="success"
                  onClick={() => addToCart(product._id)}
                >
                  Thêm vào Giỏ Hàng
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;