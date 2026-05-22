import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

// images
import proper_photo from "../../website/assets/image/proper-photo.png";
import { Footer } from "../components/footer/footer";

export default function EditStory() {
  return (
    <>
      <section className="edit-story-section">
        <div className="container">
          {/* Breadcrumb */}
          <p className="breadcrumb-section">
            <a href=""> Library</a> &gt; <a href=""> Adventure</a> &gt;{" "}
            <a href="">
              <span>Personalize This Story</span>
            </a>
          </p>

          {/* Title */}
          <h2 className="title">The Hidden Island</h2>

          {/* Subtitle */}

          <h3 className="subtitle">
            Choose Characters, Enter Characters Name & Upload Photos
          </h3>
          <p className="description">
            Ready to meet your characters? You get to choose who joins your
            adventure – pick one, a few, or the whole crew, all for free! For any
            spot you leave open, our AI will conjure up some fantastic names and
            images.
          </p>

          {/* Hero Options */}
          <section className="heroOptions">
            {/* Hero Boy */}
            <label className="hero-label">Choose the hero of your story</label>
            <label className="heroCard">
              <input type="radio" name="hero" value="Alexandrio" />
              <span className="heroLabel">Alexandrio (Hero Boy)</span>

              <div className="up-fl">
                {/* Short Name Input */}

                <div className="heroForm">
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="Enter Short Name (10 letters max)"
                    className="inputBox"
                  />

                  {/* Upload Type */}
                  <div className="up-ty-section">
                    <label className="up-ty">Upload Type</label>
                    <div className="uploadType">
                      <label>
                        <input type="radio" name="uploadType" value="saved" />
                        Saved Photos
                      </label>
                      <label>
                        <input type="radio" name="uploadType" value="new" />
                        Upload New Photos
                      </label>
                    </div>
                  </div>
                </div>
                {/* Upload Photo Box */}
                <div className="up-flex">
                  <div className="uploadBox">
                    <FaCamera size={28} />
                  </div>
                  <div className="tooltip">
                    <button type="button" className="tipsBtn">
                      ℹ️ Photo Uploading Tips
                    </button>
                    <div className="tips-content">
                      <h2>Tips for the Perfect Photo!</h2>
                      <p>
                        To ensure the character appears clearly in the
                        personalised book, follow these photo guidelines:
                      </p>
                      <ul>
                        <li>- 1 clear headshot of the person</li>
                        <li>- Solo photo only — no one else in the frame</li>
                        <li>- The face should be looking straight and smiling</li>
                        <li>- Use a plain white or light background</li>
                      </ul>
                      <h3>Make sure the photo:</h3>
                      <ul>
                        <li>- Is bright, clear, and natural</li>
                        <li>- Is front-facing, with shoulders straight</li>
                        <li>- Does not include sunglasses, caps, or filters</li>
                        <li>- Is not blurry, overexposed, or pixelated</li>
                        <li>- Is in JPG or PNG format, under 5MB</li>
                        <li>- Has a resolution of at least 1000 x 1000 px</li>
                      </ul>
                      <div className="tip-outline">
                        <p>
                          Strict data privacy is our commitment. Your information
                          is handled with the utmost care and in accordance with
                          robust standards.
                        </p>
                      </div>
                      <div className="need-help">
                        <h3>Need Help?</h3>
                        <p>See our sample photo below for an ideal example!</p>
                        <div className="need-help-img">
                          <img src={proper_photo} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </label>

            <hr className="divider" />

            {/* Hero Girl */}
            <label className="heroCard">
              <input type="radio" name="hero" value="Shopie" />
              <span className="heroLabel">Shopie (Hero Girl)</span>
            </label>

            <hr className="divider" />
          </section>

          {/* Consent Checkbox */}
          <section className="checkboxGroup">
            <label>
              <input type="checkbox" className="check-box" />I consent to the
              secure use of my photos exclusively for my personalized storybook.
              They’ll be safely stored under my profile, where I can edit them any
              time, and will only be used for my orders that I might place in the
              future. I understand I can withdraw this consent anytime by writing
              to support@kadhaster.com
            </label>
          </section>

          {/* Buttons starts*/}
          <div className="view_book_buttons jc">
            <button className="cartBtn">Continue</button>
          </div>
          {/* Buttons ends*/}
        </div>
      </section>
      <Footer />
    </>
  );
}
