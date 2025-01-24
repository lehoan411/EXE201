import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // Lấy thông tin người dùng từ API
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/auth/${userId}`);
                setUser(response.data);
                setUpdatedUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleEditProfile = () => setShowEditModal(true);
    const handleCloseModal = () => setShowEditModal(false);

    const handleSaveProfile = async () => {
        try {
            const response = await axios.put(`http://localhost:9999/auth/${userId}`, updatedUser);
            setUser(response.data);
            setMessage("Cập nhật hồ sơ thành công!");
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating user profile:", error);
            setMessage("Có lỗi xảy ra khi cập nhật hồ sơ.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center" style={{ marginBottom: "50px" }}>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Hồ Sơ Cá Nhân</h2>
                            {message && <Alert variant="success">{message}</Alert>}
                            <div className="text-center mb-4">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                                    alt="User Avatar"
                                    className="img-fluid rounded-circle"
                                    style={{ width: "150px", marginBottom: "20px" }}
                                />
                                <h4>{user.fullname}</h4>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Địa chỉ:</strong> {user.address}</p>
                                <p><strong>Số Điện Thoại:</strong> {user.phone}</p>

                            </div>
                            <div style={{ textAlign: "center" }}>
                                <Button variant="primary" onClick={handleEditProfile}>
                                    Cập Nhật Hồ Sơ
                                </Button>
                                
                            </div>
                            <div style={{ textAlign: "center", margin: "10px" }}>
                            <Button> <Link to={"/order/history"}>Lịch sử mua hàng</Link> </Button>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal để cập nhật hồ sơ */}
            <Modal show={showEditModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập Nhật Hồ Sơ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFullname" className="mb-3">
                            <Form.Label>Tên Người Dùng</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullname"
                                value={updatedUser.fullname || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={updatedUser.address || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={updatedUser.phone || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSaveProfile}>
                        Lưu Thay Đổi
                    </Button>
                </Modal.Footer>
                
            </Modal>
            
        </Container>
    );
};

export default UserProfile;