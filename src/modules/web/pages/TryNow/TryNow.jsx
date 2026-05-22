import { useEffect, useRef, useState } from "react"
import Marquee from "react-fast-marquee"
import CustomButton from "../../components/UI/Button/Button"

import img_1 from "../../assets/image/jpg/1.jpg"
import img_2 from "../../assets/image/jpg/2.jpg"
import img_3 from "../../assets/image/jpg/3.jpg"
import img_4 from "../../assets/image/jpg/4.jpg"
import img_5 from "../../assets/image/jpg/5.jpg"
import img_6 from "../../assets/image/jpg/6.jpg"
import img_7 from "../../assets/image/jpg/7.jpg"
import img_8 from "../../assets/image/jpg/8.jpg"
import img_9 from "../../assets/image/jpg/9.jpg"
import img_10 from "../../assets/image/jpg/10.jpg"
import img_11 from "../../assets/image/jpg/11.jpg"
import img_12 from "../../assets/image/jpg/12.jpg"
import paper_bg_cut from "../../assets/image/svg/comic-bg-cut.svg"
import paper_bg from "../../assets/image/svg/comic-bg.svg"
import reload_icon from "../../assets/image/svg/reload.svg"
import classes from "./TryNow.module.css"
import BoostrapDialog from "../../components/UI/Dialog/BoostrapDialog"
import FileUploadComponent from "../../components/UI/FileUploadComponent/FileUploadComponent"
import check_img from "../../../website/assets/image/svg/tick.svg"
import { Header } from "../../../website/components/header/header"
import useApiHttp from "../../hooks/ues-http"
import CircularProgress from "@mui/material/CircularProgress"
import { isAuthenticated } from "../../services/isAuthenticated"
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { styled } from "@mui/material/styles"
import CheckBoxs from "../../components/UI/Checkbox/Checkbox/CheckBox"
import { Modal } from "react-bootstrap"
import upload_photo_ic from "../../../website/assets/image/upload-photo-ic.png";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import retry_arrow from "../../../website/assets/image/retry-arrow.png";
import { Footer } from "../../../website/components/footer/footer"
import CustomeSlecterBlack from "../../../admin/components/UI/Dropdown/CustomeSlecterBlack"
import useIsMobile from "../../hooks/useIsMobile"
import CustomeSlecter from "../../../admin/components/UI/Dropdown/CustomeSlecter"
import CustomeSlecterWhite from "../../../admin/components/UI/Dropdown/CustomeSlecterWhite"
import { toast } from "react-toastify"
import ImageCropper from "../../../website/components/ImageCropper/ImageCropper"

