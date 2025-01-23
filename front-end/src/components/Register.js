import React, { useState, useEffect } from "react";
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Register";
    }, []);

    const register = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9999/auth/register", {
                username: username,
                password: password,
                email: email,
                address: address,
                phone: phone
            });
            setMessage(res.data.message);
            alert("Register successfully");
            navigate("/login");

        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Register</h1>
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" 
                                placeholder="Enter username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" 
                                placeholder="Enter password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" 
                                placeholder="Enter email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" 
                                placeholder="Enter address" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" className="form-control" 
                                placeholder="Enter phone" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <p>{message}</p>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;