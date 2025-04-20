import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import './Watch.css';

function formatTime(time) {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

const Watch = () => {
  const { movieTitle } = useParams();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Placeholder video URL; replace with your actual video source if needed.
  const videoUrl = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Rewind 10 seconds
  const handleRewind = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
  };

  // Forward 10 seconds
  const handleForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 10,
      videoRef.current.duration
    );
  };

  // Update progress state as video plays
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setProgress((current / dur) * 100);
  };

  // Set duration once video metadata is loaded
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  // Seek video when clicking on progress bar
  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / progressBar.offsetWidth) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  // Change volume via slider
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Toggle fullscreen mode using the Fullscreen API
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Auto-hide controls after 3 seconds of inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlTimeoutRef.current) {
      clearTimeout(controlTimeoutRef.current);
    }
    controlTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlTimeoutRef.current) {
        clearTimeout(controlTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="watch-page" ref={containerRef} onMouseMove={handleMouseMove}>
      <Header onSearchTermChange={() => {}} />
      <h2 className="movie-title">{decodeURIComponent(movieTitle)}</h2>
      <div className="video-container">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src={videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="video-player"
            controls={false}  // Hide default controls
            onClick={togglePlay}
          />
          {showControls && (
            <div className="custom-controls">
              <div className="controls-left">
                <button onClick={togglePlay} className="control-button play-button">
                  {isPlaying ? '❚❚' : '►'}
                </button>
                <button onClick={handleRewind} className="control-button rewind-button">
                  &#x23EA; 10s
                </button>
                <button onClick={handleForward} className="control-button forward-button">
                  10s &#x23E9;
                </button>
                <div className="progress-container" onClick={handleProgressClick}>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="time-display">
                    {formatTime(videoRef.current ? videoRef.current.currentTime : 0)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
              <div className="controls-right">
                <button onClick={toggleMute} className="control-button volume-button">
                  {isMuted || volume === 0 ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
                <button onClick={toggleFullscreen} className="control-button fullscreen-button">
                  {isFullscreen ? '🡼' : '🡾'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watch;
