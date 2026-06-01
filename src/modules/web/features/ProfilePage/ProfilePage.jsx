import React, { useEffect, useMemo, useState } from "react"
import classes from "./ProfilePage.module.css"
import TabBarWithRender from "../../components/Page/Tabs/Tabs"
import PersonalInformation from "./PersonalInformation"
import logout from "../../assets/image/png/logout.png"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../../services/storeSlice/authSlice"
import Swal from "sweetalert2"
import useApiHttp from "../../hooks/ues-http"
import toast from "react-hot-toast"
import Testimonial from "./Testimonial"
import Rewards from "./Rewards"
import MySaves from "./MySaves"
import useIsMobile from "../../hooks/useIsMobile"
import { Modal } from "react-bootstrap"
import warning from "../../../website/assets/image/warning.png";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0)

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

  const tabs = useMemo(
    () => [
      {
        title: "Personal Information",
        render: () => (
          <div className={classes.tabs}>
            <PersonalInformation />
          </div>
        ),
      },
      {
        title: "My Rewards",
        render: () => (
          <div className={classes.tabs}>
            <Rewards />
          </div>
        ),
      },
      {
        title: "My Saves",
        render: () => (
          <div className={classes.tabs}>
            <MySaves />
          </div>
        ),
      },
      // {
      //   title: "Testimonial",
      //   render: () => <div className={classes.tabs}><Testimonial /></div>,
      // },
      {
        title: "Testimonial",
        render: () => (
          <div className={classes.tabs}>
            <Testimonial />
          </div>
        ),
      },
    ],
    [] // tabs only change when `suggestions` changes
  )
  const onTabClick = index => {
    setActiveTab(index)
  }
  const logoutUser = () => {
    const VerifyEmailData = data => {
      dispatch(authActions.logout())
      navigate("/user/login")
    }
    LogOutRequest(
      {
        url: `user/logout`,
      },
      VerifyEmailData
    )
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

  useEffect(() => {
    if (success !== "") {
      toast.success(success, {})
    }
    if (error !== "") {
      toast.error(error, {})
    }
  }, [success, error])
  return (
    <div className={classes.main_page}>
      <div className={classes.main_header}>
        <h3>My Profile</h3>
        <div
          className={classes.main_header_logout}
          onClick={() => setOpen(true)}
        >
          {" "}
          <img src={logout} alt="logout" />
          Logout
        </div>
      </div>

      <div className={classes.maincontainer}>
        <TabBarWithRender
          tabs={tabs}
          onTabClick={onTabClick}
          activeTab={activeTab}
        />
      </div>

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
  )
}

export default ProfilePage
