import React from "react"
import BoostrapDialog from "../../components/UI/Dialog/BoostrapDialog"
import styles from "./ProfilePictureSelector.module.css"
import CustomeSlecter from "../../components/UI/Dropdown/Select"
const ProfilePictureSelector = ({ openAdduser2, onCancel, onSubmit }) => {
  const handleSubmit = () => {
    if (!selectedImage) return
    onSubmit(selectedImage)
  }
  const handleClosesetOpenAddUser = () => {
    onCancel()
  }
  const countryData = [
    { id: "IN", name: "India" },
    { id: "US", name: "United States" },
    { id: "CA", name: "Canada" },
    { id: "GB", name: "United Kingdom" },
  ]
  return (
    <>
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
                      data={countryData.map(a => ({
                        label: a.name,
                        value: a.name,
                      }))}
                      title="Choose Name"
                      width="287px"
                      value={name}
                      onChange={e => {
                        handlerName(e)
                        // setAge(e.target.value)
                      }}
                      borders={true}
                      required
                    />
                  </div>

                  <div className={styles.profileGrid}>
                    {profileImages.map(image => (
                      <div
                        key={image.id}
                        className={`${styles.profileItem} ${
                          selectedImage?.id === image.id ? styles.selected : ""
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <div className={styles.imageContainer}>
                          <img
                            src={image.src}
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
                    className={styles.cancel}
                    onClick={handleClosesetOpenAddUser}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${styles.continueBtn} ${styles.width_cont}`}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  )
}

export default ProfilePictureSelector
