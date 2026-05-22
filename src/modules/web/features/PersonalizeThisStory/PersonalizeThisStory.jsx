import React, { useEffect, useState } from "react"
import styles from "./PersonalizeThisStory.module.css"
import { useLocation, useNavigate } from "react-router-dom"
import useApiHttp from "../../hooks/ues-http"
import CustomButton from "../../components/UI/Button/Button"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import { useDispatch } from "react-redux"
import {
  addCart,
  addCartCharacter,
  countApi,
} from "../../services/storeSlice/addCart"
import UploadThumbnail from "../../components/UI/UploadThumbnail/UploadThumbnail"
import CustomRadio from "../../components/UI/CustomRadio/CustomRadio"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import CheckBoxs from "../../components/UI/Checkbox/Checkbox/CheckBox"

import customize from "../../../web/assets/image/svg/customize cta.svg"
import PhotoTips from "./PhotoTips"
import BoostrapDialog from "../../components/UI/Dialog/BoostrapDialog"
import CustomeSlecter from "../../components/UI/Dropdown/Select"
import CustomCarouselStory from "../../components/Page/PersonalizeStory/Carousel/CarouselSingle"
import toast, { Toaster } from "react-hot-toast"

import alerts from "../../assets/image/png/layer.png"
import RadioButton from "../../components/UI/Checkbox/Checkbox/RadioButton"
import { method } from "lodash"
import OverlayLoding from "../../components/UI/Loding/OverlayLoding"
import useIsMobile from "../../hooks/useIsMobile"
import { Footer } from "../../../website/components/footer/footer"

