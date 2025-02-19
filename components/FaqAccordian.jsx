import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FaqAccordion = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-section">
            <h3 className="section-title-faq">Frequently Asked Questions</h3>
            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div key={faq._id} className="faq-item">
                        <button
                            className="faq-question"
                            onClick={() => toggleFaq(index)}
                        >
                            {faq.question}
                            <FaChevronDown
                                className={`faq-arrow ${openIndex === index ? "open" : ""}`}
                            />
                        </button>
                        <div className={`faq-answer ${openIndex === index ? "visible" : ""}`}>
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqAccordion;
