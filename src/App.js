import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube"; // Import react-youtube component
import "./App.css";
import leftImage from "./assets/images/left-image.jpg";
import rightImage from "./assets/images/right-image.jpg";
import image1 from "./assets/images/image1.jpg"; // Example image 1
import image2 from "./assets/images/image2.jpg"; // Example image 2
import image3 from "./assets/images/image3.jpg"; // Example image 3

const App = () => {
  const [isOpen, setIsOpen] = useState(false); // to track whether the Open button is clicked
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(image1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const rightSectionRef = useRef(null);
  const playerRef = useRef(null); // Ref for YouTube player
  const audioRef = useRef(null); // Ref for audio element

  useEffect(() => {
    if (rightSectionRef.current) {
      const { offsetWidth, offsetHeight } = rightSectionRef.current;
      setContainerSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [isOpen]);

  // Change image every 3 seconds
  useEffect(() => {
    let interval;
    if (isOpen) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => {
          if (prevImage === image1) return image2;
          if (prevImage === image2) return image3;
          return image1;
        });
      }, 3000);
    } else {
      setCurrentImage(image1);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleOpenClick = () => {
    setIsOpen(true);

    // Play the music when "Open" is clicked
    if (audioRef.current) {
      audioRef.current.play().catch((error) => console.log("Error playing audio: ", error));
    }

    // Play the video when "Open" is clicked
    const tryPlayVideo = () => {
      if (playerRef.current) {
        playerRef.current.internalPlayer.playVideo()
          .catch(() => {
            console.log("Retrying playVideo...");
            setTimeout(tryPlayVideo, 500);
          });
      }
    };

    setTimeout(tryPlayVideo, 500); // Delay to ensure player is ready
  };

  const opts = {
    height: "0", // Hide the video player
    width: "0",
    playerVars: {
      autoplay: 1, // Enable autoplay
      controls: 0, // Hide controls
      modestbranding: 1, // Minimal branding
      rel: 0, // Disable related videos
      mute: 0, // Ensure audio is not muted
    },
  };

  return (
    <div className="app-container">
      <YouTube
        videoId="u03oQwQVR9E" // Replace with your video ID
        opts={opts}
        ref={playerRef} // Reference to control the player
      />

      {/* Audio element for background music */}
      <audio ref={audioRef} loop>
        <source src="path-to-your-music-file.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="left-section">
        <div className="announcement-text"><b>WEDDING ANNOUNCEMENT</b></div>
        <h1 className="title">TIFFANY & JARED</h1>
        <p className="quote">
          "Aku ingin mencintaimu dengan sederhana; dengan kata yang tak sempat
          diucapkan kayu kepada api yang menjadikannya abu. Aku ingin
          mencintaimu dengan sederhana; dengan isyarat yang tak sempat
          disampaikan awan kepada hujan yang menjadikannya tiada." <br />— Sapardi Djoko Damono
        </p>
      </div>

   {/* Right section with "Open" button */}
{!isOpen && (
  <div className="right-section" ref={rightSectionRef}>
    <div className="announcement-text">
      <b>WEDDING ANNOUNCEMENT</b>
    </div>
    <h1 className="title">TIFFANY & JARED</h1>
    <p className="hashtag">#TImetoshaRE</p>
    <button className="open-button" onClick={handleOpenClick}>
      Open
    </button>
  </div>
)}


      {/* After "Open" is clicked, show the slideshow and play the music */}
      {isOpen && !isWelcomeOpen && (
        <div className="music-container" style={{ width: containerSize.width, height: containerSize.height }}>
          <div className="slideshow" style={{ width: containerSize.width, height: containerSize.height }}>
            <img src={currentImage} alt="Slideshow" className="slideshow-image" />
            <div className="overlay-text">
              <div className="announcement-text">WEDDING ANNOUNCEMENT</div>
              <h1 className="title">TIFFANY & JARED</h1>
              <p className="hashtag">#TImetoshaRE</p>
            </div>
          </div>
          <div className="scroll-to-begin" onClick={() => setIsWelcomeOpen(true)}>
            Scroll to Begin
          </div>
        </div>
      )}

      {/* Welcome message */}
      {isWelcomeOpen && (
        <div className="welcome-message">
          <p className="welcome-text">
            <b> DEAR MR-MRS-MS,</b><br />
            Family & Friends<br />
            Welcome to<br />
            Tiffany & Jared’s Wedding Website<br />
            <br />
            <i>
            Together with joyful hearts and the grace of God, we joyfully announce the upcoming of our marriage.
            </i>
          </p>
          <div className="slideshow">
            <img src={currentImage} alt="Slideshow" className="slideshow-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
