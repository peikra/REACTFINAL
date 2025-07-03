import "./header.css";
import companyLogo from "../../assets/images/companyLogo.png";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { useBasket } from "../../context/basketLengthContext";
function header({ setShowBasket, setMobHeader, mobHeader }) {
  const { productList } = useBasket();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const showBasketContent = () => {
    setShowBasket(true);
  };
  const showMobileHeader = () => {
    setMobHeader(!mobHeader);
  };

  return (
    <div className="MainContainer">
      <div className="headerContainer">
        <div className="mainHeader">
          {" "}
          <Link to="/">
            {" "}
            <img src={companyLogo} alt="companyLogo"></img>
          </Link>
          <div className="routesContainer">
            <div className="PageToAbout">
              <Link to="/" className="link">
                ჩვენს შესახებ
              </Link>
            </div>
            <div className="pageToMenu">
              <Link to="/Menu" className="link">
                პროდუქცია
              </Link>
            </div>
            <div className="pageToMenu">
              <Link to="/privacy" className="link">
                კონტაქტი
              </Link>
            </div>
          </div>
          <div className="contactContainer">
            <div className="basketIcon">
              <button onClick={showBasketContent}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
              <button className="burgerMenuButton" onClick={showMobileHeader}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
              <div className="arrayLength">
                <span>
                  {productList?.items?.length ? productList?.items?.length : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`responsiveHeader ${mobHeader ? "show" : ""}`}>
          <div className="PageToAbout">
            <Link to="/" className="link">
              ჩვენს შესახებ
            </Link>
          </div>
          <div className="line"></div>
          <div className="pageToMenu">
            <Link to="/Menu" className="link">
              პროდუქცია
            </Link>
          </div>
          <div className="line"></div>
          <div className="pageToMenu">
            <Link to="/privacy" className="link">
              კონტაქტი
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default header;
