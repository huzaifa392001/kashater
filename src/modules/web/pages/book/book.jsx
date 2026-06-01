import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../website/components/header/header";
import { Footer } from "../../../website/components/footer/footer";
import "./book.css";
import background_img from "../../assets/image/png/bg-img-terms-condition.png";
import banner_img from "../../assets/image/png/banner.png";
// import purple_tick from "../../assets/image/png/purple-tick.png";
import magic_icon from "../../assets/image/svg/spell.svg";
import preview_videos from "../../assets/image/png/1.png";
import img_1 from "../../assets/image/png/1.png";
import img_2 from "../../assets/image/png/1.png";
import img_3 from "../../assets/image/png/1.png";
import img_4 from "../../assets/image/png/1.png";
import img_5 from "../../assets/image/png/1.png";
import avatar1 from "../../assets/image/png/1.png";
import avatar2 from "../../assets/image/png/1.png";
import avatar3 from "../../assets/image/png/1.png";
import avatar4 from "../../assets/image/png/1.png";
import avatar5 from "../../assets/image/png/1.png";


const Book = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const images = [
    { id: 1, type: "video", src: preview_videos },
    { id: 2, type: "image", src: img_1 },
    { id: 3, type: "image", src: img_2 },
    { id: 4, type: "image", src: img_3 },
    { id: 5, type: "image", src: img_4 },
    { id: 6, type: "image", src: img_5 },
  ];

  const reviews = [
    {
      id: 1,
      title: "Good choice",
      rating: 5,
      text: "A special story that sparks imagination and teaches important values. It's become a treasured bedtime favorite in our home",
      author: "Kirankumar",
      image: avatar1,
    },
    {
      id: 2,
      title: "Product Quality",
      rating: 4,
      text: "Beautifully written and illustrated, this book brings a fairy tale to life in a way that feels personal and inspiring.",
      author: "Nandhini",
      image: avatar2,
    },
    {
      id: 3,
      title: "Best Offers",
      rating: 4,
      text: "The story's gentle magic and beautiful message about kindness really resonated with us. Seeing herself in the book made it even more special. Affordable price with best quality.",
      author: "Mohan",
      image: avatar3,
    },
    {
      id: 4,
      title: "Amazing Experience",
      rating: 5,
      text: "Our daughter absolutely loves this book! The personalization makes it extra special and she reads it every single night.",
      author: "Priya",
      image: avatar4,
    },
    {
      id: 5,
      title: "Highly Recommended",
      rating: 5,
      text: "Best investment for children's development. The stories are engaging and the quality of the book is exceptional.",
      author: "Rahul",
      image: avatar5,
    },
  ];


  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoScroll, reviews.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 8000);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "star filled" : "star empty"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className="container-fluid py-5 text-white"
        style={{
          backgroundImage: `url(${background_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="book-content-wrapper">
          {/* Product Showcase */}
          <section className="product-showcase">
            {/* Main Display */}
            <div className="showcase-main">
              <div
                className={`main-image-container ${selectedImg ? "active" : ""
                  }`}
              >
                {/* ✅ Show Video OR Image */}
                {(() => {
                  const current = selectedImg
                    ? images.find((img) => img.id === selectedImg)
                    : images[0];

                  if (current.type === "video") {
                    return (
                      <video
                        src={current.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="main-image"
                        style={{ borderRadius: "16px" }}
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                      />
                    );
                  }

                  return (
                    <img
                      src={current.src}
                      alt=""
                      className="main-image"
                      draggable={false}
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                    />
                  );
                })()}

                {selectedImg && (
                  <button
                    className="close-btn"
                    onClick={() => setSelectedImg(null)}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="showcase-grid">
              {images.map((img) => (
                <div
                  key={img.id}
                  className={`grid-item ${selectedImg === img.id ? "selected" : ""
                    }`}
                  onClick={() => setSelectedImg(img.id)}
                >
                  {img.type === "video" ? (
                    <video
                      src={img.src}
                      muted
                      playsInline
                      className="thumbnail-video"
                      draggable={false}
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                    />
                  ) : (
                    <img src={img.src} alt="" className="thumbnail-img"
                      draggable={false}
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                  )}

                  {img.type === "video" && (
                    <div className="play-icon">▶</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Right Side Content */}
          <div className="book-content">
            <h1 className="section-title-1">The Call of the Horizon</h1>

            <p className="descrip-1">
              Follow the footsteps of a young dreamer whose heart beats for
              discovery. In The Call of the Horizon, each trail, river, and
              mystery teaches that curiosity, courage, and resilience can turn
              dreams into adventures.
            </p>

            <p className="descrip-1" style={{ marginTop: "20px" }}>
              With rich storytelling and a spirit of adventure, this book
              encourages:
            </p>

            <div className="features-list">
              <p>
                <span>🧭</span> Curiosity about the world and how it works
              </p>
              <p>
                <span>🗺️</span> Problem-solving and creative thinking
              </p>
              <p>
                <span>💪</span> Courage to step outside comfort zones
              </p>
            </div>

            <p className="descrip-1">
              From backyard expeditions to future expeditions, this tale reminds
              children that every explorer starts with one bold step.
            </p>

            <p className="descrip-1" style={{ marginTop: "20px", fontWeight: 500 }}>
              Perfect for:
            </p>

            <div className="perfect-for-list">
              <p>
                <span>🌍</span> Kids who love nature and maps
              </p>
              <p>
                <span>🎒</span> Little adventurers with big dreams
              </p>
              <p>
                <span>🛶</span> Families who believe in outdoor learning
              </p>
              <p>
                <span>📚</span> Bedtime stories that inspire ambition
              </p>
              <p>
                <span>🚀</span> Classrooms teaching growth and grit
              </p>
            </div>

            <p className="age-recommended">📘 Recommended for ages 8 - 16</p>

            {/* Pricing */}
            <div className="pricing-card">
              <h1 className="card-head">Individual Book</h1>
              <p className="card-description">
                1 personalized storybook from your selected genre
              </p>

              <div className="price-section">
                <div>
                  <p className="price-current">₹ 1599.00</p>
                  <p className="price-original">₹ 1999.00</p>
                </div>
                <div className="save-badge">Save 20%</div>
              </div>
            </div>

            {/* Button */}
            <section
              className="button-section"
              onClick={() => {
                navigate("/user/try-now");
              }}
            >
              <button className="button-1">
                <img src={magic_icon} alt="" />
                <p>Personalize My Book</p>
              </button>
            </section>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="reviews-carousel">
          <h2 className="reviews-title">Reviews</h2>

          <div className="carousel-container">
            <div className="carousel-wrapper">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(calc(-${(currentIndex * 100) / 3
                    }%))`,
                }}
              >
                {[...reviews, ...reviews.slice(0, 2)].map((review, index) => (
                  <div key={`${review.id}-${index}`} className="review-card">
                    <StarRating rating={review.rating} />
                    <h3 className="review-title">"{review.title}"</h3>
                    <p className="review-text">{review.text}</p>
                    <div className="review-author">
                      <div className="author-avatar">
                        <img src={review.image} alt={review.author}
                          draggable={false}
                          onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                      </div>
                      <p className="author-name">{review.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="dots-container">
            {[0, 1, 2].map((dotIndex) => (
              <button
                key={dotIndex}
                className={`dot ${dotIndex === currentIndex % 3 ? "active" : ""
                  }`}
                onClick={() => goToSlide(dotIndex)}
              />
            ))}
          </div>
        </section>

        {/* Banner */}
        <section className="banner">
          <img src={banner_img} alt="banner" className="banner-img2"
            draggable={false}
            onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
          <h1 className="banner-txt">
            Make storytime special with a <br /> book starring your child!
          </h1>

          <section
            className="button-section1"
            onClick={() => {
              navigate("/user/try-now");
            }}
          >
            <button className="button-2">
              <img src={magic_icon} alt="" />
              <p>Create Your Personalized Story Now</p>
            </button>
          </section>
        </section>

        <br />
        <br />
        <br />
      </div>

      <Footer />
    </>
  );
};

export default Book;
