import React, { useEffect, useState } from "react";
import styles from "./MySaves.module.css";
import MinHeightTextarea from "../../components/UI/TextArea/Textarea";
import CustomRadio from "../../components/UI/CustomRadio/CustomRadio";
import useApiHttp from "../../hooks/ues-http";
import Swal from "sweetalert2";
import remove from "../../../web/assets/image/svg/remove.svg";
import edit from "../../../web/assets/image/svg/edit.svg";
import BoostrapDialog from "../../components/UI/Dialog/BoostrapDialog";
import CustomTextField from "../../components/UI/TextFiled/TextFiled";
import UploadThumbnail from "../../components/UI/UploadThumbnail/UploadThumbnail";
import toast, { Toaster } from "react-hot-toast";
import useIsMobile from "../../hooks/useIsMobile";
const MySaves = () => {
  const isTablet = useIsMobile(768);
  const isMobile = useIsMobile(500);
  const [saves, setSaves] = useState([]);
  const [childName, setChildName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSaveId, setCurrentSaveId] = useState(null);
  const [dialogType, setDialogType] = useState("add"); // 'add' or 'edit'
  const [images, setImages] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const [files, setFiles] = useState([]);
  // const [initialimg, setInitialimg] = useState(true)
  console.log("index", files);
  console.log("singleFile", singleFile);

  const [editeData, setEditeData] = useState([]);

  const { sendRequest, isLoading, error } = useApiHttp();
  const {
    sendRequest: editRequest,
    isLoading: RequestLoading,
    success: Requestsuccess,
    error: RequestError,
  } = useApiHttp();

  // Fetch saves data on component mount
  useEffect(() => {
    fetchSaves();
  }, []);

  // useEffect(() => {
  //   if (editeData) {
  //     setChildName(editeData?.name)

  //   }
  // }, [editeData])

  const fetchSaves = () => {
    sendRequest({ url: `user/profile/my-saves/list` }, (response) => {
      if (response.data) {
        setSaves(response.data);
      }
    });
  };
  const fetchEditData = (id) => {
    sendRequest(
      { url: `user/profile/my-saves/edit-view/${id}` },
      (response) => {
        if (response.data) {
          setEditeData(response.data);
          setChildName(response?.data?.name);
          setCurrentSaveId(id);
          setOpenDialog(true);
        }
      }
    );
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setChildName("");
    setCurrentSaveId(null);
    setSingleFile(null);
    setFiles([]);
    fetchSaves();
    //   setEditeData(null)
  };

  const handleNameChange = (e) => {
    const {
      target: { value },
    } = e;
    if (value.length <= 10) setChildName(value.replaceAll(" ", ""));
  };

  const openAddDialog = () => {
    setDialogType("add");
    setOpenDialog(true);
  };

  const openEditDialog = (save) => {
    setDialogType("edit");
    fetchEditData(save.id);
    // setChildName(save.name)
    setCurrentSaveId(save.id);

    // setImages(save.images)
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this save?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#373737",
      customClass: { popup: "my-swal-popup" },
    }).then((result) => {
      if (result.isConfirmed) {
        sendRequest(
          {
            url: `user/profile/my-saves/delete/${id}`,
            method: "DELETE",
          },
          () => {
            Swal.fire({
              title: "Deleted!",
              text: "Save deleted successfully.",
              icon: "success",
              background: "#373737",
              customClass: { popup: "my-swal-popup" },
            });
            fetchSaves();
          }
        );
      }
    });
  };
  const prepareFormData = () => {
    const formData = new FormData();

    // Common fields
    formData.append("name", childName);
    // formData.append("image", singleFile?.file)

    if (dialogType === "add") {
      // For new entry: single main image
      if (singleFile) {
        formData.append("image", singleFile.file);
      }
    } else {
      // For edit: multiple images
      formData.append("id", currentSaveId);

      // Handle existing images
      editeData.images.forEach((img, index) => {
        if (!files[index]) formData.append(`images[${index}][id]`, img.id);
        // Only send new file if it exists for this position
        if (files[index]) {
          formData.append(`images[${index}][image]`, files[index].file);
        }
      });

      // Handle new images beyond existing ones
      for (let i = editeData.images.length; i < 10; i++) {
        if (files[i]) {
          formData.append(`images[${i}][image]`, files[i].file);
        }
      }
    }

    return formData;
  };

  const handleSubmit = () => {
    const formData = prepareFormData();
    const url =
      dialogType === "add"
        ? "user/profile/my-saves/create"
        : `user/profile/my-saves/update`;

    sendRequest(
      {
        url,
        method: "POST",
        body: formData,
      },
      () => {
        handleDialogClose();
        fetchSaves();
      }
    );
  };
  const handleRemoveImage = (id) => {
    editRequest(
      {
        url: `user/profile/my-saves/delete/picture/${id}`,
        method: "DELETE",
      },
      (data) => {
        // setInitialimg(false)
        fetchSaves();
      }
    );
  };
  useEffect(() => {
    if (RequestError) {
      // setInitialimg(true)
      fetchEditData(currentSaveId);
    }
    if (Requestsuccess) {
      toast.success(Requestsuccess);
    }
  }, [RequestError, Requestsuccess]);
  const handleThumbnailChange = (file) => {
    setSingleFile(file);
  };
  const handleFileChange = (index, file) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = file;
      return newFiles;
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <h2 className={styles.sectionTitle}>My Saves</h2>
        <p onClick={openAddDialog}>+ Add new image</p>
      </div>

      {saves.map((save) => (
        <div className={styles.mysaveContainer} key={save.id}>
          <h3>{save.name}</h3>
          <div className={styles.mysaveIMage}>
            <div className={styles.profileGrid}>
              {save.images.map((img, idx) => (
                <img src={img} alt={`Save ${idx}`} key={idx} />
              ))}
            </div>
          </div>
          <div className={styles.btn_group}>
            <p className={styles.delete}>
              <img src={remove} alt="remove" style={{ width: "15px" }} />{" "}
              <a onClick={() => handleRemove(save.id)}>Remove</a>
            </p>
            <p className={styles.edite}>
              <img src={edit} alt="edit" style={{ width: "15px" }} />{" "}
              <a onClick={() => openEditDialog(save)}>Edit</a>
            </p>
          </div>
        </div>
      ))}

      <BoostrapDialog
        open={openDialog}
        handleClose={handleDialogClose}
        showCloseIcon={false}
        customWidth={"650px"}
        overflowY={"auto"}
      >
        <div className={styles.addUser}>
          <h3 className={styles.addUserHeader}>
            {dialogType === "add" ? "Add New image" : "Edit image"}
          </h3>
          <div className={styles.addUserForm}>
            <div className={styles.addUserInput}>
              <p className={styles.addUserheader}>
                {dialogType === "add"
                  ? "Enter the Name of the dear one & upload photos"
                  : "Enter the Name of the dear one & upload photos"}
              </p>
              <CustomTextField
                placeholder="Enter Short Name (10 letters max)"
                value={childName}
                onChange={handleNameChange}
                sx={{ width: isTablet ? "100%" : "378px" }}
                required
              />
            </div>
            <div className={styles.file_set}>
              {dialogType === "add" ? (
                <UploadThumbnail
                  label="Upload Photo"
                  onFileChange={(file) => {
                    handleThumbnailChange(file);
                  }}
                  id={`thumbnail`}
                  allowedTypes={["image/jpeg", "image/png"]}
                  maxSizeMB={5}
                  style={{ height: "146px" }}
                  // initialImage={character.thumbnail?.preview}
                  // closeBtnCheck={character.thumbnail?.preview}
                />
              ) : (
                editeData?.images?.map((img, index) => (
                  <UploadThumbnail
                    label="Upload Photo"
                    onFileChange={(file) => {
                      handleFileChange(index, file);
                    }}
                    id={`thumbnail_${index}_${img.id}`}
                    allowedTypes={["image/jpeg", "image/png"]}
                    maxSizeMB={5}
                    style={{ height: "140px", width: "100%" }}
                    initialImage={img.image}
                    closeBtnCheck={img.image}
                    key={img.id}
                    onRemove={() => handleRemoveImage(img.id)}
                  />
                ))
              )}
            </div>

            <div className={styles.btn_group2}>
              <button
                className={`${styles.cancel} ${styles.width_cont}`}
                onClick={handleDialogClose}
              >
                Cancel
              </button>
              <button
                className={`${styles.continueBtn} ${styles.width_cont}`}
                onClick={handleSubmit}
                disabled={!childName}
                // disabled={
                //   !childName.trim() ||
                //   (dialogType === "edit" &&
                //     existingImages.length === 0 &&
                //     files.every(file => !file))
                // }
              >
                {dialogType === "add" ? "Upload" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </BoostrapDialog>
    </div>
  );
};

export default MySaves;
