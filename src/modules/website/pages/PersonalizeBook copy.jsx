import { useEffect, useState } from "react";
import { Footer } from "../components/footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useApiHttp from "../../web/hooks/ues-http";
import useIsMobile from "../../web/hooks/useIsMobile";
import { Modal, Button, Form, Alert, Row, Col } from "react-bootstrap";
import RadioButton from "../../web/components/UI/Checkbox/Checkbox/RadioButton";
import styles from "./../../web/features/PersonalizeThisStory/PersonalizeThisStory.module.css"
import CheckBoxs from "../../web/components/UI/Checkbox/Checkbox/CheckBox";
import CustomTextField from "../../web/components/UI/TextFiled/TextFiled";
import CustomRadio from "../../web/components/UI/CustomRadio/CustomRadio";
import UploadThumbnail from "../../web/components/UI/UploadThumbnail/UploadThumbnail";
import BoostrapDialog from "../../web/components/UI/Dialog/BoostrapDialog";
import CustomButton from "../../web/components/UI/Button/Button";
import OverlayLoding from "../../web/components/UI/Loding/OverlayLoding";
import toast from "react-hot-toast";
import CustomeSlecter from "../../web/components/UI/Dropdown/Select";
// import alerts from "../../assets/image/png/layer.png"
import alerts from "../../web/assets/image/png/layer.png";
import { addCartCharacter, countApi } from "../../web/services/storeSlice/addCart";
import CustomDialog from "../../web/components/UI/Dialog/Dialog";
import CustomCarouselStory from "../../web/components/Page/PersonalizeStory/Carousel/CarouselSingle";
import CustomeSlecterBlack from "../../admin/components/UI/Dropdown/CustomeSlecterBlack";
import lucide_infoo from "../../website/assets/image/lucide_info.png";
import stric_info from "../../website/assets/image/stric-info.png";
import perfect_photo from "../../website/assets/image/perfect-photo-tip.png";
import CustomTextFieldMax from "../../web/components/UI/TextFiled/TextFiledMax";


