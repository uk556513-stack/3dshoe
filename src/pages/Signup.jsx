import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

    setSuccess(false);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = "Name must contain at least 2 characters.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (formData.phone.trim()) {
      const cleanedPhone = formData.phone.replace(/[\s()-]/g, "");

      if (!/^\+?\d{10,15}$/.test(cleanedPhone)) {
        nextErrors.phone =
          "Enter a valid phone number, including country code if needed.";
      }
    }

    if (!formData.password) {
      nextErrors.password = "Please create a password.";
    } else if (formData.password.length < 8) {
      nextErrors.password =
        "Password must contain at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      nextErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (!acceptedTerms) {
      nextErrors.terms =
        "Please accept the terms to continue.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Frontend-only demo.
    // No user account is created or stored here.
    setSuccess(true);
  };

  return (
    <main className="auth-page signup-page">
      <div className="auth-background-grid" />
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <div className="container">
        <div className="auth-back-link">
          <Link to="/">
            <ArrowLeft size={17} />
            BACK TO HOME
          </Link>
        </div>

        <div className="row align-items-center justify-content-center g-5 auth-main-row">
          {/* SIGNUP BRAND PANEL */}

          <motion.div
            className="col-lg-5 auth-brand-column"
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="auth-brand-content">
              <span className="section-kicker">
                <Sparkles size={15} />
                JOIN THE MOVEMENT
              </span>

              <h1>
                STEP INTO
                <br />
                <span>THE ELITE.</span>
              </h1>

              <p>
                Create your account interface and explore
                contemporary sneaker styles with a fresh
                perspective.
              </p>

              <div className="signup-benefit-card">
                <div className="signup-benefit-icon">
                  <CheckCircle2 size={24} />
                </div>

                <div>
                  <strong>YOUR STYLE JOURNEY</strong>

                  <p>
                    Discover new styles, explore products,
                    and build your next sneaker collection.
                  </p>
                </div>
              </div>

              <div className="signup-brand-watermark">
                É
              </div>
            </div>
          </motion.div>

          {/* SIGNUP FORM */}

          <motion.div
            className="col-lg-6 col-xl-5"
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="auth-form-card signup-form-card">
              <div className="auth-form-header">
                <div className="auth-logo-mark">
                  É
                </div>

                <span>ÉLITE SNEAKERS</span>

                <h2>CREATE ACCOUNT.</h2>

                <p>
                  Complete your details to continue.
                </p>
              </div>

              <form
                className="auth-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="auth-field">
                  <label htmlFor="signupName">
                    FULL NAME *
                  </label>

                  <div className="auth-input-wrapper">
                    <UserRound size={18} />

                    <input
                      id="signupName"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                  </div>

                  {errors.name && (
                    <small className="form-error">
                      {errors.name}
                    </small>
                  )}
                </div>

                <div className="auth-field">
                  <label htmlFor="signupEmail">
                    EMAIL ADDRESS *
                  </label>

                  <div className="auth-input-wrapper">
                    <Mail size={18} />

                    <input
                      id="signupEmail"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>

                  {errors.email && (
                    <small className="form-error">
                      {errors.email}
                    </small>
                  )}
                </div>

                <div className="auth-field">
                  <label htmlFor="signupPhone">
                    PHONE NUMBER
                  </label>

                  <div className="auth-input-wrapper">
                    <Phone size={18} />

                    <input
                      id="signupPhone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                    />
                  </div>

                  {errors.phone && (
                    <small className="form-error">
                      {errors.phone}
                    </small>
                  )}
                </div>

                <div className="auth-field">
                  <label htmlFor="signupPassword">
                    PASSWORD *
                  </label>

                  <div className="auth-input-wrapper">
                    <LockKeyhole size={18} />

                    <input
                      id="signupPassword"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <small className="form-error">
                      {errors.password}
                    </small>
                  )}
                </div>

                <div className="auth-field">
                  <label htmlFor="signupConfirmPassword">
                    CONFIRM PASSWORD *
                  </label>

                  <div className="auth-input-wrapper">
                    <LockKeyhole size={18} />

                    <input
                      id="signupConfirmPassword"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Enter password again"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <small className="form-error">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>

                <div className="auth-terms-wrapper">
                  <label className="auth-remember-label">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(event) => {
                        setAcceptedTerms(event.target.checked);

                        setErrors((previous) => ({
                          ...previous,
                          terms: "",
                        }));
                      }}
                    />

                    <span>
                      I agree to the store terms and privacy policy.
                    </span>
                  </label>

                  {errors.terms && (
                    <small className="form-error">
                      {errors.terms}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-elite-primary auth-submit-button"
                >
                  CREATE ACCOUNT
                  <ArrowRight size={18} />
                </button>

                {success && (
                  <div
                    className="auth-notice auth-notice-success"
                    role="status"
                  >
                    <CheckCircle2 size={18} />

                    <span>
                      Form validated successfully. Connect a
                      backend to create and store an account.
                    </span>
                  </div>
                )}

                <div className="auth-divider">
                  <span />
                  <p>ALREADY A MEMBER?</p>
                  <span />
                </div>

                <Link
                  to="/login"
                  className="auth-create-account"
                >
                  SIGN IN INSTEAD
                  <ArrowRight size={17} />
                </Link>
              </form>

              <div className="auth-card-footer">
                <ShieldCheck size={15} />

                <span>
                  Never store plain-text passwords in the browser.
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="auth-bottom-bar">
          <Link to="/shop">EXPLORE THE COLLECTION</Link>
          <span>ÉLITE SNEAKERS © 2026</span>
        </div>
      </div>
    </main>
  );
}