import React, { useCallback, useRef, useState, useEffect } from "react"
import classes from "./BrowseProducts.module.css"
import BookCard from "./BookCard"
import SearchBar from "../../components/UI/Search/Search"
import { useNavigate, useOutletContext } from "react-router-dom"
import useApiHttp from "../../hooks/ues-http"
import debounce from "lodash/debounce"

// whats new
import what_new1 from "../../assets/image/what-new1.png";
import what_new2 from "../../assets/image/what-new2.png";
import what_new3 from "../../assets/image/what-new3.png";
import what_new4 from "../../assets/image/what-new4.png";
import what_new5 from "../../assets/image/what-new5.png";

import Slider from "react-slick";
import { Footer } from "../../../website/components/footer/footer"
import CustomeSlecter from "../../../admin/components/UI/Dropdown/CustomeSlecter"
import CustomeSlecterBlack from "../../../admin/components/UI/Dropdown/CustomeSlecterBlack"
import EmblaCarouselAuto from "../../../website/components/carousel-autoplay/embla-auto"
import EmblaCarouselAuto2 from "../../../website/components/carousel-autoplay/embla-auto2"

// find scrollable element
function getScrollableContainer() {
  const candidates = [
    document.querySelector(".container-fluid"),
    document.querySelector("#root"),
    document.querySelector(".app"),
    document.querySelector(".main"),
    document.scrollingElement,
    document.documentElement,
    document.body,
  ];

  for (const el of candidates) {
    if (!el) continue;
    try {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      if (
        el.scrollHeight > el.clientHeight &&
        /(auto|scroll|overlay|visible)/.test(overflowY)
      ) {
        return el;
      }
    } catch { }
  }

  const all = document.querySelectorAll("body *");
  for (const el of all) {
    try {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      if (
        el.scrollHeight > el.clientHeight &&
        /(auto|scroll|overlay|visible)/.test(overflowY)
      ) {
        return el;
      }
    } catch { }
  }

  return (
    document.scrollingElement || document.documentElement || document.body
  );
}

// smooth scroll to top
function smoothScrollToTop(el) {
  if (!el) return;
  const isDocument =
    el === document.scrollingElement ||
    el === document.documentElement ||
    el === document.body;

  try {
    if (isDocument) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else {
      el.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  } catch { }
}

// handler
function handleBackToTop() {
  function isScrollable(el) {
    if (!el) return false;
    try {
      return el.scrollHeight > el.clientHeight && window.getComputedStyle(el).overflowY !== 'hidden';
    } catch {
      return false;
    }
  }
  const targets = new Set();
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    if (isScrollable(el) && el.scrollTop > 0) targets.add(el);
  }

  const common = [
    document.querySelector('#scroll-container'),
    document.querySelector('.container-fluid'),
    document.querySelector('#root'),
    document.querySelector('.app'),
    document.querySelector('.main'),
  ];
  for (const el of common) {
    if (el && isScrollable(el) && el.scrollTop > 0) targets.add(el);
  }

  const windowScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if (windowScroll > 0) {
    const docEl = document.scrollingElement || document.documentElement || document.body;
    targets.add(docEl);
  }
  if (targets.size === 0) {
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
    return;
  }
  const duration = 500;
  const startTime = performance.now();

  const starts = [];
  for (const el of targets) {
    const isDoc = (el === document.scrollingElement || el === document.documentElement || el === document.body);
    const start = isDoc ? (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) : el.scrollTop;
    starts.push({ el, start, isDoc });
  }

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function step(now) {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    const eased = easeOutCubic(t);

    for (const item of starts) {
      const targetY = 0;
      const current = Math.round(item.start + (targetY - item.start) * eased);
      if (item.isDoc) {
        try {
          window.scrollTo(0, current);
        } catch {
          document.documentElement.scrollTop = current;
          document.body.scrollTop = current;
        }
      } else {
        item.el.scrollTop = current;
      }
    }

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      // final set to ensure exact 0 position
      for (const item of starts) {
        if (item.isDoc) {
          try { window.scrollTo(0, 0); } catch { document.documentElement.scrollTop = 0; document.body.scrollTop = 0; }
        } else {
          item.el.scrollTop = 0;
        }
      }
    }
  }

  requestAnimationFrame(step);
}






