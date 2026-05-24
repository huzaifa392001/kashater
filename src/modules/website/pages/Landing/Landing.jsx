import { useEffect, useRef, useState } from "react";

// logo
import desktopVideo from "../../assets/image/final Kadhaster_video.mp4";
import logo3 from "../../assets/image/png/logo3.png";
// icons
import down_arrow_icon from "../../assets/image/svg/down-arrow.svg";
import right_arrow_icon from "../../assets/image/svg/right-arrow-black.svg";
import magic_icon from "../../assets/image/svg/spell.svg";
import headphone_icon from "../../assets/image/svg/head-phone.svg";
import tick_icon from "../../assets/image/svg/tick.svg";
import plus_icon from "../../assets/image/svg/plus.svg";

import collapse_icon from "../../assets/image/svg/minus.svg";
import chevron_right from "../../assets/image/svg/right-arrow.svg";
import star_red from "../../assets/image/png/top-bar-star.png";
import { StarFilled, StarOutline } from "../../components/icon/icon";

// social icons
import linkedin_icon from "../../assets/image/svg/linkedin.svg";
import facebook_icon from "../../assets/image/svg/facebook.svg";
import twitter_icon from "../../assets/image/svg/twitter.svg";

// hero images
import hero_img_1_1 from "../../assets/image/png/hero-1-1.png";
import hero_img_2_2 from "../../assets/image/png/hero-2-2.png";
import hero_img_5 from "../../assets/image/png/hero-5.png";
import hero_img_5_5 from "../../assets/image/png/hero-5-5.png";
import hero_img_6 from "../../assets/image/png/hero-img-3(1) 1.png";
import hero_img_6_6 from "../../assets/image/png/hero-img-3(2).png";

// kadhaster story
import kadhaster_img from "../../assets/image/kadhaster-story-img.png";
import kadhastory_top_curve from "../../assets/image/kadhastory-top-curve.png";


// How it works new
import butterfly_png from "../../assets/image/how-its-work-butterfly.png";
import select_story_img from "../../assets/image/select-story-img.png";
import add_details_img from "../../assets/image/add-details-img.png";
import print_deliver_img from "../../assets/image/print-deliver-img.png";
import preview_magic_img from "../../assets/image/preview-magic-img.png";

// Dive Stories
import dive_img1 from "../../assets/image/dive-img1.png";
import dive_img2 from "../../assets/image/dive-img2.png";
import dive_img3 from "../../assets/image/dive-img3.png";
import dive_curve_top_img from "../../assets/image/dive-curve-top.png";
import dive_curve_bottom_img from "../../assets/image/dive-curve-bottom.png";

// our features new
import our_features_thumb_img from "../../assets/image/our-features-thumb-img.png";
import Maskgroup1 from "../../assets/image/Maskgroup1.png";
import Maskgroup2 from "../../assets/image/Maskgroup2.png";
import Maskgroup3 from "../../assets/image/Maskgroup3.png";
import Maskgroup4 from "../../assets/image/Maskgroup4.png";
import Maskgroup5 from "../../assets/image/Maskgroup5.png";
import easy_to_use from "../../assets/image/easy-to-use-ic.png";
import ai_powered from "../../assets/image/ai-powered-personalization-ic.png";
import high_quality from "../../assets/image/high-quality-ic.png";
import secure_private from "../../assets/image/secure-private-ic.png";

// testimonial
import star_icon from "../../assets/image/star-ic.png";

// how it works
import hw_image_1 from "../../assets/image/svg/HIW1.svg";
import hw_image_2 from "../../assets/image/svg/HIW2.svg";
import hw_image_3 from "../../assets/image/svg/HIW3.svg";
import hw_image_4 from "../../assets/image/svg/HIW4.svg";
import hw_image_5 from "../../assets/image/svg/HIW5.svg";
// joyful memories
import jm_image_1 from "../../assets/image/jpg/JM1.jpg";
import jm_image_2 from "../../assets/image/jpg/JM2.jpg";
import jm_image_3 from "../../assets/image/jpg/JM3.jpg";
import jm_image_4 from "../../assets/image/jpg/JM4.jpg";
// our features
import feature_image_1 from "../../assets/image/png/feature-1.png";
import feature_image_2 from "../../assets/image/png/feature-2.png";
import feature_image_3 from "../../assets/image/png/feature-3.png";
import feature_image_4 from "../../assets/image/png/feature-4.png";
// what you get
import wyg_image_1 from "../../assets/image/png/WWG1.png";
import wyg_image_2 from "../../assets/image/png/WWG2.png";
import wyg_image_3 from "../../assets/image/png/WWG3.png";
import wyg_image_4 from "../../assets/image/png/WWG4.png";
import wyg_image_5 from "../../assets/image/png/WWG5.png";
import wyg_image_6 from "../../assets/image/png/WWG6.png";
// our stories
import book_image_1 from "../../assets/image/jpg/book1.jpg";
import book_image_2 from "../../assets/image/jpg/book2.jpg";
import book_image_3 from "../../assets/image/jpg/book3.jpg";

// Coming Soon
import book_img1 from "../../assets/image/coming-soon-img1.png";
import book_img2 from "../../assets/image/coming-soon-img2.png";
import book_img3 from "../../assets/image/coming-soon-img3.png";
import book_img4 from "../../assets/image/coming-soon-img4.png";
import book_img5 from "../../assets/image/coming-soon-img5.png";

// testimonial
import avatar_img from "../../assets/image/png/avatar.png";
import circle from "../../assets/image/circle.png";

// css
import classes from "./landing.module.css";
import EmblaCarousel from "../../components/carousel/embla";
import Rating from "@mui/material/Rating";
import axios from "axios";
// import { Header } from "../../components/header/header";
import Header from "../../../web/features/Header/Header";
import EmblaCarouselAuto from "../../components/carousel-autoplay/embla-auto";
import CircularProgress from "@mui/material/CircularProgress";
import BoostrapDialog from "../../../web/components/UI/Dialog/BoostrapDialog";
import { Footer } from "../../components/footer/footer";
import { NavLink, useNavigate, Link } from "react-router-dom";
import SectionPrivacy from "./SectionPrivacy/SectionPrivacy";
import ComingSoon from "./ComingSoon/ComingSoon";
import useApiHttp from "../../../web/hooks/ues-http";
import styles from "../../../web/features/MyCart/MyCartPage.module.css"
import Slider from "react-slick";
import { Controller, useForm } from "react-hook-form"
import CustomTextField from "../../../web/components/UI/TextFiled/TextFiled"
import MinHeightTextarea from "../../../web/components/UI/TextArea/Textarea"
import CustomTextFieldLogin from "../../../web/components/UI/TextFiled/TextFiledLogin";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import PhoneNumInput2 from "../../../web/components/UI/PhoneNumInput/PhoneNumInput2";


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

