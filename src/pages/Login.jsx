import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

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

    setNotice("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Please enter your password.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Frontend demonstration only.
    // Never store real passwords in localStorage.
    setNotice(
      "Login UI validated. Connect an authentication backend to sign in."
    );
  };

  return (
    <main className="auth-page login-page">
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
          {/* LOGIN BRAND PANEL */}

          <motion.div
            className="col-lg-6 auth-brand-column"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="auth-brand-content">
              <span className="section-kicker">
                <Sparkles size={15} />
                WELCOME BACK
              </span>

              <h1>
                YOUR STYLE.
                <br />
                <span>YOUR WORLD.</span>
              </h1>

              <p>
                Sign in to continue exploring the Élite
                Sneakers collection and your shopping experience.
              </p>

              <div className="auth-brand-features">
                <div>
                  <ShieldCheck size={19} />
                  <span>Personal shopping experience</span>
                </div>

                <div>
                  <ShoppingBagIcon />
                  <span>Easy access to your collection</span>
                </div>

                <div>
                  <LockKeyhole size={19} />
                  <span>Authentication-ready interface</span>
                </div>
              </div>

              <div className="auth-brand-watermark">
                É
              </div>
            </div>
          </motion.div>

          {/* LOGIN FORM */}

          <motion.div
            className="col-lg-5 col-xl-4"
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="auth-form-card">
              <div className="auth-form-header">
                <div className="auth-logo-mark">
                  É
                </div>

                <span>ÉLITE SNEAKERS</span>

                <h2>WELCOME BACK.</h2>

                <p>
                  Enter your details to continue.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="auth-form"
                noValidate
              >
                <div className="auth-field">
                  <label htmlFor="loginEmail">
                    EMAIL ADDRESS
                  </label>

                  <div className="auth-input-wrapper">
                    <Mail size={18} />

                    <input
                      id="loginEmail"
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
                  <label htmlFor="loginPassword">
                    PASSWORD
                  </label>

                  <div className="auth-input-wrapper">
                    <LockKeyhole size={18} />

                    <input
                      id="loginPassword"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
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

                <div className="auth-options-row">
                  <label className="auth-remember-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                    />

                    <span>Remember me</span>
                  </label>

                  <span className="auth-demo-label">
                    DEMO LOGIN
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-elite-primary auth-submit-button"
                >
                  SIGN IN
                  <ArrowRight size={18} />
                </button>

                {notice && (
                  <div
                    className="auth-notice"
                    role="status"
                  >
                    {notice}
                  </div>
                )}

                <div className="auth-divider">
                  <span />
                  <p>NEW TO ÉLITE?</p>
                  <span />
                </div>

                <Link
                  to="/signup"
                  className="auth-create-account"
                >
                  CREATE YOUR ACCOUNT
                  <ArrowRight size={17} />
                </Link>
              </form>

              <div className="auth-card-footer">
                <ShieldCheck size={15} />

                <span>
                  Connect a secure backend before collecting
                  real user credentials.
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

function ShoppingBagIcon() {
  return <UserRound size={19} />;
}