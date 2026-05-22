import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
import Header from "../../../web/features/Header/Header";
import classes from "./delivery.module.css";
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
    <h1 className="delivery-head">Shipping & Delivery Policy</h1>
    <h1 className="delivery-sub-head">Last updated: 15-12-2025</h1>
    <h1 className="delivery-main-txt">This Shipping & Delivery Policy (“Policy”) sets out the terms and conditions governing the processing, dispatch, shipment, and delivery of products ordered through Kadhaster</h1>
    <h1 className="delivery-main-txt-2">This Shipping & Delivery Policy (“Policy”) forms an integral part of the Terms & Conditions of Kadhaster (“Company”, “we”, “us”, “our”). By placing an order on <strong>www.kadhaster.com</strong>, you (“Customer”, “you”, “your”) agree to be bound by this Policy. </h1>  

    <h1 className="delivery-main-txt-2">Kadhaster may update this Policy from time to time, and customers are encouraged to review it periodically to stay informed of any changes. For any queries, please contact us at <a href="support@kadhaster.com"><strong>support@kadhaster.com</strong></a></h1>

    <h1 className="delivery-head-1">1. Order Processing & Dispatch</h1>
    <h1 className="delivery-sub-1">
        • All orders are processed and dispatched within <strong>14 working days </strong>from the date of order confirmation, subject to successful payment verification. <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • In case of <strong>high order volumes, operational constraints, or unforeseen circumstances,</strong> dispatch may be delayed.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • In such situations, the Company will make reasonable efforts to <strong>notify the Customer via registered email address or phone number.</strong> <br /> 
    </h1>
    <h1 className="line"></h1> 
    <h1 className="delivery-head-1">2. Delivery Timelines</h1>
    <h1 className="delivery-sub-head">Domestic Shipping (India):</h1>
    <h1 className="delivery-sub-1">
        • Orders are typically delivered within <strong>14 working days </strong>from the date of dispatch. <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • In certain cases, delivery may take <strong>up to 28 working days,</strong> depending on location, courier operations, or other external factors beyond the Company’s control.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • All deliveries will be made to the <strong>shipping address provided by the Customer</strong> at the time of placing the order. <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • The Company shall not be responsible for <strong>delays or non-delivery due to incorrect or incomplete address details</strong> provided by the Customer. <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • Upon dispatch, the Customer will receive a <strong>Shipment Confirmation email </strong>containing tracking details. <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • Tracking information may take up to <strong>24 hours </strong>to become active, depending on the courier partner. <br /> 
    </h1>
    <h1 className="line"></h1> 
    <h1 className="delivery-head-1">3. Shipping Partners</h1>
    <h1 className="delivery-sub-1">
        • The Company engages <strong>reputed third-party courier and logistics service providers </strong> to ensure safe and reliable delivery across India and internationally. <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • Delivery timelines mentioned are <strong>estimated timelines only </strong>and shall not be construed as guaranteed delivery dates.
 <br /> 
    </h1>
    <h1 className="line"></h1>
    <h1 className="delivery-head-1">4. Damaged, Defective, or Incorrect Products</h1>
    <h1 className="delivery-sub-1">
        • If a product received is <strong>damaged, defective, or materially different </strong>from the order placed, the Customer must notify the Company within <strong>24 hours of delivery.</strong> <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • The Customer may be required to submit <strong>photographic or video evidence </strong> of the damaged or incorrect product and packaging for verification.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • Requests raised <strong>beyond 24 hours of delivery </strong> may not be eligible for resolution.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • Eligibility, timelines, and procedures for returns are governed by the Company’s <strong>Cancellation & Refund Policy,</strong> which must be read in conjunction with this Policy.
 <br /> 
    </h1>
    <h1 className="line"></h1>
    <h1 className="delivery-head-1">5. Loss or Damage During Transit</h1>
    <h1 className="delivery-sub-1">
        • The Company shall bear responsibility for products <strong>lost or damaged during transit,</strong> subject to verification. <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • If a shipment is <strong>not delivered within the stipulated timeline,</strong> the Customer shall be eligible for a <strong>full refund.</strong>
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • If a shipment is delivered in a damaged condition, upon successful verification, the Company will arrange a <strong>replacement shipment at no additional cost.</strong>
    </h1>
    

    <h1 className="line"></h1>
    <h1 className="delivery-head-1">6. Returns & Return Shipping</h1>
    <h1 className="delivery-sub-1">
        • For returns initiated by the Customer for reasons <strong>other than transit damage or defects,</strong> the <strong>return shipping costs shall be borne by the Customer.</strong> <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • All return-related terms are governed by the Company’s <strong>Cancellation & Refund Policy.</strong>
 <br /> 
    </h1>
    <h1 className="line"></h1>
    <h1 className="delivery-head-1">7. Customs, Duties, and Taxes</h1>
    <h1 className="delivery-sub-1">
        • For international shipments, any <strong>customs duties, taxes, levies, or additional charges</strong> imposed by authorities shall be <strong>solely borne by the Customer.</strong>
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • The Company shall not be liable for <strong>delays or non-delivery caused due to customs clearance or regulatory procedures</strong> of the destination country.
 <br /> 
    </h1>
    <h1 className="line"></h1>
    <h1 className="delivery-head-1">8. International Shipping</h1>
    <h1 className="delivery-sub-1">
        • International orders are shipped through reputed carriers such as <strong>DHL, UPS,</strong> or equivalent logistics providers.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • The Company’s support team will contact the Customer regarding <strong>additional international shipping charges</strong> prior to dispatch.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • International deliveries may take <strong>up to 60 days</strong> from the date of dispatch.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • If an international shipment is not delivered within <strong>60 days,</strong> the Customer shall be entitled to a <strong>full refund of the order amount.</strong>
 <br /> 
    </h1>
    <h1 className="line"></h1>
    <h1 className="delivery-head-1">9. Limitation of Liability</h1>
    <h1 className="delivery-sub-1">
        • The Company shall not be liable for <strong>delivery delays or failures </strong>caused by events beyond its reasonable control, including but not limited to natural disasters, strikes, government actions, pandemics, or courier service disruptions.
 <br /> 
    </h1>
    <h1 className="line"></h1>
    <h1 className="delivery-head-1">10. DISPUTE RESOLUTION 
