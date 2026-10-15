import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
} from "lucide-react";

import ProductCarousel from "../components/ProductCarousel";
import { products, getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = getProductById(id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [message, setMessage] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const sizes = product?.sizes || [
    "UK 6",
    "UK 7",
    "UK 8",
    "UK 9",
    "UK 10",
  ];

  useEffect(() => {
    setSelectedSize("");
    setQuantity(1);
    setAdded(false);
    setMessage("");
    setActiveImage(0);
  }, [id]);

  const currentPrice = useMemo(() => {
    if (!product) return 0;

    if (selectedSize && product.sizePrices?.[selectedSize] != null) {
      return Number(product.sizePrices[selectedSize]);
    }

    return Number(product.price);
  }, [product, selectedSize]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter(
        (item) =>
          String(item.id) !== String(product.id) &&
          item.category === product.category
      )
      .slice(0, 8);
  }, [product]);

  if (!product) {
    return (
      <main className="product-not-found section-padding">
        <div className="container text-center">
          <span className="section-kicker">
            PRODUCT NOT FOUND
          </span>

          <h1 className="section-title">
            THIS PAIR IS <span>OFF THE GRID.</span>
          </h1>

          <p className="section-description">
            The sneaker you are looking for may have been moved
            or may not exist in the current collection.
          </p>

          <Link to="/shop" className="btn-elite-primary">
            <ArrowLeft size={18} />
            BACK TO SHOP
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setMessage("Please select your shoe size first.");
      setAdded(false);
      return;
    }

    const success = addToCart(product, selectedSize, quantity);

    if (!success) {
      setMessage("Unable to add this item. Please try again.");
      setAdded(false);
      return;
    }

    setMessage(`${product.name} added to your cart.`);
    setAdded(true);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setMessage("Please select your shoe size first.");
      setAdded(false);
      return;
    }

    const success = addToCart(product, selectedSize, quantity);

    if (!success) {
      setMessage("Unable to add this item. Please try again.");
      return;
    }

    navigate("/cart");
  };

  const originalPrice = Number(product.originalPrice || 0);

  const discount =
    originalPrice > currentPrice
      ? Math.round(
          ((originalPrice - currentPrice) / originalPrice) * 100
        )
      : 0;

  return (
    <main className="product-details-page">
      {/* BREADCRUMB */}

      <section className="product-breadcrumb-section">
        <div className="container">
          <div className="breadcrumb-elite">
            <Link to="/">HOME</Link>
            <span>/</span>
            <Link to="/shop">SHOP</Link>
            <span>/</span>
            <span>{product.name.toUpperCase()}</span>
          </div>
        </div>
      </section>

      {/* PRODUCT MAIN */}

      <section className="product-main-section">
        <div className="container">
          <div className="row g-5">
            {/* IMAGE SIDE */}

            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="product-gallery">
                <div className="product-main-image">
                  {product.badge && (
                    <span className="product-detail-badge">
                      {product.badge}
                    </span>
                  )}

                  {discount > 0 && (
                    <span className="product-detail-discount">
                      -{discount}%
                    </span>
                  )}

                  <button
                    type="button"
                    className={`product-favorite-button ${
                      isFavorite ? "is-favorite" : ""
                    }`}
                    onClick={() => setIsFavorite(!isFavorite)}
                    aria-label="Toggle favourite"
                  >
                    <Heart
                      size={21}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </button>

                  <motion.img
                    key={`${product.id}-${activeImage}`}
                    src={product.image}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="product-image-index">
                    IMAGE {String(activeImage + 1).padStart(2, "0")}
                    <span>/ 01</span>
                  </div>
                </div>

                <div className="product-thumbnail-row">
                  <button
                    type="button"
                    className="product-thumbnail active"
                    onClick={() => setActiveImage(0)}
                    aria-label="Show product image"
                  >
                    <img src={product.image} alt={product.name} />
                  </button>

                  <div className="product-thumbnail-note">
                    <span>ELITE COLLECTION</span>
                    <strong>DETAILS MATTER.</strong>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PRODUCT INFORMATION */}

            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="product-information">
                <span className="product-category-label">
                  {product.category || "SNEAKER COLLECTION"}
                </span>

                <h1>{product.name}</h1>

                <div className="product-rating-row">
                  <div className="product-rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <strong>{product.rating || "4.8"}</strong>

                  <span>CURATED COLLECTION</span>
                </div>

                <div className="product-price-row">
                  <strong className="product-current-price">
                    ₹{currentPrice.toLocaleString("en-IN")}
                  </strong>

                  {originalPrice > currentPrice && (
                    <>
                      <del>
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </del>

                      <span className="product-savings">
                        SAVE{" "}
                        {discount}%
                      </span>
                    </>
                  )}
                </div>

                <p className="product-detail-description">
                  {product.description ||
                    "Discover a contemporary sneaker design created for versatile everyday styling and confident movement."}
                </p>

                <div className="product-detail-divider" />

                {/* SIZE SELECTION */}

                <div className="product-size-section">
                  <div className="product-size-heading">
                    <h3>SELECT YOUR SIZE</h3>

                    <span>UK SIZES</span>
                  </div>

                  <div className="product-size-grid">
                    {sizes.map((size) => {
                      const sizePrice = Number(
                        product.sizePrices?.[size] ?? product.price
                      );

                      return (
                        <button
                          key={size}
                          type="button"
                          className={`product-size-button ${
                            selectedSize === size ? "selected" : ""
                          }`}
                          onClick={() => {
                            setSelectedSize(size);
                            setMessage("");
                            setAdded(false);
                          }}
                          aria-pressed={selectedSize === size}
                        >
                          <span>{size}</span>

                          <small>
                            ₹{sizePrice.toLocaleString("en-IN")}
                          </small>
                        </button>
                      );
                    })}
                  </div>

                  <p className="product-size-help">
                    <ShieldCheck size={15} />
                    Choose your preferred UK shoe size.
                  </p>
                </div>

                {/* QUANTITY */}

                <div className="product-quantity-section">
                  <span>QUANTITY</span>

                  <div className="product-quantity-control">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) =>
                          Math.max(1, current - 1)
                        )
                      }
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>

                    <strong>{quantity}</strong>

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) =>
                          Math.min(10, current + 1)
                        )
                      }
                      disabled={quantity >= 10}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <span className="product-quantity-limit">
                    MAX 10 ITEMS
                  </span>
                </div>

                {/* CART ACTIONS */}

                <div className="product-purchase-buttons">
                  <button
                    type="button"
                    className="btn-elite-primary product-add-cart"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag size={18} />

                    {added ? "ADDED TO CART" : "ADD TO CART"}

                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    className="btn-elite-secondary product-buy-now"
                    onClick={handleBuyNow}
                  >
                    BUY NOW
                  </button>
                </div>

                {message && (
                  <div
                    className={`product-feedback ${
                      added ? "product-feedback-success" : ""
                    }`}
                    role="status"
                  >
                    {added && <Check size={17} />}
                    <span>{message}</span>
                  </div>
                )}

                {/* DELIVERY INFORMATION */}

                <div className="product-service-list">
                  <div>
                    <Truck size={21} />

                    <div>
                      <strong>DELIVERY INFORMATION</strong>
                      <span>
                        Shipping options can be confirmed at checkout.
                      </span>
                    </div>
                  </div>

                  <div>
                    <RotateCcw size={21} />

                    <div>
                      <strong>RETURNS & EXCHANGES</strong>
                      <span>
                        Review the store return policy before ordering.
                      </span>
                    </div>
                  </div>

                  <div>
                    <ShieldCheck size={21} />

                    <div>
                      <strong>SECURE SHOPPING</strong>
                      <span>
                        A clear and simple product selection experience.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="product-reference">
                  <span>PRODUCT ID</span>
                  <strong>EL-{String(product.id).padStart(4, "0")}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCT STORY */}

      <section className="product-story-section section-padding">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <span className="section-kicker">
                THE DESIGN DETAILS
              </span>

              <h2 className="section-title">
                EVERY DETAIL.
                <br />
                <span>EVERY STEP.</span>
              </h2>
            </div>

            <div className="col-lg-7">
              <p className="product-story-description">
                Great sneakers bring together design, versatility,
                and comfort. This pair is part of the Élite Sneakers
                collection, curated for people who want their
                footwear to complement their own personal style.
              </p>

              <div className="product-story-points">
                <div>
                  <Check size={17} />
                  Contemporary sneaker styling
                </div>

                <div>
                  <Check size={17} />
                  Versatile wardrobe pairing
                </div>

                <div>
                  <Check size={17} />
                  Multiple size selections
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}

      {relatedProducts.length > 0 && (
        <section className="related-products-section section-padding">
          <div className="container">
            <ProductCarousel
              products={relatedProducts}
              title="You May Also Like"
              subtitle="Discover more styles from our collection"
            />
          </div>
        </section>
      )}
    </main>
  );
}