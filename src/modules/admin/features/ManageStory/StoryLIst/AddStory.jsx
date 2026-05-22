import React, { useEffect, useMemo, useState } from "react"
import classes from "./UploadStory.module.css"
import FileUploadComponent from "../../../components/UI/FileUploadComponent/FileUploadComponent"
import UploadThumbnail from "../../../components/UI/UploadThumbnail/UploadThumbnail"
import Manage from "../../../assets/image/svg/manage story.svg"
import Slecter from "../../../components/UI/Dropdown/Select"
import CustomeSlecter from "../../../components/UI/Dropdown/CustomeSlecter"
import CustomTextField from "../../../components/UI/TextFiled/TextFiled"
import { validateTextInput } from "../../../utils/validation"
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

export default function AddStory() {
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
  const [errors, setErrors] = useState({})
  const [characters, setCharacters] = useState([
    { id: 1, name: "", type: "", thumbnail: null },
  ])

  const [filesUpload, setFilesUpload] = useState(null)
  const [characterTypeOptions, setCharacterTypeOptions] = useState([])

  useEffect(() => {
    sendRequest(
      {
        url: `admin/drop-down/character-types`,
      },
      data => {
        setCharacterTypeOptions(data?.data)
      }
    )
  }, [])

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

  const addCharacter = () => {
    setCharacters(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: "",
        type: "",
        thumbnail: null
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
      newErrors.storyTitle = "Page Number is required"
      showValidationError("Page Number is required")
      isValid = false
    } else if (storyTitle < 1) {
      newErrors.storyTitle = "Page Number must be greater than 0"
      showValidationError("Page Number must be greater than 0")
      isValid = false
    }
    // Validate characters sequentially
    else {
      for (let i = 0; i < characters.length; i++) {
        const character = characters[i]
        if (character.name.length > 0 || character.type.length > 0) {
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
    }

    setErrors(newErrors)
    return isValid
  }



  const handlerUploadStory = () => {
    if (!validateForm()) return

    const formData = new FormData()

    // Common fields for both create and update
    formData.append("page_number", storyTitle)
    formData.append("book_id", location?.state?.booksData?.id)
    if (filesUpload) formData.append("page_pdf", filesUpload.file)

    // Append characters
    characters.forEach((character, index) => {
      if (character.name) {
        formData.append(`characters[${index}][name]`, character.name)
      }
      if (character.type) {
        formData.append(`characters[${index}][character_type_id]`, character.type)
      }
      if (character.thumbnail) {
        formData.append(
          `characters[${index}][char_image]`,
          character.thumbnail.file
        )
      }
    })

    uplodeRequest(
      {
        url: "admin/story-management/story/book/page/add",
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      },
      data => {
        navigate("/admin/storylists/in-your-backyard", {
          state: {
            storyId: location?.state?.booksData?.id, // Your actual ID,
            tab: 1
          },
        })
      }
    )

  }

  const handleFilesUpload = files => {
    // console.log("Uploaded files:", files[0])
    setFilesUpload(files[0])
    // Add your upload logic here
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
        &gt; <span style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
          onClick={() => navigate(-1)}>{location?.state?.booksData?.name}</span>
        &gt; <span className={classes.active}>Add Page</span>
      </div>

      <div className={classes.header_table}>
        <h3>Add Page</h3>

        <div className={classes.main}>
          <div className={classes.main_box}>
            <div className={classes.left_side}>
              <FileUploadComponent
                acceptedTypes={["application/pdf"]}
                maxSize={200}
                onFilesChange={files => handleFilesUpload(files)}
                className="width_min"
                dropzoneText="Upload Page PDF"
                box_controlerl={"box_sizeing"}
                multiple={false} // Ensure single file upload
                types="PDF"
              />
            </div>
            <div className={classes.right_side}>
              <div className={classes.section}>
                <div style={{ margin: "0px 0px 24px 0px" }}>
                  <CustomTextField
                    id="page_number"
                    label="Page Number"
                    placeholder="Enter Page Number"
                    variant="outlined"
                    value={storyTitle}
                    type="number"
                    sx={{
                      width: "300px",
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
              </div>

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
                      <div className="d-flex gap-5">
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
                          />
                        </div>
                        {index > 0 && (
                          <button
                            className={classes.removeButton2}
                            onClick={() => removeCharacter(character.id)}
                          >
                            ×
                          </button>
                        )}
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
                      </div>
                      {index < characters.length - 1 && (
                        <div className={classes.divider} />
                      )}
                    </div>
                  )
                })}
              </div>


              <div className={classes.divider} />
              {/* Characters Section */}

              <div className={classes.section}>
                <a className={classes.addButton} onClick={addCharacter}>
                  + Add New Character
                </a>
              </div>


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
                  Upload Page
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
