import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Product from './components/Product';
import DetailProduct from './components/DetailProduct';
import Cart from './components/Cart';
const AppLayout = ({ children }) => {
    const location = useLocation();
    const hideHeaderFooter = ["/login", "/register"].includes(location.pathname);

    return (
        <div>
            {!hideHeaderFooter && <Header />}
            <main>{children}</main>
            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/:id" element={<DetailProduct />} />
                    <Route path='/cart' element={<Cart/>}/>
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;