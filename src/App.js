import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home";
import Auth from "./pages/auth";
import CreatePodcasts from "./pages/createPodcast";
import EditPodcasts from "./pages/editPodcast";
import SavedPodcasts from "./pages/savedPodcasts";
import Navbar from "./components/navbar";
import YouTubeEmbed from "./pages/YouTubeEmbed";
import MyPodcasts from "./pages/myPodcasts";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [navbarClass, setNavbarClass] = useState("col-3");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setNavbarClass("col");
      } else {
        setNavbarClass("col-3 m-0 p-0");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container m-0 p-0">
          <div className="row">
            <div className={`${navbarClass} height-100-vh`}>
              <Navbar />
            </div>
            <div className="col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/createpodcasts" element={<CreatePodcasts />} />
                <Route path="/editpodcasts" element={<EditPodcasts />} />
                <Route path="/savedpodcasts" element={<SavedPodcasts />} />
                <Route path="/youtube" element={<YouTubeEmbed />} />
                <Route path="/mypodcasts" element={<MyPodcasts />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
