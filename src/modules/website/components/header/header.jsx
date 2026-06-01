import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CircularProgress, Drawer, Popover } from "@mui/material";
import { isAuthenticated } from "../../../web/services/isAuthenticated";

import logo_s from "../../assets/image/png/logo3.png";
import menu_icon from "../../assets/image/svg/menu.svg";
import close_icon from "../../assets/image/svg/close.svg";
import down_arrow_icon from "../../assets/image/svg/dpd.svg";
import profile from "../../assets/image/svg/profile.svg";

import classes from "./header.module.css";
import common_classes from "../../pages/Landing/landing.module.css";
import { useSelector } from "react-redux";
import useApiHttp from "../../../web/hooks/ues-http";
import { useDispatch } from "react-redux";
import { authActions } from "../../../web/services/storeSlice/authSlice";
export const Header = (props) => {
  const { scrollToSection } = props;

  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuth = isAuthenticated();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };
  const { isLoading, error, sendRequest } = useApiHttp();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const profileImage = useSelector((state) => state.auth?.profile_picture);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isAuth) {
      listApiCAll();
    }
  }, [isAuth]);

  const listApiCAll = () => {
    sendRequest(
      {
        url: `user/profile/personal-info`,
      },
      (data) => {
        // setOrderData(data?.data);
        dispatch(authActions.setProfilePicture(data?.data?.profile_picture));
      }
    );
  };
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 130;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {isLoading && (
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
          <section
            style={{ display: "grid", placeItems: "center", gap: "10px" }}
          >
            <CircularProgress color="secondary" size="5rem" />
          </section>
        </section>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(30px)",
            borderRadius: "10px",
          },
        }}
      >
        <ul className={`${classes.dropdown}`}>
          <li
            onClick={() => {
              scrollToSection("howitworks");
              handleClose();
              toggleDrawer(false)();
            }}
          >
            How it Works
          </li>
          <li
            onClick={() => {
              scrollToSection("features");
              handleClose();
              toggleDrawer(false)();
            }}
          >
            Features
          </li>
          <li
            onClick={() => {
              scrollToSection("stories");
              handleClose();
              toggleDrawer(false)();
            }}
          >
            Our Stories
          </li>
          {/* <li
            onClick={() => {
              scrollToSection("pricing");
              handleClose();
              toggleDrawer(false)();
            }}
          >
            Pricing & Plans
          </li> */}
          <li
            onClick={() => {
              scrollToSection("testimonial");
              handleClose();
              toggleDrawer(false)();
            }}
          >
            Testimonial
          </li>
        </ul>
      </Popover>
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          "& .MuiPaper-root": {
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(30px)",
            borderRadius: "0px",
            padding: "24px",
            maxWidth: "400px",
            width: "100%",
          },
        }}
      >
        <section
          className={`${classes.navigation__main} ${classes.navigation__sidebar}`}
        >
          <img src={close_icon} alt="" onClick={toggleDrawer(false)} />
          <ul className={`${classes.links} `}>
            <li>
              <NavLink
                to={"/"}
                onClick={handleClick}
                className={({ isActive }) => {
                  return isActive ? `${classes.active}` : "";
                }}
              >
                Home
                <img src={down_arrow_icon} alt="" />
              </NavLink>
            </li>

            <li>
              <Link to="/user">Our Products</Link>
            </li>
            <li>
              <Link to="/user/my_orders">My Orders</Link>
            </li>
            <li>
              <Link to="/user/try-now">Try Now</Link>
            </li>
            <li>
              <Link to="/user/forms">Forms</Link>
            </li>
            {isAuth && (
              <li>
                <Link to="/user/profile_page">Profile</Link>
              </li>
            )}
          </ul>
          {!isAuth && (
            <section
              onClick={() => {
                navigate("/user/login");
              }}
              className={`${common_classes.button__primary__container}`}
            >
              <button
                className={`${common_classes.button__primary} ${common_classes.button__primary__s}`}
              >
                <p>Login / Signup</p>
              </button>
            </section>
          )}
        </section>
      </Drawer>

      {/* web view navbar starts */}

      <nav
        className={`${classes.header__navigation}  ${
          scrolled ? classes.header__bg : ""
        }`}
      >
        <section className={`${classes.container}`}>
          <Link to="/">
            <img
              src={logo_s}
              className={`${classes.logo__s}`}
              alt="company logo"
            />
          </Link>
          
          <section className={classes.navigation__main}>
            <ul className={`${classes.links}`}>
              <li>
                <NavLink
                  to={"/"}
                  onClick={handleClick}
                  className={({ isActive }) => {
                    return isActive ? `${classes.active}` : "";
                  }}
                >
                  Home
                  <img src={down_arrow_icon} alt="" />
                </NavLink>
              </li>

              <li>
                <Link to="/user">Our Products</Link>
              </li>
              <li>
                <Link to="/user/my_orders">My Orders</Link>
              </li>
              <li>
                <Link to="/user/try-now">Try Now</Link>
              </li>
              <li>
                <Link to="/user/forms">Forms</Link>
              </li>
            </ul>
          </section>

          <section>
            {isAuth ? (
              <Link to="/user/profile_page">
                <img
                  src={profileImage || profile}
                  className={classes.profile_img}
                  alt=""
                />
              </Link>
            ) : (
              <section
                className={`${common_classes.button__primary__container}`}
                onClick={() => {
                  navigate("/user/login");
                }}
              >
                <button
                  className={`${common_classes.button__primary} ${common_classes.button__primary__s}`}
                >
                  <p>Login / Signup</p>
                </button>
              </section>
            )}
          </section>

          <section
            className={`${common_classes.button__primary__container}`}
            onClick={toggleDrawer(true)}
          >
            <button
              className={`${common_classes.button__primary} ${common_classes.button__primary__s}`}
            >
              <img src={menu_icon} alt="" />
            </button>
          </section>
        </section>
      </nav>

      {/* Web view navbar ends */}
    </>
  );
};
