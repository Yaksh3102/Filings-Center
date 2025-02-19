import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaRocket, FaHandshake, FaBullhorn, FaBullseye } from "react-icons/fa";

const CounterSection = () => {
    const [iconSize, setIconSize] = useState(70);
    const sectionRef = useRef(null);
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const [startCounting, setStartCounting] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setIconSize(40); // Smaller icons on mobile
            } else if (window.innerWidth < 768) {
                setIconSize(50); // Medium icons for tablets
            } else {
                setIconSize(70); // Larger icons for desktops
            }
        };

        handleResize(); // Set initial size
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStartCounting(true);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!startCounting) return;

        let startTime = Date.now();
        let duration = 2000;
        let interval = 20;

        const updateCounters = () => {
            let elapsed = Date.now() - startTime;
            let progress = Math.min(elapsed / duration, 1);

            setCounts([200, 20, 10000, 900].map(num => Math.floor(progress * num)));

            if (progress < 1) {
                requestAnimationFrame(updateCounters);
            }
        };

        requestAnimationFrame(updateCounters);
    }, [startCounting]);

    return (
        <section ref={sectionRef} className="counter-section">
            <Container>
                <Row className="justify-content-center">
                    {[
                        { icon: <FaRocket size={iconSize} />, text: "Team Members", value: 200 },
                        { icon: <FaHandshake size={iconSize} />, text: "Winning Awards", value: 20 },
                        { icon: <FaBullhorn size={iconSize} />, text: "Complete Projects", value: 10000 },
                        { icon: <FaBullseye size={iconSize} />, text: "Client Reviews", value: 900 },
                    ].map((item, index) => (
                        <Col md={3} sm={6} xs={6} key={index} className="counter-item">
                            <div className="counter-icon">{item.icon}</div>
                            <div>
                                <h2 className="counter-number">{counts[index]}+</h2>
                                <p className="counter-text">{item.text}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default CounterSection;