function BrowseProducts() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const loaderRef = useRef(null)
  const cardRefs = useRef([])

  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isFetching, setIsFetching] = useState(false)

  const [searchVlue, setSearchVlue] = useState("")
  const [age, setAge] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [activeIndex, setActiveIndex] = useState(null)

  const [ageData, setAgeData] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [newBookes, setNewBooks] = useState({
    featured_books: [],
    new_books: []
  })
  const [allFilter, setAllFilter] = useState({
    categories: [],
    ageGroup: []
  })
  const [bookTypeData, setBookTypeData] = useState([])
  const [bookType, setBookType] = useState("")
  const { sendRequest } = useApiHttp()

  useEffect(() => {
    sendRequest({ url: "user/drop-down/category" }, res => {
      if (res?.data) {
        setAllFilter((val) => ({ ...val, categories: res.data }))
        setCategoriesData(res.data)
      }
    })
    sendRequest({ url: "user/drop-down/age-group" }, res => {
      setAllFilter((val) => ({ ...val, ageGroup: [{ id: "", name: "All" }, ...res?.data] }))
      setAgeData([{ id: "", name: "All" }, ...res?.data] || [])
    })
    sendRequest({ url: "user/drop-down/book-type-category" }, res => {
      setBookTypeData(res?.data || [])
    })
    sendRequest({
      url: "user/products/book-feature-new", method: "POST",
      body: {}
    }, res => {
      setNewBooks(res?.data)
      // setBookTypeData(res?.data || [])
    })
  }, [])


  const getCategoryAndAge = (id) => {
    setCategoriesData([])
    setAgeData([])
    setAge("")
    setSelectedCategory("")
    if (id) {
      sendRequest({ url: `user/drop-down/category-age-group?book_type_category_id=${id}` }, res => {
        if (res.data?.categories?.length > 0) {
          setCategoriesData(res.data?.categories)
        }
        if (res.data?.age_groups?.length > 0) {
          setAgeData([{ id: "", name: "All" }, ...res?.data?.age_groups] || [])
        }
      })
    } else {
      setCategoriesData(allFilter.categories)
      setAgeData(allFilter.ageGroup)
    }
  }



  const fetchBooks = useCallback(
    debounce((currentPage = 1) => {
      setIsFetching(true)
      sendRequest(
        {
          url: "user/products/book-list",
          method: "POST",
          body: {
            page: currentPage,
            per_page: 50,
            type: "",
            search: searchVlue,
            filter: {
              category_id: age,
              age_group_id: selectedCategory,
              book_type_category_id: bookType,
            },
          },
        },
        res => {
          setBooks(prev =>
            currentPage === 1
              ? res?.data?.books || []
              : [...prev, ...(res?.data?.books || [])]
          )
          setTotal(res?.data?.total || 0)
          setIsFetching(false)
        }
      )
    }, 500),
    [searchVlue, age, selectedCategory, bookType]
  )

  useEffect(() => {
    setPage(1)
    fetchBooks(1)
  }, [searchVlue, age, selectedCategory, bookType])

  useEffect(() => {
    if (page > 1 && !isFetching) {
      fetchBooks(page)
    }
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetching && books.length < total) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 1.0 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [isFetching, books, total])

  useEffect(() => {
    const handleClickOutside = event => {
      const clickedInsideAny = cardRefs.current.some(ref =>
        ref?.contains(event.target)
      )
      if (!clickedInsideAny) {
        setActiveIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggle = index => {
    setActiveIndex(prev => (prev === index ? null : index))
  }
  const clearAll = () => {
    setAge("")
    setBookType("")
    setSearchVlue("")
    setSelectedCategory("")
    setCategoriesData(allFilter.categories)
    setAgeData(allFilter.ageGroup)
  }


  const whats_new = {
    arrows: true,
    infinite: newBookes?.new_books?.length > 3 ? true : false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  const feature_slide = {
    arrows: true,
    infinite: newBookes?.featured_books?.length > 3 ? true : false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    console.log(element);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Update URL with section ID without page reload
      window.history.pushState(null, null, `#${sectionId}`);
    }
  };

  const { showButton, scrollRef } = useOutletContext();

  const [carouselIndex, setCarouselIndex] = useState(0);
  const tabWidth = window.innerHeight <= 1024;

  return (
    <div className={classes.our_product_page}>

      <div className={classes.page_banner}>

        <div className={classes.container}>
          {/* <div className={classes.breadcrumb}>
        <span onClick={() => navigate("/user")}>Our Products</span> &gt;{" "}
        <span className={classes.active}>Browse our products</span>
      </div> */}

          <h1 className={classes.heading}>Browse our products</h1>

          <div className={classes.filters}>
            <CustomeSlecterBlack
              data={bookTypeData.map(a => ({ label: a.name, value: a.id }))}
              title="Choose Collection"
              width="200px"
              value={bookType}
              onChange={e => { getCategoryAndAge(e.target.value); setBookType(e.target.value) }}
              borders={true}
              page={true}
              all={true}
            />
            <CustomeSlecterBlack
              data={categoriesData.map(a => ({ label: a.name, value: a.id }))}
              title="Choose categories"
              width="200px"
              value={age}
              onChange={e => setAge(e.target.value)}
              borders={true}
              page={true}
              all={true}
            />

            <SearchBar
              placeholder="Search products..."
              onSearchChange={value => setSearchVlue(value)}
              maxWidth="100%"
            />
          </div>

          <div className={classes.categories}>
            {/* <CustomIcon /> */}
            {ageData?.length > 0 && <p className={`${classes.categories_lable}`}>Age</p>}
            {ageData.map(cat => (
              <button
                key={cat.id}
                className={`${classes.tag} ${selectedCategory === cat.id ? classes.active : ""
                  }`}
                onClick={() =>
                  setSelectedCategory(prev => (prev === cat.id ? "" : cat.id))
                }
              >
                {cat.name}
              </button>
            ))}
            <span className={classes.clearall} onClick={clearAll}>
              clear all
            </span>
          </div>
        </div>
      </div>

      <div className={classes.our_product_list_bg}>
        <div className={classes.container}>
          <div className={classes.grid_set} ref={containerRef}>
            <div className={classes.grid} >
              {books.map((book, i) => (
                <BookCard
                  ref={el => (cardRefs.current[i] = el)}
                  data={book}
                  key={i}
                  index={i}
                  isActive={activeIndex === i}
                  onToggle={handleToggle}
                  {...book}
                />
              ))}

              <div
                ref={loaderRef}
                className={classes.loader}
                style={{
                  width: "100%",
                  height: "50px",
                  visibility: isFetching ? "visible" : "hidden",
                  color: '#000'
                }}
              >
                {isFetching && "Loading more books..."}
              </div>
            </div>
            {books.length === 0 && !isFetching && (
              <div className={classes.noDataFound}>No Data Found</div>
            )}
          </div>

          {/* what new section starts */}

          {newBookes?.new_books?.length > 0 &&
            <div className={classes.whats_new_section}>
              <div className={classes.title_section}>
                <h2 className={`${classes.bookTitle} mx-2 mx-md-4 mx-lg-5 text-center text-md-start`}>What’s New?</h2>
              </div>
              {/* <div className="whats_new_car">
              <Slider {...whats_new}>
                {newBookes?.new_books?.map((item, ind) => {
                  return (<div className={`${classes.product_card} ${classes.whats_new_bg}`} key={ind} onClick={() => {
                    navigate("/user/books");
                    localStorage.storyId = item?.id;
                    localStorage.name = item?.name;
                  }}>
                    <div className={classes.product_thumb_img}>
                      <img src={item?.book_cover} alt="" />
                    </div>
                    <div className={classes.bookContent}>
                      <h4 className={classes.bookTitle}>{item?.name}</h4>
                      <div className={classes.tooltipContainer}>
                        <p className={classes.bookDesc}></p>
                      </div>
                      <h6>"{item?.book_type_category}"</h6>
                    </div>
                  </div>)
                })}
              </Slider>

            </div> */}

              <EmblaCarouselAuto2
                setCarouselIndex={setCarouselIndex}
                options={{ loop: true, watchDrag: tabWidth }}
              >
                {newBookes?.new_books?.map((item, ind) => {
                  return (
                    <div className="embla__auto__slide2" key={ind} onClick={() => {
                      navigate("/user/books");
                      localStorage.storyId = item?.id;
                      localStorage.name = item?.name;
                    }}>
                      <div className={`${classes.product_card} ${classes.whats_new_bg}`}  >
                        <div className={classes.product_thumb_img}>
                          <img src={item?.book_cover} alt=""
                            draggable={false}
                            onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                        </div>
                        <div className={classes.bookContent}>
                          <h4 className={classes.bookTitle}>{item?.name}</h4>
                          <div className={classes.tooltipContainer}>
                            <p className={classes.bookDesc}></p>
                          </div>
                          <h6>"{item?.book_type_category}"</h6>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </EmblaCarouselAuto2>

            </div>}

          {/* what new section ends */}

          {/* featured book section starts */}

          {newBookes?.featured_books?.length > 0 &&
            <div className={classes.whats_new_section2}>
              <div className={classes.title_section}>
                <h2 className={`${classes.bookTitle} mx-2 mx-md-4 mx-lg-5 text-center text-md-start`}>Featured book of the month</h2>
              </div>
              {/* <div className="whats_new_car">
                <Slider {...feature_slide}>
                  {newBookes?.featured_books?.map((item, ind) => {
                    return (<div className={`${classes.product_card} ${classes.featured_book_bg}`} key={ind} onClick={() => {
                      navigate("/user/books");
                      localStorage.storyId = item?.id;
                      localStorage.name = item?.name;
                    }}>
                      <div className={classes.product_thumb_img}>
                        <img src={item?.book_cover} alt="" />
                      </div>
                      <div className={classes.bookContent}>
                        <h4 className={classes.bookTitle}>{item?.name}</h4>
                        <div className={classes.tooltipContainer}>
                          <p className={classes.bookDesc}></p>
                        </div>
                        <h6>"{item?.book_type_category}"</h6>
                      </div>
                    </div>)
                  })}
                </Slider>
              </div> */}
              <EmblaCarouselAuto2
                setCarouselIndex={setCarouselIndex}
                options={{ loop: true, watchDrag: tabWidth }}
              >
                {newBookes?.featured_books?.map((item, ind) => {
                  return (
                    <div className="embla__auto__slide2" key={ind} onClick={() => {
                      navigate("/user/books");
                      localStorage.storyId = item?.id;
                      localStorage.name = item?.name;
                    }}>
                      <div className={`${classes.product_card} ${classes.whats_new_bg}`} >
                        <div className={classes.product_thumb_img}>
                          <img src={item?.book_cover} alt=""
                            draggable={false}
                            onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                        </div>
                        <div className={classes.bookContent}>
                          <h4 className={classes.bookTitle}>
                            {item?.name?.length > 25
                              ? `${item?.name.slice(0, 25)}...`
                              : item?.name}
                          </h4>
                          <div className={classes.tooltipContainer}>
                            <p className={classes.bookDesc}></p>
                          </div>
                          <h6>"{item?.book_type_category?.length > 25
                            ? `${item?.book_type_category.slice(0, 25)}...`
                            : item?.book_type_category}"</h6>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </EmblaCarouselAuto2>
            </div>}
          {/* featured book section ends */}
        </div>
      </div>
      {/* Back to Top Button */}
      {showButton && (
        <button
          className="back-to-top-btn"
          onClick={handleBackToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
      <Footer />
    </div>
  )
}

export default BrowseProducts
