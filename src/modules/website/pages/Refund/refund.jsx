import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
import Header from "../../../web/features/Header/Header";
import classes from "./refund.module.css";
import background_img from "../../assets/image/png/bg-img-terms-condition.png";
import background_img2 from "../../assets/image/png/2-bg-img-terms-condition.png";
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


const Terms = () => {
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
      <div
  className="container-fluid py-5 text-white"
  style={{
    backgroundImage: `url(${background_img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
    <h1 className="delivery-head">Return, Refund & Cancellation Policy</h1>
    <h1 className="delivery-sub-head"><strong>Last Updated: January 2026</strong></h1>

    <h1 className="delivery-main-txt">Kadhaster is committed to ensuring an easy and transparent post-purchase experience for all their customers. All customers must review the conditions below before requesting a return/refund/cancellation.</h1>

    <h1 className="delivery-main-txt">This Return, Refund & Cancellation Policy (“Policy”) forms an integral part of the <strong>Terms & Conditions</strong> of Kadhaster (“Company”, “we”, “us”, “our”). <br /> By placing an order on <a href="www.KADHASTER.com" className="delivery-main-txt-strong"><strong>www.KADHASTER.com</strong></a>, you (“Customer”, “you”, “your”) agree to be bound by this Policy.</h1>

    <h1 className="delivery-main-txt-2">For any queries, please contact us at <a href="support@kadhaster.com"><strong>support@kadhaster.com</strong></a>.</h1>
    <h1 className="line"></h1> 

    <h1 className="refund-head-txt-2">Eligibility for Returns / Refund/ Cancellation:</h1>
    <h1 className="refund-txt-1">All requests for returns and refunds are subject to <strong>inspection and verification</strong> by the Company. Refunds, where applicable, shall be processed only after successful verification of the returned product or confirmation of such cancellation eligibility.</h1>
    <h1 className="refund-txt-2">A product shall be eligible for return, refund, or cancellation only <strong>if all applicable conditions set out below are satisfied:</strong></h1>
    <h1 className="refund-sub-1">
        i) Products purchased from <a href="https://www.kadhaster.com"><strong>https://www.kadhaster.com</strong></a> that are <strong>damaged, defective, or incorrectly delivered</strong> are eligible for return or replacement within <strong>10 days from the date of delivery.</strong>
        <br /> <br />
        ii) The product is <strong>returned unused and in its original condition,</strong> along with original packaging and any other items supplied with the product at the time of delivery.
        <br /> <br />
        iii) The product has <strong>not been damaged while in the Customer’s possession,</strong> including due to improper handling, misuse, negligence, exposure to moisture, or unauthorized modification or repair.
        <br /> <br />
        iv)Where the issue relates to quality, printing, personalization, technical error, or content-related concerns, the Company may, at its discretion, require additional information or conduct verification before approving a return, refund, or replacement.
        <br /> <br />
        v) A request based on <strong>change of mind</strong> may be considered only where the product remains unused, unpersonalized, and in its original packaging.
        <br /> <br />
        vi) Orders reported <strong>after 10 days of delivery</strong> are not eligible for refunds, but may be considered for replacement, subject to verification.
        <br /> 
    </h1>
    <h1 className="refund-txt-1"><strong>Note:</strong> For the purpose of this policy, “new and unused” means the product has not been used in any manner and is in the same condition as received. </h1>
    <h1 className="refund-txt-1">Non-Eligible Products and Requests</h1>
    <h1 className="refund-txt-1">The following shall <strong>not be eligible</strong> for return, refund, or cancellation:</h1>
    <h1 className="refund-txt-1">i. Products showing signs of misuse, negligence, alteration, or tampering after delivery.</h1>
    <h1 className="refund-txt-1">ii. Products that are customized, personalized, or made-to-order, except where delivered in a damaged or defective condition.</h1>
    <h1 className="refund-txt-1">iii. Products returned without original packaging, components, or accompanying materials supplied at the time of delivery.
</h1>
    <h1 className="refund-txt-1">v. Orders reported outside the applicable return, refund, or cancellation window.
</h1>
    <h1 className="refund-txt-1">vi. International orders, except where otherwise required under applicable law or where the product is delivered in a damaged or defective condition.
</h1>
    <h1 className="line"></h1> 
    <h1 className="refund-head-txt-2">Refund Process</h1>
    <h1 className="refund-txt-1">
        • To initiate a refund request, please email <a href="support@kadhaster.com" className="refund-sub-strong">support@kadhaster.com</a> with your <strong>Order ID </strong>and details of the issue.
        <br /> 
    </h1>
    <h1 className="refund-txt-1">
        • Upon receipt of the returned product, our support team will <strong>inspect and verify</strong> the request before approving the refund.
        <br /> 
    </h1>
    <h1 className="refund-txt-1">
        • If a personalized book is delivered in a <strong>damaged condition,</strong> you may opt for a <strong>free replacement</strong> or a <strong>full refund.</strong>
        <br /> 
    </h1>
    <h1 className="refund-txt-1">•Refunds shall be processed only after completion of verification and shall not include any charges or losses arising due to incorrect information provided by the Customer or delays attributable to third-party service providers.</h1>

    <h1 className="refund-txt-1">•Refunds will be processed within <strong>7 working days</strong> after approval. Once the refund request is approved, the refund shall be processed to the <strong>original payment method</strong> used at the time of purchase. Approved refunds shall be processed within <strong>seven (7) working days</strong> from the date of approval. Please note that it may take additional time for the refunded amount to reflect in your original payment method due to bank processing timelines.</h1>

    <h1 className="refund-txt-1">If the refund does not reflect within <strong>14 working days,</strong> you may contact us at <a href="support@kadhaster.com" className="refund-sub-strong">support@kadhaster.com</a> for assistance.</h1>
    <h1 className="line"></h1> 

    <h1 className="refund-head-txt-2">Misuse and Abuse Safeguard</h1>
    <h1 className="refund-txt-1">•The Company reserves the right to <strong>review, flag, or restrict accounts</strong> that exhibit excessive, repetitive, or abusive return, refund, or cancellation behavior, in accordance with applicable law.</h1>
    <h1 className="line"></h1>
    <h1 className="refund-head-txt-2">Cancellation Policy</h1>
    <h1 className="refund-txt-1">
        How to request Cancellation ?
        <br /> <br />
        Customers seeking to cancel an order must submit a cancellation request by:
    </h1>
    <h1 className="refund-txt-1">
        • Contacting the Company’s support team, and
        <br /> <br />
        • Sending a Cancellation confirmation email to <a href="support@kadhaster.com" className="refund-sub-strong">support@kadhaster.com</a>.
        <br /> <br />
        • All cancellation requests must clearly mention the Order ID in all Communications. 
        <br /> 
    </h1>
    <h1 className="line"></h1>
      <h1 className="refund-head-txt-2">Cancellation Window </h1>
      <h1 className="refund-txt-1">
        • Orders may be cancelled only before the order has been processed. 
        <br /> <br />
        • For the purposes of this Policy, an order shall be deemed to be processed once any of the following actions have commenced:
        <br /> <br />
    </h1>
      <h1 className="refund-txt-5">
        • personalization or customization of the product; 
        <br /> 
        • printing, production, or preparation of the product for dispatch; or
        <br /> 
        • handover of the order to a logistics or delivery partner.
    </h1>
    <h1 className="line"></h1>
      <h1 className="refund-head-txt-2">Cancellation Approval And Refund </h1>
      <h1 className="refund-txt-1">
        • All cancellation requests are subject to review and approval by the Company.  
        <br /> <br />
        • The Company shall communicate the acceptance or rejection of the cancellation request to the Customer within (      ) days of sending a confirmation email to <a href="support@kadhaster.com" className="refund-sub-strong">support@kadhaster.com</a>.
    </h1>
      <h1 className="refund-txt-1">
        • personalization or customization of the product; 
        <br /> <br />
        • Where a cancellation request is approved, the refund shall be processed to the <strong>original payment method</strong> used at the time of placing the order, within <strong>three (3) to four (4) working days</strong> from the date of approval.
    </h1>
    <h1 className="line"></h1>
    <h1 className="refund-head-txt-2">Refund Timelines And Delays  </h1>
     <h1 className="refund-txt-1">
        While the Company shall initiate the refund within the stipulated timeframe, the time taken for the refunded amount to reflect in the Customer’s account may vary.
    </h1>
    <br /><br />
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
  );
};
export default Terms;
