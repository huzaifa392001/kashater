import { useEffect, useRef, useState } from "react";

// images
import view_book_thumb from "../../website/assets/image/view-book-thumb-img.png";
import magic_icon from "../../website/assets/image/svg/spell.svg";
import { Footer } from "../../website/components/footer/footer";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useApiHttp from "../../web/hooks/ues-http";
import { useDispatch } from "react-redux";
import QuillDisplay from "../../admin/components/UI/RichText/QuillDisplay";
import background_img from "../../web/assets/image/png/bg-img-terms-condition.png"
import avatar1 from "../../web/assets/image/png/avatar1.png";
import avatar2 from "../../web/assets/image/png/avatar2.png";
import avatar3 from "../../web/assets/image/png/avatar3.png";
import avatar4 from "../../web/assets/image/png/avatar4.png";
import avatar5 from "../../web/assets/image/png/avatar5.png";
import banner_img from "../../web/assets/image/png/banner.png";
import bannerMob_img from "../../web/assets/image/png/bannerMob.png";
import classes from "../pages/Landing/landing.module.css";
import Slider from "react-slick";
import useIsMobile from "../../web/hooks/useIsMobile";
import EmblaCarouselAuto2 from "../components/carousel-autoplay/embla-auto2";
import VideoPlayerViewBook from "./VideoPlayerViewBook";
import "../../web/pages/book/book.css";

