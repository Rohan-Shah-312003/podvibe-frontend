import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "../styles/about.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container about-container">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <h2 className="text-center display-5 font-weight-bold mb-4" data-aos="fade-up">
            What is PodVibe?
          </h2>
          <p className="text-center mb-4 fs-3" data-aos="fade-up">
            Podvibe is a Free Podcast streaming platform where you can find podcasts of your choice. Our main motto is to provide seamless podcasts of every genre. By signing up, our users can:
          </p>
          <ul className="mb-4 fs-4 list-unstyled" data-aos="fade-up">
            <li data-aos="fade-up">Listen to podcasts of different genres.</li>
            <li data-aos="fade-up">Add your podcasts to favorites.</li>
            <li data-aos="fade-up">Listen to your favorite podcasts.</li>
            <li data-aos="fade-up">Delete any podcast from favorites.</li>
            <li data-aos="fade-up">And many more...</li>
          </ul>
          <div data-aos="fade-up">
            <p className="mb-2 fs-4" data-aos="fade-up">
              We're on a mission to make podcasting accessible, enjoyable, and enriching for everyone. Join us on this journey and let's explore the fascinating world of audio storytelling together!!&#129309;
            </p>
            <p className="mb-4 fs-4">
              Empowering conversations are waiting for you. Unleash your inner trailblazer and ignite your soul & passion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
