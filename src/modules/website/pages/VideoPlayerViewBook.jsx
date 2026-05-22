import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const VideoPlayerViewBook = ({ videoSrc, setVideoPopup }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // const videoSrc = location?.state?.src;
    const videoRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 🔥 Sync play/pause state properly
    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;

        if (v.paused) {
            v.play();
            setIsPlaying(true);
        } else {
            v.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation(); // Prevent play/pause when clicking mute
        if (videoRef.current) {
            const newMutedState = !videoRef.current.muted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
        }
    };

    if (!videoSrc) return null;

    return (
        <div className={`vpb-root ${isLandscape ? "vpb-land" : "vpb-port"} container-fluid p-0`}>

            {/* VIDEO - Added onPlay/onPause for better state sync */}
            <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                playsInline
                muted={isMuted}
                className="vpb-video"
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            {/* CENTER PLAY */}
            {!isPlaying && (
                <div className="vpb-center-btn" onClick={togglePlay}>
                    <span style={{ marginLeft: '5px' }}>▶</span>
                </div>
            )}

            <div className="vpb-screen-btn" onClick={() => setVideoPopup(null)}>
                <FullscreenIcon />
            </div>

            {/* MUTE BUTTON */}
            <div className="vpb-mute-btn" onClick={toggleMute}>
                {isMuted ? "🔇" : "🔊"}
            </div>

        </div>
    );
};

export default VideoPlayerViewBook;