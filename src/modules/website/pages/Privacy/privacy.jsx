import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
import classes from "./privacy.module.css";
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

        <h1 className="text-1">Terms and Conditions for KADHASTER</h1>
        <h1 className="terms-text-1">Last Updated: January 2026</h1>
        <br />
        <p className="para-1">
          These Terms of Service (“Agreement” or “Terms”) are entered into between Kadhaster (powered by <strong>Comicode AI Solutions Private Limited</strong>), (“Service Provider” or “company”), and User (“User”) and govern the User's access to and use of <strong>KADHASTER</strong> platform and Services.
        </p>

        <p className="para-1">
          Please read these Terms of Service (the “Agreement”) carefully. Your use of the Site (as defined below) constitutes your consent to this Agreement.
        </p>
        <br />
        <h1 className="text-2">1. DEFINITIONS:</h1>
        <p className="para-1">
          "Service Provider”,“we”, “us” ,“our” and “Company” means <strong>Kadhaster</strong>(by <strong>Comicode AI Solutions Private Limited</strong>), (“Service Provider”) and any other companies that are its subsidiaries and affiliates.
        </p>
        <p className="para-2">
          • “Subscriber” or “Customer” shall refer to the entity/individual who enters into agreement with the Service Provider for obtaining Services.
        </p>
        <p className="para-2">
          • “User” shall mean any person or entity who shall avail Services on the Service Provider, or his/her representatives or affiliates who are registered.
        </p>
        <p className="para-2">
          • “Services” hereinafter refers to any product, website feature, personalised book, story creation service, or any other service offered by <strong>Kadhaster</strong>.
        </p>
        <p className="para-2">
          • “Agreement” or “Terms” shall hereinafter refer to the Terms of Service of <strong>Kadhaster</strong>. 
        </p>
        <p className="para-2">
          • “Site” means the website (        ) and all related online services operated by <strong>Kadhaster</strong>.
        </p>
        <p className="para-2">
          • “User Content” means any and all information, images, photographs, that a User, uploads on, or uses with the Site for the purpose of availing the Services.
        </p>
        <p className="para-2">
          • “Account” means the registered account created and maintained by the User on the Site. 
        </p>
        <p className="para-2">
          • “Service Provider Materials” shall mean materials relevant to the Services, which may be in the form of audio, video, written and oral content. 
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
        <h1 className="text-3">2. USER AGREEMENT </h1>
        <p className="para-4">
          2.1 The Terms of Service (hereinafter referred to as “Terms”) given below set forth the legally binding terms and conditions that govern your use of this site.
        </p> <br />
        <p className="para-4">
          2.2 These terms of use herewith set forth the legally binding terms and conditions that govern your use of the site.
        </p> <br />
        <p className="para-4">
           2.3 By accessing or using the site, you are accepting these terms (on behalf of yourself or the entity that you represent), and you represent and warrant that you have the right, authority, and capacity to enter into these terms (on behalf of yourself or the entity that you represent).
        </p> <br />
        <p className="para-4">
          2.4 If the User continues to utilize the Services, the User is thereby, irrevocably and unconditionally agreeing to comply with, abide by and be bound by the Terms of Service, which together read with the privacy policy available at (“Privacy Policy”), and any other applicable policies referred to herein or made available on the Product (hereinafter collectively referred as “Terms and Conditions”).
        </p> <br />
        <p className="para-4">
          2.5 These Terms of Service  shall govern the Service Provider’s relationship with User in relation to the usage of the <strong>Kadhaster</strong>. These Terms shall supersede all previous oral, written terms and conditions (if any) communicated to User and shall act as a binding agreement between Service Provider and the User.
        </p>
        <br />
        <h1 className="text-2"> UPDATION OF TERMS AND CONDITIONS</h1>
        <p className="para-2">
          The User's use of <strong>Kadhaster</strong> is subject to the Terms and Conditions, which may be updated, amended, modified or revised by us from time to time with notice to the User. The Updated Terms and Conditions shall be effective immediately and shall supersede these. If the User continues to use the Product and/or Services after the Updated Terms and Conditions have been published, it shall be deemed that the User has read and understood and accept the Updated Terms and Conditions. Any reference to Terms of Service shall refer to the latest version of the Terms of Service.
          <br />
          If the User will be using the Services on behalf of an organization, the User agrees to these Terms on behalf of that organization and the User represents that they have the authority to do so.
        </p>
        <br />
        <h1 className="text-2">3. ELIGIBILITY</h1>
        <p className="para-2">
          3.1 By using <strong>Kadhaster</strong> , the User affirms that they are at least 18 years of age and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations, warranties set forth in the Terms and Conditions, and to abide by and comply with the terms stated therein.
        </p> <br />
        <p className="para-2">
          3.2 Registration for Users  are available only to persons who are legally competent to enter into  binding contracts under applicable laws. 
        </p> <br />
        <p className="para-2">
          3.3 Persons who are incompetent to enter into contracts, including minors, un-discharged insolvents, or person with unsound mind etc. are not eligible to use 
        </p> <br />
        <p className="para-2">
          3.4 .By accessing the services or Content on any other Authorized Device, it is deemed that the User has read and understood and accepted these Terms
        </p> <br />
        <p className="para-2">
          3.5 If the User will be using the Services on behalf of an organization, the User agrees to these Terms on behalf of that organization and the User represents that they have the authority to do so.
        </p>
        <br />
        <h1 className="text-2">4. USER ACCOUNT REGISTRATION AND RESPONSIBILITIES</h1>
        <p className="para-2">
          4.1 In order to avail the Services, the User must first complete the registration process and create an account on User's respective  portal (“Account”).
          <br /> <br />
          4.2 You may create an account via simple process which will be approved by the system Administrator of Kadhaster for activation. Upon creation of the Account, User may login any of the Services offered by us. In lieu of such registration , you represent and warrant the following:
          <br /> <br />
          • All required registration information you submit is truthful and accurate;
          <br />
          • You may delete your Account at any time, for any reason, by following the instructions on the Site.
          <br />
          • The Service Provider may suspend or terminate your Account in accordance with Clause 18 (Termination). 
          <br /><br />
          4.3 During registration User is required to give User's contact information. The registration information given by User must always be accurate, correct and up to date. This ensures User can get the maximum benefit from the Product. 
          <br /><br />
          4.4 User is entirely responsible for safeguarding and maintaining the confidentiality of User's login credentials. User agrees to notify us immediately if User suspects or become aware of any unauthorized use of User's Account or any unauthorized access to any Account. 
          <br /><br />
          4.5 User further agrees not to use the Account or log in with the account of another User of the Site if <br />(a) User is not authorized to use such login credentials or <br />(b) the use would violate the Terms of Service.
        </p>
        <br />
        <h1 className="text-2">5. USER CONTENT  AND OTHER CONTENT DISPLAYED ON THE PRODUCT</h1>
        <p className="para-2">
          5.1 If User creates, transmits, submits, displays or otherwise makes available any information while using the Services, the User herein may provide only information that the User owns or has the right to use. The Service Provider only uses the information that the  User provides as permitted by the Privacy Policy and applicable laws. For example, Service Provider will never share User's personally identifiable information without User's prior permission. Please closely review the Privacy Policy for more information regarding how Service Provider uses and discloses User's personal information. 
          <br /><br />
          5.2 The Service Provider may make use of third-party services providers or use their own service infrastructure for hosting the servers and databases. While Service Provider makes commercially reasonable efforts to ensure that the data stored on their servers is persistent and always available to the User, the Service Provider will not be responsible in the event of failure of the third-party servers or any other factors outside their reasonable control that may cause the User’s data to be permanently deleted, irretrievable, or temporarily inaccessible.
          <br /><br />
          5.3 Certain elements of the Website will contain material submitted by other users and some parts of the Website may contain advertising/other material submitted to <strong>Kadhaster</strong> by third parties. <strong>Kadhaster</strong> reserves the right to omit, suspend and/or change the position of any advertising material submitted for insertion. Acceptance of advertisements on the Website will be subject to <strong>Kadhaster's</strong> terms and conditions which are available on request.
          <br /><br />
          5.4 The User acknowledges and agrees that the Service Provider may preserve User's information and may also disclose User's related information if required to do so by law; or in the good faith belief that such preservation or disclosure is reasonably necessary to: 
          <br />
          (a) comply with legal process, applicable laws or government requests; 
          <br />(b) enforce these Terms Of Service;
          <br />(c) respond to claims that any of User's usage of the Product violates the rights of third parties; 
          <br />(d) detect, prevent, or otherwise address fraud, security or technical issues; or <br />(e) protect the rights, property, or personal safety of the Product, its users, or the public.
        <br />
        </p>
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
        <h1 className="text-4">6. RESTRICTIONS ON USE </h1>
        <p className="para-2">
          You agree that your use of the site and the rights granted to you in these Terms are subject to the following restrictions:
          <br /> <br />
          6.1  As a condition of use, User promises not to use the Services for any purpose that is prohibited by the Terms of Service, or other rules or policies implemented by us from time to time; or in violation of any applicable laws. The Services (including, without limitation) is provided only for User's own personal and non-commercial use. 
          <br /> <br />
          6.2 By way of example, and not as a limitation, User shall not (and shall not permit any third party to) take any action that: 
          <br /> 
          (i) would constitute a violation of any applicable law, rule or regulation;
           <br />
          (ii) infringes on any intellectual property or other right of any other person or entity; 
          <br />
          (iii) is threatening, abusive, harassing, defamatory, libellous, deceptive, fraudulent, invasive of another’s privacy, tortuous, obscene, offensive, or profane; or
          <br />
          (iv) impersonates any person or entity. The Service Provider reserves the right to disable any Account from the Product at any time for any reason (including, but not limited to, upon receipt of claims or allegations from third parties or authorities; or if Service Provider is concerned that User may have violated the Terms of Service).
          <br /><br />
          6.3 Additionally, User shall not share any information that: 
          <br />
          (i) may be harmful to minors or children below the age of 18 (eighteen) years;<br />
          (ii) is invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatsoever; <br />
          (iii) infringes any patent, trademark, copyright or other proprietary rights; <br />
          (iv) violates any laws for time being; and <br />
          (v) impersonate any person.
          <br /><br />
          6.4 Furthermore, User shall not (directly or indirectly): <br />
          (i) take any action that imposes or may impose an unreasonable or disproportionately large load on Service Provider’s (or its third party providers’) infrastructure; <br />
          (ii) interfere or attempt to interfere with the proper working of the Product or any activities conducted on the Product; <br />
          (iii) bypass any measures Service Provider may use to prevent or restrict access to the Product (or parts thereof); <br />
          (iv) decipher, decompile, disassemble, reverse engineer or otherwise attempt to derive any source code or underlying ideas or algorithms of any part of the Product, except to the limited extent applicable laws specifically prohibit such restriction; <br />
          (v) modify, translate, or otherwise create derivative works of any part of the Product; or <br />
          (vi) copy, rent, lease, distribute, or otherwise transfer any or all of the rights that User receives hereunder.
          <br /><br />
          6.5 The User will not access <strong>Kadhaster</strong>, or the personal information of other Users, available in order to build a similar or competitive website, app, product, or service.
          <br /><br />
          6.6 The User agrees to immediately notify us of any unauthorised use, or suspected unauthorized use of User's Profile, or any other breach of security, in relation to User's personal information on the Product.
          <br /><br />
          6.7 Any use of an Account by a third-party would deem to be unauthorised usage. The Service Provider reserves the right to disable any such Account from the Product.
          <br /><br />
          6.8 The Service Provider also sends the user site and service announcement updates. Users may choose to unsubscribe from receiving these emails by following the instructions that will be part of each announcement email.
          <br /><br />
          6.9 You shall not use the site in violation of any applicable Indian Law, including the Information Technology Act 2000, and the Digital Personal Data Protection Act 2023 and the Digital Personal Data Protection Rules 2025 .
          <br /><br />
        </p>
        
        <h1 className="text-2">7. USER CONTACT </h1>
        <p className="para-2">
          The User agrees that Service Provider may contact the User through telephone, email, SMS, or any other means of communication for the purpose of: <br />
          a. Providing information about Service Provider’s product/services; <br />
          b. Obtaining feedback in relation to Product or Services or promotion of Product or Services; <br />
          c. Obtaining feedback in relation to any other Users listed on the Product; <br />
          d. Resolving any complaints, information, or queries by other Users regarding User's Critical Content; and <br />
          e. User agrees to provide User's fullest co-operation further to such communication by Service Provider. <br /> <br />
          By submitting suggestions or other feedback regarding the Services, User agrees that Service Provider can use and share such feedback for any purpose without any compensation to User and Service Provider is under no obligation to keep such feedback confidential.
        </p>
        <br />
        <h1 className="text-2">8. USER COMMENTS, FEEDBACK, AND SUBMISSIONS</h1>
        <p className="para-2">
          8.1 If you submit any comments, feedback, ideas, suggestions, or other materials to us—whether requested or unsolicited, and through any medium—you grant us the unrestricted right to use, edit, reproduce, publish, distribute, and translate such content in any format. We are not obligated to keep submissions confidential, provide compensation, or respond to them. <br /> <br />
          8.2 We reserve the right, but are not required, to monitor, edit, or remove content that we deem unlawful, offensive, defamatory, obscene, infringing, or otherwise in violation of these Terms. <br /> <br />
          8.3 You confirm that your submissions do not infringe on any third-party rights, including intellectual property, privacy, or personal rights, and do not contain unlawful, abusive, or malicious content. You are solely responsible for the accuracy and legality of your submissions. We assume no liability for content submitted by you or any third party.

        </p>
        <br />
        <h1 className="text-2">9.USER CONSENT AND ACCEPTANCE OF TERMS</h1>
        <p className="para-2">
          9.1 By accessing, using, or submitting any information through this website, and by selecting the option to “Agree,” “Accept,” or any similar affirmative action, you confirm that you have carefully read, fully understood, and expressly consented to be bound by these Terms & Conditions, along with all related policies, including but not limited to the Privacy Policy and any additional guidelines referenced herein. <br /> <br />
          9.2 Such consent is provided freely, knowingly, and unconditionally, and constitutes a legally binding agreement between you and the Company. Once accepted, you agree to comply with and be strictly bound by all obligations, representations, and responsibilities outlined in these Terms. <br /> <br />
          9.3 If you do not agree with any part of these Terms, you must immediately discontinue use of the website and its services or contact <a href="support@KADHASTER.com" className="privacy-hyperlink">support@KADHASTER.com</a> for clarity. Continued access, use, submission of content, or interaction with the website after providing consent shall be deemed as ongoing acceptance of these Terms, including any updates or modifications made from time to time. <br /> <br />
          9.4 The Company shall not be liable for any claims arising from a user’s failure to read or understand these Terms prior to providing consent, and such failure shall not invalidate the enforceability of this agreement.

        </p>
        <br /> <br />
        <h1 className="text-2">10. SERVICE PROVIDER MATERIALS</h1>
        <p className="para-2">
          10.1 While rendering Services, the Service Provider directly or through its representatives, may provide Users with certain materials relevant to the Services, which may be in the form of audio, video, written and oral content (“Service Provider Materials”). Service Provider Materials shall be the exclusive property of the Service Provider. <br /><br />
          10.2 The User hereby agrees and acknowledges that he/she shall ensure that the Service Provider Materials are not shared with any third party, without Service Provider’s written consent and any breach of such nature shall cause financial and irreparable injury to the Service Provider. <br /><br />
          10.3 The Service Provider hereby provides User with a revocable, non-exclusive, non-transferable, non-sublicensable, limited license to use the Service Provider Materials solely for its personal purpose and not for any commercial use. <br /><br />
          10.4 The User understands that all information (such as data files, written text, audio files, images or any other media) which User may have access to as part of, or through User's use of the Services are the sole responsibility of the person from which such content originated. <br /><br />
          10.5 Service Provider takes no responsibility for abusive content, and it is the responsibility of the users to regulate such content. Service Provider takes no responsibility for any data generated within any of the Services and published or distributed outside by User.

        </p>
        <br /> <br />
        <h1 className="text-2">11. MODIFICATION OF THE SITE </h1>
        <p className="para-2">
        11.1 Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. <br /><br />
        11.2 We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order) in compliance with the Digital Personal Data Protection Rules 2025. <br /><br />
        11.3 We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated. <br /><br />
        11.4  You acknowledge and agree that we will have no obligation to provide you with any support or maintenance in connection with the Site. 

        </p>
        <br /> <br />
        <h1 className="text-2">12. USER SUPPORT </h1>
        <p className="para-2">
        12.1 The Service Provider offers Support via FAQs, Email support & Phone Call, based on our internal SLA. <br /><br />
        12.2 The User agrees and acknowledges that the Service Provider shall address and attempt to resolve the complaint received in accordance with the standard policies and procedures adopted by the Service Provider, the User’s disapproval/discontent with the outcome/mode of redressal shall not be deemed to mean non-redressal of the complaint by the Service Provider. Any suggestions by Service Provider regarding use of the Services shall not be construed as a warranty.

        </p>
        <br /> <br />
        <h1 className="text-2">13. OWNERSHIP AND INTELLECTUAL PROPERTY  RIGHTS</h1>
        <p className="para-2">
        13.1 The User acknowledges and agrees that the Services contain proprietary and confidential information that is protected by applicable intellectual property and other laws. Except as expressly authorized by us, User agrees not to modify, rent, lease, loan, sell, distribute or create derivative works based on the Services, in whole or in part. User also agrees not to extract the code or reverse-engineer it in anyway. <br /><br />
        13.2 Any attempt at hacking or unlawful use of the Products can and will invite the maximum prosecution allowable under the law. <br /><br />
        13.3 <strong>Kadhaster</strong> owns all the intellectual property rights associated with the Website and its contents. No right, title or interest in any downloaded material is transferred to you as a result of any such downloading or copying except as specifically allowed by the Website itself. The Website is protected by copyright as a collective work and/or compilation (meaning the collection, arrangement, and assembly) of all the content on this Website, pursuant to applicable law. <br /><br />
        13.4 <strong>Kadhaster’s</strong> logos, product and service marks and/ or names, trademarks, patents, copyrights and other intellectual property, whether registered or not (<strong>“Kadhaster</strong> IP”) are exclusively owned by <strong>Kadhaster</strong>. Without the prior written permission of <strong>Kadhaster</strong>, the User agrees to not display and/or use <strong>Kadhaster</strong> IP in any manner. Nothing contained in this Website or the content, should be construed as granting, in any way, any license or right or interest whatsoever, in and/ or to <strong>Kadhaster</strong> IP, without the express written permission of <strong>Kadhaster</strong>. <br /><br />
        13.5 References on this Website to any names, marks, products or services of third parties or hypertext links to third party websites or information are provided solely for your convenience to you and do not in any way constitute or imply our endorsement, sponsorship or recommendation of the third party, information, product or service. <br /><br />
        13.6 Neither these Terms (nor your access to the Site) transfers to you or any third party any rights, title or interest in or to such intellectual property rights. <br /><br />
        13.7 The Company reserves all rights not granted in these Terms. There are no implied licenses granted under these Terms.

        </p>
        <br /> <br />
        <h1 className="text-2">14. DISCLAIMER</h1>
        <p className="para-2">
          The Service (including, without limitation, any content) is provided “as is” and “as available” and is without warranty of any kind, express or implied, including, but not limited to, the implied warranties of title, non-infringement, merchantability and fitness for a particular purpose, and any warranties implied by any course of performance or usage of trade.
        </p>
        <br /> <br />
        <h1 className="text-2">15. INDEMNIFICATION</h1>
        <p className="para-2">
          The User shall defend, indemnify, and hold harmless the Service Provider, its affiliates/ subsidiaries/joint venture partners and each of its, and its affiliates’/subsidiaries/joint venture partners’ employees, directors, parents, interns, licensors, service providers and representatives from all liabilities, losses, claims, and expenses, including reasonable attorneys’ fees, that arise from or relate to : <br />
          (i) User's use or misuse of, or access to, the Services ; or <br />
          (ii) User's violation of the Terms and Conditions; or any applicable law, contract, policy, regulation or other obligation, <br />
          (iii) any third-party due to or arising out of your breach of these Terms of Services. <br /> <br /> 
          Service Provider reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by User, in which event User will assist and cooperate with Service Provider in connection therewith.

        </p>
        <br /> <br />
        <h1 className="text-2">16. LIMITATION OF LIABILITY</h1>
        <p className="para-2">
          To the fullest extent permitted by law, in no event shall Service Provider (including its directors, employees, agents, sponsors, partners, suppliers, content providers, licensors or resellers,) be liable under contract, tort, strict liability, negligence or any other legal or equitable theory with respect to the services <br />
          (i) for any lost profits, data loss, loss of goodwill or opportunity, or special, indirect, incidental, punitive, or consequential damages of any kind whatsoever; <br />
          (ii) for user's reliance on the services; <br />
          (iii) for any direct damages in excess ; and (iv) for any matter beyond its or their reasonable control, even if service provider has been advised of the possibility of any of the aforementioned damages.

        </p>
        <br /> <br />
        <h1 className="text-2">17. EXEMPTIONS TO LIABILITY OF SERVICE PROVIDER</h1>
        <p className="para-2">
          The User further agree and confirm that Service Provider shall not be responsible, in any manner whatsoever, for any delay/unavailability of Services or failure to meet its obligations under the Terms and Conditions, which may be caused, directly or indirectly, due to: <br />
          a. User's failure to cooperate; <br />
          b. User's unavailability and/or unresponsiveness; <br />
          c. User's failure to provide accurate and complete information; <br />
          d. User's failure to provide or facilitate the submission of User Materials in timely manner; <br />
          e. any event beyond Service Provider’s reasonable control.
        </p>
        <br /> <br />
        <h1 className="text-2">18. TERMINATION </h1>
        <p className="para-2">
          18.1 	We may suspend or terminate your rights to use the Site (including your Account) at any time for any reason at our sole discretion, including for any use of the Site in violation of these Terms. <br /> <br />
          18.2 We may also suspend or restrict access to protect the integrity, or proper functioning of the Site. <br /> <br />
          18.3  Upon termination of your rights under these Terms; <br />
          a)	Your Account and  your right to access and use the Site will terminate immediately. <br />
          b)	We may disable or delete your Account, except where retention of personal data is required by law or for the establishment, exercise, or defence of legal claims. <br /> <br />
          18.4  Your personal data will be retained only for the period  necessary to comply with legal obligations permitted under the Digital Personal Data Protection Rules,2025. <br /> <br />
          18.5  The Company reserves the right to retain in effect  after termination, those provisions intended to survive termination under these Terms and Conditions  and will continue to remain in effect.

        </p>
        <br /> <br />
        <h1 className="text-2">19. DISPUTE RESOLUTION </h1>
        <p className="para-2">
          19.1 	 In the event of any dispute, controversy, or claim arising out of or relating to these Terms and Conditions, the parties shall first attempt to resolve the matter amicably through good-faith negotiations. <br /> <br />
          19.2 If such negotiation does not resolve the dispute within 30 (thirty) days, the matter shall be referred to arbitration in accordance with the provisions of the Arbitration and Conciliation Act, 1996, as amended from time to time.<br /> <br />
          19.3  The arbitration shall be conducted by a sole arbitrator, mutually appointed by both parties. If the parties are unable to mutually agree on the arbitrator within 30 days, the arbitrator shall be appointed in accordance with Section 11 of the Arbitration and Conciliation Act, 1996.<br /> <br />
          19.4  The seat and venue of arbitration shall be Chennai, Tamil Nadu, India. <br /> <br />
          19.5  The language of arbitration shall be English. <br /> <br />
          19.6  The arbitration proceedings shall be conducted in accordance with the provisions of the Arbitration and Conciliation Act, 1996, and where applicable, institutional or ad hoc rules agreed between the parties. <br /> <br />
          19.7  The arbitral award shall be final and binding on the parties, and may be enforced in any court having appropriate jurisdiction. <br /> <br />
        </p>
        <br /> <br />
        <h1 className="text-2">20.MISCELLANEOUS </h1>
        <p className="para-2">
          1. The Terms and Conditions are the entire agreement and understanding between User and Service Provider with respect to the Services and usage of Product. <br />
          2. If any provision of the Terms of Service is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms of Service will otherwise remain in full force and effect and enforceable. <br />
          3. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder. <br />
          4. The Terms of Service are personal to User, and are not assignable or transferable by User except with Service Provider’s prior written consent. Service Provider may assign, transfer or delegate any of its rights and obligations hereunder without any consent. <br />
          5. No agency, partnership, joint venture, or employment relationship is created as a result of the Terms of Service and neither party has any authority of any kind to bind the other in any respect. <br />
          6. All notices under the Terms of Service will be in writing and will be deemed to have been duly given when received, if personally delivered or sent by certified or registered mail, return receipt requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or two days after it is sent, if sent for next day delivery by recognized overnight delivery service.
        </p>
        <br /> <br />
        <h1 className="text-2">21. Contact</h1>
        <p className="para-2">
          If User has any questions regarding the Services or usage of the Product, User can contact Service Provider at <a href="support@KADHASTER.com" className="privacy-hyperlink">support@KADHASTER.com</a> <br />
          Kadhaster ( <strong>Comicode AI Solutions Private Limited</strong> ) <br />
          Reglo Group of Companies <br />
          Unit No:505, 5th Floor, Gamma Block, SSPDL Alpha City IT Park, <br />
          Building No:25, OMR(Rajiv Gandhi IT Express Highway) Navalur, <br />Chengalpattu Dt – 600130, Tamil Nadu. <br />
          <strong>Contact: </strong> +91 8925925009

        </p>
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
