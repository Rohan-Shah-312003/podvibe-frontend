import React, { useState } from "react";
import Axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "../styles/CreatePodcasts.css"

export default function CreatePodcasts() {
  const userID = useGetUserID();
  const navigator = useNavigate();
  const [cookies, setCookies] = useCookies(["flag"]);
  const [podcast, setPodcast] = useState({
    title: "",
    genre: "",
    description: "",
    link: "",
    rating: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPodcast({
      ...podcast,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await Axios.post(
        "https://podvibe-backend-e5rm.onrender.com/podcasts/",
        podcast
      );
      alert("Podcast uploaded successfully");
      navigator("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-podcast container py-5">
      <h1 className="text-center text-light mb-5" style={{ fontSize: "4.2rem" }}>
        Create Podcasts
      </h1>

      {!cookies.flag ? (
        <div className="alert alert-warning text-center">
          <p className="mb-0">
            <Link className="text-danger" to="/auth">
              Login/Register to access this feature
            </Link>
          </p>
        </div>
      ) : (
        <form className="bg-light p-4 rounded shadow-sm" onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label text-dark fw-bold">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={podcast.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="genre" className="form-label text-dark fw-bold">
              Genre
            </label>
            <input
              type="text"
              className="form-control"
              id="genre"
              name="genre"
              value={podcast.genre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label text-dark fw-bold">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={podcast.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="link" className="form-label text-dark fw-bold">
              Link
            </label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              value={podcast.link}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label text-dark fw-bold">
              Rating
            </label>
            <input
              type="number"
              className="form-control"
              id="rating"
              name="rating"
              value={podcast.rating}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Upload Podcast
          </button>
        </form>
      )}
    </div>
  );
}
