import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import About from "../components/about";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/card.css";
import AOS from "aos";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [savedPodcasts, setSavedPodcasts] = useState([]);
  // eslint-disable-next-line
  const [cookies, setCookies] = useCookies(["flag"]);
  const userID = useGetUserID();
  const navigate = useNavigate();

  // Define truncateDescription function
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await Axios.get(
          "https://podvibe-backend-e5rm.onrender.com/podcasts"
        );
        setPodcasts(response.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    const fetchSavedPodcasts = async () => {
      try {
        const response = await Axios.get(
          `https://podvibe-backend-e5rm.onrender.com/podcasts/savedpodcasts/ids/${userID}`
        );
        if (response.data && response.data.savedPodcasts) {
          setSavedPodcasts(response.data.savedPodcasts);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching saved podcasts:", error);
      }
    };

    fetchPodcasts();
    fetchSavedPodcasts();
  }, [userID]);

  const savePodcast = async (podcastID) => {
    try {
      const response = await Axios.put(
        "https://podvibe-backend-e5rm.onrender.com/podcasts",
        { podcastID, userID }
      );
      if (response.data && response.data.savedPodcasts) {
        setSavedPodcasts(response.data.savedPodcasts);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error saving podcast:", error);
    }
  };

  const isPodcastSaved = (podcastID) => {
    return savedPodcasts.includes(podcastID);
  };

  const handleViewVideo = (link) => {
    navigate("/youtube", { state: { link } });
  };

  const toggleDescription = (podcastID) => {
    const updatedPodcasts = podcasts.map((podcast) => {
      if (podcast._id === podcastID) {
        return {
          ...podcast,
          showFullDescription: !podcast.showFullDescription,
        };
      }
      return podcast;
    });
    setPodcasts(updatedPodcasts);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Header />
      <About />
      <div className="container">
        <h1
          className="text-center my-4"
          style={{ color: "white", fontSize: "4.2rem" }}
          data-aos="fade-up">
          Podcasts Currently Available:
        </h1>
        <div className="row">
          {podcasts.map((podcast) => (
            <div key={podcast._id} className="col-lg-4 col-md-6 mb-4">
              <div className="card custom-card h-100" data-aos="fade-up">
                <div className="card-body">
                  <h5 className="card-title">{podcast.title}</h5>
                  <p className="card-text">
                    <span className="card-label">Genre:</span> {podcast.genre}
                  </p>
                  <p className="card-text">
                    <span className="card-label">Description:</span>{" "}
                    {podcast.showFullDescription
                      ? podcast.description
                      : truncateDescription(podcast.description, 150)}{" "}
                    {podcast.description.length > 150 && (
                      <Link
                        to="#"
                        className="read-more-link"
                        onClick={() => toggleDescription(podcast._id)}>
                        {podcast.showFullDescription
                          ? "Read less"
                          : "Read more"}
                      </Link>
                    )}
                  </p>
                  <p className="card-text">
                    <span className="card-label">Rating:</span> {podcast.rating}
                  </p>
                  {!cookies.flag ? (
                    <p className="bg-warning red">
                      <Link className="nav-link" to="/auth">
                        Login/Register to access save feature
                      </Link>
                    </p>
                  ) : (
                    <button
                      className="btn btn-outline-secondary m-2"
                      onClick={() => savePodcast(podcast._id)}
                      disabled={isPodcastSaved(podcast._id)}>
                      {isPodcastSaved(podcast._id) ? "Saved" : "Save Podcast"}
                    </button>
                  )}
                  <div className="btn-container">
                    <button
                      className="btn btn-outline-primary m-2"
                      onClick={() => handleViewVideo(podcast.link)}>
                      View Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