</h1>
    <h1 className="delivery-sub-1">
        • In the event of any dispute, controversy, or claim arising out of or relating to this Shipping and Delivery Policy , the parties shall first attempt to resolve the matter amicably through good-faith negotiations.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • If such negotiation does not resolve the dispute within <strong>30 (thirty) days</strong>, the matter shall be referred to <strong>arbitration</strong> in accordance with the provisions of the <strong>Arbitration and Conciliation Act, 1996,</strong> as amended from time to time.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • The arbitration shall be conducted by a <strong>sole arbitrator</strong>, mutually appointed by both parties. If the parties are unable to mutually agree on the arbitrator within 30 days, the arbitrator shall be appointed in accordance with Section 11 of the Arbitration and Conciliation Act, 1996.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • The seat and venue of arbitration shall be <strong>Chennai, Tamil Nadu, India.</strong>
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • The language of arbitration shall be <strong>English.</strong>
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • The arbitration proceedings shall be conducted in accordance with the provisions of the Arbitration and Conciliation Act, 1996, and where applicable, institutional or ad hoc rules agreed between the parties.
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        •  The arbitral award shall be <strong>final and binding </strong>on the parties, and may be enforced in any court having appropriate jurisdiction.
 <br /> 
    </h1>
    <h1 className="line"></h1>
    <h1 className="delivery-head-1">11. Governing Law & Jurisdiction</h1>
    <h1 className="delivery-sub-1">
        • This Policy shall be governed by and construed in accordance with the <strong>laws of India.</strong>
 <br /> 
    </h1>
    <h1 className="delivery-sub-1">
        • Any disputes arising under this Policy shall be subject to the <strong>exclusive jurisdiction of the courts in Chennai.</strong>
 <br /> 
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
