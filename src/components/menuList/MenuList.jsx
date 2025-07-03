import "./menuList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../popUp/popUp";
import Basket from "../basket/Basket";
import { useState } from "react";
function MenuList({
  showBasket,
  setShowBasket,
  addToBasket,
  getMenuList,
  menu,
}) {
  const [ingredientsPopUp, setIngredientsPopUp] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const selectedItem = (element) => {
    setIngredientsPopUp(true);
    setSelectedProduct(element);
  };

  return (
    <div>
      <Basket
        setShowBasket={setShowBasket}
        showBasket={showBasket}
        getMenuList={getMenuList}
      />
      <div className="menuListContainer">
        <div className="menuContent">
          {Array.isArray(menu?.results)
            ? menu.results.map((data) => (
                <div className="menuCard" key={data.id}>
                  <div className="productInfo">
                    <div className="productImage">
                      {" "}
                      <img src={data.image} alt={data.name} />
                    </div>
                    <p>{data.name}</p>
                  </div>
                  <div className="productPrice">
                    <span className="price">{data.price} ₾</span>
                    <span className="erteuli">{data.erteuli} </span>
                  </div>
                  <div className="productOrder">
                    <button className="order" onClick={() => addToBasket(data)}>
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        style={{ paddingRight: "10px" }}
                      />
                      დამატება
                    </button>
                    {Array.isArray(data.ingredients) &&
                      data.ingredients.length > 0 && (
                        <button
                          className="detailedInfo"
                          onClick={() => selectedItem(data)}
                        >
                          დეტალურად
                        </button>
                      )}
                  </div>
                </div>
              ))
            : null}

          {/* PopUp Component */}
          {ingredientsPopUp && (
            <PopUp
              selectedProduct={selectedProduct}
              setIngredientsPopUp={setIngredientsPopUp}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuList;
