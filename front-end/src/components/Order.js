import React, { useState, useEffect } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const accountId = localStorage.getItem("userId"); // Lấy ID người dùng

  // Lấy giỏ hàng và thông tin người dùng từ server
  useEffect(() => {
    const fetchCartAndUser = async () => {
      try {
        const [cartResponse, userResponse] = await Promise.all([
          axios.get(`http://localhost:9999/cart/${accountId}`),
          axios.get(`http://localhost:9999/auth/${accountId}`),
        ]);

        setCart(cartResponse.data);
        setUser(userResponse.data);
        setAddress(userResponse.data.address || ""); // Gán địa chỉ mặc định nếu có
        setPhone(userResponse.data.phone || ""); // Gán số điện thoại mặc định nếu có
      } catch (err) {
        setError("Không thể tải dữ liệu");
      }
    };

    if (accountId) {
      fetchCartAndUser();
    } else {
      setError("Vui lòng đăng nhập để tiếp tục");
    }
  }, [accountId]);

  const calculateTotal = () => {
    return cart?.product.reduce(
      (total, item) => total + item.pid.price * item.quantity,
      0
    );
  };

  const handlePurchase = async () => {
    if (!address || !phone) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ và số điện thoại");
      return;
    }

    try {
      const total = calculateTotal();

      await axios.post("http://localhost:9999/order/create", {
        customerId: accountId,
        address,
        phone,
        product: cart.product.map((item) => ({
          pid: item.pid._id,
          quantity: item.quantity,
        })),
        total,
      });

      alert("Đơn hàng đã được tạo thành công!");
      navigate("/"); // Chuyển đến trang xác nhận thành công
    } catch (err) {
      alert("Tạo đơn hàng thất bại");
    }
  };

  if (!cart || !user) return <div>{error || "Đang tải dữ liệu..."}</div>;

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Xác Minh Đơn Hàng</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Đơn Giá</th>
            <th>Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          {cart.product.map((item) => (
            <tr key={item.pid._id}>
              <td>{item.pid.name}</td>
              <td>{item.quantity}</td>
              <td>{item.pid.price.toLocaleString("vi-VN")} VNĐ</td>
              <td>{(item.pid.price * item.quantity).toLocaleString("vi-VN")} VNĐ</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="text-end">
              <strong>Tổng Cộng:</strong>
            </td>
            <td>
              <strong>{calculateTotal().toLocaleString("vi-VN")} VNĐ</strong>
            </td>
          </tr>
        </tbody>
      </Table>

      <Form className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Địa Chỉ Giao Hàng</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Số Điện Thoại</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" onClick={handlePurchase}>
          Purchase
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;