import "./basket.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import bin from "../../assets/images/bin.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBasket } from "../../context/basketLengthContext";
function Basket({ setShowBasket, showBasket, getMenuList }) {
  const { productList } = useBasket();
  const [productQuantity, setProductQuantity] = useState({});
  const navigate = useNavigate();
  const handleChange = (data, newValue) => {
    setProductQuantity((prevValue) => ({
      ...prevValue,
      [data.product]: Math.max(newValue, Number(data.quantity)),
    }));
  };
  useEffect(() => {
    if (showBasket) {
      getMenuList();
    }
  }, [showBasket]);

  const removeProductFromBasket = async (element) => {
    const sessionId = sessionStorage.getItem("session_id");
    const removedProduct = {
      product: element.product,
    };
    try {
      const response = await fetch(
        `https://misho.pythonanywhere.com/api/order/remove-product/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
          body: JSON.stringify(removedProduct),
        }
      );
    } catch (error) {}

    getMenuList();
  };
  const totalPrice = productList?.items
    ?.reduce((acc, item) => {
      if (productQuantity[item.product] !== undefined) {
        return acc + item.product_price * productQuantity[item.product];
      } else {
        return acc + item.total_price;
      }
    }, 0)
    .toFixed(2);

  const goToCart = async () => {
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
    } catch (error) {}

    getMenuList();
    navigate("/cart");
  };

  return (
    <div className={`basketContainer ${showBasket ? "basketShow" : ""}`}>
      <div className="basketContent">
        <div className="basketItems">
          <h3>კალათა</h3>
          <button
            onClick={() => {
              setShowBasket(false);
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <div className="productList">
          {productList?.items?.map((data) => (
            <div className="mapedContainer" key={data.product}>
              <div className="basketMenuImg">
                {" "}
                <img src={data.product_image} alt="product_img" />
              </div>
              <div className="product">
                <div className="basketMenuName">
                  <span>{data.product_name}</span>
                  <button onClick={() => removeProductFromBasket(data)}>
                    <img src={bin} alt="bin" className="recycleBin" />
                  </button>
                </div>
                <div className="basketMenuPrice">
                  <span>{data.product_price} ₾</span>
                  <div className="basketMemuBtn">
                    <button
                      onClick={() => {
                        const newValue =
                          (productQuantity[data.product] ??
                            Number(data.quantity)) - data.add_quantity;
                        handleChange(data, Number(newValue.toFixed(2)));
                      }}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      value={
                        productQuantity[data.product] ?? Number(data.quantity)
                      }
                      onChange={(e) =>
                        handleChange(data, Number(e.target.value))
                      }
                    />
                    <button
                      onClick={() => {
                        const newValue =
                          (productQuantity[data.product] ??
                            Number(data.quantity)) + data.add_quantity;
                        handleChange(data, Number(newValue.toFixed(2)));
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {productList?.items?.length > 0 ? (
          <div className="lastPriceAndOrder">
            <span>სულ : {totalPrice}₾</span>
            <button
              onClick={() => {
                goToCart();
              }}
            >
              კალათის ნახვა
            </button>
          </div>
        ) : (
          <p className="emptyBasket">თქვენი კალათა ცარიელია</p>
        )}
      </div>
    </div>
  );
}

export default Basket;
