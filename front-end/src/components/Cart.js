import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Image } from "react-bootstrap";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const accountId = localStorage.getItem("userId"); // Lấy `userId` từ localStorage

  // Lấy giỏ hàng từ server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/cart/${accountId}`);
        setCart(response.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải giỏ hàng");
        setLoading(false);
      }
    };

    if (accountId) {
      fetchCart();
    } else {
      setError("Vui lòng đăng nhập để xem giỏ hàng");
      setLoading(false);
    }
  }, [accountId]);

  // Tăng/giảm số lượng sản phẩm
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng dưới 1

    try {
      await axios.put(`http://localhost:9999/cart/update`, {
        accountId,
        productId,
        quantity: newQuantity,
      });
      setCart((prevCart) => ({
        ...prevCart,
        product: prevCart.product.map((item) =>
          item.pid._id === productId ? { ...item, quantity: newQuantity } : item
        ),
      }));
    } catch (err) {
      alert("Cập nhật số lượng thất bại");
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:9999/cart/remove`, {
        data: { accountId, productId },
      });
      setCart((prevCart) => ({
        ...prevCart,
        product: prevCart.product.filter((item) => item.pid._id !== productId),
      }));
    } catch (err) {
      alert("Xóa sản phẩm thất bại");
    }
  };

  if (loading) return <div>Đang tải giỏ hàng...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Giỏ Hàng</h1>
      {cart.product.length === 0 ? (
        <div className="text-center">Giỏ hàng của bạn đang trống</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Hình Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Thành Tiền</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {cart.product.map((item) => (
              <tr key={item.pid._id}>
                <td>
                  <Image
                    src={item.pid.image}
                    alt={item.pid.name}
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td>{item.pid.name}</td>
                <td>{item.pid.price.toLocaleString("vi-VN")} VNĐ</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.pid._id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.pid._id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </td>
                <td>
                  {(item.pid.price * item.quantity).toLocaleString("vi-VN")} VNĐ
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.pid._id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Cart;