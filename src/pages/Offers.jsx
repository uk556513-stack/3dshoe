import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Gift,
  Percent,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";

const offers = [
  {
    id: 1,
    code: "ELITE10",
    discount: "10%",
    title: "WELCOME TO ELITE",
    description:
      "Use this demonstration promo code to apply a 10% discount in the shopping cart.",
    label: "WELCOME OFFER",
    icon: Gift,
  },
  {
    id: 2,
    code: "FREESHIP",
    discount: "FREE",
    title: "DELIVERY BENEFIT",
    description:
      "This promotional card is for display. Configure your real shipping rules before publishing.",
    label: "SHIPPING OFFER",
    icon: Tag,
  },
  {
    id: 3,
    code: "STYLE20",
    discount: "20%",
    title: "STYLE EVENT",
    description:
      "An example campaign code for a future promotion. It is not active in the demo checkout.",
    label: "SPECIAL EVENT",
    icon: Sparkles,
  },
];

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      window.setTimeout(() => {
        setCopiedCode("");
      }, 1800);
    } catch {
      setCopiedCode("");
    }
  };

  return (
    <main className="offers-page">
      {/* OFFERS HERO */}

      <section className="offers-hero">
        <div className="offers-hero-glow" />

        <div className="container">
          <div className="breadcrumb-elite">
            <Link to="/">HOME</Link>
            <span>/</span>
            <span>OFFERS</span>
          </div>

          <div className="row align-items-center g-5">
            <motion.div
              className="col-lg-7"
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-kicker">
                <Zap size={15} />
                THE ELITE EVENT
              </span>

              <h1>
                GREAT STYLE.
                <br />
                <span>BETTER MOVES.</span>
              </h1>

              <p>
                Discover promotional campaigns, explore new
                collections, and find a pair that fits your
                style and budget.
              </p>

              <Link to="/shop" className="btn-elite-primary">
                EXPLORE SNEAKERS
                <ArrowRight size={18} />
              </Link>

              <div className="offers-hero-note">
                <Check size={16} />
                DEMONSTRATION PROMOTIONS
              </div>
            </motion.div>

            <motion.div
              className="col-lg-5"
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div className="offers-hero-card">
                <div className="offers-hero-card-top">
                  <span>ÉLITE / SPECIAL EDITION</span>
                  <Percent size={22} />
                </div>

                <div className="offers-hero-discount">
                  10<span>%</span>
                </div>

                <h2>YOUR NEXT PAIR.</h2>

                <p>
                  Enter ELITE10 in your cart to try the demo
                  discount calculation.
                </p>

                <button
                  type="button"
                  className="offers-code-button"
                  onClick={() => copyCode("ELITE10")}
                >
                  <span>ELITE10</span>

                  {copiedCode === "ELITE10" ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>

                <span className="offers-hero-card-footer">
                  A NEW WAY TO SHOP
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OFFER CARDS */}

      <section className="offers-list-section section-padding">
        <div className="container">
          <div className="section-heading-centered">
            <span className="section-kicker">
              PROMOTIONS & PERKS
            </span>

            <h2 className="section-title">
              THE <span>OFFER</span> EDIT.
            </h2>

            <p className="section-description">
              Explore the promotional concepts prepared for
              the Élite Sneakers shopping experience.
            </p>
          </div>

          <div className="row g-4">
            {offers.map((offer, index) => {
              const Icon = offer.icon;

              return (
                <motion.div
                  className="col-md-6 col-lg-4"
                  key={offer.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                  }}
                >
                  <article className="offer-card">
                    <div className="offer-card-top">
                      <span>{offer.label}</span>

                      <div className="offer-card-icon">
                        <Icon size={22} />
                      </div>
                    </div>

                    <div className="offer-card-discount">
                      {offer.discount}
                    </div>

                    <h3>{offer.title}</h3>

                    <p>{offer.description}</p>

                    <div className="offer-card-code">
                      <div>
                        <span>PROMO CODE</span>
                        <strong>{offer.code}</strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => copyCode(offer.code)}
                        aria-label={`Copy ${offer.code}`}
                      >
                        {copiedCode === offer.code ? (
                          <Check size={17} />
                        ) : (
                          <Copy size={17} />
                        )}
                      </button>
                    </div>

                    {copiedCode === offer.code && (
                      <p className="offer-copy-feedback">
                        Code copied.
                      </p>
                    )}

                    <Link to="/shop" className="offer-card-link">
                      EXPLORE COLLECTION
                      <ArrowUpRight size={18} />
                    </Link>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED OFFER BANNER */}

      <section className="offers-feature-section">
        <div className="container">
          <div className="offers-feature-banner">
            <div className="offers-feature-content">
              <span className="section-kicker">
                YOUR STYLE STARTS HERE
              </span>

              <h2>
                DON'T JUST
                <br />
                FOLLOW <span>THE TREND.</span>
              </h2>

              <p>
                Build your own look with sneakers that suit
                your personality and everyday lifestyle.
              </p>

              <Link to="/shop" className="btn-elite-dark">
                SHOP THE COLLECTION
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="offers-feature-symbol">
              <Sparkles size={105} strokeWidth={0.8} />
            </div>
          </div>
        </div>
      </section>

      {/* OFFER INFORMATION */}

      <section className="offers-terms-section section-padding">
        <div className="container">
          <div className="offers-terms-panel">
            <div className="offers-terms-icon">
              <Tag size={24} />
            </div>

            <div>
              <h3>OFFER INFORMATION</h3>

              <p>
                ELITE10 is the only offer implemented in the
                current demonstration cart. FREESHIP and STYLE20
                are display examples and are not active discount
                rules. Configure eligibility, expiry dates,
                shipping conditions, and server-side validation
                before accepting real orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="offers-final-cta">
        <div className="container">
          <div className="offers-final-content">
            <span>THE NEXT PAIR IS CALLING.</span>

            <h2>
              FIND YOUR
              <br />
              <span>NEW FAVOURITE.</span>
            </h2>

            <Link to="/shop" className="btn-elite-primary">
              START EXPLORING
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}