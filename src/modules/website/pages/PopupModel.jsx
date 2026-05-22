import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import upload_photo_ic from "../../website/assets/image/upload-photo-ic.png";
import boy_img from "../../website/assets/image/boy-image.png";


export default function PopupModel() {
    const [showOpen, setShowOpen] = useState(false);
    const [tryNowUploadOpen, tryNowUploadPopup] = useState(false);

    const handlePopup = () => {
        setShowOpen(false);
    };
    const tryNowUploadPhoto = () => {
        tryNowUploadPopup(false);
    };

    return (
        <>
            <div className={"d-flex justify-content-center gap-3 mt-3"}>
                <button className="btn btn-primary" onClick={() => setShowOpen(true)}>
                    Open Popup
                </button>

                <button className="btn btn-primary" onClick={() => tryNowUploadPopup(true)}
                >
                    Try now upload photo
                </button>
            </div>

            <Modal show={showOpen} backdrop="static" // When backdrop is set to static, modal will not close when clicking
                outside it keyboard={false} onHide={() => handlePopup()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <div className="p-5 popup_design">
                    <div>
                        <div className="mb-3">
                            <h3 className="text-center mb-2">Show Popup</h3>
                        </div>
                    </div>

                    <div className={"d-flex justify-content-center gap-3 mt-3"}>
                        <button className={"cancel_btn"} onClick={() => handlePopup()}>
                            Cancel
                        </button>

                        <button className={"sumt_btn"} onClick={handlePopup}>
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal show={tryNowUploadOpen} backdrop="static" // When backdrop is set to static, modal will not close when
                clicking outside it keyboard={false} onHide={() => tryNowUploadPhoto()}
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
                                <img className="" src={upload_photo_ic} alt="" />

                                {/* children image after uploaded */}
                                <img className="subject-image d-none " src={boy_img} alt="" />

                            </div>
                            <div className="checkboxGroup">
                                <div className="df">
                                    <label class="custom-checkbox">
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label>I consent to
                                        the secure use of my photos exclusively for my personalized
                                        storybook. They’ll be safely stored under my profile, where I
                                        can edit them any time, and will only be used for my orders
                                        that I might place in the future. I understand I can withdraw
                                        this consent anytime by writing to support@kadhaster.com
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={"d-flex justify-content-center gap-3 mt-3"}>
                        <button className={"cancel_btn"} onClick={() => tryNowUploadPhoto()}
                        >
                            Cancel
                        </button>

                        <button className={"sumt_btn"} onClick={tryNowUploadPhoto}>
                            <i class="fa-solid fa-wand-magic-sparkles"></i> Generate
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}