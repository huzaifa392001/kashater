import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { Navbar, Nav, Container, Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../web/features/MyCart/MyCartPage.module.css"
import warning from "../../website/assets/image/warning.png";

// images
import pro_address_edit from "../../website/assets/image/profile-address-edit-ic.png";
import pro_address_del from "../../website/assets/image/profile-address-del-ic.png";
import profile_place from "../../website/assets/image/profile-placeholder.png";
import rewards_coin_ic from "../../website/assets/image/rewards-coin-ic.png";
import saves_photo from "../../website/assets/image/saves-photo.png";
import profile_logout_ic from "../../website/assets/image/profile-logout-ic.png";
import profile_test_ic from "../../website/assets/image/profile-test-ic.png";
import close_ic from "../../website/assets/image/close-ic.png";
import useApiHttp from "../../web/hooks/ues-http";
import { useDispatch } from "react-redux";
import useIsMobile from "../../web/hooks/useIsMobile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { authActions } from "../../web/services/storeSlice/authSlice";
import PersonalInfo from "./PersonalInfo";
import RewardsPage from "./RewardsPage";
import MySavesPro from "./MySavesPro";
import TestimonialPro from "./TestimonialPro";

const MyProfileNew = () => {
  const { isLoading, error, success, sendRequest: LogOutRequest } = useApiHttp()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLaptap = useIsMobile(1024)
  const isTablet = useIsMobile(768)
  const isMobile = useIsMobile(500)
  const [open, setOpen] = useState(false)

  const handleCloseOpen = () => {
    setOpen(false)
  }

  const logoutUser = () => {
    try {
      const VerifyEmailData = data => {
        dispatch(authActions.logout())
        navigate("/user/login")
        handleCloseOpen()
        toast.success('Logout Successfull')
      }
      LogOutRequest(
        {
          url: `user/logout`,
        },
        VerifyEmailData
      )
    } catch (error) {

      toast.error(`Logout ${error}`)
    }
  }

  const logOutSwal = () => {
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
    }).then(result => {
      if (result.isConfirmed) {
        logoutUser()
      }
    })
  }

  // useEffect(() => {
  //   if (success !== "") {
  //     toast.success(success, {})
  //   }
  //   if (error !== "") {
  //     toast.error(error, {})
  //   }
  // }, [success, error])

  return (
    <>
      <section className="my-profile-section text-dark">
        <div className="container">
          <div className="my-profile-cont">
            <div className="df j-sb ac">
              <h2 className="title-40px">My Profile</h2>
              <div className="btn-out">
                <span className="d-flex align-items-center gap-2" role="button" onClick={() => setOpen(true)}>
                  <img className="" src={profile_logout_ic} alt="" />
                  Logout
                </span>
              </div>
            </div>
          </div>
          <div className="df f-w j-sb">
            <div className="col-lg-3 col-12">
              <div class="profile-menu-tab py-4">
                <ul class="nav nav-pills" id="pills-tab" role="tablist">
                  <li class="nav-item mb-2" role="presentation">
                    <a
                      class="nav-link active"
                      href="#personal-info"
                      data-bs-toggle="pill"
                    >
                      Personal Information
                    </a>
                  </li>
                  <li class="nav-item mb-2" role="presentation">
                    <a
                      class="nav-link"
                      href="#my-rewards"
                      data-bs-toggle="pill"
                    >
                      My Rewards
                    </a>
                  </li>
                  <li class="nav-item mb-2" role="presentation">
                    <a class="nav-link" href="#my-saves" data-bs-toggle="pill">
                      My Saves
                    </a>
                  </li>
                  <li class="nav-item mb-2" role="presentation">
                    <a
                      class="nav-link"
                      href="#testimonial-pro"
                      data-bs-toggle="pill"
                    >
                      Testimonial
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 col-12">
              <div class="tab-content" id="pills-tabContent">
                <div id="personal-info" class="tab-pane active dat_left holder">
                  <PersonalInfo />
                </div>
                <div id="my-rewards" class="tab-pane  dat_left holder">
                  <RewardsPage />
                </div>
                <div id="my-saves" class="tab-pane  dat_left holder">
                  <MySavesPro />
                </div>
                <div id="testimonial-pro" class="tab-pane  dat_left holder">
                  <TestimonialPro />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <Modal show={open}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleCloseOpen()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="md"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={styles.addUser}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
              <div className={styles.addUserForm}>
                <div className={styles.addUserInput}>
                  <div className={styles.addUser_img}>
                    <img src={warning} alt="alert" width={"100px"} />
                  </div>
                  <div className={styles.input_sets}>
                    <h1 className={styles.title}>Are you sure?</h1>
                    <p className={styles.description}>
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
    </>
  );
};
export default MyProfileNew;
