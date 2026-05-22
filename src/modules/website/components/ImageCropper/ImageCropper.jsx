import { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css"; // If Comment Cropper UI styling (handles, borders, overlay) will break and appear unstyled or distorted
import { Modal, Button, Form, Alert, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function ImageCropper({ openCropperPopup = false, setOpenCropperPopup = (() => { }), onFileChange = (() => { }) }) {
    const [image, setImage] = useState(null);
    const [fullImage, setFullImage] = useState(null);
    const cropperRef = useRef(null);
    const imageUploadRef = useRef(null);
    const [croppedFile, setCroppedFile] = useState(null)
    const [uploadType, setUploadType] = useState('select')
    const streamRef = useRef(null);

    useEffect(() => {
        if (openCropperPopup == false) {
            cropperRef.current = null
            setImage(null)
            setFullImage(null)
            setCroppedFile(null)
        }
    }, [openCropperPopup])

    const onFileHandler = (e) => {
        const file = e.target.files[0];
        setFullImage(file)
        setImage(URL.createObjectURL(file));
    };

    const cropImage = async () => {

        const cropper = cropperRef.current?.cropper

        const canvas = cropper.getCroppedCanvas({
            maxWidth: 1200,
            maxHeight: 1200
        })

        let quality = 0.9

        const getBlob = () =>
            new Promise((resolve) => {
                canvas.toBlob(resolve, "image/jpeg", quality)
            })

        let blob = await getBlob()

        while (blob.size > 5 * 1024 * 1024 && quality > 0.1) {
            quality -= 0.1
            blob = await new Promise((resolve) =>
                canvas.toBlob(resolve, "image/jpeg", quality)
            )
        }

        const file = new File([blob], fullImage?.name ? fullImage?.name : `img-${Math.random()}.jpg`, {
            type: "image/jpeg"
        })
        setCroppedFile(file)
    }


    // FOR CAMERA START

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [hasCamera, setHasCamera] = useState(true);
    const [camStart, setCamStart] = useState(false);

    const errorToase = (msg) => {
        toast.error(msg)
    }


    // ✅ Check camera + open
    const startCamera = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameraExists = devices.some(d => d.kind === "videoinput");

            if (!cameraExists) {
                setHasCamera(false);
                errorToase("Camera not available ❌");
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            streamRef.current = stream; // 🔥 store here
            videoRef.current.srcObject = stream;
            setCamStart(true)
        } catch (err) {
            if (err.name === "NotAllowedError") {
                errorToase("Permission denied ❌");
            } else {
                errorToase("Camera error ⚠️");
            }
        }
    };

    const stopCam = () => {
        const stream = streamRef.current;

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setCamStart(false)
    };

    // ✅ Take photo
    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        ctx.drawImage(video, 0, 0);

        const img = canvas.toDataURL("image/png");
        setPhoto(img);

        // 🔥 STOP CAMERA
        stopCam()
    };


    useEffect(() => {
        return () => stopCam();
    }, []);

    // FOR CAMERA END


    const handleClosePopup = () => {
        setOpenCropperPopup(false)
        stopCam()
        setUploadType('select')
    }


    const chooseHandler = () => {
        setUploadType('select');
        stopCam()
        setPhoto(null)
        imageUploadRef.current?.click();
    }

    const useCamHandler = () => {
        setImage(null)
        setFullImage(null)
        setCroppedFile(null)
        setUploadType('camera');
        startCamera();
    }

    const retakeHandler = () => {
        setPhoto(null)
        setCroppedFile(null)
        startCamera();
    }

    const continueHandler = () => {
        setImage(photo)
        setPhoto(null)
        setUploadType('select')
    }



    return (
        <Modal show={openCropperPopup}
            backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
            keyboard={false}
            onHide={() => setOpenCropperPopup(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
        >
            <div className="p-5 popup_design">
                <div className="mb-4">
                    <h3 className="text-center title-24px-wh">Select</h3>
                </div>
                <div>
                    <div className="d-flex ac-jc gap-5 mb-3">
                        <button
                            onClick={() => chooseHandler()}
                            className={'upload_btn'}
                        >
                            Choose File
                        </button>
                        <button
                            onClick={() => useCamHandler()}
                            className={'camera_btn'}
                            disabled={camStart == false && photo == null ? false : true}
                        >
                            <CameraAltIcon />   Use Camera
                        </button>
                    </div>
                    <div className="d-flex flex-column ac-jc mb-3">
                        <span>Upload or take a photo</span>
                        <span>Then crop and adjust it to perfection.</span>
                    </div>
                    <input type="file" onChange={onFileHandler} className="d-none" accept="image/jpeg, image/png, image/webp" ref={imageUploadRef} />
                    {uploadType == 'camera' && <div style={{ textAlign: "center" }}>
                        <h3>Camera</h3>
                        {/* 🎥 Video */}
                        {hasCamera && !photo && (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                        aspectRatio: "4/3",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                        transform: "scaleX(-1)" // 🔥 reverse mirror
                                    }}
                                />
                            </div>
                        )}

                        <br />

                        {/* 📸 Capture */}
                        {hasCamera && !photo && (
                            <button className="camera_btn" onClick={() => takePhoto()}>Take Photo</button>
                        )}

                        {/* 🖼 Preview */}
                        {photo && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <img
                                    src={photo}
                                    alt="preview"
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                        borderRadius: "10px",
                                        marginTop: "10px"
                                    }}
                                />

                                <br />

                                <div className="d-flex gap-2 ac-jc flex-wrap">
                                    <button className="camera_btn" onClick={() => retakeHandler()}>
                                        Retake
                                    </button>
                                    <button className="camera_btn" onClick={() => continueHandler()}>
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 📁 Upload fallback */}
                        {!hasCamera && (
                            <div>
                                <p>Upload Image instead:</p>
                            </div>
                        )}

                        <canvas ref={canvasRef} style={{ display: "none" }} />
                    </div>}

                    {image && (
                        <Cropper
                            src={image}
                            style={{ height: 400, width: "100%" }}
                            initialAspectRatio={1}
                            guides={true}
                            viewMode={1}
                            dragMode="move"
                            scalable={true}
                            cropBoxResizable={true}
                            cropBoxMovable={true}
                            ref={cropperRef}
                        />
                    )}

                    <div>
                        {image && <button
                            className={'sumt_btn'}
                            onClick={() => {
                                cropImage()
                            }}
                        >
                            Crop Image
                        </button>}
                    </div>
                    {croppedFile && (
                        <div className="box mt-3 d-flex justify-content-center">
                            <div className="w-100 text-center">
                                <img
                                    className="img-fluid rounded"
                                    style={{ maxWidth: "300px", height: "auto" }}
                                    src={croppedFile?.name ? URL.createObjectURL(croppedFile) : croppedFile}
                                    alt="cropped"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className={"d-flex justify-content-center gap-3 mt-2"}>
                    <button
                        className={'cancel_btn'}
                        onClick={() => { handleClosePopup() }}
                    >
                        Cancel
                    </button>
                    <button
                        className={'sumt_btn'}
                        onClick={() => {
                            if (image && croppedFile) {
                                onFileChange(croppedFile)
                            } else {
                                toast.error('Please Choose or take a photo and Crop Image')
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>


        </Modal>
    );
}