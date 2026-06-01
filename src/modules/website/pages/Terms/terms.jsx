import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
import classes from "../Privacy/privacy.module.css";
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

const Privacy = () => {
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

        <h1 className="text-1">Privacy Policy</h1>
        <h1 className="terms-text-1">Effective Date: January 2026</h1>
        <br />
        {/* <h1 className="terms-text-2">Overview</h1> */}
        <p className="para-1">
          <strong>Kadhaster</strong> values the trust placed in it by parents, guardians and users of this platform, particularly where personal data relating to children is involved. This Privacy Policy governs the manner in which <strong>Kadhaster</strong> ( <strong>powered by Comicode AI Solutions Private Limited</strong>) collects, uses, stores, protects, maintains and discloses information collected from the users of its platform. This Privacy Policy applies to the Site and all it’s products and services offered by <strong>Kadhaster</strong> including in connection with the website <strong>www.kadhaster.com</strong> and and any related digital platform or services operated by the Company.
        </p>

        <p className="para-1">
          <strong>Kadhaster</strong> considers the privacy and protection of its user’s personal data to be of significant importance. This privacy policy (the “Privacy Policy”) shall form an integral part of the Terms of Use of the Website and should be read in conjunction with such Terms of Use. Illegality or unenforceability of one or more Terms of Use shall not affect the legality and enforceability of the other terms of use of the website <strong>www.kadhaster.com</strong> (the “Website”).
          <br /> <br />
          Personal data collected herein,  is processed in accordance with the Digital Personal Data Protection Act, 2023, the Digital Personal Data Protection Rules, 2025, and other applicable laws. 
          <br /> <br />
          In this Privacy Policy, we will disclose what kind of information is collected from the users. It will also specify why we collect this information, the modes and means by which it will be used, and the entities or persons who will have access to this information. This Privacy Notice may be updated from time to time. Users are encouraged to review this section time and again to remain informed about how their personal data is protected.
        </p>
        <br />
        <h1 className="text-2">1. DEFINITIONS</h1>
        <p className="para-2">
          • “Company”, “us”, “our”, and “we” refers to <strong>Kadhaster</strong>, operated by <strong>Comicode AI Solutions Private Limited</strong>.
        </p>
        <p className="para-2">
          • “User”, “You”, “Your” refers to a person accessing or using the Platform of <strong>Kadhaster</strong>.
        </p>
        <p className="para-2">
          • “Services” means any product, website feature, personalised family book, story creation services, or other digital service offered by the Company.
        </p>
        <p className="para-2">
          • “User Content” means any and all information and content that a user submits to, or uses with the Site. 
        </p>
        <p className="para-2">
          • “Site” means the website <strong>www.kadhaster.com</strong> and all related online services operated by the Company.
        </p>
        <p className="para-2">
          • “Data Fiduciary” refers to  <strong>Kadhaster</strong>, which determines the purposes and means of processing personal data. 
        </p>
        <p className="para-2">
          • “Data Principal” refers to the individual to whom personal data, as defined under the Digital Personal Data Protection Act, 2023. 
        </p>
        <p className="para-2">
          •  “Personal Data” means any data specific to an individual. 
        </p>
        <p className="para-2">
          • “Processing” means the entire life-cycle of personal data, including collection, storage, use, sharing, retention, and deletion.
        </p>
        <p className="para-2">
          • “Consent” means a free, specific, clear, informed, and unambiguous indication given by the Data Principal to process personal data for a lawful purpose. 
        </p>
        <p className="para-2">
          •  “Child” means a person below eighteen (18) years of age. 
        </p>
        <p className="para-2">
          • “Child Personal Data” means any Personal Data relating to a Child, including name, age, photographs, images, likeness, or other identifying information.
        </p>
        <p className="para-2">
          • “Parent” or “Lawful Guardian” means a person legally authorised to provide consent on behalf of a Child.
        </p>
        <br />
      </div>
      <div
        className="container-fluid py-5 text-white"
        style={{
          backgroundImage: `url(${background_img2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-3">2. CONSENT BASED DATA PROCESSING</h1>
        <p className="para-2">
          2.1 We process personal data only after we have obtained valid consent from the Data Principal or where processing is permitted or required under applicable Indian law. 
          <br /> <br />
          2.2 Consent is obtained in clear and simple language and is limited to the specific purpose for which the data is collected. 
          <br /> <br />
          2.3 Where personal data relates to a Child, <strong>Kadhaster</strong> processes such data only after obtaining verifiable consent from the Parent or Lawful Guardian. No Child Personal Data is knowingly collected or processed without such consent.
          <br /><br />
          2.4 Where consent is withdrawn, we will stop processing the personal data unless continued retention is required to comply with legal obligations or to establish, exercise, or defend legal claims.
        </p>
        <br /> <br />
        <h1 className="text-2">3. WHAT DATA IS COLLECTED ABOUT YOU </h1>
        <p className="para-2">
          3.1 We may collect personal identification information from Users including, but not limited to; when Users visit our site, register on the site, place an order, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.
          <br /> <br />
          3.2 The personal data collected may include your  name, email address, phone number, payment-related details, account credentials, KYC details and any other information you voluntarily provide in connection with your interaction with us. 
          <br /> <br />
          3.3 We may collect information about how you interact with our website and services. This may include device information, browser type, IP address, access times and usage patterns. This information helps us understand how our services are used and allows us to improve for your convenience. 
          <br /> <br />
          3.4 Personal data may also be collected indirectly when you interact with third party service providers or platforms that work with us. 
          <br /> <br />
          3.5 In general, you may browse our Website anonymously. However, some of our services require you to register on the Website and may require the collection of some personally identifying information, such as your name, address, contact number, email id, etc. 
          <br /> <br />
          3.6 We collect personal identification information from Users only if they voluntarily submit such information to us . You may also intimate us if you do not wish that we retain or use your personal information. However, in such a case, we may not be able to provide you some of our services and/or access to our Website.
        </p> <br />
        <h1 className="text-2">4. PURPOSE OF COLLECTING YOUR INFORMATION </h1>
        <p className="para-2">
          4.1 We will collect, record, store, handle and use your Personal Data only for the purpose of enabling you to effectively use the Website and to advise you of our other services and related details. 
          <br /> <br />
          4.2 We use your Personal Data to prepare your personalised books, improve our products, resolve disputes; help promote a safe service; calibrate user and public interest in our products and services; troubleshoot problems; customize user experience; detect and protect us against error, fraud and other criminal activity; inform you about relevant updates and other social causes; enforce our terms and conditions; and as otherwise described to you at the time of collection of the data.

        </p> <br />
        
        <h1 className="text-2">5. WORKING WITH THIRD PARTIES </h1>
        <p className="para-2">
          5.1 We engage third-party service providers to support our operations, including payment processing, cloud hosting, technical support and communication services. 
        </p> <br />
        <p className="para-2">
         5.2 We may, however, disclose and/or transfer your information to our affiliates, agents, or service providers for legitimate business purposes and to enhance your overall experience. These disclosures primarily occur with trusted third-party vendors (such as design tools, payment processors, printing and shipping companies, and email marketing platforms) who assist us in operating our business and delivering our services to you. 
        </p> <br />
        <p className="para-2">
          5.3  These third parties process personal data only on our instructions and solely for the purposes mentioned  under Clause 4 , for which the data is shared. 
        </p>
        
        <br />
        <h1 className="text-2">6. KEEPING YOUR INFORMATION SECURE </h1>
        <p className="para-2">
         6.1 We take appropriate measures to protect personal data against unauthorised access, loss or  misuse. These measures include encryption, secure servers, monitoring systems, and internal policies that govern data handling. 
        </p>
        <br />
        <p className="para-2">
         6.2 We do not sell or rent your Personal Data to third parties for their marketing purposes without your explicit consent and we only use your information as described in the Terms of Use.  
        </p>
        <br />
        <p className="para-2">
         6.3 We prioritize the privacy of your information, and therefore, we do not sell, rent, or share your personal information with third parties, except under specific, limited circumstances.  
        </p>
        <br />
        <p className="para-2">
         6.4 Additionally, in the event of a business transition, such as a merger, acquisition, or asset sale, your information may be transferred to the new owner as part of that transition.  
        </p>
        <br />
        <p className="para-2">
         6.5 Notwithstanding anything to the contrary contained anywhere in the Terms of Use and to the greatest extent permitted by applicable law, Kadhaster will not be responsible in any manner whatsoever if information provided by users gets exposed and/or misused by any third party who accessed such information without any authorization from <strong>Kadhaster</strong>. 
        </p>
        <br />
        <p className="para-2">
         6.6 All intellectual property rights relating to <strong>Kadhaster</strong> and its content are governed by the Terms of Use.”
        </p>
        <br />
        <p className="para-2">
         6.7 References on this Website to any names, marks, products or services of third parties or hypertext links to third party websites or information are provided solely for your convenience to you and do not in any way constitute or imply our endorsement, sponsorship or recommendation of the third party, information, product or service.  
        </p>
        <br />
        <p className="para-2">
          <strong>Kadhaster</strong> captures certain information including time, date, IP address, and other information that will be used to locate and identify individuals for combating fraud. If any information is suspected to be fraudulent, all records will be submitted, with or without a notice / subpoena, to law enforcement agencies for fraud investigation, as may be deemed appropriate by <strong>Kadhaster</strong> and <strong>Kadhaster</strong> will endeavour to cooperate with authorities to prosecute offenders to the full extent of the law.
        </p>
        <br />
        <h1 className="text-2">7. HOW LONG WE KEEP YOUR INFORMATION ?</h1>
        <p className="para-2">
          7.1 Personal data is retained only for as long as necessary to fulfil the purpose for which it was collected and to comply with applicable laws. Once the purpose of retention has been fulfilled, personal data is securely deleted. 
        </p> <br />
        <p className="para-2">
          7.2 Without prejudice to the above, personal data may be retained for a period of up to three years from the date of the last interaction made by the Data Principal to the Company Site. Upon the expiry of this period, the personal data shall be permanently deleted.
        </p> <br />
        <p className="para-2">
          7.3 As required under the Digital Personal Data Protection Rules, 2025, we provide advance notice (<strong>before 48 hours</strong> ) to Data Principals before deletion. Processing logs and related records are retained for the minimum period mandated by law. 
        </p> <br />
        <p className="para-2">
          7.4 Processing logs and related records are retained for a minimum period of one year, as mandated under the Digital Personal Data Protection Rules, 2025, unless a longer retention period is required by law.
        </p> <br />
        <h1 className="text-2">8. PROCESSING DATA OF CHILDREN AND PERSONS WITH DISABILITY WITH LAWFUL GUARDIAN </h1>
        <p className="para-2">
          8.1 We do not process the personal data of children without obtaining verifiable consent from a parent or lawful guardian. Such consent is obtained through verification of identity and age through government-issued identity credentials, virtual tokens, or digital identity services such as DigiLocker or any other authorised identity verification mechanism duly recognised under the Digital Personal Data Protection Rules, 2025. 
        </p> <br />
        <p className="para-2">
          8.2 The personal data of a Child, including photographs / images submitted for the creation of personalised family books or story content, is collected and processed solely for the purpose of providing the Services requested by the Parent or Lawful Guardian.
        </p> <br />
        <p className="para-2">
          8.3 Kadhaster implements appropriate technical and organisational measures to safeguard Children’s Personal Data, having regard to the nature of such data and the heightened duty of care required when processing data relating to children.
        </p> <br />
        <p className="para-2">
          8.4 Access to Children’s Personal Data is restricted to authorised personnel and service providers strictly on a need-to-know basis and subject to confidentiality and data protection obligations.
        </p> <br />
        <p className="para-2">
          8.5 We do not knowingly collect or solicit personal information from children under 18. If we learn that we have inadvertently collected personal information from a child under 18, we will take steps to delete such information. If you're a parent or guardian and think your child has shared personal info with us, please reach out to request removal at <strong><a href="support@KADHASTER.com" className="privacy-hyperlink">support@KADHASTER.com</a></strong>
        </p> <br />
        <p className="para-2">
          8.6 Where personal data relates to a person with disability falling under the The Rights of Persons with Disabilities (RPwD) Act, 2016, who has a lawful guardian under the act herein, the Company processes such personal data only after verifying the legal authority of the guardian through mechanisms recognised under the Digital Personal Data Protection Rules, 2025 . 
        </p> <br />
      </div>
      <div
        className="container-fluid py-5 text-white"
        style={{
          backgroundImage: `url(${background_img2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-3">9. CROSS BORDER TRANSFERS </h1>
        <p className="para-2">
          9.1 Personal data may be transferred outside India only in accordance with conditions notified by the Central Government under applicable law.
        </p>
        <br />
        <p className="para-2">
          9.2 Where such transfers take place, we ensure that appropriate safeguards are implemented and that transfers of such data, cease immediately if a destination becomes restricted. 
        </p>
        <br />
        <h1 className="text-2">10. YOUR RIGHTS AS A USER </h1>
        <p className="para-2">
          10.1 As a Data Principal, you have the right to access your personal data, request correction of inaccurate data, request deletion of personal data, withdraw consent and file grievances regarding data processing. 
        </p>
        <br />
        <p className="para-2">
          10.2 To enable the exercise of these rights, <strong>Kadhaster</strong> prominently publishes on its website the details of the means by which a Data Principal may submit a request for the exercise of such rights.
        </p>
        <br />
        <p className="para-2">
          10.3 All users may opt-out of receiving non-essential, promotional, or marketing-related communication from <strong>Kadhaster</strong>. These settings can be found on the Website. If a user wishes to remove his/her/its contact information from <strong>Kadhaster’s</strong> lists and newsletters, the user can contact <strong>Kadhaster</strong> at <strong><a href="support@KADHASTER.com" className="privacy-hyperlink">support@KADHASTER.com</a></strong> . <strong>Kadhaster</strong> however reserves the right to limit accessibility to the Website and the services provided by it based on availability of information from the users. 
        </p>
        <br />
        <p className="para-2">
          10.4 The Company maintains a grievance redressal Cell and shall respond to grievances of the Data Principals within a reasonable period not exceeding ninety (90) days.
        </p>
        <br />
        <p className="para-2">
          10.5 Any grievances in relation to the Personal Data shared by the user with <strong>Kadhaster</strong> may be brought to the attention of the Grievance Officer <strong>Mr. Madhavan</strong> , at 5th Floor North Wing Gamma Block, SSPDL Alpha City IT Park,Navalur,Chennai-600130,Tamil Nadu,India, <strong><a href="support@KADHASTER.com" className="privacy-hyperlink">support@KADHASTER.com</a></strong>
        </p>
        <br />
        <p className="para-2">
          10.6 The Company maintains a grievance redressal Cell and shall respond to grievances of the Data Principals within a reasonable period not exceeding ninety (90) days. You may also nominate another individual to exercise these rights on your behalf.
        </p>
        <br /> <br /> <br /> <br />
        <h1 className="text-3">11. IN CASE OF BREACH OF PERSONAL DATA </h1>
        <p className="para-2">
          11.1 In the event of any personal data Breach, the company shall upon becoming aware of such breach, take all reasonable steps to mitigate the impact of the breach.
        </p>
        <br />
        <p className="para-2">
          11.2 Where the breach is likely to cause harm to a Data Principal the Company shall notify the affected Data Principals without undue delay, in clear and plain language, describing the nature of the breach, the personal data affected, the possible consequences and the remedial measures taken or proposed to be taken by <strong>Kadhaster</strong>.  
        </p>
        <br />
        <h1 className="text-2">ACCEPTABLE USE</h1>
        <p className="para-2">
          You are prohibited from violating or attempting to violate the security of the Website, including, without limitation:
        </p>
        <p className="para-2">
          • attempting to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorization;
        </p>
        <p className="para-2">
          • attempting to interfere with service to any other user, host or network, including, without limitation, via means of submitting a virus to the Website, overloading, 'flooding,' 'spamming', 'mail bombing' or 'crashing';
        </p>
        <p className="para-2">
          • sending unsolicited email, including promotions and/or advertising of products or services; or
        </p>
        <p className="para-2">
          • forging any TCP/IP packet header or any part of the header information in any email or newsgroup posting.
        </p>
        <p className="para-2">
          Violations of system or network security may result in civil and / or criminal liability. We will investigate occurrences that may involve such violations and may involve, and cooperate with, law enforcement authorities in prosecuting users who are involved in such violations. You agree not to use any device, software or routine to interfere or attempt to interfere with the proper working of this Website or any activity being conducted on this Website. You agree, further, not to use or attempt to use any engine, software, tool, agent or other device or mechanism (including without limitation browsers, spiders, robots, or intelligent agents) to navigate or search this Website other than the search engine and search agents available on this Website and other than generally available third party web browsers.
        </p>
        <br />
        <h1 className="text-2">13. EMAILS  </h1>
        <p className="para-2">
          [In order to provide you with timely notice, updates and other information, we may send you emails.] To facilitate this service, we may note some of the pages you visit on our Website. At any time, you may discontinue this service by using the link provided in the mailers itself or sending an email to <strong><a href="support@KADHASTER.com" className="privacy-hyperlink">support@KADHASTER.com</a></strong>, requesting that your email address be removed from our lists.
        </p>
        <br />
        <h1 className="text-2">14. COOKIES  </h1>
        <p className="para-2">
          Cookies are tiny text files which identify your computer to serve as a unique user when you visit certain pages on the Website and they are stored by your internet browser on your computer's hard drive. Cookies can be used to recognize your Internet Protocol address, saving you time while you are on, or want to enter, the Website and not for obtaining or using any other information about you. The acceptance of cookies is not a requirement for visiting the Website. However, we would like to point out that some functionality on the Website is only possible with the activation of cookies.
        </p>
        <br />
        <h1 className="text-2">15. EXCEPTIONS   </h1>
        <p className="para-2">
          While we will not voluntarily disclose your personal data apart from the manner set out in the Terms of Use, we may disclose such information if we are required to do so by a court order, if we are requested to do so by government or law enforcement authorities, if we are required to do so pursuant to other legal processes, or if it becomes necessary to protect the rights or property of Kadhaster.
        </p>
        <br />
        <h1 className="text-2">16. HOW TO CONTACT US :    </h1>
        <p className="para-2">
          If you have any queries in relation to the use and protection of your Personal Data or otherwise in relation to the Website, please contact us at <strong><a href="support@KADHASTER.com" className="privacy-hyperlink">support@KADHASTER.com</a></strong>
        </p> 
        <p className="para-2">
          You may contact our representative at <strong>+91 8925925009</strong> in order to amend or rectify any personal information.
        </p>
        <p className="para-2">
          Grievance Redressal Officer (GRO) <br />
          Name: Mr. Madhavan S <br />
          Designation: Chief Operating Officer <br />
          Address: Reglo Group of Companies <br />
          Unit No:505, 5th Floor, Gamma Block, SSPDL Alpha City IT Park, <br />
          Building No:25, OMR(Rajiv Gandhi IT Express Highway) Navalur, <br />Chengalpattu Dt – 600130, Tamil Nadu. <br />
          Email: <strong><a href="sm@reglo.i" className="privacy-hyperlink">sm@reglo.in</a></strong>  <br />
          Telephone: +91 8925925009
        </p> <br />
        <h1 className="text-2">17. CHANGES TO THE PRIVACY POLICY </h1>
        <p className="para-2">
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. We will notify you of significant changes by posting the updated policy on our website, and the "Effective Date" will be updated accordingly. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
        </p>
        <br />
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
export default Privacy;
