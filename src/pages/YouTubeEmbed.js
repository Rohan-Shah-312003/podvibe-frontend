import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/youtubeEmbed.css";
import "bootstrap/dist/css/bootstrap.min.css";

const YouTubeEmbed = () => {
  const location = useLocation();
  const { link } = location.state;

  const getYouTubeEmbedLink = (url) => {
    const urlObj = new URL(url);
    let videoId = urlObj.searchParams.get("v");

    if (!videoId) {
      const pathParts = urlObj.pathname.split("/");
      videoId = pathParts[pathParts.length - 1];
    }

    return videoId;
  };

  const embedLink = `https://www.youtube.com/embed/${getYouTubeEmbedLink(
    link
  )}`;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-10 bg-light">
      <div
        className="youtube-embed mx-3 my-5 p-3 shadow-lg rounded"
        style={{ maxWidth: "720px", width: "100%", background: "#fff" }}>
        <iframe
          src={embedLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "10px", width: "100%", height: "400px" }}
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
