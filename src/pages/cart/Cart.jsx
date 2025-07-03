import "./cart.css";
import Header from "../../components/header/header";
import { useState } from "react";
import { useBasket } from "../../context/basketLengthContext";
import Product from "../../components/cartProduct/Product";
import ContactForm from "../../components/contactInfo/ContactForm";
// import OrderDetails from "../../components/OrderDetails";
import OrderDetails from "../../components/orderDetails/OrderDetails";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { useRef } from "react";
function Cart() {
  const [mobHeader, setMobHeader] = useState(false);
  const [productQuantity, setProductQuantity] = useState({});
  const { productList } = useBasket();
  const [deliverData, setDeliverData] = useState([]);
  const [deliverPrice, setDeliverPrice] = useState({
    price: null,
    id: 0,
  });

  const [userInfo, setUserInfo] = useState({
    full_name: "",
    phone_number: "",
    address: "",
  });
  const formRef = useRef(null);
  const totalPrice = productList?.items
    ?.reduce((acc, item) => {
      if (productQuantity[item.product] !== undefined) {
        return acc + item.product_price * productQuantity[item.product];
      } else {
        return acc + item.total_price;
      }
    }, 0)
    .toFixed(1);
  const pay = async () => {
    const name = {
      full_name: userInfo.full_name,
    };
    const phone = {
      phone_number: userInfo.phone_number,
    };
    const address = {
      address: userInfo.address,
    };
    const deliverZONA = {
      delivery_zone_id: deliverPrice.id,
    };
    const sessionId = sessionStorage.getItem("session_id");
    const res = await fetch(
      `${import.meta.env.VITE_API_ADDRESS}/api/order/api/pay/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionId ? { "Session-ID": sessionId } : {}),
        },
        credentials: "include",
        body: JSON.stringify({
          ...name,
          ...phone,
          ...address,
          ...deliverZONA,
        }),
      }
    );
    const data = await res.json();
    sessionStorage.setItem("cart_data", JSON.stringify(data));

    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      alert("გადახდა ვერ დაიწყო");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Header setMobHeader={setMobHeader} mobHeader={mobHeader} />
      {productList.items?.length > 0 ? (
        <div className="cartContainedBox">
          {" "}
          <div className="importedProductAndContact">
            {" "}
            <Product
              setProductQuantity={setProductQuantity}
              productQuantity={productQuantity}
              totalPrice={totalPrice}
            />{" "}
            <ContactForm
              className="contactContainerForMob"
              setDeliverData={setDeliverData}
              deliverData={deliverData}
              deliverPrice={deliverPrice}
              setDeliverPrice={setDeliverPrice}
              formRef={formRef}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
              pay={pay}
            />
          </div>
          <div className="importedOrderList">
            {" "}
            <OrderDetails
              totalPrice={totalPrice}
              deliverPrice={deliverPrice}
              setProductQuantity={setProductQuantity}
              productQuantity={productQuantity}
              formRef={formRef}
              userInfo={userInfo}
            />
          </div>
        </div>
      ) : (
        <div className="cartIsEmpty">
          {" "}
          <p> თქვენი კალათა ცარიელია </p>
          <Link to="/menu" className="goForProduct">
            პროდუქცია
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;
