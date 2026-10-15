import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Zap,
} from "lucide-react";

const STORE_EMAIL = "Udhaya@elitesneakers.example";

// Replace these example values before publishing.
const STORE_PHONE = "+919342568375";
const STORE_WHATSAPP = "919342568375";

const quickLinks = [
  { label: "HOME", path: "/" },
  { label: "SHOP ALL", path: "/shop" },
  { label: "OUR STORY", path: "/about" },
  { label: "SPECIAL OFFERS", path: "/offers" },
  { label: "CONTACT", path: "/contact" },
];

const customerLinks = [
  { label: "MY ACCOUNT", path: "/login" },
  { label: "CREATE ACCOUNT", path: "/signup" },
  { label: "SHOPPING BAG", path: "/cart" },
  { label: "CONTACT SUPPORT", path: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleNewsletter = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    // Validate email address.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailError("Please enter a valid email address.");
      setMessage("");
      return;
    }

    setEmailError("");

    const subject = encodeURIComponent(
      "Élite Sneakers Newsletter Enquiry"
    );

    const body = encodeURIComponent(
      `Please add this email to the newsletter enquiry list: ${normalizedEmail}`
    );

    setMessage(
      "Your email application will open to prepare the newsletter enquiry."
    );

    // Opens the user's email application; does not save subscriptions.
    window.location.href =
      `mailto:${STORE_EMAIL}?subject=${subject}&body=${body}`;

    setEmail("");
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello Élite Sneakers! I would like to enquire about your collection."
    );

    const whatsappUrl =
      `https://wa.me/${STORE_WHATSAPP}?text=${text}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="elite-footer">
      {/* FOOTER NEWSLETTER BAND */}

      <div className="elite-footer-newsletter">
        <div className="container">
          <div className="elite-newsletter-inner">
            <div className="elite-newsletter-copy">
              <span className="section-kicker">
                <Zap size={14} fill="currentColor" />
                STAY IN THE LOOP
              </span>

              <h2>
                GOOD STYLE.
                <br />
                <span>GOOD UPDATES.</span>
              </h2>

              <p>
                Discover collection updates, new styles, and
                promotional announcements.
              </p>
            </div>

            <form
              className="elite-newsletter-form"
              onSubmit={handleNewsletter}
              noValidate
            >
              <label htmlFor="footerNewsletterEmail">
                YOUR EMAIL ADDRESS
              </label>

              <div className="elite-newsletter-input">
                <Mail size={19} />

                <input
                  id="footerNewsletterEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError("");
                    setMessage("");
                  }}
                  autoComplete="email"
                  required
                />

                <button
                  type="submit"
                  aria-label="Prepare newsletter enquiry"
                >
                  <Send size={19} />
                </button>
              </div>

              {emailError && (
                <small className="footer-form-error">
                  {emailError}
                </small>
              )}

              {message && (
                <p className="footer-form-message">
                  <CheckCircle2 size={15} />
                  {message}
                </p>
              )}

              <p className="elite-newsletter-disclaimer">
                This demo prepares an email enquiry; it does not
                automatically subscribe you to a mailing list.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}

      <div className="elite-footer-main">
        <div className="container">
          <div className="row g-5">
            {/* BRAND COLUMN */}

            <div className="col-lg-4 col-md-6">
              <Link
                to="/"
                className="elite-footer-brand"
                aria-label="Élite Sneakers home"
              >
                <span className="elite-footer-logo">É</span>

                <span>
                  <strong>ÉLITE</strong>
                  <small>SNEAKERS / CULTURE</small>
                </span>
              </Link>

              <p className="elite-footer-about">
                A contemporary sneaker shopping concept built
                around expressive style, curated collections,
                and a modern digital experience. Find your
                direction. Make your move.
              </p>

              <div className="elite-footer-socials">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="footer-instagram-link"
                >
                  <span className="footer-social-letter">IG</span>
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <span className="footer-social-letter">f</span>
                </a>

                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <span className="footer-social-letter">▶</span>
                </a>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  aria-label="Contact on WhatsApp"
                >
                  <MessageCircle size={19} />
                </button>
              </div>
            </div>

            {/* QUICK LINKS */}

            <div className="col-lg-2 col-md-6 col-6">
              <div className="elite-footer-column">
                <h3>EXPLORE</h3>

                <span className="elite-footer-heading-line" />

                <ul>
                  {quickLinks.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path}>
                        <ArrowUpRight size={14} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CUSTOMER CARE */}

            <div className="col-lg-3 col-md-6 col-6">
              <div className="elite-footer-column">
                <h3>CUSTOMER CARE</h3>

                <span className="elite-footer-heading-line" />

                <ul>
                  {customerLinks.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path}>
                        <ArrowUpRight size={14} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CONTACT */}

            <div className="col-lg-3 col-md-6">
              <div className="elite-footer-column elite-footer-contact-column">
                <h3>GET IN TOUCH</h3>

                <span className="elite-footer-heading-line" />

                <a href={`mailto:${STORE_EMAIL}`}>
                  <Mail size={17} />
                  <span>{STORE_EMAIL}</span>
                </a>

                <a href={`tel:${STORE_PHONE}`}>
                  <Phone size={17} />
                  <span>{STORE_PHONE}</span>
                </a>

                <a
                  href="https://www.google.com/maps/search/sneaker+stores+Krishnagiri"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={17} />
                  <span>Explore locations in Krishnagiri</span>
                </a>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="elite-footer-whatsapp"
                >
                  <MessageCircle size={17} />
                  CHAT ON WHATSAPP
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM STRIP */}

      <div className="elite-footer-bottom">
        <div className="container">
          <div className="elite-footer-bottom-inner">
            <p>
              © {new Date().getFullYear()} ÉLITE SNEAKERS.
              ALL RIGHTS RESERVED.
            </p>

            <div className="elite-footer-bottom-center">
              <span>
                <ShieldCheck size={14} />
                MODERN SHOPPING EXPERIENCE
              </span>
            </div>

            <Link to="/shop">
              KEEP EXPLORING
              <ShoppingBag size={15} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}