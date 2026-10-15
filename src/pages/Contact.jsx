import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import Accordion from "../components/Accordion";

const STORE_EMAIL = "udhaya@elitesneakers.example";

const STORE_PHONE = "+919342568375";
const STORE_WHATSAPP = "919342568375";

const contactCards = [
  {
    icon: Mail,
    title: "EMAIL US",
    value: STORE_EMAIL,
    description: "For general questions and enquiries",
    href: `mailto:${STORE_EMAIL}`,
  },
  {
    icon: Phone,
    title: "CALL US",
    value: STORE_PHONE,
    description: "For assistance with your enquiry",
    href: `tel:${STORE_PHONE}`,
  },
  {
    icon: MapPin,
    title: "OUR LOCATION",
    value: "Tamilnadu",
    description: "Find a location using Google Maps",
    href: "https://www.google.com/maps/search/sneaker+stores+Krishnagiri",
  },
];

export default function Contact() {
  const location = useLocation();

  const checkoutDetails = location.state?.checkout
    ? location.state
    : null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: checkoutDetails ? "Order Enquiry" : "",
    message: checkoutDetails
      ? `I would like to enquire about my shopping cart. Estimated cart total: ₹${Number(
          checkoutDetails.total || 0
        ).toLocaleString("en-IN")}.`
      : "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message =
        "Your message must contain at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const subject = encodeURIComponent(
      `Élite Sneakers: ${formData.subject}`
    );

    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
    );

    setSubmitted(true);

    // Opens the user's configured email application.
    // It does not send or store a message on a server.
    window.location.href =
      `mailto:${STORE_EMAIL}?subject=${subject}&body=${body}`;
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Élite Sneakers! I would like to know more about your sneaker collection."
    );

    window.open(
      `https://wa.me/${STORE_WHATSAPP}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="contact-page">
      {/* CONTACT HERO */}

      <section className="contact-hero">
        <div className="contact-hero-grid" />
        <div className="contact-hero-glow" />

        <div className="container">
          <div className="breadcrumb-elite">
            <Link to="/">HOME</Link>
            <span>/</span>
            <span>CONTACT</span>
          </div>

          <div className="row align-items-center g-5">
            <motion.div
              className="col-lg-8"
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-kicker">
                <Sparkles size={15} />
                WE ARE HERE TO HELP
              </span>

              <h1>
                LET'S START
                <br />
                <span>A CONVERSATION.</span>
              </h1>

              <p>
                Have a question about a sneaker, sizing, or
                your shopping experience? Send us a message
                and tell us how we can help.
              </p>

              <div className="contact-hero-buttons">
                <a
                  href="#contact-form"
                  className="btn-elite-primary"
                >
                  SEND AN ENQUIRY
                  <ArrowRight size={18} />
                </a>

                <button
                  type="button"
                  className="btn-elite-secondary"
                  onClick={openWhatsApp}
                >
                  <MessageCircle size={18} />
                  WHATSAPP
                </button>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div className="contact-hero-card">
                <div className="contact-hero-card-icon">
                  <MessageCircle size={31} />
                </div>

                <span>LET'S CONNECT</span>

                <h2>
                  YOUR QUESTION.
                  <br />
                  OUR NEXT STEP.
                </h2>

                <p>
                  Choose the contact method that works best
                  for you.
                </p>

                <div className="contact-hero-card-footer">
                  <span className="contact-status-dot" />
                  CONTACT OPTIONS AVAILABLE
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}

      <section className="contact-info-section section-padding">
        <div className="container">
          <div className="section-heading-centered">
            <span className="section-kicker">
              GET IN TOUCH
            </span>

            <h2 className="section-title">
              WE'RE JUST A <span>MESSAGE AWAY.</span>
            </h2>

            <p className="section-description">
              Choose your preferred way to connect with
              the Élite Sneakers team.
            </p>
          </div>

          <div className="row g-4">
            {contactCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  className="col-md-6 col-lg-4"
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                  }}
                >
                  <a
                    href={card.href}
                    target={
                      card.title === "OUR LOCATION"
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      card.title === "OUR LOCATION"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="contact-info-card"
                  >
                    <div className="contact-info-icon">
                      <Icon size={25} />
                    </div>

                    <span>{card.title}</span>

                    <h3>{card.value}</h3>

                    <p>{card.description}</p>

                    <div className="contact-info-arrow">
                      <ArrowRight size={18} />
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}

      <section
        className="contact-form-section section-padding"
        id="contact-form"
      >
        <div className="container">
          <div className="row g-5">
            <motion.div
              className="col-lg-5"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-kicker">
                <Send size={15} />
                SEND YOUR MESSAGE
              </span>

              <h2 className="section-title">
                HOW CAN
                <br />
                WE <span>HELP?</span>
              </h2>

              <p className="section-description">
                Complete the form with your details and
                enquiry. Your email application will open
                with the message prepared for sending.
              </p>

              <div className="contact-assurance-list">
                <div>
                  <ShieldCheck size={20} />

                  <div>
                    <strong>YOUR ENQUIRY</strong>
                    <span>
                      Clear information helps us understand
                      your question.
                    </span>
                  </div>
                </div>

                <div>
                  <Clock size={20} />

                  <div>
                    <strong>SUPPORT INFORMATION</strong>
                    <span>
                      Add your real business support hours
                      before publishing the site.
                    </span>
                  </div>
                </div>

                <div>
                  <ShoppingBag size={20} />

                  <div>
                    <strong>PRODUCT QUESTIONS</strong>
                    <span>
                      Include a product name or ID when
                      asking about a specific sneaker.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-7"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form
                className="contact-form-card"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="contact-form-heading">
                  <span>CONTACT FORM / 01</span>

                  <h3>
                    TELL US WHAT'S ON YOUR MIND.
                  </h3>
                </div>

                <div className="row g-4">
                  <div className="col-md-6">
                    <label htmlFor="contactName">
                      YOUR NAME *
                    </label>

                    <input
                      id="contactName"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      autoComplete="name"
                    />

                    {errors.name && (
                      <small className="form-error">
                        {errors.name}
                      </small>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contactEmail">
                      EMAIL ADDRESS *
                    </label>

                    <input
                      id="contactEmail"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />

                    {errors.email && (
                      <small className="form-error">
                        {errors.email}
                      </small>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="contactSubject">
                      SUBJECT *
                    </label>

                    <input
                      id="contactSubject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What would you like to discuss?"
                    />

                    {errors.subject && (
                      <small className="form-error">
                        {errors.subject}
                      </small>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="contactMessage">
                      YOUR MESSAGE *
                    </label>

                    <textarea
                      id="contactMessage"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                    />

                    {errors.message && (
                      <small className="form-error">
                        {errors.message}
                      </small>
                    )}
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn-elite-primary contact-submit-button"
                    >
                      PREPARE EMAIL
                      <Send size={18} />
                    </button>

                    {submitted && (
                      <p className="contact-success-message">
                        <CheckCircle2 size={17} />

                        Your email application should open.
                        Review the message and send it there.
                      </p>
                    )}

                    <p className="contact-form-note">
                      This frontend form prepares an email.
                      It does not store enquiries on a server.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}

      <section className="contact-map-section">
        <div className="container">
          <div className="contact-map-panel">
            <div className="contact-map-content">
              <span className="section-kicker">
                FIND YOUR WAY
              </span>

              <h2>
                LET'S MEET
                <br />
                <span>ON THE MAP.</span>
              </h2>

              <p>
                Open Google Maps to search for sneaker stores
                and locations in Krishnagiri , Tamilnadu.
              </p>

              <a
                href="https://www.google.com/maps/search/sneaker+stores+Krishnagiri"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-elite-primary"
              >
                OPEN GOOGLE MAPS
                <MapPin size={18} />
              </a>
            </div>

            <div className="contact-map-visual">
              <div className="contact-map-ring contact-map-ring-one" />
              <div className="contact-map-ring contact-map-ring-two" />

              <div className="contact-map-pin">
                <MapPin size={34} />
              </div>

              <span className="contact-map-label">
                ÉLITE / TAMILNADU
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FAQ */}

      <section className="contact-faq-section section-padding">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <span className="section-kicker">
                QUICK ANSWERS
              </span>

              <h2 className="section-title">
                BEFORE
                <br />
                YOU <span>ASK.</span>
              </h2>

              <p className="section-description">
                Check these common questions for quick
                information about shopping with us.
              </p>
            </div>

            <div className="col-lg-8">
              <Accordion
                items={[
                  {
                    question: "How do I find a product?",
                    answer:
                      "Visit the Shop page and use the search box, category filters, or price sorting options to explore the available products.",
                  },
                  {
                    question: "How do I select my shoe size?",
                    answer:
                      "Open a product details page and select one of the available UK shoe sizes before adding the product to your cart.",
                  },
                  {
                    question: "How can I enquire about an order?",
                    answer:
                      "Use this Contact page and select Order Enquiry as the subject. Include your order reference if you have one. This demo does not yet include a real order-management system.",
                  },
                  {
                    question: "Can I contact you on WhatsApp?",
                    answer:
                      "Yes, the WhatsApp button opens a conversation link. Replace the example phone number in Contact.jsx with your actual business WhatsApp number.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}