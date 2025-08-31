import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { FaRobot, FaBookOpen, FaChartLine, FaComments, FaStar, FaQuoteLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section text-center text-light">
        <div className="hero-overlay py-5">
          <FaRobot size={60} className="mb-3 text-info animate-bounce" />
          <h1 className="display-3 fw-bold animate-text mb-3">AI Study Assistant</h1>
          <p className="lead mb-4">Organize notes, chat with AI, and track your progress — all in one smart dashboard.</p>
          <div>
            <Link to="/login" className="btn btn-primary btn-lg shadow-lg">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <section className="container my-5 text-center">
        <h2 className="fw-bold mb-4">✨ Features Spotlight</h2>
        <Carousel indicators={false} interval={3500}>
          <Carousel.Item>
            <div className="carousel-slide book-slide py-5">
              <FaBookOpen size={50} className="text-primary mb-3" />
              <h2 className="fw-bold">Smart Notes</h2>
              <p>Effortlessly organize and search your study notes with AI-powered tagging.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-slide chat-slide py-5">
              <FaComments size={50} className="text-success mb-3" />
              <h2 className="fw-bold">AI Chat</h2>
              <p>Get instant answers, explanations, and study help from your personal AI tutor.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-slide progress-slide py-5">
              <FaChartLine size={50} className="text-warning mb-3" />
              <h2 className="fw-bold">Progress Tracker</h2>
              <p>Visualize your learning journey and celebrate your achievements.</p>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section text-center my-5">
        <h2 className="fw-bold mb-4">📢 What Students Say</h2>
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4">
            <FaQuoteLeft size={30} className="text-info" />
            <p className="fst-italic">"The AI chat helped me understand tough concepts in seconds!"</p>
            <h5>– Priya Sharma</h5>
            <FaStar className="text-warning" /><FaStar className="text-warning" /><FaStar className="text-warning" /><FaStar className="text-warning" /><FaStar className="text-warning" />
          </div>
          <div className="col-md-5 mb-4">
            <FaQuoteLeft size={30} className="text-info" />
            <p className="fst-italic">"Tracking my study progress keeps me motivated every day."</p>
            <h5>– Alex Kim</h5>
            <FaStar className="text-warning" /><FaStar className="text-warning" /><FaStar className="text-warning" /><FaStar className="text-warning" /><FaStar className="text-warning" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center my-5">
        <h2 className="fw-bold">Ready to Boost Your Learning?</h2>
        <p>Join AI Study Assistant and unlock your full potential!</p>
        <Link to="/login" className="btn btn-info btn-lg shadow-lg">Start Now</Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-muted">
        <small>Made by <span className="text-danger">♥</span> & Shreyaa | &copy; 2025</small>
      </footer>
    </div>
  );
};

export default LandingPage;
