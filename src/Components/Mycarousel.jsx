import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Mycarousel = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10 mx-auto">

          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="8000"
          >

            {/* Indicators */}
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3"></button>
            </div>

            <div className="carousel-inner">

              {/* 🎬 VIDEO 1 (Professional Mentorship) */}
              <div className="carousel-item active">
                <video
                  className="d-block w-100"
                  height="450"
                  autoPlay
                  muted
                  loop
                  style={{ objectFit: "cover" }}
                >
                  <source
                    src="https://cdn.coverr.co/videos/coverr-team-discussion-5176/1080p.mp4"
                    type="video/mp4"
                  />
                </video>

                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                  <h4>Guidance That Accelerates Growth 🚀</h4>
                  <p>Learn directly from experienced mentors who’ve walked your path.</p>
                </div>
              </div>

              {/* 🖼️ IMAGE 1 */}
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  className="d-block w-100"
                  alt="Mentorship"
                  height="450"
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                  <h4>Real Conversations 💬</h4>
                  <p>Get honest advice, feedback, and support tailored to your journey.</p>
                </div>
              </div>

              {/* 🎬 VIDEO 2 */}
              <div className="carousel-item">
                <video
                  className="d-block w-100"
                  height="450"
                  autoPlay
                  muted
                  loop
                  style={{ objectFit: "cover" }}
                >
                  <source
                    src="https://cdn.coverr.co/videos/coverr-business-meeting-5175/1080p.mp4"
                    type="video/mp4"
                  />
                </video>

                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                  <h4>Build Confidence & Skills 🎯</h4>
                  <p>From career to personal growth — mentorship unlocks your full potential.</p>
                </div>
              </div>

              {/* 🖼️ IMAGE 2 */}
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                  className="d-block w-100"
                  alt="Growth"
                  height="450"
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                  <h4>Your Future Starts Here 🌱</h4>
                  <p>Take the first step toward a better, guided future today.</p>
                </div>
              </div>

            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Mycarousel;