export default function PersonalizeBook() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  let { storyId, isdata, whatPage, isEdit } = location.state || {}
  const localBookData =
    localStorage.getItem("book_data") &&
    JSON.parse(localStorage.getItem("book_data"))
  storyId = storyId || localBookData?.id
  isdata = isdata || localBookData

  // console.log('isdata', isdata);


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
  const [relationship, setrelationship] = useState("")
  const [consent, setConsent] = useState("")
  const ConsentList = [
    {
      name: "Parent",
      id: "Parent"
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
      name: "Guardian / Caregiver",
      id: "Guardian / Caregiver"
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
    {
      name: "Other(Specify)",
      id: "Other(Specify)"
    },
  ]

  const isTablet = useIsMobile(768);

  // const combined = unselectedCharacterNames.map((name, index) => ({
  //   image: unselectedImage[index] || "", // fallback to empty string
  //   name,
  // }))

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [initialCharacterState, setInitialCharacterState] = useState({
    characters: [],
    selectedIds: [],
    consent: false,
    relationship: ""
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

    let ConsentArr = [
      "Parent",
      "Grandparent",
      "Uncle / Aunt",
      "Guardian / Caregiver",
      "Family Friend",
      "Teacher / Mentor",
      "Neighbor",
      "Other(Specify)",
    ]

    let hero_relation = ConsentList?.find((i) => i?.id == booksData?.hero_relation)

    console.log('hero_relation', hero_relation);

    if (hero_relation) {

      if (hero_relation?.id) {
        setrelationship(booksData?.hero_relation)
        setConsent(booksData?.hero_relation)
      } else {
        setrelationship(booksData?.hero_relation)
        setConsent("Other(Specify)")
      }
    }


    setInitialCharacterState({
      characters: JSON.parse(JSON.stringify(initialCharacters)), // Deep clone
      selectedIds: [...preSelectedIds],
      consent: preSelectedIds.length > 0,
      relationship: booksData?.hero_relation ? booksData?.hero_relation : ''
    })
    console.log('booksData', booksData);
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

    if (relationship !== initialCharacterState.relationship) return true

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
      if (isdata?.name && selectedCharacterName) {
        getListData(
          {
            url: `user/products/presonalise/book/view`,
            method: "POST",
            body: {
              name: isdata?.name,
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

    if (!relationship) {
      toast.error("Please Choose the consent")
      return
    }

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
        console.log('char', char);

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

        if (!char.thumbnail) {
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
      // toast.error("Please add at least one character before proceeding.")
      toast.error("Please provide the hero character which is mandatory.")
      setIsSubmitting(false)
      return
    }

    try {
      const payload = {
        body: {
          relationship,
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

      console.log('payload', payload);


      await dispatch(addCartCharacter(payload)).unwrap()

      dispatch(countApi())
      fetchBookData()
      navigate("/user/mycart?show=true", {
        state: {
          whereFrom: "personalize",
        },
      })
      window.location.reload()
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
    const value = e.target.value
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

  const handleFormDataChange = (even) => {
    if (even == 'Other(Specify)') {
      setrelationship("")
    } else {
      setrelationship(even)
    }

    setConsent(even)
  }


  return (
    <>
      <section className="personalize-section">
        <div className="container">
          {/* Breadcrumb */}
          <p className="breadcrumb-section text-dark">
            <span className="p_new" onClick={() => navigate(-1)}>  Library</span> &gt; <span className="p_new" onClick={() => navigate("/user/books", {
              state: {
                storyId: storyId,
                name: isdata?.name,
              },
            })}> {isdata?.book_name || isdata?.title || isdata?.name}</span> &gt; <a href=""><span>Personalize This Story</span></a>
          </p>

          {/* Page Title */}
          <h2 className="title">{isdata?.book_name || isdata?.title || isdata?.name}</h2>

          {/* Sub Section */}
          <h3 className="subtitle" style={{ color: '#121212' }}>
            Choose Characters, Enter Characters Name & Upload Photos
          </h3>
          <p className="description">
            Ready to meet your characters? You get to choose who joins your adventure –
            pick one, a few, or the whole crew, all for free! For any spot you leave open,
            our AI will conjure up some fantastic names and images.
          </p>

          {/* Radio Group */}
          <section className="fieldGroup">
            <label className="label">Choose the hero of your story</label>
            <div className="d-flex gap-5">
              {isdata?.genders &&
                isdata?.genders?.map((item, index) => {
                  return (
                    <div className="radioGroup" key={index}>
                      <label className="d-flex justify-content-center align-items-center gap-2">
                        <CustomRadio
                          selected={selectedCharacterName === item}
                          onToggle={() => handleInitCharacterSelect(item)}
                        />
                        {/* <input
                          key={index}
                          type="radio"
                          value={item}
                          checked={selectedCharacterName === item}
                          onChange={() => handleInitCharacterSelect(item)}
                          className="mx-1 mb-3"
                        /> */}
                        {item}
                      </label>
                    </div>
                  )
                })}
            </div>

          </section>
          {
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
                          <p style={{ color: '#01050c' }}>Upload Type</p>
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
                      <div className="text-center">

                        <div className="tooltip-container">

                          <button className="info-btn">
                            <img src={lucide_infoo} /> Photo Uploading Tips
                          </button>

                          <span className="tooltip-text">
                            <div className="photo-tips">
                              <h2>Tips for the Perfect Photo!</h2>
                              <p className="tips-intro">
                                To ensure the character appears clearly in the personalised book, follow these photo guidelines:
                              </p>
                              <ul className="mt-3 ul_tag">
                                <li className="li_tag">1 clear headshot of the person</li>
                                <li className="li_tag">Solo photo only — no one else in the frame</li>
                                <li className="li_tag">The face should be looking straight and smiling</li>
                                <li className="li_tag">Use a plain white or light background</li>
                              </ul>
                              <h6>Make sure the photo:</h6>
                              <ul className="mt-3 ul_tag">
                                <li className="li_tag">1 clear headshot of the person</li>
                                <li className="li_tag">Solo photo only — no one else in the frame</li>
                                <li className="li_tag">The face should be looking straight and smiling</li>
                                <li className="li_tag">Use a plain white or light background</li>
                              </ul>
                              <div className="strict-div">
                                <div className="df">
                                  <div className="st-ic">
                                    <img src={stric_info} />
                                  </div>
                                  <p>Strict data privacy is our commitment. Your information is handled with the utmost care and in accordance with robust standards.</p>
                                </div>
                              </div>

                              <h5>Need Help?</h5>
                              <p>See our sample photo below for an ideal example!</p>

                              <div className="photo-grid">
                                <div className="photo-box">
                                  <img src={perfect_photo} />
                                </div>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {isSelected && character.uploadType === "saved" && (
                    <div>
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
                      <div className="text-center">

                        <div className="tooltip-container">

                          <button className="info-btn">
                            <img src={lucide_infoo} /> Photo Uploading Tips
                          </button>

                          <span className="tooltip-text">
                            <div className="photo-tips">
                              <h2>Tips for the Perfect Photo!</h2>
                              <p className="tips-intro">
                                To ensure the character appears clearly in the personalised book, follow these photo guidelines:
                              </p>
                              <ul className="mt-3 ul_tag">
                                <li className="li_tag">1 clear headshot of the person</li>
                                <li className="li_tag">Solo photo only — no one else in the frame</li>
                                <li className="li_tag">The face should be looking straight and smiling</li>
                                <li className="li_tag">Use a plain white or light background</li>
                              </ul>
                              <h6>Make sure the photo:</h6>
                              <ul className="mt-3 ul_tag">
                                <li className="li_tag">1 clear headshot of the person</li>
                                <li className="li_tag">Solo photo only — no one else in the frame</li>
                                <li className="li_tag">The face should be looking straight and smiling</li>
                                <li className="li_tag">Use a plain white or light background</li>
                              </ul>
                              <div className="strict-div">
                                <div className="df">
                                  <div className="st-ic">
                                    <img src={stric_info} />
                                  </div>
                                  <p>Strict data privacy is our commitment. Your information is handled with the utmost care and in accordance with robust standards.</p>
                                </div>
                              </div>

                              <h5>Need Help?</h5>
                              <p>See our sample photo below for an ideal example!</p>

                              <div className="photo-grid">
                                <div className="photo-box">
                                  <img src={perfect_photo} />
                                </div>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )
            })
          }

          {/* Consent Checkbox */}
          <section className="checkboxGroup mt-2">
            <div className="d-flex f-w gap-2">
              <p className="text-dark mt-2 fw-bolder">What is your relationship to the Hero child?</p>

              <CustomeSlecterBlack
                data={ConsentList.map(a => ({
                  label: a.name,
                  value: a.id,
                }))}
                title="Choose Consent"
                width={isTablet ? "100%" : "200px"}
                value={consent}
                onChange={e => {
                  handleFormDataChange(e.target.value)
                }}
                borders={true}
                required
              />
              {consent == "Other(Specify)" && <CustomTextFieldMax
                placeholder="Specify (15 letters max)"
                value={relationship}
                onChange={e => setrelationship(e.target.value)}
                sx={{ width: "300px" }}
                required
              />}
            </div>
            {/* <div className={styles.main_set_rodio}>
              <div className={styles.rodio_set}>
                <div className={styles.Mark}>
                  <CustomRadio
                    selected={consent == 'Parent'}
                  // onToggle={() => setrelationship('parent')}
                  />
                  <p className="mt-2">PARENT CONSENT</p>
                </div>
                <div className={styles.Mark}>
                  <CustomRadio
                    selected={consent !== "" && consent !== 'Parent'}
                  // onToggle={() => setrelationship('non_parent')}
                  />
                  <p className="mt-2">NON-PARENT CONSENT</p>
                </div>
              </div>

              <p className="mt-3" style={{ color: '#01050c' }}>{relationship == 'parent' && "I confirm that I am the parent or legal guardian of this child, that I am over 18 years of age, and that I consent to providing these details for the creation of a personalized storybook, in full accordance with the Privacy Policy."}
                {relationship == 'non_parent' && "I confirm that I am over 18 years of age and have obtained permission from the child’s parent or legal guardian to provide these details for the creation of a personalized storybook, in full accordance with the Privacy Policy."}
              </p>
            </div> */}
          </section>
          {/* <section className="checkboxGroup">
            <label>
              <input
                type="checkbox" className="check-box"
                onClick={() => setConsentGiven(!consentGiven)}
                checked={consentGiven}
              />

              I consent to the secure use of my photos exclusively for my personalized storybook.
              They’ll be safely stored under my profile, where I can edit them any time,
              and will only be used for my orders that I might place in the future.
              I understand I can withdraw this consent anytime by writing to support@kadhaster.com
            </label>
          </section> */}

          {consent == 'Parent' &&
            <section className="checkboxGroup">
              <label>
                <input
                  type="checkbox" className="check-box"
                  onClick={() => setConsentGiven(!consentGiven)}
                  checked={consentGiven}
                />
                I confirm that I am the parent of the child and am over 18 years of age. I provide my consent for the collection and use of the necessary details for the creation of a personalized storybook, in accordance with the Privacy Policy. I agree to the secure use of the photos provided, exclusively for the purpose of my personalized storybook. I acknowledge that the photos will be stored securely under my profile, where I can edit them at any time, and will be used for future orders. I understand that I can withdraw my consent at any time by contacting support@kadhaster.com.
              </label>
            </section>
          }

          {consent !== "" && consent !== 'Parent' &&
            <section className="checkboxGroup">
              <label>
                <input
                  type="checkbox" className="check-box"
                  onClick={() => setConsentGiven(!consentGiven)}
                  checked={consentGiven}
                />
                I confirm that I am over 18 years of age and have obtained permission from the child's parent/guardian to provide the necessary details for the creation of a personalized storybook, in accordance with the Privacy Policy. I agree to the secure use of the photos provided, exclusively for the purpose of my personalized storybook. I acknowledge that the photos will be stored securely under my profile, where I can edit them at any time, and will be used for future orders. I understand that I can withdraw my consent at any time by contacting support@kadhaster.com.   </label>
            </section>
          }

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
                  customColor="#fff"
                  customBgColor="#8131BF"
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
                customColor="#fff"
                customBgColor="#8131BF"
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

          {/* Buttons starts*/}
          {/* <div className="view_book_buttons jc">
            <button className="cartBtn" onClick={() => setShow(true)}>Continue</button>
          </div> */}
          {/* Buttons ends*/}
        </div>
      </section>
      <Footer />

      <Modal show={openAdduser2}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-5 popup_design">
          <div className="mb-4">
            <h3 className="text-center title-24px-wh">Choose Photo</h3>
          </div>
          <div className="mt-3 personalize-choname">
            <div className="df">
              <div className="col-12">
                <select className="personalize-choname form-select  mb-3" value={name}
                  onChange={e => {
                    handlerName(e)
                  }}>
                  <option hidden>Choose Name</option>
                  {faceSubjects?.map((item, ind) => {
                    return (
                      <option key={ind} value={item?.id}>{item?.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <Row className="mt-3">
            <Col md={3} lg={3}>
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
            </Col>
          </Row>

          <div className={"d-flex justify-content-center gap-3 mt-2"}>
            <button
              className={'cancel_btn'}
              onClick={handleClosesetOpenAddUser}
            >
              Cancel
            </button>
            <button
              className={'sumt_btn'}
              // onClick={handleSubmit}
              onClick={() => {
                if (selectedImage && currentCharacterId) {
                  handleSubmit(currentCharacterId, selectedImage)
                } else {
                  toast.error('Please select Photo')
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
      <Modal show={openAdduser3}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser3()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-5 popup_design">
          <div>

            <div
              className={`person_img`}
            >
              <div className={'person_img_top'}>
                {unselectedImage.map((item, index) => (
                  <div className={'person_img_item'} key={index}>
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
                If you leave any fields empty, the system will use the default set of names and images shown above
              </p>
            </div>
          </div>

          <div className={"d-flex justify-content-center gap-3 mt-3"}>
            <button
              className={'cancel_btn'}
              onClick={handleClosesetOpenAddUser3}
            >
              No, Go back, I will upload
            </button>


            <button
              className={'sumt_btn'}
              onClick={() =>
                handleIagree(charactersDataForConfirmation)
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "I agree"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={openAdduser4}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser4()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-5 popup_design">
          <div>
            <div className="mb-3">
              <h3 className="text-center mb-2">Some Photos Are Missing</h3>
              <p className={styles.description}>
                It looks like one or more photos from your original
                order have been deleted from your profile. Would you
                like to continue with the remaining photos?
              </p>
            </div>
          </div>

          <div className={"d-flex justify-content-center gap-3 mt-3"}>
            <button
              className={'cancel_btn'}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>


            <button
              className={'sumt_btn'}
              onClick={handleClosesetOpenAddUser4}
            >
              Yes, Continue
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={openAdduser5}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser5()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-5 popup_design">
          <div>
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
          </div>

          <div className={"d-flex justify-content-center mt-3"}>
            <button
              className={'cancel_btn'}
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
      </Modal>

      {getListLoder && <OverlayLoding />}
      {imgLoading && <OverlayLoding />}

      {/* <Modal show={show}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

// Reusable button style
const buttonStyle = {
  padding: "7px",
  width: "160px",
  height: "40px",
  marginTop: "15px",
}