export default function ViewBook() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  // let { storyId, name } = location.state || {}

  const [searchParams] = useSearchParams();

  let storyId = searchParams.get("storyId");
  let name = searchParams.get("name");
  console.log('storyId', storyId);


  storyId = storyId || localStorage.getItem("storyId")
  name = name || localStorage.getItem("name")
  const [booksData, setBooksData] = useState([])
  const [openAdduser, setOpenAdduser] = useState(false)
  const [selectedImg, setSelectedImg] = useState(null);
  const [bigImage, setBigImage] = useState({})
  const ismobile = useIsMobile(768)
  const [videoPopUp, setVideoPopup] = useState(null)


  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const listApiCAll = () => {
    sendRequest(
      {
        url: `user/products/book-view`,
        method: "POST",
        body: {
          name: name,
        },
      },
      data => {
        console.log("Book data received:", data)
        setBooksData(data?.data)
        setBigImage({ file_url: data?.data?.book_cover })
      }
    )
  }

  useEffect(() => {
    if (!name) {
      console.warn("No storyId provided in location state")
      return
    }
    listApiCAll()
    // return () => {
    //   localStorage.removeItem("storyId");
    // };
  }, [name])
  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
  }
  const handlePersonalizeStory = () => {
    navigate("/user/personalize_story", {
      state: {
        storyId: booksData?.id,
        isdata: booksData,
      },
    })
  }

  const handleImgChange = (img) => {
    setSelectedImg(img?.id)
    setBigImage(img)
  }


  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);


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


  const testimonial = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "80px",
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,   // 👈 IMPORTANT
          centerPadding: "0px",
        },
      },
    ],
  };


  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRef2 = useRef(null);

  const handleFullscreen = () => {
    const video = videoRef.current;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { // Safari
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE
      video.msRequestFullscreen();
    }
  };

  const handleVideoFullscreen = async (e) => {
    const wrapper = e.currentTarget;
    const video = wrapper.querySelector("video");
    const playIcon = wrapper.querySelector(".play-icon-mob");

    if (!video) return;

    const isAndroid = /Android/i.test(navigator.userAgent);

    try {

      // ✅ ANDROID (no fullscreen)
      if (isAndroid) {
        video.controls = true;
        video.muted = false;
        video.play().catch(() => { });

        if (playIcon) playIcon.style.display = "none";
        return;
      }

      // ✅ Mac / iOS / Desktop FIX
      video.controls = true;

      // 🔥 Step 1: request fullscreen FIRST
      if (video.requestFullscreen) {
        await video.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen(); // iOS Safari
        return;
      }

      // 🔥 Step 2: then play (important for Mac Chrome)
      video.muted = false;

      setTimeout(() => {
        video.play().catch(err => console.log("play error:", err));
      }, 200);

      if (playIcon) playIcon.style.display = "none";

    } catch (err) {
      console.log("fullscreen error:", err);
    }

    // 🔥 exit cleanup
    const exitHandler = () => {
      const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement;

      if (!isFullscreen) {
        video.pause();
        video.currentTime = 0;
        video.controls = false;

        if (playIcon) playIcon.style.display = "block";

        document.removeEventListener("fullscreenchange", exitHandler);
        document.removeEventListener("webkitfullscreenchange", exitHandler);
      }
    };

    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
  };

  return (
    <>
      {videoPopUp ? <VideoPlayerViewBook videoSrc={videoPopUp} setVideoPopup={setVideoPopup} /> : <>
        <section className="view-book-page">
          {/* <section className="container-fluid py-5 text-white"
        style={{
          backgroundImage: `url(${background_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}> */}
          <div className="container">
            <h2 className="view-content-box-h2 mb-4 d-block d-md-none">{booksData?.name}</h2>
            <div className="view-book-section">
              <div className="view-book-thumb-img d-none d-md-block">
                <div className="media-box">
                  {bigImage?.type == 2 ? (
                    <video
                      src={bigImage?.file_url}
                      controls
                      autoPlay
                      muted
                      playsInline
                      ref={videoRef}
                      onPlay={handleFullscreen}
                      controlsList="nodownload"
                      draggable={false}
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                    />
                  ) : (
                    <img
                      src={bigImage?.file_url}
                      alt={bigImage?.file_url}
                      draggable={false}
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                    />
                  )}
                </div>
                <div className="showcase-grid mt-3">
                  {booksData?.galleries?.map((img) => (
                    <div
                      key={img?.id}
                      className={`grid-item ${selectedImg === img?.id ? "selected" : ""}`}
                      onClick={() => handleImgChange(img)}
                    >
                      {img?.type === 2 ? (
                        <video
                          src={img?.file_url}
                          muted
                          playsInline
                          className="thumbnail-video"
                          controlsList="nodownload"
                          draggable={false}
                          onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                        />
                      ) : (
                        <img
                          src={img?.file_url}
                          alt=""
                          className="thumbnail-img"
                          draggable={false}
                          onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                        />
                      )}

                      {img?.type === 2 && <div className="play-icon">▶</div>}
                    </div>
                  ))}
                </div>

              </div>
              <div
                id="customCarousel"
                className="carousel slide d-block d-md-none"
                data-bs-ride="false"
              >
                <div className="carousel-inner">

                  {booksData?.galleries?.map((item, ind) => (
                    <div
                      className={`carousel-item ${ind === 0 ? "active" : ""}`}
                      key={ind}
                    >
                      <div className="carousel-media-wrapper">

                        {item?.type === 2 ? (
                          // <div className="carousel-video-box" onClick={(e) => handleVideoFullscreen(e, item?.file_url)}>
                          <div className="carousel-video-box" onClick={(e) => setVideoPopup(item?.file_url)}>
                            <video
                              src={item?.file_url}
                              className="carousel-media"
                              muted
                              controls={false}
                              draggable={false}
                              controlsList="nodownload"
                              playsInline
                              webkit-playsinline="true"
                              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                            />
                            <div className="play-icon-mob">▶</div>
                          </div>
                        ) : (
                          <img
                            src={item?.file_url}
                            alt=""
                            className="carousel-media"
                            draggable={false}
                            onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                          />
                        )}

                      </div>
                    </div>
                  ))}

                </div>

                {/* 🔥 ARROWS */}
                <button
                  className="carousel-control-prev custom-arrow"
                  type="button"
                  data-bs-target="#customCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                  className="carousel-control-next custom-arrow"
                  type="button"
                  data-bs-target="#customCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon"></span>
                </button>
              </div>
              <div className="view-content-box">
                <h2 className="d-none d-md-block">{booksData?.name}</h2>
                <p><QuillDisplay content={booksData?.description} /></p>
                <p className="recommendation-box">
                  📘 Recommended for ages {booksData.age_group}
                </p>

                {/* Price Box starts */}
                <div className="priceBox">

                  <h4 style={{ color: '#121212' }}>Individual Book</h4>
                  <p>1 personalized storybook from your selected genre</p>

                  <div className="priceTxt">
                    {booksData?.price && <span className="currentPrice">₹ {booksData?.price}</span>}
                    {booksData?.mrp && <span className="oldPrice">₹ {booksData?.mrp}</span>}
                    {booksData?.mrp && booksData?.price && (
                      <span className="discount">
                        Save{" "}
                        {Math.round(
                          ((Number(booksData?.mrp) - Number(booksData?.price)) /
                            Number(booksData?.mrp)) *
                          100
                        )}
                        %
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Box ends */}

                {/* Buttons starts*/}
                <div className="view_book_buttons d-none d-md-block">
                  <Link to={`/user/personalize_story?story=${encodeURIComponent(booksData?.name)}`}>
                    <button className="personalizeBtn"
                    // onClick={() => handlePersonalizeStory()}
                    ><img src={magic_icon} alt="" />Personalize My Book</button>
                  </Link>
                </div>
                {/* Buttons ends*/}

              </div>
            </div>

            <Link to={`/user/personalize_story?story=${encodeURIComponent(booksData?.name)}`}>
              <button className="mobile-sticky-btn"><img src={magic_icon} alt="" />Personalize My Book</button>
            </Link>
          </div>


          {/* Reviews Section */}
          {/* <section id="testimonial" className="reviews-carousel">
          <h2 className="reviews-title">Reviews</h2>

          <section className={classes.testimonial_content}>
            <Slider {...testimonial}>
              {reviews?.map((review, index) => (
                <div key={`${review.id}-${index}`}>
                  <div className="review-card">
                    <StarRating rating={review.rating} />

                    <h3 className="review-title">
                      “{review.title}”
                    </h3>

                    <p className="review-text">
                      {review.text}
                    </p>

                    <div className="review-author">
                      <div className="author-avatar">
                        <img src={review.image} alt={review.author} />
                      </div>
                      <p className="author-name">{review.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        </section> */}

          {/* <section className="reviews-carousel">
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
                        <img src={review.image} alt={review.author} />
                      </div>
                      <p className="author-name">{review.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots *
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
        </section> */}

          {/* Banner */}
          <section className={`${classes.make_story_special2}`}>
            <section className={`${classes.banner} ${classes.section__space}`}>
              <section
                style={{ backgroundImage: `url(${ismobile ? bannerMob_img : banner_img})`, }}
                className={`${classes.container} ${classes.section__container__space}`}
              >
                <section className={`${classes.content}`} >
                  {ismobile ? <h2 className={`${classes.section__title}`}>&nbsp;
                  </h2> : <h2 className={`${classes.section__title}`}>
                    Make storytime special with a book starring your child!
                  </h2>}
                  <section
                    className={`${classes.button__primary__container3}`}
                    onClick={() => navigate("/user/coming-soon")}
                  >
                    <button
                      className={`${classes.button__primary3} ${classes.button__primary__l}`}
                    >
                      <img src={magic_icon} alt="" />
                      <p>Create Your Personalized Story Now</p>{" "}
                    </button>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
        <div style={{ marginTop: '-8%' }}>
          <Footer />
        </div>
      </>}
    </>
  );
}
