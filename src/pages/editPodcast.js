import React, { useState } from "react";
import Axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "../styles/edit.css"

export default function CreatePodcasts() {
  const navigator = useNavigate();
  const location = useLocation();
  const userID = useGetUserID();
  const editPodcast = location.state;
  // eslint-disable-next-line
  const [cookies, setCookies] = useCookies(["flag"]);
  const [podcast, setPodcast] = useState(editPodcast?.podcast || {
    title: "",
    genre: "",
    description: "",
    link: "",
    rating: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPodcast((prevPodcast) => ({
      ...prevPodcast,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await Axios.put(
        `https://podvibe-backend-e5rm.onrender.com/podcasts/${editPodcast.podcast._id}`,
        podcast
      );
      alert("Podcast updated successfully");
      navigator("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-podcast container p-5 d-flex flex-column align-items-center">
      <h1 className="text-center" style={{ color: "ivory", fontSize: "4.2rem" }}>
        Edit Podcast
      </h1>

      {!cookies.flag ? (
        <p className="bg-warning red" style={{ color: "red", fontSize: "1.2rem" }}>
          <Link className="nav-link" style={{ color: "red", fontSize: "1.2rem" }} to="/auth">
            Login/Register to access this feature
          </Link>
        </p>
      ) : (
        <form className="bg-light d-flex flex-column w-75 mt-4" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={podcast.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              name="genre"
              value={podcast.genre}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={podcast.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              value={podcast.link}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="text"
              className="form-control"
              id="rating"
              name="rating"
              value={podcast.rating}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            {editPodcast ? "Save Changes" : "Upload"}
          </button>
        </form>
      )}
    </div>
  );
}
