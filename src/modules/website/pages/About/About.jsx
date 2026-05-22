import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
// import { Header } from "../../components/header/header";
import Header from "../../../web/features/Header/Header";

// images
import about_img_left from "../../assets/image/about-img-left.png";
import table_file from "../../assets/image/tabler-file-filled.png";
import about_img_right from "../../assets/image/about-img-right.png";
import about_dotted_line from "../../assets/image/about-dotted-line.png";
import falling_star from "../../assets/image/falling-star.png";
import Jothi_Varadharajan from "../../assets/image/Jothi-Varadharajan.png";
import Paper_Break from "../../assets/image/paper-break.png";
import Nisha_rajakumar from "../../assets/image/Nisha-rajakumar.png";
import perfect_photo from "../../assets/image/perfect-photo-tip.png";
import stric_info from "../../assets/image/stric-info.png";
import lucide_infoo from "../../assets/image/lucide_info.png";

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
    } catch {}
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
    } catch {}
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
  } catch {}
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

const About = () => {
  const [showButton, setShowButton] = useState(false);
    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <Header />
      <section className="about-page">
        <div className="about-page-banner">
          <div className="container">
            <div className="df f-w jc ae" style={{ color: "#fff" }}>
              <div className="col-lg-6 col-12" style={{ color: "#fff" }}>
                <h2>
                  We are <br />
                  KADHASTER
                </h2>
                <p>
                  In today’s screen-driven world, the magic of reading and
                  imagination is slowly slipping away. Kadhaster was created to
                  bring that magic back
                </p>
                <p>
                  Our interactive stories are designed to feel personal, where
                  children see themselves in the characters and step into
                  adventures that are truly their own
                </p>
              </div>
              <div className="col-lg-6 col-12 ps-lg-3 ps-0">
                <p>
                  Every page is crafted to spark curiosity, nurture family
                  connections and inspire lessons that matter. With Kadhaster,
                  reading becomes more than just an activity, it’s a journey of
                  imagination, bonding and growth that children will carry with
                  them long after the story ends
                </p>
                <h6>
                  “Kadhaster - Stories Relived. Real Bonds. <br />Beyond the Screen”
                </h6>
              </div>
            </div>
          </div>
          
        </div>
        <div className="paper-break">
            <img src={Paper_Break} alt="" />
          </div>
        {/* 
        <button className="show-preview-btn">
        <img src={table_file} alt="" />
      <span>Show Preview</span>
    </button> */}




        {/* tooltip starts */}
        {/* <div className="text-center">

          <div className="tooltip-container">

            <button className="info-btn">
              <img src={lucide_infoo} /> Photo Uploading Tips
            </button>

            <span className="tooltip-text">
              <div className="photo-tips">
                <h2>Tips for the Perfect Photo!</h2>
                <p className="tips-intro">
                  To ensure the character appears clearly in the personalised book, follow these photo guidelines:
                </p>
                <ul className="mt-3 ul_tag">
                  <li className="li_tag">1 clear headshot of the person</li>
                  <li className="li_tag">Solo photo only — no one else in the frame</li>
                  <li className="li_tag">The face should be looking straight and smiling</li>
                  <li className="li_tag">Use a plain white or light background</li>
                </ul>
                <h6>Make sure the photo:</h6>
                <ul className="mt-3 ul_tag">
                  <li className="li_tag">1 clear headshot of the person</li>
                  <li className="li_tag">Solo photo only — no one else in the frame</li>
                  <li className="li_tag">The face should be looking straight and smiling</li>
                  <li className="li_tag">Use a plain white or light background</li>
                </ul>
                <div className="strict-div">
                  <div className="df">
                    <div className="st-ic">
                      <img src={stric_info} />
                    </div>
                    <p>Strict data privacy is our commitment. Your information is handled with the utmost care and in accordance with robust standards.</p>
                  </div>
                </div>

                <h5>Need Help?</h5>
                <p>See our sample photo below for an ideal example!</p>

                <div className="photo-grid">
                  <div className="photo-box">
                    <img src={perfect_photo} />
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div> */}

        {/* tooltip ends */}

        <div class="about-page-content my_40">
          <div className="container">
            <br />
            <h2 class="title-40px">The Birth of KADHASTER</h2>
            <div class="text-center my_30">
              <h4>
                <span>In every child’s story, there’s a spark. </span>
                <br />
                In Kadhaster’s story, there are two.
              </h4>
            </div>
          </div>
          <div class="df f-w jc ac pf-5per">
            <div class="col-md-8 col-sm-6 mt-4">
              <p>
                With a heart tuned to wonder and a mind that never stops
                imagining, Varadha has always believed that children deserve
                more than screens and soulless content. His ideas leap beyond
                the ordinary —A lifelong dreamer and tech visionary, he imagined
                a platform where children could see themselves in magical books
                — not just as readers, but as the heroes.
              </p>
            </div>
            <div class="col-md-4 col-sm-6 ps-sm-4 ps-0  mt-4">
              <img className="w-100" src={about_img_right} alt="" />
            </div>
          </div>
          <div className="dott-img text-center">
            <img src={about_dotted_line} alt="" />
          </div>
          <div class="df f-wr jc ac pr-5per">
            <div class="col-md-4 col-sm-6 pe-sm-4 pe-0  mt-4">
              <img className="w-100" src={about_img_left} alt="" />
            </div>
            <div class="col-md-8 col-sm-6 mt-4">
              <p>
                Nisha, a nurturing mother of two, a listener, and a quiet observer of the parenting world, saw first-hand
                how difficult it is to raise children in a screen-saturated world. She wanted stories that teach timeless
                values and create real bonding between parent and child. With her nurturing spirit and thoughtful clarity,
                she brought balance, structure, and soul to Kadhaster. Her parental intuition shaped the way stories speak
                to the heart of every family.
              </p>
            </div>
          </div>

          <div className="about-storytelling my_40">
            <div className="container">
              <h6>
                Together, they built Kadhaster — a personalized storytelling
                platform where:
              </h6>
              <div className="story-telling">
                <div className="story-card gradient-border ">
                  <p>Every child is the hero</p>
                </div>
                <div className="story-card gradient-border ">
                  <p>Every story carries meaning and magic</p>
                </div>
                <div className="story-card gradient-border ">
                  <p>Every page brings families closer together</p>
                </div>
              </div>
            </div>
          </div>

          <div className="our-leader my_40">
            <div className="container">
              <div className="df ac">
                <div className="fal-str">
                  <img src={falling_star} alt="" />
                </div>
                <h5>Today, KADHASTER is that promise fulfilled.</h5>
              </div>
              <h6>
                Born from Varadha’s wild dream and Nisha’s motherly wisdom, it
                gives children what screens can’t — stories where they star as
                heroes, families bond, and timeless values shine.
              </h6>
              <div className="our-leader-tit mt-5">
                <h2 className="title-40px">Our Leaders</h2>
                <h3>Visionary minds that inspire and shape us</h3>
              </div>

              {/* Leader Cards */}
              <div className="df f-w j-sb">
                <div className="col-md-5 col-12 mt-5">
                  <div className="leader-card">
                    <img src={Jothi_Varadharajan} alt="" data-bs-toggle="modal" data-bs-target="#jothiModal" />
                    <h3>Jothi Varadharajan</h3>
                    <h4>Founder & Chairman</h4>
                  </div>
                </div>

                <div className="col-md-5 col-12 mt-5">
                  <div className="leader-card">
                    <img src={Nisha_rajakumar} alt="" data-bs-toggle="modal" data-bs-target="#nishaModal" />
                    <h3>Nisha Rajakumar</h3>
                    <h4>Co-Founder & CEO</h4>
                  </div>
                </div>
              </div>

              {/* Modal Example */}
              <div className="modal fade" id="jothiModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-0">
                      <div className="row g-0">
                        <div className="col-md-5">
                          <img src={Jothi_Varadharajan} alt="Jothi Varadharajan" className="img-fluid" />
                        </div>

                        <div className="col-md-7 p-4" style={{ marginTop: '-20px' }}>
                          <h2 className="mb-2 custom-font">Jothi Varadharajan</h2>
                          <h5 className="text-muted mb-4">Founder & Chairman</h5>

                          {/* First paragraph - right side */}
                          <p style={{
                            textAlign: 'justify', lineHeight: '1.6', marginBottom: '1.5rem', marginTop: '-20px'
                          }}>
                            A visionary leader, Founder and Chairman of Kadhaster, established in 2024 with a vision to reimagine children's learning through meaningful, personalised storytelling. With over 13 years of experience in International Sales, marketing, and business strategy, he has led global growth initiatives across exports, partnerships, and techno-commercial operations. 
                          </p>
                        </div>
                      </div>

                      {/* Second paragraph - full width below image and text */}
                      <div className="px-4 pb-4" style={{ marginTop: '-20px' }}>
                        <p style={{ textAlign: 'justify', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                          Varadha founded Kadhaster driven by a deeply held belief that innovation should create positive, sustainable impact, especially in shaping young minds through creativity and values. Today, he leads Kadhaster's strategic direction, partnerships, and expansion roadmap, focused on scaling the platform into a globally impactful ecosystem for children, families, and schools.
                        </p>

                        {/* Third paragraph
                        <p className="mb-0" style={{ textAlign: 'justify', lineHeight: '1.6' }}>
                          Professional club cricketer - Adventure trekker & Road trip Biker.
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nisha Rajakumar Modal */}
              <div className="modal fade" id="nishaModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-0">
                      <div className="row g-0">
                        <div className="col-md-5">
                          <img src={Nisha_rajakumar} alt="Jothi Varadharajan" className="img-fluid" />
                        </div>

                        <div className="col-md-7 p-4" style={{ marginTop: '-20px' }}>
                         <h2 className="mb-2 custom-font">Nisha Rajakumar</h2>
                          <h5 className="text-muted mb-4">Co-Founder & CEO</h5>

                          {/* First paragraph - right side */}
                          <p style={{ textAlign: 'justify', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            Nisha, a proud mother of two, co-founder Kadhaster, with a mission to transform the way children engage with reading through deeply personalised, value-driven storytelling. With over 8 years of experience in technology and data solutions, delivering end-to-end BI solutions and driving data-led decision making, she brings structure and innovation into stories that feels warm, real, and meaningful.
                          </p>
                        </div>
                      </div>

                      {/* Second paragraph - full width below image and text */}
                      <div className="px-4 pb-4" style={{ marginTop: '-20px' }}>
                        <p style={{ textAlign: 'justify', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                          Guided by a strong belief that technology should nurture imagination, emotional intelligence, and meaningful family connections, she plays a key role in shaping product vision and building scalable, AI-powered solutions, focused on creating lasting learning experiences that strengthen family bonds and inspire a lifelong love for reading. Through Kadhaster, she is committed to creating stories that children don't just read, but truly feel and remember.
                        </p>
                        {/* <p style={{ textAlign: 'justify', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                          My passion lies at the intersection of technology, education, and imagination. With a vision to
                          revolutionize the way children experience storytelling, I work to bridge the gap between
                          cutting-edge AI solutions and the timeless joy of family values. Through Kadhaster, we’re not just
                          creating books; we’re building lasting memories, strengthening family bonds, and inspiring a
                          lifelong love for reading.
                        </p>

                        
                        <p className="mb-0" style={{ textAlign: 'justify', lineHeight: '1.6' }}>
                          Beyond work, I am also a proud mother of two, and it is through motherhood that I draw daily
                          inspiration for my work. Parenting has given me unique insights into the challenges modern
                          families face — from screen-time struggles to the need for meaningful connections — and those
                          insights fuel my mission to create solutions that truly matter.
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /><br />
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
    </>
  );
};
export default About;