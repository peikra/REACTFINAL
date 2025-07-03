import "./footer.css";
import shinka from "../../assets/images/shinka.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/insta.png";
function footer() {
  return (
    <div className="footerContainer">
      <div className="footerHead">
        <div className="footerHeadComponents">
          {" "}
          <div className="component1">
            <img src={shinka} alt="shinkaLogo" />
          </div>
          <div className="component">
            <Link to="/" className="page">
              ჩვენს შესახებ
            </Link>
            <Link to="/menu" className="page">
              პროდუქტები
            </Link>
          </div>
          <div className="component">
            <Link to="/privacy" className="page">
              {" "}
              საკონტაქტო ინფორმაცია
            </Link>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faPhone} className="phoneIcon" />
              <span
                onClick={() => (window.location.href = "tel:+995593342372")}
              >
                +995 593 34 23 72
              </span>
            </div>
          </div>
          <div className="component4">
            <Link to="/privacy" className="page">
              კონფიდენციალურობა
            </Link>
            <Link to="/terms" className="page">
              მომსახურების პირობები
            </Link>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <div className="footerBottomComponents">
          <div className="bottomComp">
            <span>© 2025, All Rights Reserved.</span>
          </div>
          <div className="bottomComp">
            {" "}
            <div className="socialMedia">
              <a
                href="https://www.facebook.com/profile.php?id=61559599414908&mibextid=wwXIfr&mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <img src={facebook} alt="facebookLogo" />{" "}
              </a>
            </div>
            <div className="socialMedia">
              <a
                href="https://www.instagram.com/bazari_shinka?igsh=MWplZ2pkNXEyYjRuNw%3D%3D&utm_source=qr "
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default footer;
