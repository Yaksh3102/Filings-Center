import React from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Slider from "react-slick";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO & Founder",
    image: "/assets/cta-img3.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Chief Financial Officer",
    image: "/assets/cta-img3.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    id: 3,
    name: "Samuel Green",
    role: "Head of Legal Affairs",
    image: "/assets/cta-img3.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    id: 4,
    name: "Emily Johnson",
    role: "Business Consultant",
    image: "/assets/cta-img3.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  }
];

const TeamSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="team-section">
      <Container>
        <div className="team-header">
          <h2 className="section-title">
            Meet Our <span className="highlight-text">Expert Team</span>
          </h2>
          <p className="section-text">
            Our experienced professionals are dedicated to providing the best business and legal solutions.
          </p>
        </div>

        <Slider {...settings}>
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-img-wrapper">
                <Image 
                  src={member.image} 
                  width={200} 
                  height={200} 
                  alt={member.name} 
                  className="team-img"
                />
              </div>
              <div className="team-content">
                <h5 className="team-name">{member.name}</h5>
                <p className="team-role">{member.role}</p>
                <div className="team-socials">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="social-icon" />
                  </a>
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="social-icon" />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default TeamSlider;
