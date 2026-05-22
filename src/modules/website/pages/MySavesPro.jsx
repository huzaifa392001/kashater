import React, { useEffect, useState } from "react";
import saves_photo from "../../website/assets/image/saves-photo.png";
import pro_address_del from "../../website/assets/image/profile-address-del-ic.png";
import pro_address_edit from "../../website/assets/image/profile-address-edit-ic.png";
import Swal from "sweetalert2";
import useApiHttp from "../../web/hooks/ues-http";
import useIsMobile from "../../web/hooks/useIsMobile";
import { Modal } from "react-bootstrap";
// import styles from "./MySaves.module.css";
import styles from "../../web/features/ProfilePage/MySaves.module.css";
import CustomTextField from "../../web/components/UI/TextFiled/TextFiled.jsx";
import UploadThumbnail from "../../web/components/UI/UploadThumbnail/UploadThumbnail.jsx";
import CustomTextFieldLogin from "../../web/components/UI/TextFiled/TextFiledLogin.jsx";
import toast from "react-hot-toast";
import ImageCropper from "../components/ImageCropper/ImageCropper.jsx";

const MySavesPro = () => {
    const isTablet = useIsMobile(768);
    const isMobile = useIsMobile(500);
    const [saves, setSaves] = useState([]);
    const [childName, setChildName] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [currentSaveId, setCurrentSaveId] = useState(null);
    const [dialogType, setDialogType] = useState("add"); // 'add' or 'edit'
    const [images, setImages] = useState([]);
    const [singleFile, setSingleFile] = useState(null);
    const [openCropperPopup, setOpenCropperPopup] = useState(false)
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
        setSingleFile({ file: file });
        setOpenCropperPopup(false)
    };
    const handleFileChange = (index, file) => {
        setFiles((prev) => {
            const newFiles = [...prev];
            newFiles[index] = file;
            return newFiles;
        });
    };

    return (
        <div className="rewards-info-cont">
            <div className="df j-sb mt-4">
                <h3>My Saves</h3>
                <span className="add-new-photo" role="button" onClick={openAddDialog}>
                    + Add New Image
                </span>
            </div>
            {saves.map((save, ind) => {
                return (<>
                    <div className="saves-photos my-4" key={ind}>
                        <h4>{save?.name}</h4>
                        <div className="saves-img-sec my-4">
                            {save?.images?.map((img, index) => {
                                return (<div className="saves-img">
                                    <img className="" src={img} alt={`Save ${index}`} key={index} />
                                </div>)
                            })}
                        </div>
                        <div className="pro-address-action df">
                            <div className="pro-address-info pe-2" role="button">
                                <img className="" src={pro_address_del} alt="" />
                                <span onClick={() => handleRemove(save.id)}>Delete</span>
                            </div>
                            <div className="pro-address-info" role="button">
                                <img className="" src={pro_address_edit} alt="" />
                                <span onClick={() => openEditDialog(save)}>Edit</span>
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                </>
                )
            })}



            <Modal show={openDialog}
                backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
                keyboard={false}
                onHide={() => handleDialogClose()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <div className="p-3 popup_design">
                    <div>
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
                                    <CustomTextFieldLogin
                                        placeholder="Enter Short Name (10 letters max)"
                                        value={childName}
                                        onChange={handleNameChange}
                                        sx={{ width: isTablet ? "100%" : "378px" }}
                                        required
                                    />
                                </div>
                                <ImageCropper openCropperPopup={openCropperPopup} setOpenCropperPopup={setOpenCropperPopup}
                                    onFileChange={file => {
                                        handleThumbnailChange(file)
                                    }} />
                                <div className={styles.file_set}>
                                    {dialogType === "add" ? (
                                        <span
                                            onClick={() => {
                                                setOpenCropperPopup(true)
                                            }}
                                        >
                                            <UploadThumbnail
                                                label="Upload Photo"
                                                // onFileChange={(file) => {
                                                //     handleThumbnailChange(file);
                                                // }}
                                                id={`thumbnail`}
                                                allowedTypes={["image/jpeg", "image/png"]}
                                                maxSizeMB={5}
                                                style={{ height: "146px" }}
                                                closeBtnCheck={null}
                                                initialImage={singleFile?.file?.name ? URL.createObjectURL(singleFile?.file) : null}
                                            // closeBtnCheck={character.thumbnail?.preview}
                                            />
                                        </span>
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

                                <div className={"d-flex justify-content-center gap-3 mt-3 mb-3"}>
                                    <button
                                        className={'cancel_btn'}
                                        onClick={handleDialogClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={'sumt_btn'} onClick={handleSubmit}
                                        disabled={!childName}
                                    >
                                        {dialogType === "add" ? "Upload" : "Update"}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MySavesPro