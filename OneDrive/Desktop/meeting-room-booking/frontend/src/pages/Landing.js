import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./landing.css";
import {
  FaCalendarAlt,
  FaBolt,
  FaBuilding,
  FaBell
} from "react-icons/fa";

function Landing() {

  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  /* ================= HERO TYPING ================= */
  const words = ["Smart", "Fast", "Intelligent", "Scalable"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /* ================= NAVBAR SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= ACTIVE SECTION ================= */
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleActiveSection = () => {
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollY >= sectionTop &&
          scrollY < sectionTop + sectionHeight
        ) {
          if (sectionId) setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleActiveSection);
    handleActiveSection();
    return () =>
      window.removeEventListener("scroll", handleActiveSection);
  }, []);

  /* ================= STATS COUNTER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setStartCount(true);
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const Counter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!startCount) return;

      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [startCount, target]);

    return (
      <h3 className="stat-number">
        {count}
        {suffix}
      </h3>
    );
  };

  const toggleFAQ = (i) => {
    setOpenFAQ(openFAQ === i ? null : i);
  };

  const handleLogin = (role) => {
    const fakeUser = {
      name: "Nehal",
      role: role,
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));
    navigate(role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="landing">

      {/* PARTICLES */}
      <div className="particles">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: Math.random() * 100 + "%",
              animationDuration: 10 + Math.random() * 10 + "s",
              animationDelay: Math.random() * 5 + "s"
            }}
          />
        ))}
      </div>

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="nav-logo">MeetingSync</div>
        <div className="nav-links">
          <a href="#home" className={activeSection === "home" ? "active" : ""}>Home</a>
          <a href="#features" className={activeSection === "features" ? "active" : ""}>Features</a>
          <a href="#pricing" className={activeSection === "pricing" ? "active" : ""}>Pricing</a>
          <a href="#faq" className={activeSection === "faq" ? "active" : ""}>FAQ</a>

          <button 
            className="nav-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-left">
          <h1>
            <span className="gradient-text">
              {words[currentWordIndex]}
            </span>
            <br />
            Meeting Room Booking Platform
          </h1>

          <p>
            Manage enterprise meeting spaces, eliminate double bookings
            and improve productivity.
          </p>

          <button
            className="primary-btn"
            onClick={() => setShowPayment(true)}
          >
            Buy Now
          </button>
        </div>

        <div className="hero-right">
          <div className="mock-card">
            <h3>Room Status</h3>
            <p>Conference Room – Available</p>
            <p>Board Room – 2PM to 3PM</p>
          </div>
        </div>
      </section>

      {/* TRUSTED */}
      <section className="trusted-section">
        <p className="trusted-title">Trusted by teams at</p>
        <div className="logo-slider">
          <div className="logo-track">
            {["Google","Amazon","Netflix","Microsoft","Adobe","Spotify","Slack","Airbnb",
              "Google","Amazon","Netflix","Microsoft","Adobe","Spotify","Slack","Airbnb"]
              .map((brand, i) => (
                <span key={i}>{brand}</span>
              ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Calendar View</h3>
            <p>Daily, weekly & monthly visualization.</p>
          </div>
          <div className="feature-card">
            <FaBolt className="feature-icon" />
            <h3>Quick Booking</h3>
            <p>Reserve meeting rooms instantly.</p>
          </div>
          <div className="feature-card">
            <FaBuilding className="feature-icon" />
            <h3>Multi Location</h3>
            <p>Manage multiple branches easily.</p>
          </div>
          <div className="feature-card">
            <FaBell className="feature-icon" />
            <h3>Automated Reminders</h3>
            <p>Never miss meetings.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pricing-section">
        <h2 className="section-title">Simple Transparent Pricing</h2>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <p className="price">₹0<span>/month</span></p>
            <ul>
              <li>Up to 5 Rooms</li>
              <li>Basic Booking</li>
              <li>Email Support</li>
            </ul>
            <button className="primary-btn">Get Started</button>
          </div>

          <div className="pricing-card featured">
            <h3>Professional</h3>
            <p className="price">₹999<span>/month</span></p>
            <ul>
              <li>Unlimited Rooms</li>
              <li>Calendar Integration</li>
              <li>Analytics Dashboard</li>
              <li>Priority Support</li>
            </ul>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="price">Custom</p>
            <ul>
              <li>Multi-location</li>
              <li>SSO Integration</li>
              <li>Dedicated Support</li>
              <li>Advanced Reporting</li>
            </ul>

            <button onClick={() => handleLogin("user")} className="primary-btn">
              Login as User
            </button>

            <button onClick={() => handleLogin("admin")} className="secondary-btn">
              Login as Admin
            </button>

            <button className="primary-btn">Contact Sales</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        © 2026 MeetingSync SaaS Platform. All rights reserved.
      </footer>

    </div>
  );
}

export default Landing;
