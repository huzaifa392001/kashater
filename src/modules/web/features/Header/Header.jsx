import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom"; // Add useLocation
import classes from "./Header.module.css";
import logo from "../../../website/assets/image/png/logo3.png";
// import cart from "../../../web/assets/image/svg/cart.svg";
import cart from "../../../web/assets/image/svg/Vector_cart.png";
import ProfileMenu from "../../../web/components/UI/ProfileMenu/ProfileMenu";
import ProfileMenuMob from "../../../web/components/UI/ProfileMenu/ProfileMenuMob";
import { isAuthenticated } from "../../services/isAuthenticated";
import CustomButton from "../../components/UI/Button/Button";
import useApiHttp from "../../hooks/ues-http";
import { authActions } from "../../services/storeSlice/authSlice";
import { useDispatch } from "react-redux";
import iconheader from "../../assets/image/svg/iconheader.svg";
import OverlayLoding from "../../components/UI/Loding/OverlayLoding";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SaveAsIcon from '@mui/icons-material/SaveAs';

// images
import logo_new from "../../../website/assets/image/logo-main.png";
import logo_fav from "../../../website/assets/image/logo-main-fav.png";
import logo_mobile from "../../../website/assets/image/logo_mobile.png";
import kadhaster_img from "../../../website/assets/image/kadhaster-story-img.png";
import profile_place from "../../../website/assets/image/profile-placeholder.png";
import retry_arrow from "../../../website/assets/image/retry-arrow.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { countApi } from "../../services/storeSlice/addCart";

function Header() {
  const navigate = useNavigate();
  const data = useSelector((item) => item?.addCart?.count);
  // console.log("data=>", data);

  const { lastScrollY } = useSelector((state) => state?.scrollnav);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current location
  const pathname = location?.pathname
  // console.log('pathname', pathname);


  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const isActiveRoute = (path) => {
    return (
      location.pathname === path ||
      location.pathname === `/user/browse_our_products` ||
      location.pathname === `/user/books`
    );
  };
  const dispatch = useDispatch();
  const { sendRequest, isLoading } = useApiHttp();
  const isAuth = isAuthenticated();
  useEffect(() => {
    // console.log("not calling personal info");
    if (isAuth) {
      // console.log("calling personal info");
      sendRequest(
        {
          url: `user/profile/personal-info`,
        },
        (data) => {
          dispatch(authActions.setProfilePicture(data?.data?.profile_picture));
        }
      );
    }
  }, [isAuth]);


  const AdminbearerToken = JSON.parse(localStorage.getItem("webAppUserData"))?.authToken;

  useEffect(() => {
    if (AdminbearerToken) {
      dispatch(countApi())
    }
  }, [])

  return (
    <>
      {isLoading && <OverlayLoding />}
      <Navbar expand="xl" className="custom-navbar pos-nav py-3">
        <Container>
          {/* Left: Logo */}
          <Navbar.Brand as={Link} to="/">
            <img className="main-logo" src={logo_mobile} alt="KADHASTER" />
            {/* <img className="res-logo" src={logo_fav} alt="KADHASTER" /> */}
            <img className="res-logo" src={logo_mobile} alt="KADHASTER" />

          </Navbar.Brand>

          {/* Center: Nav Links */}
          {isAuthenticated() && <div className="res-mob">
            <ProfileMenuMob />
          </div>}

          <Navbar.Collapse id="navbar-nav" className="nav-bar min-nav">
            {/* LIVE START */}
            {/* <Nav className="mx-auto">
              <a href="/" className={`nav-link ${pathname == "/" ? 'active' : ""}`}>
                Home
              </a>
              <a href="/#howitworks" className={`nav-link ${pathname == "/about" ? 'active' : ""}`}>
                How it works
              </a>
              <a href={isAuthenticated() ? "/user" : "/user/coming-soon"} className={`nav-link ${pathname == "/user" ? 'active' : ""}`}>
                Our Products
              </a>
              <a href={isAuthenticated() ? "/user/my_orders" : "/user/coming-soon"} className={`nav-link ${pathname == "/user/my_orders" ? 'active' : ""}`}>
                My Orders
              </a>
              <a href={isAuthenticated() ? "/user/try-now" : "/user/coming-soon"} className={`nav-link ${pathname == "/user/try-now" ? 'active' : ""}`}>
                Try Now
              </a>
              * <a to="/blogs" className={`nav-link ${pathname == "/blog" ? 'active' : ""}`}>
                Blogs
              </a> *

              {isAuthenticated() ?
                null
                :
                <a href="/user/coming-soon" className={`nav-link res-mob ${pathname == "/Login / Signup" ? 'active' : ""}`}>
                  Login / Signup
                </a>
              }
            </Nav> */}
            {/* LIVE END */}
            {/* DEV START */}
            <Nav className="mx-auto">
              <Link to="/" className={`nav-link ${pathname == "/" ? 'active' : ""}`}>
                Home
              </Link>
              <a href="/#howitworks" className={`nav-link ${pathname == "/about" ? 'active' : ""}`}>
                How it works
              </a>
              <Link to="/user" className={`nav-link ${pathname == "/user" ? 'active' : ""}`}>
                Our Products
              </Link>
              <Link to="/user/my_orders" className={`nav-link ${pathname == "/user/my_orders" ? 'active' : ""}`}>
                My Orders
              </Link>
              <Link to="/user/try-now" className={`nav-link ${pathname == "/user/try-now" ? 'active' : ""}`}>
                Try Now
              </Link>
              {/* <a to="/blogs" className={`nav-link ${pathname == "/blog" ? 'active' : ""}`}>
                Blogs
              </a> */}

              {isAuthenticated() ?
                null
                :
                <Link to="/user/login" className={`nav-link res-mob ${pathname == "/Login / Signup" ? 'active' : ""}`}>
                  Login / Signup
                </Link>
              }
            </Nav>
            {/* DEV END */}
          </Navbar.Collapse>
          <div className="res-view">
            <div className="nav-pro">
              {/* Right: Profile Icon */}
              {isAuthenticated() ?
                <section
                  // className="profile-icon"
                  className="d-flex w-100 right-sec align-items-end"
                >
                  {/* empty profile */}

                  <Link
                    to="/user/draft" className="cart-ic  mb-1">
                    <BookmarkIcon className="placholder-img" style={{ fill: '#4e1759' }} />

                    <span className="text-primary cart-value">
                      {" "}{data?.draft_count}
                      {/* {5} */}
                    </span>
                  </Link>
                  <Link
                    to="/user/mycart" className="cart-ic">
                    <img
                      className="placholder-img"
                      src={cart}
                      alt="User"
                    />
                    <span className="text-primary cart-value">
                      {" "}{data?.cart_count}
                      {/* {5} */}
                    </span>
                  </Link>

                  {/* user profile */}
                  <ProfileMenu />
                </section>
                :
                <section className="login-btn ">
                  {/* LIVE START */}
                  {/* <a href="/user/coming-soon" >Login / Signup</a> */}
                  {/* LIVE END */}
                  {/* DEV START */}
                  <Link to="/user/login" >Login / Signup</Link>
                  {/* DEV END */}
                </section>
              }
            </div>
            <Navbar.Toggle aria-controls="navbar-nav" />
          </div>
        </Container>
      </Navbar>

    </>
  );
}

export default Header;
