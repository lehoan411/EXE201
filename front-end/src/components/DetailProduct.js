import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Form, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailProduct = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch chi tiết sản phẩm từ API
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Xử lý thêm sản phẩm vào giỏ hàng (có thể lưu vào localStorage hoặc gửi API)
    alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
  };

  if (!product) {
    return <p className="text-center">Đang tải chi tiết sản phẩm...</p>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image
            src={product.image}
            alt={product.name}
            fluid
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <h3 className="text-danger">
            {product.price.toLocaleString("vi-VN")} VNĐ
          </h3>
          <p className="text-muted">Mã sản phẩm: {product._id}</p>
          <p>{product.description}</p>
          <p>Số lượng: {product.quantity} </p>
          <div>
            {product.status ? (
              <Badge pill bg="success">
                Còn hàng
              </Badge>
            ) : (
              <Badge pill bg="danger">
                Hết hàng
              </Badge>
            )}
          </div>
          <Button
            variant="primary"
            className="mt-3"
            onClick={handleAddToCart}
            disabled={quantity < 1 || quantity > product.quantity}
          >
            Thêm vào giỏ hàng
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailProduct;