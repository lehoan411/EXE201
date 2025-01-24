import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId"); // Lấy ID người dùng từ localStorage

  // Lấy danh sách đơn hàng từ API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/order/${userId}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Không thể tải lịch sử giao dịch");
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    } else {
      setError("Vui lòng đăng nhập để xem lịch sử giao dịch");
    }
  }, [userId]);

  if (loading) {
    return <div>Đang tải lịch sử giao dịch...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Lịch Sử Giao Dịch</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ngày Đặt Hàng</th>
            <th>Sản Phẩm</th>
            <th>Tổng Cộng</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{new Date(order.orderDate).toLocaleString("vi-VN")}</td>
              <td>
                {order.product.map((item) => (
                  <div key={item.pid._id}>
                    {item.pid.name} - {item.quantity} x{" "}
                    {item.pid.price.toLocaleString("vi-VN")} VNĐ
                  </div>
                ))}
              </td>
              <td>{order.total.toLocaleString("vi-VN")} VNĐ</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderHistory;