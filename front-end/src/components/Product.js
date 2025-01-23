import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // Giá trị sắp xếp
  const [filterText, setFilterText] = useState(""); // Từ khóa tìm kiếm

  useEffect(() => {
    // Fetch sản phẩm từ API
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:9999/product");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Hàm sắp xếp sản phẩm
  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sortedProducts = [...filteredProducts];
    if (order === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = [...products]; // Trả về danh sách gốc khi chọn mặc định
    }
    setFilteredProducts(sortedProducts);
  };

  // Hàm lọc sản phẩm
  const handleFilter = (e) => {
    const text = e.target.value.toLowerCase();
    setFilterText(text);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(text)
    );
    setFilteredProducts(filtered);
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Tất Cả Sản Phẩm</h1>

      {/* Bộ lọc và sắp xếp */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={filterText}
            onChange={handleFilter}
          />
        </Col>
        <Col></Col>
        <Col md={2} className="text-end">
        <div>Sắp xếp theo</div>
          <Form.Select value={sortOrder} onChange={handleSort}>
            <option value="">Mặc Định</option>
            <option value="asc">Giá Tăng Dần</option>
            <option value="desc">Giá Giảm Dần</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Danh sách sản phẩm */}
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col md={4} lg={3} className="mb-4" key={product._id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    Giá: {product.price.toLocaleString("vi-VN")} VNĐ
                  </Card.Text>
                  <Card.Text>Số lượng: {product.quantity}</Card.Text>
                  <Card.Text>
                    <small className="text-muted">
                      {product.description.slice(0, 50)}...
                    </small>
                  </Card.Text>
                  <Button variant="primary">
                    <Link style={{textDecoration: "none"}} to={`/product/${product._id}`} className="text-white">
                      Xem Chi Tiết
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">Không tìm thấy sản phẩm nào!</p>
        )}
      </Row>
    </Container>
  );
};

export default Product;