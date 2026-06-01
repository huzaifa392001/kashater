import { useState, useEffect } from "react";
import classes from "./Faq.module.css"
// import { Header } from "../../components/header/header"
import { Footer } from "../../components/footer/footer"
import plus_icon from "../../assets/image/svg/plus.svg"
import collapse_icon from "../../assets/image/svg/minus.svg"
import background_img from "../../assets/image/png/bg-img-terms-condition.png";
import background_img2 from "../../assets/image/png/2-bg-img-terms-condition.png";
import Header from "../../../web/features/Header/Header";

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


export const Faq = () => {
  const data = {

    faq: [
      {
        expanded: false,
        question: "What personal information do you collect ?",
        answer: `We collect basic information such as your name, email address, shipping address, payment details, and photos for personalization stored securely.`,
      },
      {
        expanded: false,
        question: "How is my personal information used?",
        answer: `Your personal information is used to process your orders, personalize your storybook, communicate with you about your purchases, and improve our services.`,
      },
      {
        expanded: false,
        question: "Is my payment information secure?",
        answer: `Yes, we use third-party payment processors that employ industry-standard encryption to ensure that your payment information is secure.`,
      },
      {
  expanded: false,
  question: "Can I preview my personalized storybook before ordering?",
  answer: (
    <>
      You can have a glimpse of how your personalized storybook will be. Check{" "}
      <a
        href="https://kadhaster.com/user/try-now"
        style={{ color: "#d82be8", fontFamily: "Quicksand-bold" }}
      >
        try now 
      </a>{" "}
      for free section.
    </>
  ),
},

      {
        expanded: false,
        question:
          "How can I update or change my order after it has been placed?",
        answer: `if you need to make changes to your order, please contact us within 24 hours at support@kadhaster.com . We can assist with cancellations or adjustments if the order hasn't yet been processed or shipped.`,
      },
      {
        expanded: false,
        question: "Do you ship internationally?",
        answer: `Currently, we offer shipping to UAE. If you are located outside of this area, please contact us for more information about potential international shipping.`,
      },
      {
        expanded: false,
        question: "How long will it take to receive my personalized storybook?",
        answer: `Processing and delivery times vary depending on your location. Typically, orders are processed within 2-3 business days, with delivery taking 5-7
business days after processing.`,
      },
      {
        expanded: false,
        question: "Can I cancel my order?",
        answer: `Orders can be canceled within 2 hours after purchase. After that, cancellations may not be possible due to the customization process.`,
      },
      {
        expanded: false,
        question: "How can I contact customer support?",
        answer: `You can reach our customer support team via email at
support@kadhaster.com, by phone at +91 8925925009, or through our contact
form on the website.`,
      },
      {
        expanded: false,
        question: "Do you offer gift cards or discounts?",
        answer: `Yes, we offer gift cards and occasional promotional discounts. Stay tuned to our website and newsletter for the latest offers!`,
      },
      {
        expanded: false,
        question: `Can I change the photo used for my personalized storybook after 
        placing the order?`,
        answer: `Once the order is placed, we begin processing the personalization. If you 
need to update the photo, please contact us as soon as possible before we 
begin production.`,
      },
      {
        expanded: false,
        question: `How do I know my information is protected?`,
        answer: `We take your privacy seriously. Our website uses SSL encryption to protect your data, and we never share your personal information without your consent.`,
      },
      {
        expanded: false,
        question: `What is the Size and quality of the book?`,
        answer: `Durable case binding with machine-coated glossy lamination, full colour, in A4 and A5 sizes.`,
      },
      {
        expanded: false,
        question: `Can I Order multiple books?`,
        answer: `Yes . you can add books to cart and checkout as usual.`,
      },
      {
        expanded: false,
        question: `Cancellation & Refund Policy`,
        answer: 
        (
          <>
          An order can be canceled within 24 hours of placement by emailing us at support@kadhaster.com. We will issue a partial{" "} 
          <a
        href="https://kadhaster.com/Refund-policy"
        style={{ color: "#d82be8", fontFamily: "Quicksand-bold" }}
      >
        refund
      </a>{" "}
       based on the cancellation reason.
If the book arrives damaged, notify us within 7 days of receiving the damaged item, and we will arrange for a resolution based on the situation.{" "} 
 <a
        href="https://kadhaster.com/Refund-policy"
        style={{ color: "#d82be8", fontFamily: "Quicksand-bold" }}
      >
        Refund
      </a>{" "} will be processed within 7 working days. Please note that additional time may be
required for the credit to appear in your account. If you have not received your refund
after 14 working days, kindly contact us at support@kadhaster.com.,
</>
),
      },
    ],
  }
  const [accordionIndex, setAccordionIndex] = useState(null)
  const toggleAccordion = index => {
    setAccordionIndex(prev => (prev || prev === 0 ? null : index))
  }
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <Header />
      <div
        className="container-fluid py-5 text-white"
        style={{
          backgroundImage: `url(${background_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <main className={classes.terms}>
          {/* <h1>FAQ</h1> */}
          <section className={`${classes.faq} ${classes.section__space}`}>
            <section
              className={`
                    ${classes.container}`}
            >
              <h1 className={classes.section__title}>
                Frequently Asked Questions?
              </h1> <br />
              <ul
                className={`${classes.content} ${classes.section__container__space}`}
              >
                {data.faq.map((item, i) => {
                  return (
                    <li>
                      <section>
                        <h3>
                          {i + 1 < 10 ? `0${i + 1}` : i + 1} &nbsp;{" "}
                          {item.question}
                        </h3>
                        <button
                          onClick={() => {
                            toggleAccordion(i)
                          }}
                        >
                          <img
                            src={accordionIndex === i ? collapse_icon : plus_icon}
                            alt=""
                          />
                        </button>
                      </section>
                      {accordionIndex === i && <p>{item.answer}</p>}
                      {i !== data.faq.length - 1 && (
                        <div className={`${classes.divider}`}></div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          </section>
        </main>
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
    </>
  )
}