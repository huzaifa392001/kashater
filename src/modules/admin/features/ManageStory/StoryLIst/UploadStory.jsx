import React, { useEffect, useMemo, useState } from "react"
import classes from "./UploadStory.module.css"
import FileUploadComponent from "../../../components/UI/FileUploadComponent/FileUploadComponent"
import UploadThumbnail from "../../../components/UI/UploadThumbnail/UploadThumbnail"
import Manage from "../../../assets/image/svg/manage story.svg"
import Slecter from "../../../components/UI/Dropdown/Select"
import CustomeSlecter from "../../../components/UI/Dropdown/CustomeSlecter"
import CustomTextField from "../../../components/UI/TextFiled/TextFiled"
import { validateTextInput, validateNumInput } from "../../../utils/validation"
import useInput from "../../../utils/use-input"
import MinHeightTextarea from "../../../components/UI/TextArea/Textarea"
import CustomButton from "../../../components/UI/Button/Button"
import Autocomplete from "../../../components/UI/MultipleSlecter/Autocomplete"
import { TextField } from "@mui/material"
import { data, useLocation, useNavigate } from "react-router-dom"
import useApiHttp from "../../../hooks/ues-http"
import OverlayLoding from "../../../components/UI/Loding/OverlayLoding"
import toast from "react-hot-toast"
import ToggleSwitch from "../../../components/UI/ToggleSwitch/ToggleSwitch"
import Editor from "../../../components/UI/RichText/Editor"
import CustomeSlecterAdmin from "../../../components/UI/Dropdown/CustomeSlecterAdmin"
import FileUploadComponentGif from "../../../components/UI/FileUploadComponent/FileUploadComponentGif"
import CustomeSlecterMultiple from "../../../components/UI/Dropdown/CustomeSlecterMultiple"

