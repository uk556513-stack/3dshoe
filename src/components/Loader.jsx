import React, { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 8) + 3;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);
      }

      setProgress(value);
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-screen">
      <div className="loader-background">
        <div className="loader-orb loader-orb-one"></div>
        <div className="loader-orb loader-orb-two"></div>
        <div className="loader-grid"></div>
      </div>

      <div className="loader-brand">
        <span className="brand-symbol">
          <i className="bi bi-lightning-charge-fill"></i>
        </span>

        <span>ÉLITE</span>
        <span className="brand-divider">/</span>
        <span className="brand-subtitle">SNEAKERS</span>
      </div>

      <div className="loader-showcase">
        <div className="loader-ring loader-ring-one"></div>
        <div className="loader-ring loader-ring-two"></div>
        <div className="loader-ring loader-ring-three"></div>

        <div className="loader-particle particle-one"></div>
        <div className="loader-particle particle-two"></div>
        <div className="loader-particle particle-three"></div>
        <div className="loader-particle particle-four"></div>

        <div className="loader-shoe">
          <img
            src="/images/shoe-loading.png"
            alt="Élite sneaker loading animation"
          />

          <div className="shoe-glow"></div>
        </div>

        <div className="loader-shadow"></div>
      </div>

      <div className="loader-content">
        <p className="loader-eyebrow">
          THE FUTURE OF FOOTWEAR
        </p>

        <h1>
          STEP INTO
          <span> GREATNESS.</span>
        </h1>

        <p className="loader-description">
          Crafting your next extraordinary experience.
        </p>

        <div className="loader-progress">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="progress-information">
            <span>INITIALIZING EXPERIENCE</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      <div className="loader-bottom">
        <span>DESIGNED FOR MOVEMENT</span>
        <span>EST. 2026</span>
      </div>
    </div>
  );
};

export default Loader;