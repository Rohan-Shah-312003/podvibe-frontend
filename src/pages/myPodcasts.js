import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/card.css";
import "../styles/CreatePodcasts.css";

export default function MyPodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [myPodcasts, setMyPodcasts] = useState([]);
  const [cookies, setCookies] = useCookies(["flag"]);
  const userID = useGetUserID();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploadedPodcast = async () => {
      try {
        const response = await Axios.get(
          "https://podvibe-backend-e5rm.onrender.com/podcasts"
        );
        setPodcasts(response.data);

        setMyPodcasts(
          response.data.filter((podcast) => podcast.userOwner === userID)
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchUploadedPodcast();
  }, [userID]);

  const removePodcast = async (podcastID) => {
    try {
      const response = await Axios.delete(
        `https://podvibe-backend-e5rm.onrender.com/podcasts/delete-podcasts/${podcastID}/${userID}`
      );

      if (response.status === 200) {
        setPodcasts(podcasts.filter((podcast) => podcast._id !== podcastID));
      } else {
        console.error(
          "Failed to remove podcast:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewVideo = (link) => {
    navigate("/youtube", { state: { link } });
  };

  const editPodcast = (podcastID) => {
    try {
      const podcast = myPodcasts.find((podcast) => podcast._id === podcastID);
      navigate("/editpodcasts", { state: { podcast } });
    } catch (error) {
      console.error(error);
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const toggleDescription = (podcastID) => {
    const updatedPodcasts = myPodcasts.map((podcast) => {
      if (podcast._id === podcastID) {
        return {
          ...podcast,
          showFullDescription: !podcast.showFullDescription,
        };
      }
      return podcast;
    });
    setMyPodcasts(updatedPodcasts);
  };

  return (
    <div className="container py-5">
      <h1
        className="text-center my-4"
        style={{ color: "white", fontSize: "4.2rem" }}>
        My Podcasts
      </h1>

      <div className="row">
        {!cookies.flag ? (
          <div className="alert alert-warning text-center">
          <p className="mb-0">
            <Link className="text-danger" to="/auth">
              Login/Register to access this feature
            </Link>
          </p>
        </div>
        ) : null}

        {myPodcasts.length === 0 ? (
          <div className="col-12">
            <p
              className="text-center"
              style={{ color: "white", fontSize: "2rem" }}>
              No uploaded Podcasts
            </p>
          </div>
        ) : (
          myPodcasts.map((podcast) => (
            <div key={podcast._id} className="col-lg-4 col-md-6 mb-4">
              <div className="card custom-card h-100">
                <div className="card-body">
                  <h5 className="card-title">{podcast.title}</h5>
                  <p className="card-text">
                    <label className="card-label">Genre:</label> {podcast.genre}
                  </p>
                  <p className="card-text">
                    <label className="card-label">Description:</label>{" "}
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
                    <label className="card-label">Rating:</label>{" "}
                    {podcast.rating}
                  </p>
                  <div className="btn-container">
                    <button
                      className="btn btn-outline-primary p-2 m-2"
                      onClick={() => handleViewVideo(podcast.link)}>
                      View Podcast
                    </button>

                    <button
                      className="btn btn-outline-secondary p-2 m-2"
                      onClick={() => editPodcast(podcast._id)}>
                      Edit Podcast
                    </button>

                    <button
                      className="btn btn-outline-danger p-2 m-2"
                      onClick={() => removePodcast(podcast._id)}>
                      Delete Podcast
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
