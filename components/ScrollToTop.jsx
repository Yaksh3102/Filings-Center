import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [position, setPosition] = useState({ top: "10px", right: "20px" });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollTotal) * 100;
      setScrollProgress(scrolled);

      if (window.scrollY > 100) {
        setIsVisible(true);
        setPosition({ top: "auto", right: "20px", bottom: "30px" });
      } else {
        setIsVisible(false);
        setPosition({ top: "10px", right: "20px", bottom: "auto" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      style={position}
      onClick={scrollToTop}
    >
      {/* Circular Progress Bar */}
      <svg className="progress-ring" width="60" height="60" viewBox="0 0 50 50">
        <circle className="progress-ring__background" cx="25" cy="25" r="22" />
        <circle
          className="progress-ring__circle"
          cx="25"
          cy="25"
          r="22"
          style={{ strokeDashoffset: `${138 - (138 * scrollProgress) / 100}px` }}
        />
      </svg>

      {/* Arrow Icon */}
      <FaArrowUp className="arrow-icon" />
    </div>
  );
};

export default ScrollToTop;
