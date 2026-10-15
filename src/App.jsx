
import React, { useEffect, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

import { CartProvider } from "./context/CartContext";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container">
        <span className="section-kicker">ERROR / 404</span>

        <h1>
          PAGE NOT
          <br />
          <span>FOUND.</span>
        </h1>

        <p>
          The page you are looking for does not exist
          or may have been moved.
        </p>

        <a href="#/" className="btn-elite-primary">
          RETURN HOME
        </a>
      </div>
    </main>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
      disable: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    AOS.refreshHard();
  }, [location.pathname, location.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="elite-app">
      <div
        className="elite-ambient-background"
        aria-hidden="true"
      >
        <span className="ambient-orb orb-one" />
        <span className="ambient-orb orb-two" />
        <span className="ambient-orb orb-three" />
      </div>

      <Navbar />

      <main className="elite-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </HashRouter>
  );
}