export const TryNow = () => {
  const carousel_data = [
    {
      img: img_1,
      text: (
        <p style={{ textAlign: "left" }}>
          <strong>Aadya</strong> has personalised and <br /> purchased her very
          own storybook!
        </p>
      ),
    },
    {
      img: img_2,
      text: (
        <p style={{ textAlign: "left" }}>
          <strong>Karthika</strong> has previewed <br /> and finalised her
          magical tale!
        </p>
      ),
    },
    {
      img: img_3,
      text: (
        <p>
          <strong>Tanya</strong> just previewed and added her magical story to
          the cart!
        </p>
      ),
    },
    {
      img: img_4,
      text: (
        <p style={{ textAlign: "left" }}>
          <strong>Liam</strong> has customised <br />
          and bought his dream storybook!
        </p>
      ),
    },
    {
      img: img_5,
      text: (
        <p style={{ textAlign: "left" }}>
          <strong>Rahul</strong> has created and <br /> ordered his custom
          adventure!
        </p>
      ),
    },
    {
      img: img_6,
      text: (
        <p style={{ textAlign: "left" }}>
          <strong>Dev</strong> has created his custom <br /> heroes and bought
          the storybook!
        </p>
      ),
    },
    {
      img: img_7,
      text: (
        <p style={{ textAlign: "right" }}>
          <strong>Mrs. Raji</strong> has personalised,
          <br /> and purchased her family adventure!
        </p>
      ),
    },
    {
      img: img_8,
      text: (
        <p>
          <strong>Mrs. Mamta</strong> has added her photo and finalised her
          family’s magical book!
        </p>
      ),
    },
    {
      img: img_9,
      text: (
        <p>
          <strong>Mrs. Megna</strong> just previewed and ordered her
          personalised book for the loved ones!
        </p>
      ),
    },
    {
      img: img_10,
      text: (
        <p>
          <strong>Mr. Parthiban</strong> has previewed and completed the order!
        </p>
      ),
    },
    {
      img: img_11,
      text: (
        <p>
          <strong>Mr. Kulkarni</strong> has customised the storybook and can’t
          wait to share it with his family!
        </p>
      ),
    },
    {
      img: img_12,
      text: (
        <p>
          <strong>Mr. Hegde</strong> has designed and ordered his personalised
          book for his dear ones!
        </p>
      ),
    },
  ]
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  }
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const [selectedIndex, setSelectedIndex] = useState(undefined)
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [file, setFile] = useState(null)
  const [open, setOpen] = useState(false)
  const [isSwapped, setIsSwapped] = useState(false)
  const [swappedImage, setSwappedImage] = useState(null)
  const [checked, setChecked] = useState(false)
  const { sendRequest, isLoading, error: apiError } = useApiHttp()
  const selectedCharacterData = data.find(item => item.id === selectedIndex)
  const isAuth = isAuthenticated()

  const [openCropperPopup, setOpenCropperPopup] = useState(false)
  const imageRef = useRef()

  const isTablet = useIsMobile(768);
  const [relationship, setrelationship] = useState("")

  const ConsentList = [
    {
      name: "Parent/Guardian",
      id: "Parent/Guardian"
    },
    {
      name: "Grandparent",
      id: "Grandparent"
    },
    {
      name: "Uncle / Aunt",
      id: "Uncle / Aunt"
    },
    {
      name: "Family Friend",
      id: "Family Friend"
    },
    {
      name: "Teacher / Mentor",
      id: "Teacher / Mentor"
    },
    {
      name: "Neighbor",
      id: "Neighbor"
    },
    // {
    //   name: "Other(Specify)",
    //   id: "Other(Specify)"
    // },
  ]

  const onChange = e => {
    setSelectedIndex(e.target.value)
    if (error) {
      setError(false)
    }
  }
  const handleClose = () => {
    setOpen(false)
    setUploadError(false)
    setConsentError(false)
    setFile(null)
    setChecked(false)
  }
  const handleReset = () => {
    setSelectedIndex(undefined)
    setSwappedImage(null)
    setIsSwapped(false)
    setChecked(false)
  }
  const onSubmit = e => {
    e.preventDefault()
    if (selectedIndex) {
      if (isAuth) {
        setOpen(true)
      } else {
        localStorage.setItem("selected_field", selectedIndex)
        window.location.href = "/user/login"
        localStorage.setItem("signin_redirect", window.location.pathname)
      }
    } else {
      setError(true)
    }
  }

  const onUserUpload = async e => {
    // e.preventDefault()
    // const currentToken = JSON.parse(
    //   localStorage.getItem("webAppUserData")
    // )?.authToken;
    setIsUploading(true)
    const formData = new FormData()
    formData.append("id", selectedCharacterData?.id)
    formData.append("swap_image", file)
    formData.append("consent", checked ? 1 : 0)

    if (file) {
      if (relationship?.length == 0) {
        setConsentError(true)
      } else {
        sendRequest(
          {
            url: "user/try-now/swap-face",
            method: "POST",
            body: formData,
          },
          response => {
            setSwappedImage(response.data)
            setIsSwapped(true)
            setOpen(false)
            setFile(null)
            setChecked(false)
          }
        ).finally(() => {
          setIsUploading(false)
        })
      }
    } else {
      setUploadError(true)
    }
  }

  async function getCharacters() {
    sendRequest(
      {
        url: "user/try-now/characters",
      },
      response => {
        setData(response.data)
        const selectedField = localStorage.getItem("selected_field")
        const foundItem = response.data.find(item => item.id === selectedField)
        if (foundItem) {
          setSelectedIndex(foundItem?.id)
          localStorage.removeItem("selected_field")
        }
      }
    )
    // const response = await fetch(`${baseUrl}user/try-now/characters`, {
    //   headers,
    // });
    // const resObj = await response.json();
    // setData(resObj.data);
  }

  useEffect(() => {
    getCharacters()
  }, [])
  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 50,
    width: 18,
    height: 18,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
      ...theme.applyStyles("dark", {
        backgroundColor: "#30404d",
      }),
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
      ...theme.applyStyles("dark", {
        background: "rgba(57,75,89,.5)",
      }),
    },
    ...theme.applyStyles("dark", {
      boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
      backgroundColor: "#394b59",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
    }),
  }))

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "rgba(0, 153, 48, 1)",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: 18,
      height: 18,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "rgba(0, 153, 48, 1)",
    },
  })

  const BpIcon2 = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "black",
    border: "2px solid #fff",
    // backgroundImage:
    //   "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(219, 241, 255, 0.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
      ...theme.applyStyles("dark", {
        backgroundColor: "#30404d",
      }),
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
      ...theme.applyStyles("dark", {
        background: "rgba(57,75,89,.5)",
      }),
    },
    ...theme.applyStyles("dark", {
      boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
      backgroundColor: "#394b59",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
    }),
  }))

  const BpCheckedIcon2 = styled(BpIcon)({
    backgroundColor: "black",
    border: "2px solid #fff",
    // padding: "2px",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: 12,
      height: 12,
      backgroundImage:
        "radial-gradient(at 57% 60%, #fff,#fff 50%,transparent 52%)",
      content: '""',
    },
  })

  function BpRadio(props) {
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon2 />}
        icon={<BpIcon2 />}
        {...props}
      />
    )
  }
  const handleChange = event => {
    setChecked(event.target.checked)
  }

  console.log('swappedImage', swappedImage);


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
            <CircularProgress color="white" size="3rem" />
            {isUploading && (
              <p>Hold tight, magic is in the making …about 1 minute to go!</p>
            )}
          </section>
        </section>
      )}

      <ImageCropper openCropperPopup={openCropperPopup} setOpenCropperPopup={setOpenCropperPopup}
        onFileChange={file => {
          setFile(file)
          setUploadError(!Boolean(file))
          setOpenCropperPopup(false)
        }}
      />

      <section className={`${classes.try_now}`}>
        <div className="container text-dark">
          <div className="try-now-page">
            <Modal show={open} backdrop="static" // When backdrop is set to static, modal will not close when
              clicking outside it keyboard={false} onHide={() => handleClose()}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              size="lg"
            >
              <div className="try-upload-popup popup-bg-op">
                <div>
                  <div className="mb-3 try-flex-col">
                    <h3 className="text-center">Upload Photo</h3>
                    <h4>Uploading Guideline:</h4>
                    <p>
                      Solo headshot photo – bright, front-facing, with a smile. Please
                      ensure the photo is clear, well-lit, and without sunglasses,
                      hats, or obstructions.
                    </p>
                    <div className="try-upload-card">
                      {file?.name ?
                        <img
                          draggable={false}
                          onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} className="subject-image " src={URL.createObjectURL(file)} alt="" role="button" onClick={() => { setOpenCropperPopup(true) }} /> :
                        <img
                          draggable={false}
                          onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} className="" src={upload_photo_ic} alt="" role="button" onClick={() => { setOpenCropperPopup(true) }} />}
                      {/* <input type="file" ref={imageRef} className="d-none" accept="image/*"
                        onChange={(e) => {
                          setFile(e.target.files[0])
                          setUploadError(!Boolean(e.target.files[0]))
                        }}
                      /> */}

                      {/* children image after uploaded */}
                      {/* <img className="subject-image d-none " src={boy_img} alt="" /> */}

                    </div>
                    <section className="checkboxGroup mt-2">
                      <div className="d-flex f-w gap-2">
                        <p className="text-white mt-2 fw-bolder">What is your relationship to the Hero child?</p>
                        <select
                          id="consent"
                          name="consent"
                          className="custom-select-native"
                          value={relationship}
                          onChange={e => {
                            setrelationship(e.target.value)
                            setConsentError(!e.target.value)
                          }}
                        >
                          <option value="">Choose Consent</option>
                          {ConsentList?.map((item, ind) => {
                            return (
                              <option value={item?.id} key={ind}>{item?.name}</option>
                            )
                          })}
                        </select>
                        {/* <CustomeSlecterBlack
                          data={ConsentList.map(a => ({
                            label: a.name,
                            value: a.id,
                          }))}
                          title="Choose Consent"
                          width={isTablet ? "100%" : "200px"}
                          value={relationship}
                          onChange={e => {
                            setrelationship(e.target.value)
                            setConsentError(!e.target.value)
                          }}
                          borders={true}
                          required
                        /> */}
                      </div>
                    </section>
                    {relationship == 'Parent/Guardian' && <div className="checkboxGroup">
                      <div className="df position-relative">
                        <label className="custom-checkbox">
                          <input type="checkbox" className="mt-2"
                            checked={checked}
                            onChange={handleChange} />
                          <span className="checkmark"></span>
                        </label>
                        <label>
                          <p>I hereby confirm that I am the parent or lawful guardian of the child and that I am over 18 years of age. I
                            consent to the secure use of my photographs submitted solely for the previewing or the trying out of a my
                            personalized storybook for my child. I acknowledge that the photographs will be safely stored under my user
                            profile, where I can edit them any time, and the same may only be used for orders that I may place in the future.
                            I understand that Kadhaster follows stringent Indian and International data security standards to ensure my
                            child’s information is handled with the utmost care and confidentiality, complying with ISO/IEC 27000 Series,
                            Digital Personal Data Protection (DPDA Rules 2025), COPPA (Children’s Online Privacy Protection Act), and
                            GDPR (General Data Protection Regulation).
                            I acknowledge and understand that the data will be retained for a period of three (3) years. I acknowledge and
                            understand I can withdraw this consent anytime by contacting  <a href="mailto:support@kadhaster.com" target={'_blank'} className="text-primary">@support@kadhaster.com</a> </p>
                        </label>
                      </div>
                    </div>}
                    {relationship?.length > 0 && relationship !== 'Parent/Guardian' && <div className="checkboxGroup">
                      <div className="df position-relative">
                        <label className="custom-checkbox">
                          <input type="checkbox" className="mt-2"
                            checked={checked}
                            onChange={handleChange} />
                          <span className="checkmark"></span>
                        </label>
                        <label>
                          <p>I hereby confirm that I am over 18 years of age and that I am duly authorised by the child’s Parent /Lawful
                            Guardian and have obtained permission from the child's parent/guardian . I consent to the secure use of the
                            photographs submitted solely for the previewing or the trying out of a personalized storybook for the child. I
                            acknowledge and agree that the child’s Parent /Lawful Guardian remains the primary consenting authority for
                            the processing of the child’s personal data.
                            I acknowledge that the photographs will be safely stored under my user profile, where I can edit them any time,
                            and the same may only be used for orders that I may place in the future.
                            I understand that Kadhaster follows stringent Indian and International data security standards to ensure my
                            child’s information is handled with the utmost care and confidentiality, complying with ISO/IEC 27000 Series,
                            Digital Personal Data Protection (DPDA Rules 2025), COPPA (Children’s Online Privacy Protection Act), and
                            GDPR (General Data Protection Regulation).
                            I acknowledge and understand that the data will be retained for a period of three (3) years. I acknowledge and
                            understand that I can withdraw my consent at any time and that the parent or lawful guardian may also withdraw
                            consent at any time, by contacting <a href="mailto:support@kadhaster.com" target={'_blank'} className="text-primary">@support@kadhaster.com</a> </p>
                        </label>
                      </div>
                    </div>}
                    {uploadError && (
                      <p
                        className={classes.error_text}
                        style={{ margin: "20px 0px", textAlign: "center" }}
                      >
                        {" "}
                        Please Upload {selectedCharacterData.name} Photo to Procced
                      </p>
                    )}

                    {consentError && (
                      <p
                        className={classes.error_text}
                        style={{ margin: "20px 0px", textAlign: "center" }}
                      >
                        {" "}
                        Please Select Consent
                      </p>
                    )}
                  </div>
                </div>

                <div className={"d-flex justify-content-center gap-3 mt-3"}>
                  <button className={"cancel_btn"} onClick={() => handleClose(false)}
                  >
                    Cancel
                  </button>

                  <button className={"sumt_btn"} onClick={() => onUserUpload()}>
                    <AutoFixHighIcon /> Generate
                  </button>
                </div>
              </div>
            </Modal>
            {/* <BoostrapDialog
              open={open}
              customWidth={"657px"}
              handleClose={handleClose}
              isOutSideClick={false}
            >
              <section style={{ maxWidth: "657px" }} className={classes.modal}>
                <h1>Upload Photo</h1>
                <h3>Uploading Guideline:</h3>
                <p>
                  Solo headshot photo – bright, front-facing, with a smile. <br />{" "}
                  Please ensure the photo is clear, well-lit, and without
                  sunglasses, hats, or obstructions.
                </p>
                <form onSubmit={onUserUpload}>
                  <FileUploadComponent
                    acceptedTypes={["image/*"]}
                    onFilesChange={files => {
                      setFile(files[0]?.file)
                      setUploadError(!Boolean(files[0]?.file))
                    }}
                    stylesss={{
                      maxWidth: "400px",
                      height: "300px",
                      width: "100%",
                      margin: "auto",
                      overflow: "hidden",
                    }}
                    previewImgStyle={`${classes.preview_img}`}
                    additionalText="Upload PDF reports or supporting documents"
                  />
                  <section>
                    <Checkbox
                      defaultChecked
                      color="success"
                      checked={checked}
                      onChange={handleChange}
                      checkedIcon={<BpCheckedIcon />}
                      size="large"
                      icon={<BpIcon />}
                    />{" "}
                    <p>
                      I consent to the privacy policy and secure use of my photo
                      solely for the purpose of a demo preview. I am aware the photo
                      will be stored safely within my profile and will not be
                      incorporated into any final product unless I place an order. I
                      understand that I can revoke this consent at any point by
                      writing to your{" "}
                      <span>
                        <a href="mailto:support@kadhaster.com">
                          support@kadhaster.com
                        </a>
                      </span>
                    </p>
                  </section>

                  {uploadError && (
                    <p
                      className={classes.error_text}
                      style={{ margin: "20px 0px", textAlign: "center" }}
                    >
                      {" "}
                      please upload {selectedCharacterData.name} photo to procced
                    </p>
                  )}
                  <section className={classes.modal__btns}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                      }}
                    >
                      Cancel
                    </button>

                    <CustomButton
                      variant="contained"
                      customColor="#000000"
                      customBgColor="#F3C11D"
                      custmstyle={{
                        padding: "7px",
                        width: "150px",
                        height: "40px",
                        gap: ".5rem",
                        alignItems: "center",
                      }}
                      type="submit"
                    >
                      Generate
                    </CustomButton>
                  </section>
                </form>
              </section>
            </BoostrapDialog> */}
            {/* <h3>Try Now</h3> */}
            <h1 className="title-40px">Try Now</h1>
            <h3>
              {isSwapped
                ? `Here’s a sneak peek at how your photo will look in your personalised story!`
                : `Experience the magic of your personalized storybook instantly – for
          free!`}
            </h3>
            <p>
              {isSwapped
                ? `This is a sample preview to help you visualise how the uploaded photo will appear in our personalised stories`
                : ` Wondering how your customized storybook will look? Upload a photo and
          click to preview it now!`}
            </p>
            {isSwapped ? (
              <section className={classes.preview}>
                <img src={swappedImage} alt=""
                  draggable={false}
                  onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                <p>
                  Like what you see? Just click ‘Personalise my book’ to explore our
                  library, upload your favourite photos, and make story time truly
                  unforgettable!
                </p>
                <section>
                  <CustomButton
                    onClick={() => {
                      window.location.href = "/user"
                    }}
                    variant="contained"
                    customColor="#fff"
                    customBgColor="#8131bf"
                    custmstyle={{
                      padding: "12px 20px",
                      marginTop: "15px",
                      fontSize: '16px',
                      borderRadius: '40px',
                      border: 'none',
                      gap: ".5rem",
                      fontFamily: 'var(--font-bold-Quicksand)',
                      alignItems: "center",
                    }}
                    type="submit"
                  >
                    <AutoFixHighIcon />  personalize my book
                  </CustomButton>
                  <button onClick={() => handleReset()} style={{ color: '#000' }}>
                    <img
                      draggable={false}
                      onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} src={retry_arrow} alt="" style={{ width: '20px', height: '20px' }} role="button" />retry
                  </button>
                </section>
              </section>
            ) : (
              <form onSubmit={onSubmit}>
                <h6 className="mb-3">Please identify the person in the photo you wish to upload</h6>

                <section>
                  {data.map((item, i) => {
                    return (
                      <label
                        className={`${selectedIndex === item.id ? classes.selected : ""
                          }`}
                        htmlFor={item.id}
                        key={item.id}
                      >
                        <section>
                          <img src={item.icon} alt=""
                            draggable={false}
                            onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                          <p>{item.name}</p>
                        </section>
                        <input
                          onChange={onChange}
                          type="radio"
                          name="type"
                          id={item.id}
                          value={item.id}
                        />
                      </label>
                    )
                  })}
                  {/* <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedIndex}
                onChange={(event) => {
                  setSelectedIndex(event.target.value);
                }}
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                {data.map((item, i) => {
                  return (
                    <FormControlLabel
                      key={item.id}
                      checked={selectedIndex === item.id}
                      value={item.id}
                      control={<BpRadio color="info" />}
                      label={item.name}
                    />
                  );
                })}
              </RadioGroup> */}
                </section>
                {selectedIndex === 0 || selectedIndex ? (
                  <p>
                    Thank you for your selection. Please upload a clear,
                    front-facing photo of the {selectedCharacterData.name}
                  </p>
                ) : (
                  <p></p>
                )}
                {error && (
                  <p className={classes.error_text}>
                    {" "}
                    Please select a character before uploading your photo.
                  </p>
                )}
                <CustomButton
                  variant="contained"
                  customColor="#fff"
                  customBgColor="#F3C11D"
                  custmstyle={{
                    padding: "7px",
                    width: "300px",
                    height: "50px",
                    marginTop: "15px",
                    gap: ".5rem",
                    alignItems: "center",
                  }}
                  type="submit"
                >
                  Upload Photo
                </CustomButton>
              </form>
            )}

            {/* <section className={classes.carousel__container}>
          <Marquee pauseOnHover>
            {carousel_data.map((item, i) => {
              return (
                <section className={classes.crousel__item}>
                  <img src={item.img} alt="" />
                  <section
                    key={item.img}
                    style={i === 6 ? { right: "0px", paddingRight: "5px" } : {}}
                  >
                    <img
                      src={
                        i === 0 ||
                        i === 1 ||
                        i === 3 ||
                        i === 4 ||
                        i === 5 ||
                        i === 6
                          ? paper_bg_cut
                          : paper_bg
                      }
                      alt=""
                      style={
                        i === 0 || i === 1 || i === 4
                          ? { width: "250px" }
                          : i === 3
                          ? { width: "218px" }
                          : i === 5
                          ? { width: "235px" }
                          : i == 6
                          ? {
                              transform: "scaleX(-1)",
                              width: "235px",
                              right: "0px",
                              left: "unset",
                            }
                          : {}
                      }
                    />
                    <>{item.text}</>
                  </section>
                </section>
              )
            })}
          </Marquee>
        </section> */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
