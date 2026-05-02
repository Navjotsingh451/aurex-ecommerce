import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Cart from "./pages/cart";
import ProtectedRoute from "./components/protectedroute";
import AdminRoute from "./components/adminroute";
import Checkout from "./pages/checkout";
import OrderHistory from "./pages/oderhistory";
import AdminDashboard from "./pages/admindashboard";
import ProductDetails from "./pages/productdetails";
import About from "./pages/about";
import Footer from "./footer";
import Category from "./pages/category";
import Shop from "./pages/shop";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 ">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/shop" element={<Shop />} />
            

            {/* Protected Routes (User Only) */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />

            <Route path="/product/:id" element={<ProductDetails />} />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/myorders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />

            {/* Admin Only Route */}
            <Route
              path="/admindashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
