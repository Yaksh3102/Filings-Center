import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown, FaTimes, FaPhoneAlt, FaChevronRight } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDetails } from "@/contexts/DetailsContext";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRefs = useRef({});
    const navRef = useRef(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const hoverTimeout = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeSecondaryGroup, setActiveSecondaryGroup] = useState(null);

    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

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

    const { services, companyDetails } = useDetails();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            if (activeDropdown === groupId) {
                setActiveDropdown(null);
                setDropdownVisible(false);
            } else {
                setActiveDropdown(groupId);
                setDropdownVisible(true);
            }
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

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrolled(currentScroll > 50);

            if (currentScroll < lastScrollY.current) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
            lastScrollY.current = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const secondaryServices = services.filter(s => !mainHeaders.includes(s.groupName));

    return (
        <header
            className={`header-wrapper 
            ${scrolled ? "scrolled" : ""} 
            ${showHeader ? "slide-down" : "slide-up"}`}
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
                            <Link href="/" className="top-bar-link-highlighted">
                                Consultation 
                            </Link>
                            <Link href="/" className="top-bar-link-highlighted">
                                Smart Packages 
                            </Link>
                            <Link href="/" className="top-bar-link-highlighted">
                                Virtual CFO
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
                            <Link href="/blog" className="top-bar-link">
                                Blog
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

            <Navbar expand="lg" className={`main-nav`}>
                <Container>
                    {/* Logo for desktop view */}
                    <Link href="/" className="d-none d-lg-block">
                        <Image
                            src="/assets/logo.png"
                            width={90}
                            height={30}
                            alt="Logo"
                            className="logo"
                        />
                    </Link>

                    {/* Mobile Logo (visible on mobile view) */}
                    <Navbar.Brand href="/" className="d-lg-none">
                        <Image
                            src="/assets/logo.png"
                            width={120}
                            height={50}
                            alt="Logo"
                            className="logo-mobile"
                        />
                    </Navbar.Brand>

                    <button
                        className={`custom-toggler ${
                            isMenuOpen ? "active" : ""
                        }`}
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
                        {/* Mobile Header inside the menu (with logo on left and close icon on right) */}
                        <div className="mobile-header d-flex justify-content-between align-items-center d-lg-none">
                            <Navbar.Brand href="/">
                                <Image
                                    src="/assets/logo.png"
                                    width={120}
                                    height={50}
                                    alt="Logo"
                                />
                            </Navbar.Brand>
                            <FaTimes
                                className="close-icon close-menu"
                                onClick={() => setIsMenuOpen(false)}
                            />
                        </div>

                        {/* Mobile Menu Links */}
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
                            {services.filter(s=>mainHeaders.includes(s.groupName)).map((group) => (
                                <div
                                    key={group._id}
                                    className="nav-item dropdown-container"
                                    ref={(el) =>
                                        (dropdownRefs.current[group._id] = el)
                                    }
                                    onMouseEnter={() =>
                                        handleMouseEnter(group._id)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div
                                        className={`nav-link ${
                                            activeDropdown === group._id
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMobileClick(group._id)
                                        }
                                    >
                                        {group.groupName}
                                        <FaChevronDown
                                            className={`chevron ${
                                                activeDropdown === group._id
                                                    ? "rotate"
                                                    : ""
                                            }`}
                                        />
                                    </div>
                                    {((isMobile &&
                                        activeDropdown === group._id) ||
                                        (!isMobile &&
                                            dropdownVisible &&
                                            activeDropdown === group._id)) && (
                                        <div className="dropdown-menu-container visible">
                                            {getColumns(group.services).map(
                                                (column, colIndex) => (
                                                    <div
                                                        className="dropdown-column"
                                                        key={colIndex}
                                                    >
                                                        {column.map(
                                                            (service) => (
                                                                <Link
                                                                    key={
                                                                        service._id
                                                                    }
                                                                    href={`/services/${service._id}`}
                                                                    className="dropdown-item"
                                                                    onClick={() =>
                                                                        setIsMenuOpen(
                                                                            false
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        service.serviceName
                                                                    }
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* ADD HERE */}
                            <div 
                            className="nav-item dropdown-container"
                            onMouseEnter={() => handleMouseEnter('more-services')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div 
                                className={`nav-link ${activeDropdown === 'more-services' ? 'active' : ''}`}
                                onClick={() => handleMobileClick('more-services')}
                            >
                                More Services
                                <FaChevronDown className={`chevron ${activeDropdown === 'more-services' ? 'rotate' : ''}`} />
                            </div>
                            
                            {((isMobile && activeDropdown === 'more-services') || 
                              (!isMobile && dropdownVisible && activeDropdown === 'more-services')) && (
                                <div className="dropdown-menu-container visible secondary-dropdown">
                                    <div className="secondary-menu">
                                        {secondaryServices.map((group) => (
                                            <div 
                                                key={group._id}
                                                className={`secondary-item ${activeSecondaryGroup === group._id ? 'active' : ''}`}
                                                onMouseEnter={() => handleSecondaryMouseEnter(group._id)}
                                            >
                                                {group.groupName}
                                                <FaChevronRight className="chevron-right" />
                                                
                                                {activeSecondaryGroup === group._id && (
                                                    <div className="tertiary-menu">
                                                        <div className="tertiary-columns">
                                                            {getTertiaryColumns(group.services).map((column, colIndex) => (
                                                                <div key={colIndex} className="tertiary-column">
                                                                    {column.map((service) => (
                                                                        <Link
                                                                            key={service._id}
                                                                            href={`/services/${service._id}`}
                                                                            className="tertiary-item"
                                                                            onClick={() => setIsMenuOpen(false)}
                                                                        >
                                                                            {service.serviceName}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        </Nav>
                        {/* <Link
                            href={"/services"}
                            className="consultation-btn d-none d-lg-block"
                        >
                            ALL SERVICES
                        </Link> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
