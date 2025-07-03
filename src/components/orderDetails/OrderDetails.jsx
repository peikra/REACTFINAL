import "./orderDetails.css";
import { useBasket } from "../../context/basketLengthContext";
import { useNavigate } from "react-router-dom";
import deliver from "../../assets/images/deliver.png";
import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
function OrderDetails({ totalPrice, deliverPrice, formRef, productQuantity }) {
  const { productList, setProductList } = useBasket();
  const total = Number(totalPrice) + Number(deliverPrice.price);
  const sum = total.toFixed(2);
  const navigate = useNavigate();
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
        console.error("Failed to fetch menu list");
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("cart_data", JSON.stringify(data));

      setProductList(data);
    } catch (error) {}
  };

  const updateMenu = async () => {
    const sessionId = sessionStorage.getItem("session_id");
    const updateOrderData = productList?.items.map((item) => {
      return {
        product: item.product,
        quantity: productQuantity[item.product] ?? item.quantity,
      };
    });
    try {
      const response = await fetch(
        `https://misho.pythonanywhere.com/api/order/cart/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
          body: JSON.stringify(updateOrderData),
        }
      );

      const data = await response.json();

      if (!sessionId && data.session_id) {
        sessionStorage.setItem("session_id", data.session_id);
      }

      sessionStorage.setItem("cart_data", JSON.stringify(data));
    } catch (error) {
      console.error("Cart update failed:", error);
    }

    getMenuList();
    navigate("/cart");
  };

  return (
    <div className="orderMainContainer">
      {" "}
      <div className="orderDetailsContainer">
        <div className="orderDetailsHead">
          <span>შეკვეთის დეტალები</span>
          <div className="paySystem">
            <img src={visa} alt="visa" />
            <img src={mastercard} alt="mastercard" />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            background: "rgba(27, 27, 27, 0.05)",
            height: "1px",
          }}
        ></div>
        <div className="orderDetails">
          {" "}
          <div className="orderInfo">
            <span>პროდუქტები ({productList?.items?.length}) </span>
            <span>{totalPrice} ₾</span>
          </div>
          <div className="orderInfo">
            <span>მიტანის საფასური </span>
            <span> {deliverPrice.price} ₾</span>
          </div>
          <div className="orderInfoPrice">
            <span>ჯამი </span>
            <span> {sum} ₾</span>
          </div>
          <div className="orderButton">
            <button
              disabled={deliverPrice.price === null}
              onClick={() => {
                formRef.current.requestSubmit();
                updateMenu();
              }}
            >
              შეკვეთის გაფორმება
            </button>
          </div>
        </div>
      </div>
      <div className="deliverContainer">
        <div className="deliverContent">
          <div className="deliverImage">
            <img src={deliver} alt="deliverImg" />
          </div>
          <div className="deliverTxt">
            <span>მიტანის საფასური დამოკიდებულია ადგილმდებარეობაზე</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
