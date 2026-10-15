import React, { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  X,
  RotateCcw,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const categories = [
  "All",
  "Men",
  "Women",
  "Sport",
  "Casual",
  "Running",
  "Lifestyle",
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const searchText = search.trim().toLowerCase();

    if (searchText) {
      result = result.filter((product) => {
        const searchableText = [
          product.name,
          product.category,
          product.description,
          product.badge,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchText);
      });
    }

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    result = result.filter(
      (product) => Number(product.price) <= maxPrice
    );

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      );
    }

    return result;
  }, [search, category, sortBy, maxPrice]);

  const handleSearchChange = (value) => {
    setSearch(value);

    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("search", value);
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("featured");
    setMaxPrice(15000);
    setSearchParams({}, { replace: true });
  };

  return (
    <main className="shop-page">
      {/* SHOP HERO */}

      <section className="shop-hero">
        <div className="shop-hero-grid" />

        <div className="container">
          <motion.div
            className="shop-hero-content"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="breadcrumb-elite">
              <Link to="/">HOME</Link>
              <span>/</span>
              <span>SHOP</span>
            </div>

            <span className="section-kicker">
              THE COMPLETE COLLECTION
            </span>

            <h1>
              FIND YOUR
              <br />
              <span>ICONIC PAIR.</span>
            </h1>

            <p>
              Explore sneaker styles for everyday movement,
              sporty energy, and statement-making streetwear.
            </p>

            <div className="shop-hero-stats">
              <span>
                <strong>{products.length}+</strong> Styles
              </span>

              <span className="shop-stat-divider" />

              <span>
                <strong>01</strong> Destination
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SHOP CONTENT */}

      <section className="shop-content-section section-padding">
        <div className="container">
          <div className="shop-toolbar">
            <div className="shop-search">
              <Search size={19} />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  handleSearchChange(event.target.value)
                }
                placeholder="Search sneakers, styles..."
                aria-label="Search sneakers"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="shop-toolbar-actions">
              <button
                type="button"
                className="shop-filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={17} />
                FILTERS
              </button>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort products"
                className="shop-sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="shop-main-layout">
            {/* FILTER SIDEBAR */}

            <aside
              className={`shop-filter-sidebar ${
                showFilters ? "shop-filters-open" : ""
              }`}
            >
              <div className="shop-filter-heading">
                <h3>FILTERS</h3>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="shop-reset-button"
                >
                  <RotateCcw size={14} />
                  RESET
                </button>
              </div>

              <div className="shop-filter-group">
                <h4>Categories</h4>

                <div className="shop-category-options">
                  {categories.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        category === item
                          ? "shop-category-active"
                          : ""
                      }
                      onClick={() => {
                        setCategory(item);

                        const nextParams = new URLSearchParams(
                          searchParams
                        );

                        if (item === "All") {
                          nextParams.delete("category");
                        } else {
                          nextParams.set("category", item);
                        }

                        setSearchParams(nextParams, {
                          replace: true,
                        });
                      }}
                    >
                      <span>{item}</span>

                      {category === item && (
                        <ArrowUpRight size={15} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="shop-filter-group">
                <div className="shop-price-heading">
                  <h4>Maximum Price</h4>

                  <strong>
                    ₹{maxPrice.toLocaleString("en-IN")}
                  </strong>
                </div>

                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(Number(event.target.value))
                  }
                  className="shop-price-range"
                  aria-label="Maximum price"
                />

                <div className="shop-price-labels">
                  <span>₹1,000</span>
                  <span>₹15,000</span>
                </div>
              </div>

              <div className="shop-sidebar-note">
                <span className="shop-sidebar-note-dot" />

                <p>
                  Explore the collection and choose a pair
                  that matches your everyday style.
                </p>
              </div>
            </aside>

            {/* PRODUCT GRID */}

            <div className="shop-products-area">
              <div className="shop-results-header">
                <div>
                  <span className="shop-results-kicker">
                    OUR COLLECTION
                  </span>

                  <h2>
                    {category === "All"
                      ? "ALL SNEAKERS"
                      : `${category.toUpperCase()} SNEAKERS`}
                  </h2>
                </div>

                <span className="shop-results-count">
                  {filteredProducts.length} PRODUCTS
                </span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="row g-4">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      className="col-6 col-lg-4"
                      key={product.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(index * 0.035, 0.3),
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="shop-empty-state">
                  <div className="shop-empty-icon">
                    <Search size={35} />
                  </div>

                  <h3>NO SNEAKERS FOUND</h3>

                  <p>
                    Try another search term or adjust your
                    category and price filters.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="btn-elite-primary"
                  >
                    CLEAR ALL FILTERS
                    <RotateCcw size={17} />
                  </button>
                </div>
              )}

              {filteredProducts.length > 0 && (
                <div className="shop-bottom-note">
                  <span className="shop-bottom-line" />

                  <p>
                    YOU'RE VIEWING {filteredProducts.length} OF{" "}
                    {products.length} PRODUCTS
                  </p>

                  <span className="shop-bottom-line" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}