const PersonalizeThisStory = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  let { storyId, isdata, whatPage, isEdit } = location.state || {}
  const localBookData =
    localStorage.getItem("book_data") &&
    JSON.parse(localStorage.getItem("book_data"))
  storyId = storyId || localBookData?.id
  isdata = isdata || localBookData

  // State management
  const [booksData, setBooksData] = useState(null)
  const [issPhotosMissing, setIsPhotosMissing] = useState(null)

  const [openAdduser, setOpenAdduser] = useState(false)
  const [characters, setCharacters] = useState([])
  const [selectedCharacterIds, setSelectedCharacterIds] = useState([])
  const [selectedCharacterName, setSelectedCharacterName] = useState(null)
  const [openAdduser2, setOpenAdduser2] = useState(false)
  const [openAdduser3, setOpenAdduser3] = useState(false)
  const [openAdduser4, setOpenAdduser4] = useState(false)
  const [openAdduser5, setOpenAdduser5] = useState(false)
  const [name, setName] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [consentGiven, setConsentGiven] = useState(false)

  const [previewUrl, setPreviewUrl] = useState(null)
  const [storId, setStorId] = useState("")

  const [faceSubjects, setFaceSubjects] = useState([])
  const [faceImages, setFaceImages] = useState([])
  // const [profileImages, setProfileImages] = useState([])
  const [checkisagree, setCheckisagree] = useState(true)

  const [charactersDataForConfirmation, setCharactersDataForConfirmation] =
    useState([])

  const [unselectedCharacterNames, setUnselectedCharacterNames] = useState([])
  const [unselectedImage, setUnselectedImage] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  // const combined = unselectedCharacterNames.map((name, index) => ({
  //   image: unselectedImage[index] || "", // fallback to empty string
  //   name,
  // }))

  const [initialCharacterState, setInitialCharacterState] = useState({
    characters: [],
    selectedIds: [],
    consent: false,
  })
  const [currentCharacterId, setCurrentCharacterId] = useState(null)
  // const [coordinates, setCoordinates] = useState({})
  const isMobile = useIsMobile(768)

  // API hooks
  const { isLoading, sendLoading, sendRequest } = useApiHttp()
  const { isLoading: imgLoading, sendRequest: sendRequestImgCheck } =
    useApiHttp()
  // API hooks
  const {
    isLoading: getListLoder,

    sendRequest: getListData,
  } = useApiHttp()
  const {
    isLoading: imageIsLoading,
    sendLoading: imageSendLoading,
    sendRequest: imgeRequest,
  } = useApiHttp()

  useEffect(() => {
    if (!selectedImage) return
    setCharacters(prev =>
      prev.map(char =>
        char.id === storId
          ? {
            ...char,
            face_image_id: selectedImage?.id,
            thumbnail: {
              file: null,
              preview: selectedImage.image,
            },
          }
          : char
      )
    )
  }, [selectedImage])

  // useEffect(() => {
  //   if (openAdduser2 && faceSubjects.length > 0) {
  //     const firstNameId = faceSubjects[0].id
  //     setName(firstNameId)
  //     fetchFaceImagesData(firstNameId)
  //   }
  // }, [openAdduser2, faceSubjects])

  useEffect(() => {
    if (issPhotosMissing === 1) {
      setOpenAdduser4(true)
    }
  }, [issPhotosMissing])

  useEffect(() => {
    if (!booksData?.characters) return

    const initialCharacters = booksData?.characters?.map(option => {
      const character = {
        id: option.id,
        name: option.name || "",
        thumbnail: option.image ? { file: null, preview: option.image } : null,
        uploadType:
          option.face_image_id != null
            ? "saved"
            : option.image
              ? "saved"
              : null,
        originalName: option.original_name || option.name,
        custom_name: option.custom_name || "",
        face_image_id: option.face_image_id ? option.face_image_id : "",
        character_image: option.character_image,
        is_mandatory: option.is_mandatory,
      }

      // Corrected: Add face_image_id if it exists (including 0)
      // if ("face_image_id" in option) {
      //   character.face_image_id = option.face_image_id
      // }

      return character
    })

    // Pre-select characters that have existing data
    const preSelectedIds = booksData.characters
      .filter(
        char =>
          char.custom_name ||
          char.image ||
          char.face_image_id ||
          char.is_mandatory === 1
      )
      .map(char => char.id)

    setCharacters(initialCharacters)
    setSelectedCharacterIds(preSelectedIds)

    setInitialCharacterState({
      characters: JSON.parse(JSON.stringify(initialCharacters)), // Deep clone
      selectedIds: [...preSelectedIds],
      consent: preSelectedIds.length > 0,
    })
    // If there's existing data, automatically check consent
    // if (preSelectedIds.length > 0) {
    //   setConsentGiven(true)
    // }
  }, [booksData?.characters])

  const getCharacterById = id => {
    return faceSubjects.find(char => char.id === id)
  }

  const hasChanges = () => {
    // Check if consent changed
    if (consentGiven !== initialCharacterState.consent) return true

    // Check if selected IDs changed
    if (
      selectedCharacterIds.length !== initialCharacterState.selectedIds.length
    )
      return true

    const sortedCurrent = [...selectedCharacterIds].sort()
    const sortedInitial = [...initialCharacterState.selectedIds].sort()
    if (!sortedCurrent.every((val, idx) => val === sortedInitial[idx]))
      return true

    // Check character data changes
    for (let i = 0; i < characters.length; i++) {
      const currentChar = characters[i]
      const initialChar = initialCharacterState.characters.find(
        c => c.id === currentChar.id
      )

      if (!initialChar) continue

      // Compare custom names
      if (currentChar.custom_name !== initialChar.custom_name) return true

      // Compare upload types
      if (currentChar.uploadType !== initialChar.uploadType) return true

      // Compare image data
      if (currentChar.uploadType === "new") {
        if (currentChar.thumbnail?.preview !== initialChar.thumbnail?.preview)
          return true
      } else if (currentChar.uploadType === "saved") {
        if (currentChar.face_image_id !== initialChar.face_image_id) return true
      }
    }

    return false
  }

  const handleSubmit = (characterId, image) => {
    if (!name) return
    if (!selectedImage) {
      toast.error("Please slect Photo")
      return
    }

    const customName = faceSubjects.find(char => char.id === name)?.name || ""

    setCharacters(prev =>
      prev.map(char =>
        char.id === characterId
          ? {
            ...char,
            custom_name: customName,
            thumbnail: {
              file: null,
              preview: image.image,
            },
            face_image_id: image.id,
            uploadType: "saved", // Ensure uploadType is set correctly
          }
          : char
      )
    )
    handleClosesetOpenAddUser()
  }

  // Fetch book data
  const fetchBookData = () => {
    if (whatPage === "view_page") {
      if (isdata?.id) {
        getListData(
          { url: `user/order/buy-again/view/${isdata?.id}` },
          data => {
            setBooksData(data?.data || [])
            setIsPhotosMissing(data?.data?.is_photos_missing)
          }
        )
      }
    } else if (whatPage === "my_cart") {
      if (storyId) {
        getListData(
          {
            url: `user/cart/presonalise/book/view/${storyId}`,
          },
          data =>
            // setBooksData(data?.data)
            setBooksData(data?.data || [])
        )
      }
    } else {
      if (isdata.name && selectedCharacterName) {
        getListData(
          {
            url: `user/products/presonalise/book/view`,
            method: "POST",
            body: {
              name: isdata.name,
              gender: selectedCharacterName, // Boy, Girl
            },
          },
          data =>
            // setBooksData(data?.data)
            setBooksData(data?.data || [])
        )
      }
    }
  }
  const fetchChoosePhotData = () => {
    sendRequest({ url: `user/cart/presonalise/user/face-subjects` }, data =>
      // setBooksData(data?.data)
      setFaceSubjects(data?.data || [])
    )
  }
  const fetchFaceImagesData = id => {
    if (id) {
      imgeRequest(
        {
          url: `user/cart/presonalise/user/face-images/${id}`,
        },
        data =>
          // setBooksData(data?.data)
          setFaceImages(data?.data || [])
      )
    } else {
      setFaceImages([])
    }
  }
  useEffect(() => {
    fetchChoosePhotData()
  }, [])

  useEffect(() => {
    fetchBookData()
  }, [selectedCharacterName])

  const handleClearInput = () => {
    if (storId) {
      setCharacters(prev =>
        prev.map(char =>
          char.id === storId ? { ...char, uploadType: "" } : char
        )
      )
    }
  }

  // Event handlers
  const handleCloseDialog = () => setOpenAdduser(false)

  const handleCharacterSelection = id => {
    const isMandatory = characters.find(c => c.id === id)?.is_mandatory === 1
    if (isMandatory) return // don't allow toggle
    setSelectedCharacterIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }
  const handleInitCharacterSelect = name => {
    setConsentGiven(false)
    setSelectedCharacterName(name)
  }

  const handleNameChange = (id, value) => {
    if (value.length <= 10)
      setCharacters(prev =>
        prev.map(char =>
          char.id === id
            ? { ...char, custom_name: value.replaceAll(" ", "") }
            : char
        )
      )
  }

  const handleUploadTypeChange = (id, type) => {
    if (type === "saved") {
      handleOpenAddUser(id)
      setCharacters(prev =>
        prev.map(char =>
          char.id === id
            ? {
              ...char,
              thumbnail: type === "saved" ? null : char.thumbnail,
              uploadType: type,
              custom_name: "",
              // face_image_id: null,
            }
            : char
        )
      )
    } else if (type === "new") {
      setCharacters(prev =>
        prev.map(char =>
          char.id === id
            ? {
              ...char,
              thumbnail: type === "new" ? null : char.thumbnail,
              uploadType: type,
              face_image_id: null,
              custom_name: "",
            }
            : char
        )
      )
    }
  }
  // const handleThumbnailChange = (id, file) => {
  //   if (!file || !file.file) {
  //     // toast.error("Please select a valid image.")
  //     return
  //   }

  //   const formData = new FormData()
  //   formData.append("image", file.file)

  //   sendRequestImgCheck(
  //     {
  //       url: `user/cart/presonalise/image-validation`,
  //       method: "POST",
  //       body: formData,
  //     },
  //     data => {
  //       if (data?.data?.status === "pass") {
  //         setCharacters(prev =>
  //           prev.map(char =>
  //             char.id === id
  //               ? {
  //                   ...char,
  //                   thumbnail: file,
  //                   uploadType: "new",
  //                   face_image_id: null,
  //                   coordinates: data?.data?.coordinates || {},
  //                 }
  //               : char
  //           )
  //         )

  //         // setCoordinates(data.coordinates)
  //       } else {
  //         // toast.error(data?.message || "Invalid image")
  //         setOpenAdduser5(true)
  //       }
  //     }
  //   )
  // }

  const handleThumbnailChange = (id, file) => {
    if (!file || !file.file) {
      return
    }

    // Set the current character ID for potential error handling
    setCurrentCharacterId(id)

    const formData = new FormData()
    formData.append("image", file.file)

    sendRequestImgCheck(
      {
        url: `user/cart/presonalise/image-validation`,
        method: "POST",
        body: formData,
      },
      data => {
        if (data?.data?.status === "pass") {
          setCharacters(prev =>
            prev.map(char =>
              char.id === id
                ? {
                  ...char,
                  thumbnail: file,
                  uploadType: "new",
                  face_image_id: null,
                  coordinates: data?.data?.coordinates || {},
                }
                : char
            )
          )
        } else {
          setOpenAdduser5(true)
        }
      }
    )
  }

  const handleSavedPhotoSelect = (characterId, image) => {
    setCharacters(prev =>
      prev.map(char =>
        char.id === characterId
          ? {
            ...char,
            thumbnail: { file: null, preview: image.image },
            face_image_id: image.id,
            uploadType: "saved",
          }
          : char
      )
    )
    setOpenAdduser2(false)
    setSelectedImage(null)
    setSelectedSubjectId("")
  }

  const handleAddToCart = async () => {
    if (isSubmitting) return

    if (!consentGiven) {
      toast.error("Please agree to the terms to proceed")
      return
    }

    const mandatoryIds = characters
      .filter(c => c.is_mandatory === 1)
      .map(c => c.id)

    for (let id of mandatoryIds) {
      if (!selectedCharacterIds.includes(id)) {
        toast.error("Please select at least one character to customize")
        return
      }
    }

    const charactersData = []
    const unselectedNames = []
    const imageData = []

    for (const char of characters) {
      if (selectedCharacterIds.includes(char.id)) {
        if (!char.custom_name.trim()) {
          toast.error(`Please enter a name for ${char.originalName}`)
          return
        }

        if (!char.uploadType) {
          toast.error(`Please select an upload type for ${char.originalName}`)
          return
        }

        if (char.uploadType === "new" && !char.thumbnail) {
          toast.error(`Please upload a photo for ${char.originalName}`)
          return
        }

        charactersData.push({
          book_character_id: char.id,
          name: char.custom_name.trim(),
          image: char.thumbnail?.file,
          face_image_id:
            char.uploadType === "saved" ? char.face_image_id : null,
          coordinates: char.coordinates,
        })
      } else {
        unselectedNames.push(char.originalName)
        imageData.push(char.character_image)
      }
    }

    if (imageData.length > 0) {
      setUnselectedImage(imageData)
    }

    if (unselectedNames.length > 0) {
      setUnselectedCharacterNames(unselectedNames)
      setCharactersDataForConfirmation(charactersData)
      setOpenAdduser3(true)
    } else {
      await handleIagree(charactersData)
    }
  }

  const handleIagree = async confirmedData => {
    if (isSubmitting) return // ⛔ Prevent multiple clicks
    setIsSubmitting(true) // ✅ Lock button

    const characters = confirmedData || charactersDataForConfirmation
    if (!characters || characters.length === 0) {
      toast.error("Please add at least one character before proceeding.")
      setIsSubmitting(false)
      return
    }

    try {
      const payload = {
        body: {
          characters,
          ...(whatPage === "my_cart"
            ? { cart_id: isdata?.id }
            : { book_id: booksData?.book_id }),
        },
        url:
          whatPage === "my_cart"
            ? "user/cart/presonalise/edit"
            : "user/cart/add",
      }

      await dispatch(addCartCharacter(payload)).unwrap()

      dispatch(countApi())
      fetchBookData()
      navigate("/user/mycart", {
        state: {
          whereFrom: "personalize",
        },
      })
      handleClosesetOpenAddUser3()
    } catch (error) {
      console.error("addCartCharacter error:", error)
      toast.error(error || "Failed to update cart")
    } finally {
      setIsSubmitting(false) // ✅ Unlock after completion
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // navigate("/mycart")
  }

  const handleOpenAddUser = id => {
    // setOpenAdduser2(true)
    setStorId(id)
  }
  const handleClosesetOpenAddUser = () => {
    setOpenAdduser2(false)
    setSelectedImage(null)
    setName("")
    //  getCharacterById(value)
    fetchFaceImagesData("")
    // handleClearInput()
  }
  const handlerName = e => {
    const { name, value } = e.target
    getCharacterById(value)
    fetchFaceImagesData(value)
    setName(value)
  }
  const handleClosesetOpenAddUser3 = () => {
    setOpenAdduser3(false)
    // handleClearInput()
  }
  const handleClosesetOpenAddUser4 = () => {
    setOpenAdduser4(false)
    // handleClearInput()
  }
  const handleClosesetOpenAddUser5 = () => {
    // Clear the thumbnail for the current character
    setCharacters(prev =>
      prev.map(char =>
        char.id === currentCharacterId
          ? {
            ...char,
            thumbnail: null,
            uploadType: "saved", // Also reset the upload type
          }
          : char
      )
    )
    setOpenAdduser5(false)
  }

  // Render character customization rows
  const renderCharacterRows = () =>
    booksData?.characters?.map((item, index) => {
      const character = characters.find(c => c.id === item.id) || {}
      const isSelected = selectedCharacterIds.includes(item.id)
      const currentId = item.id
      return (
        <div className={styles.uplode_file_set} key={item.id}>
          <div>
            <CheckBoxs
              label={`${item.name} ${item.is_mandatory === 1 ? "*" : ""}`}
              checked={isSelected}
              onChange={() => handleCharacterSelection(item.id)}
              disabled={item.is_mandatory === 1}
            />

            {isSelected && (
              <>
                <CustomTextField
                  placeholder="Enter Short Name (10 letters max)"
                  value={character.custom_name}
                  onChange={e => handleNameChange(item.id, e.target.value)}
                  sx={{ width: "300px" }}
                  required
                />

                <div className={styles.main_set_rodio}>
                  <p>Upload Type</p>
                  <div className={styles.rodio_set}>
                    <div className={styles.Mark}>
                      <CustomRadio
                        selected={character.uploadType === "saved"}
                        onToggle={() =>
                          handleUploadTypeChange(item.id, "saved")
                        }
                      />
                      <p>Saved Photos</p>
                    </div>
                    <div className={styles.Mark}>
                      <CustomRadio
                        selected={character.uploadType === "new"}
                        onToggle={() => handleUploadTypeChange(item.id, "new")}
                      />
                      <p>Upload New Photo</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {isSelected && character.uploadType === "new" && (
            <div>
              <UploadThumbnail
                label="Upload Photo"
                onFileChange={file => {
                  handleThumbnailChange(item.id, file)
                }}
                id={`thumbnail_${index}_${currentId}`}
                allowedTypes={["image/jpeg", "image/png"]}
                maxSizeMB={5}
                style={{ height: "146px" }}
                initialImage={character.thumbnail?.preview}
                closeBtnCheck={character.thumbnail?.preview}
                onRemove={() => {
                  setCharacters(prev =>
                    prev.map(char =>
                      char.id === item.id
                        ? {
                          ...char,
                          thumbnail: null,
                        }
                        : char
                    )
                  )
                }}
              />
            </div>
          )}
          {isSelected && character.uploadType === "saved" && (
            <span
              onClick={() => {
                setCurrentCharacterId(item.id)
                setOpenAdduser2(true)
              }}
            >
              <UploadThumbnail
                label="Choose Photo"
                // onFileChange={file => {
                //   handleThumbnailChange(item.id, file)
                // }}
                id={`thumbnail_${index}_${currentId}`}
                allowedTypes={["image/jpeg", "image/png"]}
                maxSizeMB={5}
                style={{ height: "146px" }}
                initialImage={character.thumbnail?.preview}
                closeBtnCheck={null}
              />
            </span>
          )}
        </div>
      )
    })

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate(-1)}>Library</span> &gt;{" "}
        <span onClick={() => navigate(-1)}>
          {isdata?.book_name || isdata?.title || isdata?.name}
        </span>{" "}
        &gt; <span className={styles.active}>Personalize This Story</span>
      </div>

      <section className={styles.heroContent}>
        <div>
          <h1 className={styles.title}>
            {" "}
            {isdata?.book_name || isdata?.title || isdata?.name}
          </h1>
          <p className={styles.description}>
            Choose Characters, Enter Characters Name & Upload Photos
          </p>

          <div className={styles.tips_set}>
            <p className={styles.description_sub}>
              Ready to meet your characters? You get to choose who joins your
              adventure - pick one, a few, or the whole crew, all for free! For
              any spots you leave open, we create some fantastic names and
              images.
            </p>

            <PhotoTips isMobile={isMobile} />
          </div>
          <h3 className={styles.sub_title}>Choose the hero of your story</h3>
        </div>

        <div className={styles.gender_set}>
          {isdata?.genders &&
            isdata?.genders?.map((item, index) => (
              <RadioButton
                key={index}
                label={item}
                checked={selectedCharacterName === item}
                onChange={() => handleInitCharacterSelect(item)}
                name="gender"
              />
            ))}
        </div>

        <div className={styles.renderCharacter_set}>
          <div>
            {renderCharacterRows()}
            <div style={{ marginTop: "20px" }}>
              {/* <p>
                Curious to see how your photo transforms into a story character?
              </p>
              <p className={styles.description_sub}>
                Try our free AI preview in the 'Try Now' section!
              </p> */}
            </div>
            {/* <button
              className={styles.button_style}
              // onClick={() => handleOpenAddUser()}
            >
              Try Now?
            </button> */}
            <div className={styles.Mark}>
              <div>
                <CustomRadio
                  selected={consentGiven}
                  onToggle={() => setConsentGiven(!consentGiven)}
                />
              </div>

              <p className={styles.description_sub}>
                I consent to the secure use of my photos exclusively for my
                personalized storybook. They'll be safely stored under  my
                profile, where I can edit them any time, and will only be used
                for my orders that I might place in the future . I understand I
                can withdraw this consent anytime by writing to
                support@kadhaster.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.buttonContainer}>
        {!isdata?.is_added ? (
          <>
            {/* <CustomButton
              variant="contained"
              customColor="#000000"
              customBgColor="#F3C11D"
              custmstyle={buttonStyle}
              onClick={() => handleAddToCart()}
              disabled={isEdit === "edit" && !hasChanges()}
            >
              {isEdit === "edit" ? "Edit Cart" : "Continue"}
            </CustomButton> */}

            <CustomButton
              variant="contained"
              customColor="#000000"
              customBgColor="#F3C11D"
              custmstyle={buttonStyle}
              onClick={handleAddToCart}
              disabled={(isEdit === "edit" && !hasChanges()) || isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : isEdit === "edit"
                  ? "Edit Cart"
                  : "Continue"}
            </CustomButton>
          </>
        ) : (
          <CustomButton
            variant="contained"
            customColor="#000000"
            customBgColor="#F3C11D"
            custmstyle={buttonStyle}
            onClick={() =>
              navigate("/user/mycart", {
                state: {
                  whereFrom: "personalize",
                },
              })
            }
          >
            Go to Cart
          </CustomButton>
        )}
      </div>

      <CustomDialog
        open={openAdduser}
        handleClose={handleCloseDialog}
        showCloseIcon={true}
        customWidth={"900px"}
        overflowY={"unset"}
        children={
          <>
            <CustomCarouselStory />
            <div className={styles.viw_book_title}>
              <h3>Hang tight!</h3>
              <p>
                The rest of your personalised storybook is being prepared and
                will be sent to your email shortly. Keep an eye on your inbox!
                You can also view the preview in the Order Details in the My
                Orders section of this order
              </p>
            </div>
            <div className={styles.carouselContainer}>
              <CustomButton
                variant="contained"
                customColor="#000000"
                customBgColor="#F3C11D"
                custmstyle={{
                  padding: "7px",
                  width: "300px",
                  height: "50px",
                  marginTop: "15px",
                  gap: ".5rem",
                  alignItems: "center",
                }}
              >
                Okay, Go Home
              </CustomButton>
            </div>
          </>
        }
      />

      {openAdduser2 && (
        <BoostrapDialog
          open={openAdduser2}
          handleClose={handleClosesetOpenAddUser}
          showCloseIcon={false}
          customWidth={"650px"}
          overflowY={"unset"}
          children={
            <>
              <div className={styles.addUser}>
                <h3 className={styles.addUserHeader}>Choose Photo</h3>
                <div className={styles.addUserForm}>
                  <div className={styles.addUserInput}>
                    <div className={styles.input_text_filed}>
                      <CustomeSlecter
                        data={faceSubjects.map(a => ({
                          label: a.name,
                          value: a.id,
                        }))}
                        title="Choose Name"
                        width="287px"
                        value={name}
                        onChange={e => {
                          handlerName(e)
                        }}
                        borders={true}
                        required
                      />
                    </div>

                    <div className={styles.profileGrid}>
                      {faceImages.map(image => (
                        <div
                          key={image.id}
                          className={`${styles.profileItem} ${selectedImage?.id === image.id
                              ? styles.selected
                              : ""
                            }`}
                          onClick={() => setSelectedImage(image)}
                        >
                          <div className={styles.imageContainer}>
                            <img
                              src={image.image}
                              alt={`Profile ${image.id}`}
                              className={styles.profileImage}
                            />
                            <div className={styles.checkmark}>
                              <svg viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.btn_group}>
                    <button
                      className={`${styles.cancel} ${styles.width_cont}`}
                      onClick={handleClosesetOpenAddUser}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      // onClick={handleSubmit}
                      onClick={() => {
                        if (selectedImage && currentCharacterId) {
                          handleSubmit(currentCharacterId, selectedImage)
                        }
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}
      {openAdduser3 && (
        <BoostrapDialog
          open={openAdduser3}
          handleClose={handleClosesetOpenAddUser3}
          showCloseIcon={false}
          customWidth={"700px"}
          overflowY={"auto"}
          children={
            <>
              <div className={styles.addUser}>
                {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                <div className={styles.addUserForm}>
                  <div className={styles.addUserInput}>
                    <div className={styles.addUser_img}>
                      <img src={alerts} alt="alert" />
                    </div>
                    <div
                      className={`${styles.addUser_img} ${styles.images_with}`}
                    >
                      <div className={styles.image_set_top}>
                        {unselectedImage.map((item, index) => (
                          <div className={styles.image_item}>
                            <img src={item} alt="alert" />

                            <p>{unselectedCharacterNames[index]}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.input_sets}>
                      <h1 className={styles.title}>Please Confirm!</h1>
                      <p className={styles.description}>
                        You haven't customized the following characters:{" "}
                        <strong>{unselectedCharacterNames.join(", ")}</strong>.
                        For any spots you leave open, we'll create fantastic
                        names and images.
                      </p>
                    </div>
                  </div>

                  <div className={styles.btn_group}>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={handleClosesetOpenAddUser3}
                    >
                      No, Go back, I will upload
                    </button>
                    {/* <button
                      className={`${styles.continueBtngreen} ${styles.width_cont}`}
                      onClick={() =>
                        handleIagree(charactersDataForConfirmation)
                      }
                    >
                      I agree
                    </button> */}
                    <button
                      className={`${styles.continueBtngreen} ${styles.width_cont}`}
                      onClick={() =>
                        handleIagree(charactersDataForConfirmation)
                      }
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "I agree"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}
      {openAdduser4 && (
        <BoostrapDialog
          open={openAdduser4}
          handleClose={handleClosesetOpenAddUser4}
          showCloseIcon={false}
          customWidth={"600px"}
          overflowY={"unset"}
          children={
            <>
              <div className={styles.addUser}>
                {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                <div className={styles.addUserForm}>
                  <div className={styles.addUserInput}>
                    <div>{/* <img src="" alt="" /> */}</div>
                    <div className={styles.input_sets}>
                      <h1 className={styles.title}>Some Photos Are Missing</h1>
                      <p className={styles.description}>
                        It looks like one or more photos from your original
                        order have been deleted from your profile. Would you
                        like to continue with the remaining photos?
                      </p>
                    </div>
                  </div>

                  <div className={styles.btn_group}>
                    <button
                      className={`${styles.cancel} ${styles.width_cont}`}
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={handleClosesetOpenAddUser4}
                    >
                      Yes, Continue
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}

      {openAdduser5 && (
        <BoostrapDialog
          open={openAdduser5}
          handleClose={handleClosesetOpenAddUser5}
          showCloseIcon={false}
          customWidth={"600px"}
          overflowY={"unset"}
          children={
            <>
              <div className={styles.addUser}>
                {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                <div className={styles.addUserForm}>
                  <div className={styles.addUserInput}>
                    <div className={styles.addUser_img}>
                      <img src={alerts} alt="alert" width={"78px"} />
                    </div>
                    <div className={styles.input_sets}>
                      <h1 className={styles.title}>This Photo Can’t Be Used</h1>
                      <p className={styles.description}>
                        The image you uploaded doesn’t meet our quality
                        requirements. Please upload a clear, well-lit photo
                        showing the face straight and unobstructed.
                        {/* The image you uploaded isn’t suitable for our face swap
                        feature. Please upload a clear photo with good lighting.
                        Try uploading a different photo now. */}
                      </p>
                    </div>
                  </div>

                  <div className={styles.btn_group}>
                    {/* <button
                      className={`${styles.cancel} ${styles.width_cont}`}
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button> */}
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={() => {
                        setCharacters(prev =>
                          prev.map(char =>
                            char.id === currentCharacterId
                              ? { ...char, thumbnail: null }
                              : char
                          )
                        )

                        handleClosesetOpenAddUser5()
                      }}
                    >
                      Upload New Photo
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}

      {getListLoder && <OverlayLoding />}
      {imgLoading && <OverlayLoding />}
      <Footer />
    </div>
  )
}

// Reusable button style
const buttonStyle = {
  padding: "7px",
  width: "160px",
  height: "40px",
  marginTop: "15px",
}
const buttonStyle2 = {
  padding: "7px",
  width: "160px",
  height: "40px",
  marginTop: "15px",
}

export default PersonalizeThisStory
