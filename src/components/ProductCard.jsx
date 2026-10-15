import React from "react";

import { Link } from "react-router-dom";

import {
  ShoppingBag,
  ArrowUpRight,
  Star,
} from "lucide-react";

const ProductCard = ({
  product,
  index = 0,
}) => {
  if (!product) {
    return null;
  }

  const {
    id,
    name,
    category,
    image,
    price,
    originalPrice,
    rating = 4.8,
    badge,
  } = product;

  return (
    <article
      className="product-card"
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 80, 400)}
    >
      <Link
        to={`/product/${id}`}
        className="product-image-wrap"
      >
        {badge && (
          <span className="product-badge product-card-badge">
            {badge}
          </span>
        )}

        <img
          src={image}
          alt={name}
          loading="lazy"
        />

        <span className="product-quick-view">
          <ArrowUpRight size={19} />
        </span>
      </Link>

      <div className="product-info">
        <div className="product-category-row">
          <span>{category}</span>

          <span className="product-rating">
            <Star size={13} fill="currentColor" />
            {rating}
          </span>
        </div>

        <Link to={`/product/${id}`}>
          <h3>{name}</h3>
        </Link>

        <div className="product-price-row">
          <div>
            <span className="product-price">
              ₹{Number(price).toLocaleString("en-IN")}
            </span>

            {originalPrice > price && (
              <del className="product-original-price">
                ₹
                {Number(originalPrice).toLocaleString(
                  "en-IN"
                )}
              </del>
            )}
          </div>

          <Link
            to={`/product/${id}`}
            className="product-add-button"
            aria-label={`View ${name}`}
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;