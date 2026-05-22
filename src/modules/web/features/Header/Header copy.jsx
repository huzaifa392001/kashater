import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Add useLocation
import classes from "./Header.module.css";
import logo from "../../../website/assets/image/png/logo3.png";
import cart from "../../../web/assets/image/svg/cart.svg";
import ProfileMenu from "../../../web/components/UI/ProfileMenu/ProfileMenu";
import { isAuthenticated } from "../../services/isAuthenticated";
import CustomButton from "../../components/UI/Button/Button";
import useApiHttp from "../../hooks/ues-http";
import { authActions } from "../../services/storeSlice/authSlice";
import { useDispatch } from "react-redux";
import iconheader from "../../assets/image/svg/iconheader.svg";
import OverlayLoding from "../../components/UI/Loding/OverlayLoding";

// images
import logo_new from "../../../website/assets/image/logo-main.png";
import logo_fav from "../../../website/assets/image/logo-main-fav.png";
import kadhaster_img from "../../../website/assets/image/kadhaster-story-img.png";
import profile_place from "../../../website/assets/image/profile-placeholder.png";
import retry_arrow from "../../../website/assets/image/retry-arrow.png";
import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const data = useSelector((item) => item?.addCart?.count);
  console.log("data=>", data);

  // const { lastScrollY } = useSelector((state) => state?.scrollnav);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

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
    console.log("not calling personal info");
    if (isAuth) {
      console.log("calling personal info");
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

  return (
    <>
      {isLoading && <OverlayLoding />}
      <div
        className={`${classes.header} ${lastScrollY ? classes.headerScrolled : ""
          }`}
      >
        <div className={classes["user-profile"]}>
          <a href="/">
            <img
              src={logo}
              alt="Logo"
              className={classes.logo}
            // onClick={() => navigate("/")}
            />
          </a>

          <nav className={classes.nav}>
            <a
              href="
            /"
            >
              Home
            </a>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive || isActiveRoute("/") ? classes.active : ""
              }
              end // Add this to prevent matching sub-routes
            >
              Our Products
            </NavLink>
            <NavLink
              to="/user/my_orders"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              My Orders
            </NavLink>
            {/* {isAuthenticated() && (
              <NavLink
                to="/user/my_subscriptions"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                My Subscriptions
              </NavLink>
            )} */}
            <NavLink
              to="/user/try-now"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Try Now
            </NavLink>
            <NavLink
              to="/user/forms"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              forms
            </NavLink>
          </nav>
        </div>
        <div className={classes["header-actions"]}>
          {isAuthenticated() ? (
            <>
              <button
                className={classes["header-button"]}
                onClick={() => navigate("/user/mycart")}
              >
                <div className={classes["header-bage"]}>
                  <img src={cart} alt="cart" /> <span>{data?.cart_count}</span>
                </div>
              </button>
              <ProfileMenu />
            </>
          ) : (
            <CustomButton
              onClick={() => {
                navigate("/user/login");
              }}
              variant="contained"
              customColor="#000000"
              customBgColor="#F3C11D"
              custmstyle={{
                padding: "7px 20px",
                // width: "280px",
                height: "50px",
                marginTop: "15px",
                gap: ".5rem",
                alignItems: "center",
              }}
              type="submit"
            >
              Login / Signup
            </CustomButton>
          )}

          <button className={classes.hamburger} onClick={toggleMenu}>
            <img src={iconheader} alt="iconheader" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${classes["mobile-menu-drawer"]} ${isMenuOpen ? classes.open : ""
            }`}
        >
          <button className={classes["close-button"]} onClick={toggleMenu}>
            ✕
          </button>

          <a
            href="
            /"
          >
            Home
          </a>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive || isActiveRoute("/") ? classes.active : ""
            }
            onClick={toggleMenu}
            end // Add this to prevent matching sub-routes
          >
            Our Products
          </NavLink>
          <NavLink
            to="/user/my_orders"
            className={({ isActive }) => (isActive ? classes.active : "")}
            onClick={toggleMenu}
          >
            My Orders
          </NavLink>
          {/* {isAuthenticated() && (
            <NavLink
              to="/user/my_subscriptions"
              className={({ isActive }) => (isActive ? classes.active : "")}
              onClick={toggleMenu}
            >
              My Subscriptions
            </NavLink>
          )} */}
          <NavLink
            to="/user/try-now"
            className={({ isActive }) => (isActive ? classes.active : "")}
            onClick={toggleMenu}
          >
            Try Now
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
