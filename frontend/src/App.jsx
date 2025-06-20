import "./css/App.css";
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Browse from './components/Browse';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetail from './components/ProductDetail';

function App() {
    return (
        <div className="page-container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products/detail/:productId" element={<ProductDetail />} />
            </Routes>
        </div>
    );
}

export default App;