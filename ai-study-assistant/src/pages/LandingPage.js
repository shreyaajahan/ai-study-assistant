import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { FaRobot, FaBookOpen, FaChartLine } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function LandingPage() {
  return (
    <div className="home-container">
      {/* 🔹 Hero Section */}
      <header
        className="hero-section text-light"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", // professional gradient
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">🚀 AI-Powered Study Assistant</h1>
          <p className="lead text-light opacity-75">
            Smarter learning. Instant answers. Track your progress.
          </p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-primary btn-lg me-3">
              Get Started
            </Link>
            <Link to="/signup" className="btn btn-outline-light btn-lg">
              Join Now
            </Link>
          </div>
        </div>

        {/* 🔹 Sliding Feature Cards */}
        <div className="w-100 mt-4" style={{ maxWidth: "1000px" }}>
          <Carousel indicators={false} interval={3000} controls={false}>
            <Carousel.Item>
              <div className="d-flex justify-content-center gap-4">
                <div className="feature-card bg-white shadow rounded p-4 text-center flex-fill">
                  <FaRobot size={50} className="text-primary mb-3" />
                  <h4 className="fw-bold">AI Chat Assistant</h4>
                  <p className="text-muted">
                    Ask questions and get instant explanations tailored to you.
                  </p>
                </div>
                <div className="feature-card bg-white shadow rounded p-4 text-center flex-fill">
                  <FaBookOpen size={50} className="text-success mb-3" />
                  <h4 className="fw-bold">Smart Notes</h4>
                  <p className="text-muted">
                    Organize study notes and highlight important topics.
                  </p>
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="d-flex justify-content-center gap-4">
                <div className="feature-card bg-white shadow rounded p-4 text-center flex-fill">
                  <FaChartLine size={50} className="text-danger mb-3" />
                  <h4 className="fw-bold">Progress Tracking</h4>
                  <p className="text-muted">
                    Monitor your learning journey with smart analytics.
                  </p>
                </div>
                <div className="feature-card bg-white shadow rounded p-4 text-center flex-fill">
                  <FaRobot size={50} className="text-info mb-3" />
                  <h4 className="fw-bold">Personalized Learning</h4>
                  <p className="text-muted">
                    Adaptive study plans designed for your success.
                  </p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </header>

      {/* 🔹 Testimonials */}
      <section className="testimonials-section text-center my-5">
        <h2 className="fw-bold mb-4">💬 What Students Say</h2>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <p className="fst-italic">
              "This AI assistant has revolutionized my exam prep!"
            </p>
            <h5>– Sarah L.</h5>
          </div>
          <div className="col-md-4">
            <p className="fst-italic">
              "Notes + AI chat = the perfect learning combo."
            </p>
            <h5>– James K.</h5>
          </div>
        </div>
      </section>

      {/* 🔹 Call to Action */}
      <section className="cta-section text-center my-5">
        <h2 className="fw-bold">📈 Ready to Supercharge Your Learning?</h2>
        <p>Join now and unlock AI-powered tools built for students.</p>
        <Link to="/signup" className="btn btn-primary btn-lg">
          Get Started
        </Link>
      </section>

      {/* 🔹 Footer */}
      <footer className="text-center text-muted py-4">
        Made with ❤️ by SHREYAA | © 2025 Study Assistant
      </footer>
    </div>
  );
}

export default LandingPage;
