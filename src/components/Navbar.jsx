import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowRight,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
  Zap,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const navigationLinks = [
  { label: "HOME", path: "/" },
  { label: "SHOP", path: "/shop" },
  { label: "OUR STORY", path: "/about" },
  { label: "OFFERS", path: "/offers" },
  { label: "CONTACT", path: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartCount } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchText.trim();

    if (!query) {
      navigate("/shop");
    } else {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }

    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`elite-header ${
        scrolled ? "elite-header-scrolled" : ""
      }`}
    >
      {/* ANNOUNCEMENT BAR */}

      <div className="elite-announcement-bar">
        <div className="container-fluid">
          <div className="elite-announcement-inner">
            <span className="announcement-side-text">
              EST. 2026
            </span>

            <p>
              <Zap size={13} fill="currentColor" />

              <span>
                DISCOVER YOUR NEXT MOVE — ÉLITE SNEAKERS
              </span>

              <Zap size={13} fill="currentColor" />
            </p>

            <Link
              to="/shop"
              className="announcement-shop-link"
            >
              SHOP NOW
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}

      <div className="elite-navbar-main">
        <div className="container-fluid">
          <div className="elite-navbar-inner">
            {/* BRAND */}

            <Link
              to="/"
              className="elite-brand"
              aria-label="Élite Sneakers home"
            >
              <span className="elite-brand-symbol">É</span>

              <span className="elite-brand-text">
                <strong>ÉLITE</strong>
                <small>SNEAKERS / CULTURE</small>
              </span>
            </Link>

            {/* DESKTOP LINKS */}

            <nav
              className="elite-desktop-navigation"
              aria-label="Main navigation"
            >
              {navigationLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `elite-nav-link ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* ACTIONS */}

            <div className="elite-navbar-actions">
              <button
                type="button"
                className={`elite-icon-button ${
                  searchOpen ? "active" : ""
                }`}
                onClick={() => {
                  setSearchOpen((previous) => !previous);
                  setMobileMenuOpen(false);
                }}
                aria-label={
                  searchOpen ? "Close search" : "Open search"
                }
                aria-expanded={searchOpen}
              >
                {searchOpen ? (
                  <X size={20} />
                ) : (
                  <Search size={20} />
                )}
              </button>

              <Link
                to="/login"
                className="elite-account-button"
                aria-label="Login"
              >
                <UserRound size={19} />
                <span>ACCOUNT</span>
              </Link>

              <Link
                to="/cart"
                className="elite-cart-button"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingBag size={20} />

                <span className="elite-cart-label">
                  BAG
                </span>

                <span className="elite-cart-count">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              </Link>

              <button
                type="button"
                className="elite-mobile-menu-button"
                onClick={() => {
                  setMobileMenuOpen((previous) => !previous);
                  setSearchOpen(false);
                }}
                aria-label={
                  mobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X size={23} />
                ) : (
                  <Menu size={23} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH PANEL */}

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="elite-search-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container">
              <form
                className="elite-search-form"
                onSubmit={handleSearch}
              >
                <Search size={23} />

                <input
                  type="search"
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                  placeholder="Search sneakers, styles, collections..."
                  aria-label="Search products"
                  autoFocus
                />

                <button type="submit">
                  SEARCH
                  <ArrowRight size={17} />
                </button>
              </form>

              <div className="elite-search-suggestions">
                <span>POPULAR:</span>

                {["Running", "Lifestyle", "Classic", "Streetwear"].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchText(term);
                        navigate(
                          `/shop?search=${encodeURIComponent(term)}`
                        );
                        setSearchOpen(false);
                      }}
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE NAVIGATION */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              className="elite-mobile-overlay"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            <motion.nav
              className="elite-mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
              }}
            >
              <div className="elite-mobile-nav-heading">
                <div>
                  <span>ÉLITE</span>
                  <small>YOUR NEXT MOVE</small>
                </div>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="elite-mobile-nav-links">
                {navigationLinks.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.06,
                    }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        `elite-mobile-nav-link ${
                          isActive ? "active" : ""
                        }`
                      }
                      onClick={closeMobileMenu}
                    >
                      <span>{item.label}</span>

                      <ArrowRight size={18} />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="elite-mobile-nav-bottom">
                <Link
                  to="/login"
                  className="btn-elite-primary"
                  onClick={closeMobileMenu}
                >
                  <UserRound size={18} />
                  MY ACCOUNT
                </Link>

                <Link
                  to="/cart"
                  className="elite-mobile-cart-link"
                  onClick={closeMobileMenu}
                >
                  <ShoppingBag size={19} />

                  <span>MY BAG</span>

                  <strong>{cartCount}</strong>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}