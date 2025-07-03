import "./thanks.css";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
function Thanks() {
  return (
    <>
      <div className="messageContainer">
        <h4>
          მადლობა შეკვეთისთვის, ჩვენ უკვე დავიწყეთ შეკვეთის გამზადება, მალე
          დაგიკავშირდებით ...
        </h4>
        <Link to="/" className="LinkTo">
          მთავარი გვერდი
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Thanks;
