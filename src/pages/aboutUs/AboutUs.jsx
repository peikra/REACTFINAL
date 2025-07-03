import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import axios from "axios";
import "./AboutUs.css";
import Footer from "../../components/footer/Footer";
import Basket from "../../components/basket/Basket";
import { useBasket } from "../../context/basketLengthContext";
function AboutUs() {
  const [video, setVideo] = useState([]);
  const [mobHeader, setMobHeader] = useState(false);
  const [showBasket, setShowBasket] = useState(false);
  const { setProductList } = useBasket();
  useEffect(() => {
    const response = axios
      .get(`https://misho.pythonanywhere.com/api/store/videos/`)
      .then((response) => {
        setVideo(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {});
  }, []);
  const getMenuList = async () => {
    const sessionId = sessionStorage.getItem("session_id");
    try {
      const response = await fetch(
        `https://misho.pythonanywhere.com/api/order/cart/`,
        {
          method: "GET",
          headers: {
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("cart_data", JSON.stringify(data));

      setProductList(data);
    } catch (error) {}
  };

  return (
    <>
      <Header
        setMobHeader={setMobHeader}
        setShowBasket={setShowBasket}
        mobHeader={mobHeader}
      />
      <Basket
        setShowBasket={setShowBasket}
        showBasket={showBasket}
        getMenuList={getMenuList}
      />
      <div className="aboutUsContainer">
        {" "}
        <div className="videoPlayer">
          {video.map((videoSource, index) => (
            <video
              key={index}
              controls
              className="aboutUsVideo"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={videoSource.video_file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
