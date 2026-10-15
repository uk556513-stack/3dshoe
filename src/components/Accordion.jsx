import React, { useState } from "react";

import { ChevronDown } from "lucide-react";

const defaultItems = [
  {
    title: "How do I choose the right shoe size?",
    content:
      "Check the available sizes on the product details page. " +
      "Choose your usual UK shoe size and review the fit information " +
      "before adding the product to your cart.",
  },

  {
    title: "How can I track my order?",
    content:
      "Order tracking requires a connected order management system. " +
      "Once a backend is configured, tracking information can be " +
      "displayed using your order number.",
  },

  {
    title: "What is your return policy?",
    content:
      "The return policy should be confirmed before purchasing. " +
      "For this demonstration website, no real return request is submitted.",
  },

  {
    title: "Are the shoes available in different colours?",
    content:
      "Colour availability depends on the product. Additional colour " +
      "variants can be configured in the product data.",
  },
];

const Accordion = ({
  items = defaultItems,
  allowMultiple = false,
}) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems((previous) => {
      if (previous.includes(index)) {
        return previous.filter((item) => item !== index);
      }

      if (allowMultiple) {
        return [...previous, index];
      }

      return [index];
    });
  };

  return (
    <div className="accordion-luxury">
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);

        return (
          <div
            className={`accordion-item ${
              isOpen ? "accordion-item-open" : ""
            }`}
            key={`${item.title}-${index}`}
          >
            <button
              type="button"
              className={`accordion-question ${
                isOpen ? "accordion-question-open" : ""
              }`}
              aria-expanded={isOpen}
              onClick={() => toggleItem(index)}
            >
              <span className="accordion-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="accordion-title">
                {item.title}
              </span>

              <ChevronDown
                size={20}
                className={`accordion-chevron ${
                  isOpen ? "accordion-chevron-open" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="accordion-answer">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;