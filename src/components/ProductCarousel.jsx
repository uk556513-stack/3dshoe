import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import ProductCard from "./ProductCard";

const ProductCarousel = ({
  products = [],
  title = "FEATURED SNEAKERS",
  subtitle = "Discover your next favorite pair.",
}) => {
  if (!products.length) {
    return null;
  }

  return (
    <section className="product-carousel-section section-padding">
      <div className="container-fluid px-lg-5">
        <div className="section-heading" data-aos="fade-up">
          <span className="section-kicker">
            THE COLLECTION
          </span>

          <h2>
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span>
              {title.split(" ").slice(-1)}
            </span>
          </h2>

          <p>{subtitle}</p>
        </div>

        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
            EffectCoverflow,
          ]}
          effect="coverflow"
          grabCursor
          centeredSlides={false}
          slidesPerView={1}
          spaceBetween={20}
          loop={products.length >= 5}
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            576: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            768: {
              slidesPerView: 3,
              spaceBetween: 22,
            },

            1200: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="elite-product-swiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                index={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductCarousel;