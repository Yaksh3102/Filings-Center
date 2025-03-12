"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import {
  FaChevronDown,
  FaTimes,
  FaPhoneAlt,
  FaChevronRight,
} from "react-icons/fa";
import { MdEmail, MdDashboard } from "react-icons/md";
import { useDetails } from "@/contexts/DetailsContext";
import { FiLogOut } from "react-icons/fi";
import { IoPersonCircle } from "react-icons/io5";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSecondaryGroup, setActiveSecondaryGroup] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const hoverTimeout = useRef(null);
  const mainHeaders = [
    "Startup",
    "Registration",
    "IP",
    "GST",
    "Income Tax",
    "MCA",
    "Legal Documentation",
    "Other Compliance",
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { services, companyDetails, userDetails, setUserDetails } =
    useDetails();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop: keep the dropdown open a bit before closing
  const handleMouseEnter = (groupId) => {
    if (!isMobile) {
      clearTimeout(hoverTimeout.current);
      setActiveDropdown(groupId);
      setDropdownVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      hoverTimeout.current = setTimeout(() => {
        setDropdownVisible(false);
        setActiveDropdown(null);
        setActiveSecondaryGroup(null);
      }, 300);
    }
  };

  const handleMobileClick = (groupId) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === groupId ? null : groupId);
      setDropdownVisible(activeDropdown !== groupId);
    }
  };

  const handleSecondaryMouseEnter = (groupId) => {
    if (!isMobile) {
      setActiveSecondaryGroup(groupId);
    }
  };

  const getColumns = (servicesArray, maxPerColumn = 5) => {
    const columns = [];
    for (let i = 0; i < servicesArray.length; i += maxPerColumn) {
      columns.push(servicesArray.slice(i, i + maxPerColumn));
    }
    return columns;
  };

  const getTertiaryColumns = (services) => {
    const maxPerColumn = 6;
    return getColumns(services, maxPerColumn);
  };

  const secondaryServices = services.filter(
    (s) => !mainHeaders.includes(s.groupName)
  );

  const handleSignOut = () => {
    router.replace("/");
    localStorage.removeItem("token");
    setUserDetails(null);
  };

  return (
    <header
      className={`header-wrapper ${scrolled ? "scrolled" : ""} ${
        showHeader ? "slide-down" : "slide-up"
      }`}
    >
      <div className="top-bar">
        <Container>
          <div className="top-bar-content">
            <div className="contact-info">
              <a
                href={`tel:+91-${companyDetails?.ContactNo_Office}`}
                className="contact-link"
              >
                <FaPhoneAlt />
                <span className="contact-text">
                  +91-{companyDetails?.ContactNo_Office}
                </span>
              </a>
              <a
                href={`mailto:${companyDetails?.EmailID_Office}`}
                className="contact-link"
              >
                <MdEmail size={18} />
                <span className="contact-text">
                  {companyDetails?.EmailID_Office}
                </span>
              </a>
            </div>
            <div className="top-bar-links d-none d-md-flex">
              <Link
                href={`/services?groupName=Consultation`}
                className="top-bar-link-highlighted"
              >
                Consultation
              </Link>
              <Link href="/" className="top-bar-link-highlighted">
                Smart Packages
              </Link>
              <Link href="/" className="top-bar-link-highlighted">
                Virtual CFO
              </Link>
              <Link href="/franchise-enquiry" className="top-bar-link-highlighted">
                Franchise Enquiry
              </Link>
              <Link href="/" className="top-bar-link">
                Home
              </Link>
              <Link href="/about" className="top-bar-link">
                About Us
              </Link>
              <Link href="/contact-us" className="top-bar-link">
                Contact Us
              </Link>
              <Link href="/blogs" className="top-bar-link">
                Blog
              </Link>
              {userDetails ? (
                <Dropdown
                  show={showDropdown}
                  onToggle={(isOpen) => setShowDropdown(isOpen)}
                >
                  <Dropdown.Toggle className="d-flex align-items-center gap-2 text-decoration-none top-bar-link-highlighted-signup">
                    <IoPersonCircle size={28} />
                    <p className="p-0 m-0">{userDetails.firstName}</p>
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item>
                      <Link href="/dashboard/profile" className="nav-link">
                        <MdDashboard className="me-2" /> Dashboard
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut}>
                      <div className="nav-link">
                        <FiLogOut className="me-2" /> Sign Out
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link href="/login" className="top-bar-link-highlighted-signup">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Navbar expand="lg" className={`main-nav`}>
        <Container>
          {/* Desktop Logo */}
          <Link href="/" className="d-none d-lg-block">
            <Image
              src="/assets/filing-centre-logo.jpg"
              width={100}
              height={50}
              alt="Logo"
              className="logo"
            />
          </Link>

          {/* Mobile Logo */}
          <Navbar.Brand href="/" className="d-lg-none">
            <Image
              src="/assets/filing-centre-logo.jpg"
              width={50}
              height={50}
              alt="Logo"
              className="logo-mobile"
            />
          </Navbar.Brand>

          <button
            className={`custom-toggler ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="basic-navbar-nav"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FaTimes className="close-icon" />
            ) : (
              <>
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
              </>
            )}
          </button>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className={isMenuOpen ? "show" : ""}
          >
            {/* Mobile Header inside the menu */}
            <div className="mobile-header d-flex justify-content-between align-items-center d-lg-none">
              <Navbar.Brand href="/">
                <Image
                  src="/assets/filing-centre-logo.jpg"
                  width={50}
                  height={50}
                  alt="Logo"
                />
              </Navbar.Brand>
              <FaTimes
                className="close-icon close-menu"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>

            {/* Mobile-only Service Buttons */}
            {isMobile && (
              <div className="mobile-service-buttons">
                <Link
                  href={`/services?groupName=Consultation`}
                  className="mobile-service-button"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Consultation
                </Link>
                <Link
                  href="/"
                  className="mobile-service-button"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Smart Packages
                </Link>
                <Link
                  href="/"
                  className="mobile-service-button"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Virtual CFO
                </Link>

                <Link
                  href="/franchise-enquiry"
                  className="mobile-service-button"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Franchise Enquiry
                </Link>
              </div>
            )}

            {/* Mobile Navigation Links (basic pages) */}
            <Nav className="mobile-nav-links d-lg-none">
              <Link
                href="/"
                className="nav-link primary-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="nav-link primary-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact-us"
                className="nav-link primary-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/blog"
                className="nav-link primary-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </Nav>

            {/* Services Links */}
            <Nav className="main-nav-links" ref={navRef}>
              {isMobile ? (
                // Mobile view: Show ALL service groups directly (no "More Services" block)
                services.map((group) => (
                  <div
                    key={group._id}
                    className="nav-item dropdown-container"
                    onClick={() => handleMobileClick(group._id)}
                  >
                    <div
                      className={`nav-link ${
                        activeDropdown === group._id ? "active" : ""
                      }`}
                    >
                      {group.groupName}
                      <FaChevronDown
                        className={`chevron ${
                          activeDropdown === group._id ? "rotate" : ""
                        }`}
                      />
                    </div>
                    {activeDropdown === group._id && (
                      <div className="dropdown-menu-container visible">
                        {getColumns(group.services).map((column, colIndex) => (
                          <div className="dropdown-column" key={colIndex}>
                            {column.map((service) => (
                              <Link
                                key={service._id}
                                href={`/services/${service._id}`}
                                className="dropdown-item"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {service.serviceName}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                // Desktop view: Original structure with main groups and "More Services"
                <>
                  {services
                    .filter((s) => mainHeaders.includes(s.groupName))
                    .map((group) => (
                      <div
                        key={group._id}
                        className="nav-item dropdown-container"
                        onMouseEnter={() => handleMouseEnter(group._id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div
                          className={`nav-link ${
                            activeDropdown === group._id ? "active" : ""
                          }`}
                          onClick={() => handleMobileClick(group._id)}
                        >
                          {group.groupName}
                          <FaChevronDown
                            className={`chevron ${
                              activeDropdown === group._id ? "rotate" : ""
                            }`}
                          />
                        </div>
                        {dropdownVisible && activeDropdown === group._id && (
                          <div className="dropdown-menu-container visible">
                            {getColumns(group.services).map(
                              (column, colIndex) => (
                                <div className="dropdown-column" key={colIndex}>
                                  {column.map((service) => (
                                    <Link
                                      key={service._id}
                                      href={`/services/${service._id}`}
                                      className="dropdown-item"
                                    >
                                      {service.serviceName}
                                    </Link>
                                  ))}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  <div
                    className="nav-item dropdown-container"
                    onMouseEnter={() => handleMouseEnter("more-services")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`nav-link ${
                        activeDropdown === "more-services" ? "active" : ""
                      }`}
                      onClick={() => handleMobileClick("more-services")}
                    >
                      More Services
                      <FaChevronDown
                        className={`chevron ${
                          activeDropdown === "more-services" ? "rotate" : ""
                        }`}
                      />
                    </div>
                    {dropdownVisible && activeDropdown === "more-services" && (
                      <div className="dropdown-menu-container visible secondary-dropdown">
                        <div className="secondary-menu">
                          {secondaryServices
                            .filter(
                              (group) => group.groupName !== "Consultation"
                            )
                            .map((group) => (
                              <div
                                key={group._id}
                                className={`secondary-item ${
                                  activeSecondaryGroup === group._id
                                    ? "active"
                                    : ""
                                }`}
                                onMouseEnter={() =>
                                  handleSecondaryMouseEnter(group._id)
                                }
                              >
                                {group.groupName}
                                <FaChevronRight className="chevron-right" />
                                {activeSecondaryGroup === group._id && (
                                  <div className="tertiary-menu">
                                    <div className="tertiary-columns">
                                      {getTertiaryColumns(group.services).map(
                                        (column, colIndex) => (
                                          <div
                                            key={colIndex}
                                            className="tertiary-column"
                                          >
                                            {column.map((service) => (
                                              <Link
                                                key={service._id}
                                                href={`/services/${service._id}`}
                                                className="tertiary-item"
                                                onClick={() =>
                                                  setIsMenuOpen(false)
                                                }
                                              >
                                                {service.serviceName}
                                              </Link>
                                            ))}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Nav>

            {/* Mobile Authentication Button */}
            {isMobile && (
              <div className="mobile-auth-button">
                {userDetails ? (
                  <Dropdown
                    show={showDropdown}
                    onToggle={(isOpen) => setShowDropdown(isOpen)}
                  >
                    <Dropdown.Toggle className="mobile-auth-link">
                      <IoPersonCircle size={28} />
                      <p className="p-0 m-0">{userDetails.firstName}</p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item>
                        <Link
                          href="/dashboard/profile"
                          className="nav-link"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <MdDashboard className="me-2" /> Dashboard
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSignOut}>
                        <div className="nav-link">
                          <FiLogOut className="me-2" /> Sign Out
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link
                    href="/login"
                    className="mobile-auth-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
