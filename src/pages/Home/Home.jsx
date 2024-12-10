import { useEffect, useRef }  from "react";
import "./Home.css";
import useResize from "../../hooks/useResize";

const Home = ({setClasses}) => {
  const ref = useRef(null);
  const isShortContent = useResize(ref);
  let contentDivClass = isShortContent
    ? "outer-wrapper shortContent"
    : "outer-wrapper";
  useEffect(() => setClasses(contentDivClass));
  return (
    <main className="content-wrapper" ref={ref}>
      <div className="welcome-text">
        <h1>Welcome Candidates</h1>
        <h2>You're one joinIT away from your dream job!</h2>
        <p>
          So join our joinIT family and we will help you achieve that dream.
        </p>
        <p>
          Click on candidates button to check some of our recent clients and the
          list of jobs they obtained through our platform.
        </p>
      </div>

      <div className="business-image">
        <img
          src="https://thumbs.dreamstime.com/b/business-meeting-silhouette-sunset-37284204.jpg"
          alt=""
        />
      </div>
    </main>
  );
};

export default Home;
