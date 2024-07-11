const Header = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <h1
            className="text-center text-white display-4 fontweight-bold mb-4"
            style={{ fontFamily: "Montserrat", fontSize: "3.3rem" }}>
            Welcome to PodVibe &#127897;
          </h1>
          <p
            className="text-center text-white fs-4"
            style={{ fontFamily: "Montserrat", marginBottom: "3rem" }}>
            Your Daily Dose of Positivity&#127911;
          </p>
          <img
            className="mx-auto d-block rounded-4"
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm50cTM3ZW8zMzlnYjZ4MWlnMmFo
d2RpbGxtNjd4eHpjMG96amJ1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o1YuwnczQIc
c3ZGlbq/giphy.gif"
            height={150}
            width={150}
            style={{ marginBottom: "2rem" }}
            alt="Your GIF"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
