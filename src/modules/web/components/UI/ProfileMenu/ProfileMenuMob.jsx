import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import profileicon from '../../assets/SVG/common/profile.svg'
// import logouticon from '../../assets/SVG/common/logout.svg'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classes from "./profil.module.css";
import { useNavigate, Link } from "react-router-dom";
// import { BASE_URL } from "../../utils/baseUrl"
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import useApiHttp from "../../../hooks/ues-http";
import { authActions } from "../../../services/storeSlice/authSlice";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../../services/isAuthenticated";
import { Modal } from "react-bootstrap";
import warning from "../../../../website/assets/image/warning.png";
import cart from "../../../../web/assets/image/svg/Vector_cart.png";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {

  const data = useSelector((item) => item?.addCart?.count);
  const {
    isLoading,
    error,
    success,
    sendRequest: LogOutRequest,
  } = useApiHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.auth?.profile_picture);

  // console.log('profileImage', profileImage);


  useEffect(() => {
    if (success) {
      toast.success(success, {});
    }
    if (error) {
      toast.error(error, {});
    }
  }, [success, error]);

  const logoutUser = () => {
    const VerifyEmailData = (data) => {
      dispatch(authActions.logout());
      navigate("/");
    };
    LogOutRequest(
      {
        url: `user/logout`,
      },
      VerifyEmailData
    );
  };

  const logOutSwal = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      background: "#373737",
      customClass: {
        popup: "my-swal-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
      }
    });
  };

  const [opens, setOpen] = useState(false)

  const handleCloseOpen = () => {
    setOpen(false)
  }

  const userName = localStorage.getItem("userName");
  const userMail = localStorage.getItem("userEmail");
  const img = localStorage.getItem("img");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLog = () => {
    setAnchorEl(null);
    handleClose()
    setOpen(true)
  }

  return (
    <div className={classes.profile}>
      {/* <Stack direction="row" spacing={2}>
        <Avatar alt="Remy Sharp" src={img} />
      </Stack> */}
      <div className={classes.profile_name}>
        {/* <p>{userName}</p> */}
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          // endIcon={<KeyboardArrowDownIcon />}
          sx={{ minWidth: "0" }}
        >
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="Remy Sharp"
              src={profileImage}
              sx={{ width: "34px", height: "34px" }}
            />
          </Stack>
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Link to="/user/profile_page" style={{ color: 'rgb(55, 65, 81)' }}>
            <MenuItem
              disableRipple
              className="profile_list"
              onClick={() => {
                handleClose();
                // navigate("/user/profile_page");
              }}
            >
              {/* <img src={logouticon} alt="Logout" className={classes.menuicon} /> */}
              My Profile
            </MenuItem>
          </Link>
          <Link
            to="/user/draft" style={{ color: 'rgb(55, 65, 81)' }}>
            <MenuItem
              disableRipple
              className="profile_list"
              onClick={() => {
                handleClose();
                // navigate("/user/profile_page");
              }}
            >
              Draft <span className="cout-res mx-2">{data?.draft_count}</span>
            </MenuItem>

          </Link>
          <Link
            to="/user/mycart" style={{ color: 'rgb(55, 65, 81)' }}>
            <MenuItem
              disableRipple
              className="profile_list"
              onClick={() => {
                handleClose();
                // navigate("/user/profile_page");
              }}
            >
              My Cart <span className="cout-res mx-2">{data?.cart_count}</span>
            </MenuItem>

          </Link>
          <MenuItem disableRipple className="profile_list" onClick={() => handleLog()}>
            {/* <img src={logouticon} alt="Logout" className={classes.menuicon} /> */}
            Logout
          </MenuItem>
        </StyledMenu>
      </div>

      <Modal show={opens}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleCloseOpen()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="md"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={'addUser'}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
              <div className={'addUserForm'}>
                <div className={'addUserInput'}>
                  <div className={'addUser_img'}>
                    <img src={warning} alt="alert" width={"100px"} />
                  </div>
                  <div className={'input_sets'}>
                    <h1 className={'title'}>Are you sure?</h1>
                    <p className={'description'}>
                      You will be logged out from your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center gap-3 mt-3 mb-3"}>
              <button
                className={'cancel_btn'}
                onClick={handleCloseOpen}
              >
                Cancel
              </button>
              <button
                className={'sumt_btn'}
                onClick={() => logoutUser()}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