export default function UploadStory() {
  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const {
    isLoading: uplodeLoading,
    success: uplodeSuccess,
    error: uplodeError,
    sendRequest: uplodeRequest,
  } = useApiHttp()

  const {
    isLoading: categoryTypeLoading,
    success: categoryTypeSuccess,
    error: categoryTypeError,
    sendRequest: categoryTypeRequest,
  } = useApiHttp()

  const navigate = useNavigate()
  const location = useLocation()
  const { type, allata } = location.state || {}
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [formDatas, setFormDatas] = useState({
    category: "",
    age: "",
    description: "",
  })
  console.log("allata", allata)
  const [characters, setCharacters] = useState([
    { id: 1, name: "", type: "", thumbnail: null, is_mandatory: false },
  ])

  const [characterTypeOptions, setCharacterTypeOptions] = useState([])
  const [metaTags, seMetaTags] = useState([])
  // const [charsLeft, setCharsLeft] = useState(0)meta-tags
  const [category, setCategory] = useState("")
  const [age, setAge] = useState([])
  const [categoryType, setcategoryType] = useState("")
  const [gender, setGender] = useState("")
  const [selectedTags, setSelectedTags] = useState([])

  const [moduleCategoryList, setModuleCategoryList] = useState([])
  const [ageGroup, setAgeGroup] = useState([])
  const [categoryTypeList, setcategoryTypeList] = useState([])
  const [filesUpload, setFilesUpload] = useState(null)
  const [aIMaskedfiles, setAiMaskedfiles] = useState(null)
  const [gifFiles, setGifFiles] = useState(null)

  const [isEditMode, setIsEditMode] = useState(false)
  const [storyId, setStoryId] = useState(null)

  const charsLeft = formDatas?.description?.length
  const {
    value: storyTitle,
    isValid: storyTitleIsValid,
    hasError: storyTitleHasError,
    valueChangeHandler: storyTitleChangeHandler,
    inputBlurHandler: storyTitleBlurHandler,
    reset: resetStoryTitleInput,
  } = useInput(validateTextInput, {
    type: "text",
    value: allata?.name || "",
  })

  const {
    value: mrp,
    isValid: mrpIsValid,
    hasError: mrpHasError,
    valueChangeHandler: mrpChangeHandler,
    inputBlurHandler: mrpBlurHandler,
    reset: resetMrpInput,
  } = useInput(validateTextInput, {
    type: "text",
    value: allata?.mrp || "",
  })


  const {
    value: offerPrice,
    isValid: offerPriceIsValid,
    hasError: offerPriceHasError,
    valueChangeHandler: offerPriceChangeHandler,
    inputBlurHandler: offerPriceBlurHandler,
    reset: resetofferPriceInput,
  } = useInput(validateTextInput, {
    type: "text",
    value: allata?.price || "",
  })


  // DIMENTIONS
  const {
    value: width,
    isValid: widthIsValid,
    hasError: widthHasError,
    valueChangeHandler: widthChangeHandler,
    inputBlurHandler: widthBlurHandler,
    reset: resetWidthInput,
  } = useInput(validateNumInput, {
    type: "text",
    value: allata?.width || "",
  })

  const {
    value: height,
    isValid: heightIsValid,
    hasError: heightHasError,
    valueChangeHandler: heightChangeHandler,
    inputBlurHandler: heightBlurHandler,
    reset: resetheightInput,
  } = useInput(validateNumInput, {
    type: "text",
    value: allata?.height || "",
  })

  const {
    value: thickness,
    isValid: thicknessIsValid,
    hasError: thicknessHasError,
    valueChangeHandler: thicknessChangeHandler,
    inputBlurHandler: thicknessBlurHandler,
    reset: resetThicknessInput,
  } = useInput(validateNumInput, {
    type: "text",
    value: allata?.thickness || "",
  })

  const {
    value: weight,
    isValid: weightIsValid,
    hasError: weightHasError,
    valueChangeHandler: weightChangeHandler,
    inputBlurHandler: weightBlurHandler,
    reset: resetWeightInput,
  } = useInput(validateNumInput, {
    type: "text",
    value: allata?.weight || "",
  })

  const {
    value: fontSize,
    isValid: fontSizeIsValid,
    hasError: fontSizeHasError,
    valueChangeHandler: fontSizeChangeHandler,
    inputBlurHandler: fontSizeBlurHandler,
    reset: resetFontSizeInput,
  } = useInput(validateNumInput, {
    type: "text",
    value: allata?.fontsize || "",
  })

  // const {
  //   value: charactersName,
  //   isValid: charactersNameIsValid,
  //   hasError: charactersNameHasError,
  //   valueChangeHandler: charactersNameChangeHandler,
  //   inputBlurHandler: charactersNameBlurHandler,
  //   reset: resetCharactersNameInput,
  // } = useInput(validateTextInput)
  // const {
  //   value: charactersType,
  //   isValid: charactersTypeIsValid,
  //   hasError: charactersTypeHasError,
  //   valueChangeHandler: charactersTypeChangeHandler,
  //   inputBlurHandler: charactersTypeBlurHandler,
  //   reset: resetCharactersTypeInput,
  // } = useInput(validateTextInput)

  const Categories = [
    { id: "Novels", name: "Novels", code: "US" },
    { id: "Romance", name: "Romance", code: "CA" },
    { id: "Fantasy", name: "Fantasy", code: "UK" },
    { id: "Philosophy", name: "Philosophy", code: "AU" },
    { id: "Biography", name: "Biography", code: "DE" },
  ]
  // const characterTypeOptions = [
  //   { label: "Hero", value: "Hero" },
  //   { label: "Heroine", value: "Heroine" },
  //   { label: "Villain", value: "Villain" },
  //   { label: "Supporting", value: "Supporting" },
  // ]
  const handleChange = event => {
    const { name, value } = event.target
    const maxChar = 1000
    const truncatedValue = value.slice(0, maxChar)
    setFormDatas(prev => ({ ...prev, [name]: truncatedValue }))
  }
  const handleSelectionChange = (event, newValue) => {
    setSelectedTags(newValue)
    // You can access the selected values here
    // console.log("Selected values:", newValue)
  }
  const addCharacter = () => {
    setCharacters(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: "",
        type: "",
        thumbnail: null,
        is_mandatory: false,
      },
    ])
  }

  const removeCharacter = id => {
    if (characters.length > 1) {
      setCharacters(prev => prev.filter(character => character.id !== id))
    }
  }

  const handleCharacterChange = (id, field, value) => {
    setCharacters(prev =>
      prev.map(character =>
        character.id === id ? { ...character, [field]: value } : character
      )
    )
  }

  const handleThumbnailChange = (id, file) => {
    console.log("char id", id)

    setCharacters(prev =>
      prev.map(character =>
        character.id === id ? { ...character, thumbnail: file } : character
      )
    )
  }

  const showValidationError = message => {
    toast.error(message)
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    // Clear previous errors
    setErrors({})

    // Validate main fields in sequence
    if (!storyTitle.trim()) {
      newErrors.storyTitle = "Story Title is required"
      showValidationError("Story Title is required")
      isValid = false
    } else if (!category) {
      newErrors.category = "Category is required"
      showValidationError("Category is required")
      isValid = false
    } else if (!age) {
      newErrors.age = "Age group is required"
      showValidationError("Age group is required")
      isValid = false
    } else if (!categoryType) {
      newErrors.categoryType = "Book Category Type is required"
      showValidationError("Book Category Type is required")
      isValid = false
    } else if (!gender) {
      newErrors.gender = "Gender is required"
      showValidationError("Gender is required")
      isValid = false
    } else if (!formDatas.description.trim()) {
      newErrors.description = "Description is required"
      showValidationError("Description is required")
      isValid = false
    } else if (!mrp.trim()) {
      newErrors.mrp = "MRP Price is required"
      showValidationError("MRP Price is required")
      isValid = false
    } else if (!offerPrice.trim()) {
      newErrors.offerPrice = "Offer Price is required"
      showValidationError("Offer Price is required")
      isValid = false
    } else if (!width) {
      newErrors.width = "Width is required"
      showValidationError("Width is required")
      isValid = false
    } else if (!height) {
      newErrors.height = "Height is required"
      showValidationError("Height is required")
      isValid = false
    } else if (!thickness) {
      newErrors.thickness = "Thickness is required"
      showValidationError("Thickness is required")
      isValid = false
    } else if (!weight) {
      newErrors.weight = "Weight is required"
      showValidationError("Weight is required")
      isValid = false
    } else if (!fontSize) {
      newErrors.weight = "Font Size is required"
      showValidationError("Font Size is required")
      isValid = false
    } else if (!isEditMode) {
      //check if atleast one character is marked as hero
      let isHeroSelected = characters.some(x => x.is_mandatory === true)
      if (!isHeroSelected) {
        showValidationError(`Atleast one Character should be selected as Hero`)
        isValid = false
      }

      if (!gifFiles) {
        newErrors.gifFiles = "Gif Image is required"
        showValidationError("Gif Image is required")
        isValid = false
      }
    }
    // Validate characters sequentially
    else {
      for (let i = 0; i < characters.length; i++) {
        const character = characters[i]
        if (!character.name.trim()) {
          newErrors[`character_${i}_name`] = `Character ${i + 1} name required`
          showValidationError(`Character ${i + 1} name is required`)
          isValid = false
          break
        } else if (!character.type.trim()) {
          newErrors[`character_${i}_type`] = `Character ${i + 1} type required`
          showValidationError(`Character ${i + 1} type is required`)
          isValid = false
          break
        }
      }
    }



    setErrors(newErrors)
    return isValid
  }

  // const handlerUploadStory = () => {

  //   // if (validateForm()) {
  //   const formPayload = {
  //     storyTitle,
  //     mrp,
  //     offerPrice,
  //     category,
  //     age,
  //     metaTags: selectedTags.map(tag => tag.name),
  //     description: formDatas.description,
  //     characters: characters.map(character => ({
  //       name: character.name,
  //       type: character.type,
  //       thumbnail: character.thumbnail,
  //     })),
  //   }

  //   console.log("Form Submission Data:", formPayload)
  //   alert("Form submitted successfully!")
  //   // }
  // }
  const namesArray = selectedTags.map(tag => tag.name)

  useEffect(() => {
    if (type === "edit" && allata) {
      setIsEditMode(true)
      setStoryId(allata.id)

      setFormDatas({
        description: allata.description || "",
        // category: "",
        // age: "",
      })

      setCategory(allata.category_id || "")
      // setAge(allata.age_group_id || "")
      setAge(allata.age_group_ids || [])
      setcategoryType(allata.book_type_category_id || "")
      setGender(allata.gender || "")
      setSelectedTags(allata.tags || [])

      // Pre-fill characters (read-only in edit mode)
      const initialCharacters = allata.characters.map((char, index) => ({
        id: index + 1,
        name: char.name,
        type: char.type_id || char.type,
        thumbnail: null, // Not used in edit mode
      }))
      setCharacters(initialCharacters)
    }
  }, [type, allata])

  const handlerUploadStory = () => {
    if (!validateForm()) return

    const formData = new FormData()

    // Common fields for both create and update
    formData.append("name", storyTitle)
    formData.append("mrp", mrp)
    formData.append("price", offerPrice)
    formData.append("width", width)
    formData.append("height", height)
    formData.append("thickness", thickness)
    formData.append("weight", weight)
    formData.append("category_id", category)
    // formData.append("age_group_id", age)
    formData.append("book_type_category_id", categoryType)
    formData.append("gender", gender)
    formData.append("description", formDatas.description)
    formData.append("fontsize", fontSize)



    age.forEach((age_id, index) => {
      formData.append(`age_group_ids[${index}]`, age_id)
    })

    // Tags
    selectedTags.forEach((tag, index) => {
      formData.append(`tags[${index}][name]`, tag.name)
    })

    if (isEditMode) {
      // EDIT MODE SPECIFIC LOGIC
      // Append cover photo if updated
      if (aIMaskedfiles) {
        formData.append("book_cover", aIMaskedfiles.file)
      } else {
        formData.append("book_cover", allata.book_cover)
      }

      if (gifFiles) {
        formData.append("preview_gif", gifFiles.file)
      }

      uplodeRequest(
        {
          url: `admin/story-management/story/update/${storyId}`,
          method: "post",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
        data => {
          navigate("/admin/storylists")
        }
      )
    } else {
      // CREATE MODE SPECIFIC LOGIC
      // Append files
      if (filesUpload) formData.append("story_file", filesUpload.file)
      if (aIMaskedfiles) {
        formData.append("book_cover", aIMaskedfiles.file)
      }

      if (gifFiles) {
        formData.append("preview_gif", gifFiles.file)
      }

      // Append characters
      characters.forEach((character, index) => {
        formData.append(`characters[${index}][name]`, character.name)
        formData.append(`characters[${index}][type_id]`, character.type)
        formData.append(
          `characters[${index}][is_mandatory]`,
          character.is_mandatory ? 1 : 0
        )
        if (character.thumbnail) {
          formData.append(
            `characters[${index}][image]`,
            character.thumbnail.file
          )
        }
      })

      uplodeRequest(
        {
          url: "admin/story-management/story/create",
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
        data => {
          navigate("/admin/storylists")
        }
      )
    }
  }

  // console.log(namesArray)
  // const handlerUploadStory = () => {
  //   if (!validateForm()) {
  //     console.log("Form has errors. Please fix them.")
  //     return
  //   }

  //   const formData = new FormData()

  //   // Append simple fields
  //   formData.append("name", storyTitle)
  //   formData.append("mrp", mrp)
  //   formData.append("price", offerPrice)
  //   formData.append("category_id", category)
  //   formData.append("age_group_id", age)
  //   formData.append("description", formDatas.description)

  //   // Append tags as comma-separated string
  //   namesArray.forEach((tag, index) => {
  //     formData.append(`tags[${index}][name]`, tag)
  //     // formData.append(`tags[${index}][id]`, null)
  //   })

  //   characters.forEach((character, index) => {
  //     formData.append(`characters[${index}][name]`, character.name)
  //     formData.append(`characters[${index}][type_id]`, character.type)
  //     // formData.append(
  //     //   `characters[${index}][image_file]`,
  //     //   character.thumbnail.file
  //     // )
  //   })

  //   // Append files
  //   if (filesUpload) {
  //     formData.append("story_file", filesUpload?.file)
  //   }
  //   if (aIMaskedfiles) {
  //     formData.append("book_cover", aIMaskedfiles?.file)
  //   }

  //   // Log formData contents properly
  //   // for (const [key, value] of formData.entries()) {
  //   //   console.log(key, value)
  //   // }
  //   // console.log("formData", formData)

  //   uplodeRequest(
  //     {
  //       url: "admin/story-management/story/create",
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data", // Add proper header
  //       },
  //     },
  //     data => {
  //       console.log("Success:", data)
  //       navigate("/admin/storylists")
  //     }
  //   )
  // }
  useEffect(() => {
    sendRequest(
      {
        url: `admin/drop-down/category`,
      },
      data => {
        setModuleCategoryList(data?.data)
      }
    )
    sendRequest(
      {
        url: `admin/drop-down/age-group`,
      },
      data => {
        setAgeGroup(data?.data)
      }
    )

    sendRequest(
      {
        url: `admin/drop-down/character-types`,
      },
      data => {
        setCharacterTypeOptions(data?.data)
      }
    )
    sendRequest(
      {
        url: `admin/drop-down/meta-tags`,
      },
      data => {
        seMetaTags(data?.data)
      }
    )

    categoryTypeRequest(
      {
        url: `admin/drop-down/book-type-category`,
      },
      data => {
        setcategoryTypeList(data?.data)
      }
    )
  }, [])

  const handleFilesUpload = files => {
    // console.log("Uploaded files:", files[0])
    setFilesUpload(files[0])
    // Add your upload logic here
  }
  const handleAIMaskedUpload = files => {
    // console.log("Upload AI Masked Photo:", files[0])
    setAiMaskedfiles(files[0])
    // Add your upload logic here
  }

  const handleGifUpload = files => {
    // console.log("Upload AI Masked Photo:", files[0])
    setGifFiles(files[0])
    // Add your upload logic here
  }

  const existingObject = useMemo(
    () =>
      allata?.book_cover
        ? {
          url: allata.book_cover,
          name: "Existing cover",
          type: "image/jpeg",
        }
        : null,
    [allata?.book_cover]
  )

  const existingGifObject = useMemo(
    () =>
      allata?.preview_gif
        ? {
          url: allata.preview_gif,
          name: "Existing cover",
          type: "image/gif",
        }
        : null,
    [allata?.preview_gif]
  )

  const [editorContent, setEditorContent] = useState("")

  const handleEditorChange = content => {
    setEditorContent(content)
    setFormDatas(prev => ({ ...prev, description: content }))
  }


  return (
    <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
      <div className={classes.breadcrumb}>
        <span
          style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
          onClick={() => navigate(-1)}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src={Manage}
            alt="Manage"
          />{" "}
          Manage Story
        </span>{" "}
        &gt; <span className={classes.active}>Upload Story</span>
      </div>

      <div className={classes.header_table}>
        <h3>Upload Story</h3>

        <div className={classes.main}>
          <div className={classes.main_box}>
            <div className={classes.left_side}>
              {!isEditMode && (
                <FileUploadComponent
                  acceptedTypes={["application/pdf"]}
                  maxSize={200}
                  onFilesChange={files => handleFilesUpload(files)}
                  className="width_max"
                  dropzoneText="Upload Book File"
                  multiple={false} // Ensure single file upload
                  types="PDF"
                />
              )}

              <FileUploadComponent
                acceptedTypes={["image/*", "application/pdf"]}
                maxSize={10}
                onFilesChange={files => handleAIMaskedUpload(files)}
                className="width_min"
                dropzoneText="Upload Thumbnail Image"
                box_controlerl={"box_sizeing"}
                multiple={false} // Ensure single file upload
                existingFile={existingObject}
              />
              <FileUploadComponentGif
                acceptedTypes={["image/gif"]}
                maxSize={10}
                onFilesChange={files => handleGifUpload(files)}
                className="width_min"
                dropzoneText="Upload GIF Image"
                box_controlerl={"box_sizeing"}
                multiple={false} // Ensure single file upload
                existingFile={existingGifObject}
                types="GIF"
                method={'gif'}
              />
            </div>
            <div className={classes.right_side}>
              <div className={classes.section}>
                <div style={{ margin: "0px 0px 24px 0px" }}>
                  <CustomTextField
                    id="StoryTitle"
                    label="Story Title"
                    placeholder="Enter your Story Title"
                    variant="outlined"
                    value={storyTitle}
                    sx={{
                      width: "100%",
                    }}
                    onChange={storyTitleChangeHandler}
                    onBlur={storyTitleBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // error={storyTitleHasError || !!errors.storyTitle}
                    // helperText={errors.storyTitle}
                    required
                  />
                </div>

                <div className={classes.formRow}>
                  <CustomeSlecterAdmin
                    data={
                      moduleCategoryList?.map(sub => ({
                        label: sub.name,
                        value: sub.id,
                      })) || []
                    }
                    title="Choose Category" // Dropdown title
                    lable="All Category"
                    width={"100%"}
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    borders={true}
                    error={!!errors.category}
                  // helperText={errors.category}
                  />

                  <CustomeSlecterMultiple
                    data={
                      ageGroup?.map(sub => ({
                        label: sub.name,
                        value: sub.id,
                      })) || []
                    }
                    lable="Choose Age"
                    title="Choose Age"
                    width={"170"}
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    borders={true}
                    error={!!errors.age}
                  // helperText={errors.category}
                  />
                </div>
                <div style={{ margin: "0px 0px 24px 0px" }}></div>
                <div className={classes.formRow}>
                  <CustomeSlecterAdmin
                    data={
                      categoryTypeList?.map(sub => ({
                        label: sub.name,
                        value: sub.id,
                      })) || []
                    }
                    title="Choose Category Type" // Dropdown title
                    lable="All Category Type"
                    width={"100%"}
                    value={categoryType}
                    onChange={e => setcategoryType(e.target.value)}
                    borders={true}
                    error={!!errors.categoryType}
                  // helperText={errors.category}
                  />

                  <CustomeSlecterAdmin
                    data={
                      ["Boy", "Girl"]?.map(sub => ({
                        label: sub,
                        value: sub,
                      })) || []
                    }
                    lable="Choose Gender"
                    title="Choose Gender"
                    width={"170"}
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    borders={true}
                    error={!!errors.gender}
                    disabled={isEditMode} // Disable in edit mode
                  // helperText={errors.category}
                  />
                </div>
              </div>
              {/* Meta Tags Section */}
              <div
                className={classes.section}
                style={{ margin: "20px 0px 0px 0px" }}
              >
                <div className={classes.inputGroup}>
                  <Autocomplete
                    multiple
                    options={metaTags}
                    getOptionLabel={option => option.name}
                    value={selectedTags}
                    onChange={handleSelectionChange}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Enter Meta Tags"
                        placeholder="Select the tags..."
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                    error={!!errors.tags}
                  // helperText={errors.tags}
                  />
                </div>

                <div className={classes.marg_input_filed}>
                  {/* <MinHeightTextarea
                    maxLength="1000"
                    label="Description"
                    title="Description"
                    name="description"
                    rows={8}
                    value={formDatas.description}
                    placeholder="Enter Description"
                    showpertext={`${charsLeft}/1000`}
                    onChange={handleChange}
                    error={!!errors.description}
                  /> */}
                  <Editor
                    label="Description"
                    value={formDatas.description}
                    onChange={handleEditorChange}
                    placeholder="Enter Description"
                    theme="snow"
                  />

                  {errors.description && (
                    <span className={`${classes.absolute} text_danger`}>
                      {errors.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Price Details Section */}
              <div
                className={classes.section}
                style={{ margin: "20px 0px 0px 0px" }}
              >
                <h2
                  className={`${classes.sectionTitle} ${classes.mrg_butom_1rem}`}
                >
                  Price Details
                </h2>

                <div className={classes.priceRow}>
                  <CustomTextField
                    id="mrp"
                    label="Story Book MRP Price"
                    placeholder="Enter your MRP"
                    variant="outlined"
                    value={mrp}
                    sx={{
                      width: "200px",
                    }}
                    onChange={mrpChangeHandler}
                    // error={mrpHasError}
                    onBlur={mrpBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />

                  <CustomTextField
                    id="OfferPrice"
                    label="Story Book Offer Price"
                    placeholder="Enter your Offer Price"
                    variant="outlined"
                    value={offerPrice}
                    sx={{
                      width: "200px",
                    }}
                    onChange={offerPriceChangeHandler}
                    // error={offerPriceHasError}
                    onBlur={offerPriceBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </div>
              </div>
              <div
                className={classes.section}
                style={{ margin: "20px 0px 0px 0px" }}
              >
                <h2
                  className={`${classes.sectionTitle} ${classes.mrg_butom_1rem}`}
                >
                  Dimensions
                </h2>

                <div className={classes.priceRow}>
                  <CustomTextField
                    type="number"
                    id="width"
                    label="Width (mm)"
                    placeholder="Enter Width (mm)"
                    variant="outlined"
                    value={width}
                    sx={{
                      width: "200px",
                    }}
                    onChange={widthChangeHandler}
                    // error={mrpHasError}
                    onBlur={widthBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />

                  <CustomTextField
                    type="number"
                    id="height"
                    label="Height (mm)"
                    placeholder="Enter Height (mm)"
                    variant="outlined"
                    value={height}
                    sx={{
                      width: "200px",
                    }}
                    onChange={heightChangeHandler}
                    // error={offerPriceHasError}
                    onBlur={heightBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </div>
              </div>
              <div
                className={classes.section}
                style={{ margin: "20px 0px 0px 0px" }}
              >

                <div className={classes.priceRow}>
                  <CustomTextField
                    type="number"
                    id="thickness"
                    label="Thickness (mm)"
                    placeholder="Enter Thickness (mm)"
                    variant="outlined"
                    value={thickness}
                    sx={{
                      width: "200px",
                    }}
                    onChange={thicknessChangeHandler}
                    // error={offerPriceHasError}
                    onBlur={thicknessBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                  <CustomTextField
                    type="number"
                    id="weight"
                    label="Weight (kg)"
                    placeholder="Enter Weight (kg)"
                    variant="outlined"
                    value={weight}
                    sx={{
                      width: "200px",
                    }}
                    onChange={weightChangeHandler}
                    // error={mrpHasError}
                    onBlur={weightBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </div>
              </div>
              <div
                className={classes.section}
                style={{ margin: "20px 0px 0px 0px" }}
              >

                <div className={classes.priceRow}>
                  <CustomTextField
                    type="number"
                    id="fontsize"
                    label="Font Size"
                    placeholder="Enter Font Size"
                    variant="outlined"
                    value={fontSize}
                    sx={{
                      width: "200px",
                    }}
                    onChange={fontSizeChangeHandler}
                    // error={offerPriceHasError}
                    onBlur={fontSizeBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </div>
              </div>
              {!isEditMode && (
                <div
                  className={classes.section}
                  style={{ margin: "20px 0px 0px 0px" }}
                >
                  <h2
                    className={`${classes.sectionTitle} ${classes.mrg_butom_1rem}`}
                  >
                    Characters
                  </h2>
                  {characters.map((character, index) => {
                    const currentId = character.id
                    return (
                      <div key={currentId}>
                        {index > 0 && (
                          <button
                            className={classes.removeButton}
                            onClick={() => removeCharacter(character.id)}
                          >
                            ×
                          </button>
                        )}

                        <div className={classes.priceRow}>
                          <CustomTextField
                            label="Character Name"
                            placeholder="Enter your Character Name"
                            value={character.name}
                            onChange={e =>
                              handleCharacterChange(
                                character.id,
                                "name",
                                e.target.value
                              )
                            }
                            // error={!!errors[`character_${index}_name`]}
                            // helperText={errors[`character_${index}_name`]}
                            sx={{ width: "200px" }}
                            InputLabelProps={{ shrink: true }}
                            required
                          />
                          <CustomeSlecterAdmin
                            data={
                              characterTypeOptions?.map(sub => ({
                                label: sub.name,
                                value: sub.id,
                              })) || []
                            }
                            lable="Character Type"
                            title="Choose Type"
                            width={"200px"}
                            value={character.type}
                            onChange={e =>
                              handleCharacterChange(
                                character.id,
                                "type",
                                e.target.value
                              )
                            }
                            borders={true}
                          // error={!!errors[`character_${index}_type`]}
                          // helperText={errors[`character_${index}_type`]}
                          />

                          {/* <CustomTextField
                          label="Character Type"
                          placeholder="Enter your Character Type"
                          value={character.type}
                          onChange={e =>
                            handleCharacterChange(
                              character.id,
                              "type",
                              e.target.value
                            )
                          }
                          error={!!errors[`character_${index}_type`]}
                          helperText={errors[`character_${index}_type`]}
                          sx={{ width: "200px" }}
                          InputLabelProps={{ shrink: true }}
                          required
                        /> */}
                        </div>
                        <div className={classes.upload_set}>
                          <UploadThumbnail
                            label="Upload Photo"
                            onFileChange={(file, preview) => {
                              console.log("file", file)
                              console.log("preview", character.id)
                              handleThumbnailChange(character.id, file)
                            }}
                            id={`thumbnail_${index}_${currentId}`}
                            error={!!errors[`character_${index}_thumbnail`]}
                            helperText={errors[`character_${index}_thumbnail`]}
                            allowedTypes={["image/jpeg", "image/png"]}
                            maxSizeMB={5}
                          />
                          <div className={classes.autoRenewal}>
                            <div className={classes.switchSection}>
                              <h4 className={classes.fieldHeader}>
                                Mark Character as Hero
                              </h4>
                              <ToggleSwitch
                                checked={character?.is_mandatory}
                                onChange={e =>
                                  handleCharacterChange(
                                    character.id,
                                    "is_mandatory",
                                    e.target.checked
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {index < characters.length - 1 && (
                          <div className={classes.divider} />
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              <div className={classes.divider} />
              {/* Characters Section */}
              {!isEditMode && (
                <div className={classes.section}>
                  <a className={classes.addButton} onClick={addCharacter}>
                    + Add New Character
                  </a>
                </div>
              )}

              <div
                className={classes.section2}
                style={{ margin: "20px 0px 0px 0px" }}
              >
                <CustomButton
                  variant="contained"
                  customColor="#000000"
                  customBgColor="#F3C11D"
                  custmstyle={{
                    padding: "10px 20px",
                    width: "131px",
                    fontSize: "13px",
                  }}
                  onClick={() => handlerUploadStory()}
                >
                  Upload Story
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {uplodeLoading && <OverlayLoding />}
    </div>
  )
}