const howItWorksSteps = [
  {
    key: "select",
    circleImg: select_story_img,
    title: "Select Story",
    description: "Pick from our growing library of engaging adventures.",
  },
  {
    key: "details",
    circleImg: add_details_img,
    title: "Add Details",
    description:
      "Enter names and upload photos of your child and loved ones.",
  },
  {
    key: "preview",
    circleImg: preview_magic_img,
    title: "Preview Magic",
    description:
      "Take a preview of your personalized story come alive instantly.",
  },
  {
    key: "print",
    circleImg: print_deliver_img,
    title: "Print & Deliver",
    description:
      "Your story is beautifully bound and delivered to your doorstep.",
  },
];

export default function Landing() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      mobile: "", // Added mobile field
    },
  })

  const { isLoading, sendRequest } = useApiHttp()
  const [open, setOpen] = useState(false)
  const [openAdduser9, setOpenAdduser9] = useState(false)

  const toggleContact = state => {
    return () => setOpen(state)
  }

  const handleClosesetOpenAddUser9 = () => {
    setOpenAdduser9(false)
  }

  const navigate = useNavigate()
  const testimonial = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
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

  const comingSoon = {
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // centerMode: true,
    // centerPadding: "60px",
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerPadding: "40px",
          slidesToShow: 3,
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

  const books = [
    {
      image: book_image_1,
      title: "Animal Stories for Little Children",
      author: "Usborne",
    },
    {
      image: book_image_1,
      title: "Once Upon a Time in the Enchanted Forest",
    },
    {
      image: book_image_1,
      title: "A Garden to Save the Birds",
      author: "Wendy McClure",
    },
  ];

  const data = {
    hero_data: [
      {
        img_1: hero_img_1_1,
        img_2: hero_img_2_2,
        title: (
          <h1>
            {" "}
            {/* Unlock a world of personalized stories starring{" "}
            <strong> your child & loved ones </strong> - here for the first
            time! */}
            Personalized <strong>FAMILY</strong> books, starring{" "}<strong>your child & loved ones.</strong>
          </h1>
        ),
        sub_title: (
          <>
            Unlock Your Story: Upload Name & Photo — That's All!
          </>
        ),
      },
      {
        img_1: hero_img_5,
        img_2: hero_img_5_5,
        title: (
          <h1>
            {/* Turn your child and loved ones into{" "}
            <strong> storybook stars</strong>, teaching family bonds and
            timeless values! */}
            <strong>Family bonds</strong> & <strong>values</strong>,<br /> written into every story.
          </h1>
        ),
        sub_title: (
          <>
            Make Your Mark: Snap, upload, and relive your story!
          </>
        ),
      },
      {
        img_1: hero_img_6,
        img_2: hero_img_6_6,
        title: (
          <h1>
            {/* More than a story, it's a lesson in{" "}
            <strong> love & values .</strong> Feature your child and your dear
            ones today! */}
            Your <strong>child</strong>, your <strong>family</strong>,<br /> your story.
          </h1>
        ),
        sub_title: (
          <>
            Bring your stories to Life: Just Your Name & Photo!
          </>
        ),
      },
    ],
    howitworks: {
      block: [
        {
          img: hw_image_1,
          title: "select a story",
          text: "Pick from a growing library of engaging stories",
        },
        {
          img: hw_image_2,
          title: "name character",
          text: "Enter names of your loved ones to feature in the story",
        },
        {
          img: hw_image_3,
          title: "upload photos",
          text: "Upload good quality photos of your child and loved ones.",
        },
        {
          img: hw_image_4,
          title: "Preview Story",
          text: "See your child's photo transformed into an enchanting story preview.",
        },
        {
          img: hw_image_5,
          title: "Print & Deliver",
          text: "See how the magic unfolds before placing anorder.",
        },
      ],
      block_1: [
        {
          img: hw_image_1,
          title: "select a story",
          text: "Pick from a growing library of engaging stories",
        },
        {
          img: hw_image_2,
          title: "name character",
          text: "Enter names of your loved ones to feature in the story",
        },
        {
          img: hw_image_3,
          title: "upload photos",
          text: "Upload good quality photos of your child and loved ones.",
        },
      ],
      block_2: [
        {
          img: hw_image_4,
          title: "Preview Story",
          text: "See your child's photo transformed into an enchanting story preview.",
        },
        {
          img: hw_image_5,
          title: "Print & Deliver",
          text: "See how the magic unfolds before placing anorder.",
        },
      ],
    },
    joyfulpages: [jm_image_1, jm_image_2, jm_image_3, jm_image_4],
    features: [
      {
        img: feature_image_1,
        title: "Easy to Use",
        text: "Simple steps to create your personalized story.",
      },
      {
        img: feature_image_2,
        title: "AI-Powered Personalization",
        text: "Turn your child into the hero of every story.",
      },
      {
        img: feature_image_3,
        title: "High-Quality Prints",
        text: "Premium materials for a keepsake-worthy book.",
      },
      {
        img: feature_image_4,
        title: "Secure & Private",
        text: "Your child’s photos are processed securely with no storage.",
      },
    ],
    whatuget: [
      {
        title: "Foster a love for reading.",
        img: wyg_image_1,
      },
      {
        title: "Boost self-esteem.",
        img: wyg_image_2,
      },
      {
        title: "Enhance literacy skills",
        img: wyg_image_3,
      },
      {
        title: "Strengthen family bond",
        img: wyg_image_4,
      },
      {
        title: "Create unique gifts",
        img: wyg_image_5,
      },
      {
        title: "Screen free moments",
        img: wyg_image_6,
      },
    ],
    stories: [
      {
        title: "Sulwe",
        text: "Step into a world of wonder right outside your door! In Your Own Backyard is a delightful personalized storybook that takes young readers on an exciting adventure through their own backyard.",
        img: book_image_3,
      },
      {
        title: "The Story of a Little Monkey",
        text: "Step into a world of wonder right outside your door! In Your Own Backyard is a delightful personalized storybook that takes young readers on an exciting adventure through their own backyard.",
        img: book_image_1,
      },
      {
        title: "The Book of Unseen World",
        text: "Step into a world of wonder right outside your door! In Your Own Backyard is a delightful personalized storybook that takes young readers on an exciting adventure through their own backyard.",
        img: book_image_2,
      },
    ],
    pricing: [
      {
        type: "Single Purchase",
        price: "499",
        duration: "story",
        text: "Turn screen time into story time – personalized, educational, and fun...",
        benefits: ["1 Story Creation", "No Subscription Needed"],
      },
      {
        type: "Monthly Plan",
        price: "499",
        duration: "month",
        text: "Turn screen time into story time – personalized, educational, and fun...",
        benefits: [
          "Unlimited Story Creations",
          "Premium Templates",
          "10% Print Off",
        ],
        recommended: true,
      },
      {
        type: "Yearly Purchase",
        price: "9999",
        duration: "year",
        text: "Turn screen time into story time – personalized, educational, and fun...",
        benefits: [
          "All Monthly Features",
          "Save 20%",
          "Birthday Bonus Templates",
        ],
      },
    ],
    testimonial: [
      {
        text: "“I've been using this web hosting service for a few months now and overall it's been fine. The uptime has been good and I haven't had any major issues. The pricing is also reasonable. Nothing particularly stands out as exceptional,but it gets the job done.”",
        rating: 3,
        img: avatar_img,
        name: "Tom Williams",
        designation: "Finance Manager",
      },
      {
        text: "“I've been using this web hosting service for a few months now and overall it's been fine. The uptime has been good and I haven't had any major issues. The pricing is also reasonable. Nothing particularly stands out as exceptional,but it gets the job done.”",
        rating: 3,
        img: avatar_img,
        name: "Jack Harper",
        designation: "Drone Maintner",
      },
      {
        text: "“I've been using this web hosting service for a few months now and overall it's been fine. The uptime has been good and I haven't had any major issues. The pricing is also reasonable. Nothing particularly stands out as exceptional,but it gets the job done.”",
        rating: 3,
        img: avatar_img,
        name: "Harvey Dent",
        designation: "Senator",
      },
      {
        text: "“I've been using this web hosting service for a few months now and overall it's been fine. The uptime has been good and I haven't had any major issues. The pricing is also reasonable. Nothing particularly stands out as exceptional,but it gets the job done.”",
        rating: 3,
        img: avatar_img,
        name: "Harvey Dent",
        designation: "Senator",
      },
      {
        text: "“I've been using this web hosting service for a few months now and overall it's been fine. The uptime has been good and I haven't had any major issues. The pricing is also reasonable. Nothing particularly stands out as exceptional,but it gets the job done.”",
        rating: 3,
        img: avatar_img,
        name: "Harvey Dent",
        designation: "Senator",
      },
    ],
    faq: [
      {
        expanded: false,
        question: "What personal information do you collect ?",
        answer: `We collect basic information such as your name, email address, shipping address, payment details, and photos
for personalization stored securely.`,
      },
      {
        expanded: false,
        question: "How is my personal information used?",
        answer: `Your personal information is used to process your orders, personalize your storybook, communicate with you
about your purchases, and improve our
services.`,
      },
      {
        expanded: false,
        question: "Is my payment information secure?",
        answer: `Yes, we use third-party payment processors that employ industry-standard encryption to ensure that your payment
information is secure.`,
      },
      {
        expanded: false,
        question: "Can I preview my personalized storybook before ordering?",
        answer: `You can have a glimpse of how your personalized storybook will be. Check try now for free section.`,
      },
      {
        expanded: false,
        question:
          "How can I update or change my order after it has been placed?",
        answer: `if you need to make changes to your order, please contact us within 24 hours at support@kadhaster.com . We can
assist with cancellations or adjustments if the order hasn't yet been processed or shipped.`,
      },
      {
        expanded: false,
        question: "Do you ship internationally?",
        answer: `Currently, we offer shipping to UAE. If you are located outside of this area, please contact us for more
information about potential international shipping.`,
      },
      {
        expanded: false,
        question: "How long will it take to receive my personalized storybook?",
        answer: `Processing and delivery times vary depending on your location. Typically, orders are processed within 2-3
business days, with delivery taking 5-7
business days after processing.`,
      },
      {
        expanded: false,
        question: "Can I cancel my order?",
        answer: `Orders can be canceled within 2 hours after purchase. After that, cancellations may not be possible due to the
customization process.`,
      },
      {
        expanded: false,
        question: "How can I contact customer support?",
        answer: `You can reach our customer support team via email at
suport@kadhaster.com, by phone at [phone number], or through our contact
form on the website.`,
      },
      {
        expanded: false,
        question: "Do you offer gift cards or discounts?",
        answer: `Yes, we offer gift cards and occasional promotional discounts. Stay tuned to our website and newsletter for the
latest offers!`,
      },
      {
        expanded: false,
        question: `Can I change the photo used for my personalized storybook after placing the
order?`,
        answer: `Once the order is placed, we begin processing the personalization. If you
need to update the photo, please contact us as soon as possible before we
begin production.`,
      },
      {
        expanded: false,
        question: `How do I know my information is protected?`,
        answer: `We take your privacy seriously. Our website uses SSL encryption to protect your data, and we never share your
personal information without your consent.`,
      },
      {
        expanded: false,
        question: `What is the Size and quality of the book?`,
        answer: `Premium thick paper. High quality binding in both Hardcover and
Paperback.8.5" x 8.5", Printed locally in India`,
      },
      {
        expanded: false,
        question: `Can I Order multiple books?`,
        answer: `Yes . you can add books to cart and checkout as usual.`,
      },
      {
        expanded: false,
        question: `Cancellation & Refund Policy`,
        answer: `An order can be canceled within 24 hours of placement by emailing us at
support@kadhaster.com. We will issue a partial refund based on the cancellation reason.\n\n
If the book arrives damaged, notify us within 7 days of receiving the damaged item, and
we will arrange for a resolution based on the situation.\n\n
Refunds will be processed within 7 working days. Please note that additional time may be
required for the credit to appear in your account. If you have not received your refund
after 14 working days, kindly contact us at support@kadhaster.com.`,
      },
    ],
  };

  const moreThanBook = [
    {
      image: Maskgroup1,
      title: "Healthy Alternative to Screens",
    },
    {
      image: Maskgroup2,
      title: "Family Bonding Experience",
    },
    {
      image: Maskgroup3,
      title: "Creative Gifting Option",
    },
    {
      image: Maskgroup4,
      title: "Self Esteem Booster",
    },
    {
      image: Maskgroup5,
      title: "Gateway to Reading Habits",
    },
  ];

  const comingSoonArr = [
    {
      image: book_img1,
    },
    {
      image: book_img2,
    },
    {
      image: book_img3,
    },
    {
      image: book_img4,
    },
    {
      image: book_img5,
    },
  ];

  const [comingSoonList, setComingSoonList] = useState([])

  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedStoryData, setSelectedStoryData] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  console.log(carouselIndex, "carousel");
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState({
    story: [],
    subscription: [],
    testimonial: [],
    banner: null,
  });
  console.log(apiData.banner);
  const [accordionIndex, setAccordionIndex] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  };
  const tabWidth = window.innerHeight <= 1024; // subscription: `${baseUrl}user/home/subscription-plan-list`, const
  const apiUrl = {
    story: `${baseUrl}user/home/our-story-list`,
    testimonial: `${baseUrl}user/home/testimonial-list`,
    banner: `${baseUrl}user/home/banner-template/`,
    comingSoon: `${baseUrl}user/home/coming-soon-stories`,
  };
  const toggleAccordion = (index) => {
    if (index == accordionIndex) {
      setAccordionIndex(null)
    } else {
      setAccordionIndex(index)
    }
    // setAccordionIndex((prev) => (prev || prev === 0 ? null : index));
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

  const api = async () => {
    setLoading(true);
    const url = Object.values(apiUrl);
    const keys = Object.keys(apiUrl);
    try {
      const response = await Promise.all(
        url.map((link) => {
          return axios.get(link, { headers });
        })
      );
      let obj = {};
      response.forEach((item, i) => {
        obj[keys[i]] = item?.data?.data;
      });
      setApiData(obj);
      setComingSoonList(obj.comingSoon ?? []);
      setSelectedStory(1);
      setSelectedStoryData(obj?.story?.[1])
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  // Handle initial load and browser back/forward navigation


  useEffect(() => {
    api();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    // Handle initial hash on page load
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash) {
      setTimeout(() => {
        const element = document.getElementById(initialHash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }

    // Listen for hash changes (back/forward browser navigation)
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // useEffect(() => {
  // const interval = setInterval(() => {
  // setCurrentImageIndex((prevIndex) =>
  // prevIndex === data.hero_data.length - 1 ? 0 : prevIndex + 1
  // );
  // }, 4000);

  // return () => clearInterval(interval);
  // }, [data.hero_data.length]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // For screens below 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // For screens below 768px (Tablets)
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // For screens below 480px (Mobile)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [showButton, setShowButton] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      if (el.scrollTop > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);



  const onSubmit = async data => {
    await sendRequest(
      {
        url: "user/home/form/contact-us",
        body: {
          name: data.name,
          email: data.email,
          country_code: data.mobile.dialCode,
          mobile_number: data.mobile.mobile,
          subject: data.subject,
          message: data.message,
        },
        method: "POST",
      },
      response => {
        console.log("success")
        toggleContact(false)()
        form.reset() // Reset form after successful submission
        setOpenAdduser9(true)
        // Swal.fire({
        //   title: "Submitted",
        //   icon: "success",
        //   background: "#373737",
        //   customClass: {
        //     popup: "my-swal-popup",
        //   },
        //   confirmButtonColor: "#3085d6",
        //   confirmButtonText: "ok",
        // })
      },
      error => {
        // Handle error case
        Swal.fire({
          title: "Error",
          text: "Failed to submit form. Please try again.",
          icon: "error",
          background: "#373737",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        })
      }
    )
  }

  return (

    <>
      {loading && (
        <section
          style={{
            width: "100%",
            display: "grid",
            placeItems: "center",
            height: "100%",
            position: "fixed",
            zIndex: "1400",
            top: "0",
            left: "0",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <CircularProgress color="secondary" size="5rem" />
        </section>
      )}

      {loading && (
        <section style={{
          width: "100%", display: "grid", placeItems: "center", height: "100%", position: "fixed",
          zIndex: "1400", top: "0", left: "0", backgroundColor: "rgba(0,0,0,0.8)",
        }}>
          <CircularProgress color="secondary" size="5rem" />
        </section>
      )}
      <BoostrapDialog
        open={open}
        handleClose={toggleContact(false)}
        showCloseIcon={false}
        customWidth={"620px"}
        overflowY={"unset"}
        rootStyle={{
          borderRadius: "20px",
        }}
        children={
          <div
            className={styles.addUser}
            style={{
              padding: "40px 30px",
              background: "linear-gradient(to bottom, #00000084 0%, #bc51ffb2 100%)",
              borderRadius: "15px",
            }}
          >
            <h3 className={styles.addUserHeader} style={{ fontFamily: "var(--font-regular-Quicksand)" }}>
              Contact Us
            </h3>
            <div className={styles.addUserForm}>
              <div className={styles.gift_header}>
                <div style={{ width: "100%" }}>
                  <p
                    style={{
                      textAlign: "center",

                      fontFamily: "var(--font-regular-Quicksand)",
                      color: "#ffff",
                      maxWidth: "450px",
                      margin: "10px auto",
                    }}
                  >
                    Have a question, feedback, or need help? Fill out the form
                    below and our team will get back to you as soon as possible.
                  </p>
                </div>
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="off"
                noValidate
              >
                <div className={styles.addUserInput}>
                  <div className={styles.input_text_filed}>
                    {/* Name Field */}
                    <Controller
                      name="name"
                      control={form.control}
                      rules={{
                        required: "Full Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <CustomTextFieldLogin
                          id="name"
                          placeholder="Full Name"
                          variant="outlined"
                          sx={{ width: "100%" }}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      )}
                    />

                    {/* Email Field */}
                    <Controller
                      name="email"
                      control={form.control}
                      rules={{
                        required: "Email is required",
                        validate: {
                          isValid: value => {
                            return (
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                                value
                              ) || "Invalid email format"
                            )
                          },
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <CustomTextFieldLogin
                          id="email"
                          placeholder="Email Address"
                          variant="outlined"
                          sx={{ width: "100%" }}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* Mobile Field */}
                  <Controller
                    name="mobile"
                    control={form.control}
                    rules={{
                      required: "Mobile number is required",
                      validate: (value) => {
                        const digits = value?.full?.replace(/\D/g, "") || "";

                        const countryCodeLength = value?.dialCode?.length || 0;
                        const nationalNumber = digits.slice(countryCodeLength);

                        if (nationalNumber.length < 8 || nationalNumber.length > 13) {
                          return "Enter valid mobile number";
                        }

                        return true;
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <div className="mb-4">
                        <PhoneNumInput2
                          value={field.value?.full || ""}
                          onChange={(value, country) => {
                            const digits = value.replace(/\D/g, "");

                            const countryCodeLength = country.dialCode.length;
                            const nationalNumber = digits.slice(countryCodeLength);

                            field.onChange({
                              full: value,
                              dialCode: country.dialCode,
                              mobile: nationalNumber, // ✅ ONLY local number (no 91)
                            });
                          }}
                          error={fieldState.error}
                        />

                        {fieldState.error && (
                          <p style={{ fontSize: "12px", color: '#fff' }}>
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {/* Subject Field */}
                  <Controller
                    name="subject"
                    control={form.control}
                    rules={{
                      required: "Subject is required",
                      minLength: {
                        value: 3,
                        message: "Subject must be at least 3 characters",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <CustomTextFieldLogin
                        id="subject"
                        placeholder="Subject"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />

                  {/* Message Field */}
                  <Controller
                    name="message"
                    control={form.control}
                    rules={{
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                      maxLength: {
                        value: 255,
                        message: "Message must not exceed 255 characters",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <MinHeightTextarea
                        maxLength="255"
                        label="Message"
                        title="Message"
                        name="message"
                        rows={4}
                        placeholder="Your message..."
                        error={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                        style={{ borderRadius: "12px" }}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className={styles.btn_group}>
                  <button
                    className={styles.cancel}
                    onClick={toggleContact(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${styles.continueBtn} ${styles.width_cont}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
      />
      {apiData.banner && (
        <header>
          <section className={`${classes.announcement}`}>
            <img
              draggable={false}
              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
              src={star_red} alt="star icon" />
            <h3>
              {/* Sale Ends In <strong> 01 Day : 05 H : 51 M : 46 S</strong> */}
              {apiData.banner}
            </h3>
            <img
              draggable={false}
              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={star_red} alt="star icon" />
            {/* <img src={star_red} alt="star icon" />
        <h3>
          Magical May Offer! &nbsp; <strong>Buy 1</strong> Book,&nbsp;
          <strong>Get 1</strong> FREE – Only till <strong>May 10th!</strong>
        </h3>
        <img src={star_red} alt="star icon" /> */}
          </section>
        </header>
      )}
      <main ref={scrollRef} className={`${classes.main_content} ${classes.home_page}`}>
        {/* <Header scrollToSection={scrollToSection} /> */}
        <Header />
        {/* <EmblaCarouselAuto slides={[0, 1, 2, 3]} options={{ loop: true, watchDrag: false }}>
        {data.hero_data.map((item) => {
        return (
        <section id="hero" className={`${classes.hero__section} embla__auto__slide`} style={{ backgroundImage:
          `url(${item.img})`, }}>
          <section className={`${classes.container} `}>
            <section className={`${classes.content}`}>
              {item.title}

              <p>{item.sub_title}</p>
              <section className={`${classes.button__primary__container}`} onClick={()=> {
                navigate("/user/try-now");
                }}
                >
                <button className={`${classes.button__primary} ${classes.button__primary__l}`}>
                  <img src={magic_icon} alt="" />
                  <p>Try Now For Free</p>
                </button>
              </section>
            </section>
            <section>
              <p>Scroll for more info</p>
              <img src={down_arrow_icon} alt="" />
            </section>
          </section>
          <section className={`${classes.faded__section}`}></section>
        </section>
        );
        })}
      </EmblaCarouselAuto> */}
        <section
          id="hero"
          className={`${classes.hero__section} embla__auto__slide`}
          style={
            {
              // backgroundImage: url(${hero_img})`,
            }
          }
        >
          <section className={`${classes.container} `}>
            <section className={`${classes.content}`}>
              {data.hero_data[carouselIndex]?.title}
              <p>{data.hero_data[carouselIndex]?.sub_title}</p>
              {/* <h1>
              Unlock personalized stories starring{" "}
              <strong> your child & loved ones</strong>
            </h1>

            <p>
              Here for the first time: Upload Name & Photo- That's All It
              Takes!
            </p> */}
              <EmblaCarouselAuto
                setCarouselIndex={setCarouselIndex}
                options={{ loop: true, watchDrag: tabWidth }}
              >
                {data.hero_data.map((item, i) => {
                  return (
                    <section
                      key={i}
                      id="hero"
                      className={`${classes.slider__row} embla__auto__slide`}
                      style={{}}
                    >
                      <img src={item.img_1} alt=""
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                      <img src={item.img_2} alt=""
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                    </section>
                  );
                })}
              </EmblaCarouselAuto>
              <section
                className={`${classes.button__primary__container}`}
                onClick={() => {
                  navigate("/user/try-now");
                }}
              >
                <button
                  className={`${classes.button__primary} ${classes.button__primary__l}`}
                >
                  <img
                    draggable={false}
                    onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={magic_icon} alt="" />
                  <p>Try Now For Free</p>
                </button>
              </section>
              <div className="d-flex justify-content-end align-items-center w-100">
                <section className={`${classes.button__primary__container1}`}
                >
                  <button className={`${classes.button__primary1} ${classes.button__primary__l}`}
                    style={{ marginBottom: "0", cursor: "pointer" }}
                    onClick={toggleContact(true)}>
                    <img
                      draggable={false}
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={headphone_icon} alt="" />
                    <p className="con_p_btn">Contact Us</p>
                  </button>
                </section>
              </div>
            </section>
          </section>
        </section>

        {/* kadhaster story section starts */}

        <section className={`${classes.kadhaster_story}`}>
          {/* <div className={`${classes.kadhaster_curve_top}`}>
        <img src={kadhastory_top_curve} alt="" />
        </div> */}
          <section className={`${classes.container}`}>
            <h2 className={`${classes.section__title}`}>The Kadhaster Story</h2>

            <div className={`${classes.kadhaster_grid}`}>
              <div className={`${classes.kadhaster_content}`}>
                <p>
                  A world where screens don’t rule children’s minds Where
                  technology is just a tool and not terror Where reading is an
                  activity that children just can’t miss
                </p>
                <p>That is the world we envision with Kadhaster</p>
                <p>
                  Our interactive books are designed to make stories personal,
                  where the characters look like the children reading them and
                  the adventures feel like their own. With Kadhaster, every
                  story becomes an opportunity to connect, imagine and grow!
                </p>
              </div>
              <div className={`${classes.kadhaster_img}`}>
                <img
                  draggable={false}
                  onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={kadhaster_img} alt="" />
              </div>
            </div>
          </section>
          <section
            id="howitworks"
            style={{ height: "0px", color: "#000" }}
          ></section>
        </section>

        {/* kadhaster story section starts */}

        {/* how it works new starts */}
        <section className={`${classes.how_its_work}`}>
          <div className={`${classes.how_its_wave}`} aria-hidden />
          <div className={`${classes.how_its_butter}`}>
            <img
              draggable={false}
              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
              src={butterfly_png}
              alt=""
            />
          </div>
          <section className={`${classes.container} ${classes.how_work_container}`}>
            <h2 className={`${classes.section__title} ${classes.how_work_heading}`}>
              How It Works?
            </h2>
            <div className={`${classes.how_work_layout}`}>
              <div className={`${classes.how_work_video_col}`}>
                <div className={`${classes.how_work_video_frame}`}>
                  <video
                    className="k-video-bs"
                    src={desktopVideo}
                    controls
                    playsInline
                    preload="metadata"
                    controlsList="nodownload"
                    draggable={false}
                    onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                  />
                </div>
              </div>
              <ul className={`${classes.how_work_steps}`}>
                {howItWorksSteps.map((step) => (
                  <li key={step.key} className={`${classes.how_work_step}`}>
                    <div className={`${classes.how_work_step_icon}`}>
                      <img
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                        src={step.circleImg}
                        alt=""
                        className={step.key === "print" ? classes.obj_lefcen : undefined}
                      />
                    </div>
                    <div className={`${classes.how_work_step_body}`}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </section>

        {/* <div className="container">
          <div className="row">
            <div className="col-6 col-md-6 order-1 mb-3">
              <img
              draggable={false}
              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={select_story_img} className="img-fluid" alt="1" />
            </div>
            <div className="col-6 col-md-6 order-2 mb-3">
              <img
              draggable={false}
              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={add_details_img} className="img-fluid" alt="2" />
            </div>
            <div className="col-6 col-md-6 order-4 order-md-3 mb-3">
              <img
              draggable={false}
              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={print_deliver_img} className="img-fluid" alt="3" />
            </div>
            <div className="col-6 col-md-6 order-3 order-md-4 mb-3">
              <img
              draggable={false}
              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={preview_magic_img} className="img-fluid" alt="4" />
            </div>
          </div>
        </div> */}


        {/* how it works new ends */}


        <section
          className={`${classes.howitworks__section} ${classes.how_it_work_old} ${classes.section__space}`}
        >
          <section className={`${classes.container}`}>
            {" "}
            <br />
            <br />
            <br />
            <h2 className={`${classes.section__title}`}>how it works ?</h2>
            <ul className={`${classes.section__container__space}`}>
              {data.howitworks.block.map((item) => {
                return (
                  <li>
                    <img src={item.img} alt=""
                      draggable={false}
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        </section>


        {/* <section className={`${classes.joyfulpages} ${classes.section__space}`}>

        <h2 className={`${classes.section__title}`}>
          Joyful Pages! Cherished Memories !
        </h2>
        <section className={`${classes.section__container__space} ${classes.content__inner}`}>
          <section className={` ${classes.content__images}`}>
            {data.joyfulpages.map(item => {
            return <img src={item} alt="" />
            })}
          </section>
        </section>
      </section> */}

        {/* our features new starts */}

        <section
          id="features"
          className={`${classes.our_features_section}`}>
          <section className={`${classes.container}`}>
            <div className={`${classes.our_features_grid}`}>
              <div className={`${classes.our_features_content}`}>
                <div className={`${classes.our_features_img}`}>
                  <img src={our_features_thumb_img} alt=""
                    draggable={false}
                    onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                </div>
              </div>
              <div className={`${classes.our_features_content}`}>
                <div className={`${classes.our_features_list}`}>
                  <h2 className={`${classes.section__title}`}>Our Features</h2>
                  <div className={`${classes.our_features_list_grid}`}>
                    <div className={`${classes.our_features_card}`}>
                      <img src={easy_to_use} alt=""
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                      <h3>Easy to Use</h3>
                      <p>Simple steps to create your personalized story.</p>
                    </div>
                    <div className={`${classes.our_features_card}`}>
                      <img
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={ai_powered} alt="" />
                      <h3>AI-Powered Personalization</h3>
                      <p>Turn your child into the hero of every story.</p>
                    </div>
                    <div className={`${classes.our_features_card}`}>
                      <img
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={high_quality} alt="" />
                      <h3>High-Quality Prints</h3>
                      <p>Premium materials for a keepsake-worthy book.</p>
                    </div>
                    <div className={`${classes.our_features_card}`}>
                      <img
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={secure_private} alt="" />
                      <h3>Secure & Private</h3>
                      <p>
                        Your child’s photos are processed securely with no
                        storage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* our features new starts */}

        {/* more than a book starts */}
        <section className={`${classes.more_than_book}`}>
          <section className={`${classes.container}`}>
            <h2 className={`${classes.section__title}`}>
              More Than a Book, It's a
            </h2>
            <div className={`${classes.more_than_book_grid}`}>
              {moreThanBook?.map((item, ind) => {
                return (
                  <div className={`${classes.col_md_4}`}>
                    <div className={`${classes.more_than_book_card}`} key={ind}>
                      <img
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={item?.image} alt="" />
                      <h3>{item?.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>

        {/* more than a book ends */}



        {/* our features old starts */}

        <section className={`${classes.features} ${classes.section__space}`}>
          <section className={`${classes.container}`}>
            <h2 className={`${classes.section__title}`}></h2>
            <ul
              className={`${classes.section__container__space} ${classes.grid}`}
            >
              {data.features.map((item) => {
                return (
                  <li>
                    <section>{/* <img src={item.img} alt="" /> */}</section>
                    {/* <h3>{item.title}</h3>
              <p>{item.text}</p> */}
                  </li>
                );
              })}
            </ul>
          </section>
        </section>

        {/* our features old ends */}

        <section id="whatuget"></section>
        <section className={`${classes.whatuget} ${classes.section__space}`}>
          <section className={`${classes.container}`}>
            <h2 className={`${classes.section__title}`}>What You Get</h2>
            <ul
              className={`${classes.grid} ${classes.section__container__space}`}
            >
              {data.whatuget.map((item) => {
                return (
                  <li className={`${classes.card__container}`}>
                    <section className={`${classes.card}`}>
                      <h3>{item.title}</h3>
                      <img
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={item.img} alt="" />
                    </section>
                  </li>
                );
              })}
            </ul>
          </section>
        </section>

        {/* our stories starts */}
        <section id="stories"></section>
        <section className={`${classes.dive_stories_section}`}>
          <div className={`${classes.dive_curve_top}`}>
            <img
              draggable={false}
              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={dive_curve_top_img} />
          </div>
          <div className={`${classes.dive_curve_bottom}`}>
            <img
              draggable={false}
              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={dive_curve_bottom_img} />
          </div>
          <section className={`${classes.stories} ${classes.section__space}`}>
            <section className={`${classes.container}`}>
              <h2 className={`${classes.section__title}`}>Dive into our stories</h2>
              <ul
                className={`${classes.content} ${classes.section__container__space}`}
              >
                {apiData.story.map((item, i) => {
                  return (
                    <li
                      onClick={() => {
                        setSelectedStory(i);
                        setSelectedStoryData(item)
                      }}
                      key={item.id}
                      className={`${i === selectedStory ? classes.selected : ""}`}
                    >
                      <img
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={item.book_cover} alt="" />
                      {
                        <section className={`${classes.info}`}>
                          <section className={`${classes.info_content}`}>
                            <h3>{item.name}</h3>
                            <p title={item.description}>{item.description}</p>
                          </section>
                          <section className={`${classes.btns}`}>

                            <button
                              onClick={() => {
                                navigate("/user/books");
                                localStorage.storyId = item?.id;
                                localStorage.name = item?.name;
                              }}
                            >
                              View Book
                            </button>
                          </section>
                        </section>
                      }
                    </li>
                  );
                })}
              </ul>


              <div className={`${classes.dive_btn}`}>
                <button onClick={() => {
                  navigate("/user/coming-soon");
                  localStorage.storyId = selectedStoryData?.id
                  localStorage.isdata = selectedStoryData
                  localStorage.book_data = JSON.stringify(selectedStoryData);
                }}
                  className={`${classes.button__primary} ${classes.button__primary__s}`}
                >
                  <img
                    draggable={false}
                    onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={magic_icon} alt="" />
                  <p>Generate</p>
                </button>
              </div>
              <Link to="/user">
                View More Stories <img
                  draggable={false}
                  onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={chevron_right} alt="" />
              </Link>
            </section>
          </section>
        </section>

        {/* our stories end */}

        {/* <section id="pricing" style={{ height: "100px" }}></section>
      <section className={`${classes.pricing} ${classes.section__space}`}>
        <section className={`${classes.container}`}>
          <h2 className={classes.section__title}>
            Where Love Meets Imagination – Subscribe Today!
          </h2>
          <ul className={`${classes.section__container__space} ${classes.content}`}>
            {apiData.subscription.map((item, i) => {
            return (
            <li key={item.id} className={classes.card__container}>
              <section className={classes.card}>
                <section className={`${classes.title__row}`}>
                  <h5>{item.name}</h5>
                  {item.is_recommended && <section>Recommended</section>}
                </section>
                <h2>
                  &#8377; {item.price}{" "}
                  {item.type && <span>/ {item.type} </span>}
                </h2>
                <p>{item.text}</p>
                <div className={`${classes.divider}`}></div>
                <h6>Benefits:</h6>
                <ul>
                  {item.benefits.map((item) => {
                  return (
                  <li>
                    <img src={tick_icon} alt="check mark" />{" "}
                    <p>{item}</p>
                  </li>
                  );
                  })}
                </ul>
                <section className={`${classes.button__primary__container}`}>
                  <button className={`${classes.button__primary} ${classes.button__primary__l}`} onClick={()=> {
                    navigate("/user/my_subscriptions");
                    }}
                    >
                    <p>Choose Plan</p>
                    <img src={right_arrow_icon} alt="right arrow" />
                  </button>
                </section>
              </section>
            </li>
            );
            })}
          </ul>
          <p>
            Turn screen time into story time – personalized, educational, and
            fun...
          </p>
        </section>
      </section> */}

        {/* testimonial old starts */}

        {/*  <section id="testimonial" style={{ height: "100px" }}></section>
      <section className={`${classes.testimonial} ${classes.section__space}`} style={ apiData.testimonial?.length> 2 ?
        {} : { backgroundImage: "none" }
        }
        >
        <section className={`${classes.container}`}>
          <h2 className={`${classes.section__title}`}>Testimonial</h2>
          <p className={`${classes.section__paragraph}`}>
            Don't just take our word for it - see what actual customers of our
            service have to say about their experience.
          </p>
          <section className={`${classes.section__container__space} ${classes.content__outer}`}>
            {apiData.testimonial?.length > 2 ? (
            <EmblaCarousel options={{ align: "center" }}>
              {apiData.testimonial.map(item => {
              return (
              <section key={item.id} className={`${classes.glass__card} embla__slide`}>
                <p>{item.description}</p>
                <section></section>
                <section>
                  {item.image ? (
                  <img src={item.image} alt="" />
                  ) : (
                  <h3>{item.user_image}</h3>
                  )}
                  <h6>{item.name}</h6>
                </section>
              </section>
              )
              })}
            </EmblaCarousel>
            ) : (
            <section className={`${classes.fallback}`}>
              {apiData.testimonial.map(item => {
              return (
              <section key={item.id} className={`${classes.glass__card}`}>
                <p>{item.description}</p>
                <section></section>
                <section>
                  {item.image ? (
                  <img src={item.image} alt="" />
                  ) : (
                  <h3>{item.user_image}</h3>
                  )}
                  <h6>{item.name}</h6>
                </section>
              </section>
              )
              })}
            </section>
            )}

            <section className={` ${classes.content}`}></section>
          </section>
        </section>
      </section> */}

        {/* testimonial old ends */}

        {/* privacy starts */}

        <section id="Privacy" style={{ height: "90px" }}></section>
        <section className={`${classes.privcy} ${classes.section__space}`}>
          <section className={`${classes.container}`}>
            <h2 className={`${classes.section__title}`}>
              Your Child’s Privacy & Data Security is Our Priority
            </h2>
            <p className={`${classes.section__paragraph}`}>
              KADHASTER ensures that every photo, memory, and detail you share
              while creating a personalised family book is safeguarded with the
              highest level of trust.
            </p>
            <SectionPrivacy />
          </section>
        </section>

        {/* privacy ends */}

        {/* testimonial starts */}
        {/* <section id="testimonial" className={`${classes.testimonial_section}`}>
          <section className={`${classes.container}`}>
            <h2 className={`${classes.section__title}`}>Testimonial</h2>
            <p className={`${classes.section__paragraph}`}>
              Don't just take our word for it - see what actual customers of our
              service have to say about their experience.
            </p>
          </section>
          <section className={`${classes.testimonial_content}`}>
            <Slider {...testimonial}>
              {data?.hero_data?.map((item, ind) => {
                return (
                  <section className={`${classes.testimonial_card}`}>
                    <section className={`${classes.testimonial_img}`}>
                      <img src={our_features_thumb_img} alt="" />
                    </section>
                    <h3>Usha Rani</h3>
                    <h6>Mom of 4yrs Child</h6>
                    <p>
                      “I was a little hesitant to switch to a new web hosting
                      company, but I'm glad I took the plunge. The control panel
                      is user-friendly and I love the one-click installation for
                      popular apps. Everything has been smooth sailing since I
                      made the switch.”
                    </p>
                    <section className={`${classes.testimonial_rating}`}>
                      <img src={star_icon} alt="" />
                      <img src={star_icon} alt="" />
                      <img src={star_icon} alt="" />
                      <img src={star_icon} alt="" />
                      <img src={star_icon} alt="" />
                    </section>
                  </section>
                );
              })}
            </Slider>
          </section>
        </section> */}

        {/* testimonial ends */}

        {/* coming soon starts */}

        <section id="comingsoon"></section>
        <section
          className={`${classes.privcy} ${classes.coming_soon_new} ${classes.section__space}`}
        >
          <h2 className={`${classes.section__title}`}>Coming Soon</h2>
          <Slider {...comingSoon}>
            {comingSoonList?.map((item, ind) => {
              return (
                <section className={`${classes.coming_soon_card}`} key={ind}>
                  <section className={`${classes.coming_soon_thumb}`}>
                    <img
                      draggable={false}
                      loading="lazy"
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={item?.gif_path} alt="" />
                  </section>
                </section>
              );
            })}
          </Slider>
        </section>

        {/* coming soon ends */}

        {/* faq section starts */}

        <section
          className={`${classes.faq}  ${classes.faq_section} ${classes.section__space}`}
        >
          <section className={` ${classes.container}`}>
            <h2 className={classes.section__title}>
              Frequently Asked Questions?
            </h2>
            <ul
              className={`${classes.content} ${classes.section__container__space}`}
            >
              {/* {data.faq.map((item, i) => {
            return (
            <li>
              <section>
                <h3>
                  {i + 1 < 10 ? `0${i + 1}` : i + 1} &nbsp;{" "}
                        {item.question}
                      </h3>
                      <button
                        onClick={() => {
                          toggleAccordion(i);
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
                );
              })} */}
              {data.faq.slice(0, 5).map((item, i) => {
                return (
                  <li key={i}>
                    <section>
                      <h3>
                        {i + 1 < 10 ? `0${i + 1}` : i + 1} &nbsp;{" "}
                        {item.question}
                      </h3>
                      <button
                        onClick={() => {
                          toggleAccordion(i);
                        }}
                      >
                        <img
                          draggable={false}
                          onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                          src={accordionIndex === i ? collapse_icon : plus_icon}
                          alt=""
                        />
                      </button>
                    </section>
                    {accordionIndex === i && <p>{item.answer}</p>}
                    {i !== Math.min(data.faq.length, 5) - 1 && (
                      <div className={classes.divider}></div>
                    )}
                  </li>
                );
              })}
              {/* Show " See More" only if FAQs are more than 5 */}{" "}
              {data.faq.length > 5 && (
                <div className={classes["see-more"]}>
                  <NavLink to="/faq">See More</NavLink>
                </div>
              )}
            </ul>
          </section>
        </section>

        {/* faq section ends */}

        {/* make story special starts */}

        <section className={`${classes.make_story_special}`}>
          <section className={`${classes.banner} ${classes.section__space}`}>
            <section
              className={`${classes.container} ${classes.section__container__space}`}
            >
              <section className={`${classes.content}`}>
                <h2 className={`${classes.section__title}`}>
                  Make storytime special with a book starring your child!
                </h2>
                <section
                  className={`${classes.button__primary__container}`}
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  <button
                    className={`${classes.button__primary} ${classes.button__primary__l}`}
                  >
                    <img
                      draggable={false}
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={magic_icon} alt="" />
                    <p>Create Your Personalized Story Now</p>{" "}
                  </button>
                </section>
              </section>
            </section>
          </section>
        </section>

        {/* make story special ends */}
        <Footer />
      </main>
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


      <Modal show={openAdduser9}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser9()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="md"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={"addUser"}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
              <div className={'addUserForm'}>
                <div className={'addUserInput'}>
                  <div className={'addUser_img'}>
                    <img src={circle} alt="alert" width={"100px"} />
                  </div>
                  <div className={'input_sets'}>
                    <h1 className={'title'}>Submitted</h1>
                    {/* <p className={'description'}>
                      Submitted
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center gap-3 mt-3 mb-3"}>
              <button
                className={'sumt_btn'}
                onClick={() => handleClosesetOpenAddUser9()}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </>
  );
}
