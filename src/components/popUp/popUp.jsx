import "./popUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
function DetailInfo({ selectedProduct, setIngredientsPopUp }) {
  return (
    <div className="ingredientsContainer">
      <div className="popup-content ">
        <div className="popUpImage">
          <img src={selectedProduct.image}></img>
          <div className="closePopUpResponsive">
            {" "}
            <button
              onClick={() => {
                setIngredientsPopUp(false);
              }}
            >
              <FontAwesomeIcon icon={faX} className="closeHeader" />
            </button>
          </div>
        </div>
        <div className="popUpHead">
          {" "}
          <h6>{selectedProduct.name}</h6>
          <ol>
            {selectedProduct.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ol>
        </div>
        <div className="closePopUp">
          {" "}
          <button
            onClick={() => {
              setIngredientsPopUp(false);
            }}
          >
            <FontAwesomeIcon icon={faX} className="closeHeader" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailInfo;
