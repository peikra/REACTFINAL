import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import axios from "axios";
import "./menu.css";
import MenuList from "../../components/menuList/MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import Footer from "../../components/footer/Footer";
import { useBasket } from "../../context/basketLengthContext";
import plus from "../../assets/images/plus.png";
import minus from "../../assets/images/minus.png";
function Menu() {
  const [categories, setCategories] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [showBasket, setShowBasket] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [mobHeader, setMobHeader] = useState(false);
  const { setProductList } = useBasket();
  const [filter, setFilter] = useState("");
  const [menu, setMenu] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  useEffect(() => {
    const getDifferentCategoriesProduct = async () => {
      try {
        const response = await axios.get(
         `https://misho.pythonanywhere.com/api/store/filter/products/?search=${filter}`
        );
        if (response.status >= 200 && response.status < 300) {
          const menuData = {
            ...response.data,
            results: Array.isArray(response.data.results)
              ? response.data.results
              : [],
          };
          setMenu(menuData);
          setNextPage(menuData.next);
        }
      } catch (error) {}
    };

    getDifferentCategoriesProduct();
  }, [filter]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://misho.pythonanywhere.com/api/store/category/`
        );
        setCategories(response.data);
      } catch (error) {}
      console.error("Fetch error:", error);
    };
    fetchCategories();
  }, []);
  const showActiveList = (ID) => {
    if (ID === activeList) {
      setActiveList(null);
    } else {
      setActiveList(ID);
    }
  };

  const addToBasket = async (element) => {
    const sessionId = sessionStorage.getItem("session_id");
    const orderedProduct = {
      product: element.id,
    };

    try {
      const response = await fetch(
        `https://misho.pythonanywhere.com/api/order/cart/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
          body: JSON.stringify(orderedProduct),
        }
      );

      const data = await response.json();

      if (!sessionId && data.session_id) {
        sessionStorage.setItem("session_id", data.session_id);
      }

      sessionStorage.setItem("cart_data", JSON.stringify(data));
    } catch (error) {}
    getMenuList();
  };

  const handleClickNextPage = async () => {
    if (!nextPage) return;

    try {
      const secureUrl = nextPage.replace(/^http:/, "https:");
      const response = await axios.get(secureUrl);
      const menuData = {
        ...response.data,
        results: Array.isArray(response.data.results)
          ? response.data.results
          : [],
      };
      setMenu(menuData);
      setNextPage(menuData.next);
      setPreviousPage(menuData.previous);
    } catch (error) {}
  };

  const handleClickPreviousPage = async () => {
    if (!previousPage) return;

    try {
      const secureUrl = previousPage.replace(/^http:/, "https:");
      const response = await axios.get(secureUrl);
      const menuData = {
        ...response.data,
        results: Array.isArray(response.data.results)
          ? response.data.results
          : [],
      };
      setMenu(menuData);
      setNextPage(menuData.next);
      setPreviousPage(menuData.previous);
    } catch (error) {}
  };
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [menu]);
  return (
    <>
      <Header
        setShowBasket={setShowBasket}
        setMobHeader={setMobHeader}
        mobHeader={mobHeader}
      />
      {/* <ResponsiveHeader mobHeader={mobHeader} setMobHeader={setMobHeader} /> */}
      <div className="menuContainer">
        <div className="content">
          <div className="categoriContent">
            <div className="category">
              {" "}
              <h2>კატეგორიები</h2>
              <button
                onClick={() => setShowCategory(!showCategory)}
                className="showCategoryBtn"
              >
                {" "}
                <FontAwesomeIcon
                  icon={showCategory ? faArrowUp : faArrowDown}
                  className="arrowUpDown"
                />{" "}
              </button>
            </div>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <div
                  className={`mainContent ${
                    showCategory ? "contentShow" : "contentHide"
                  }`}
                  key={category.id}
                >
                  <div
                    className={`categoryNames ${
                      filter === category.name ? "colored" : ""
                    }`}
                    style={{ display: "flex" }}
                  >
                    <button
                      className="parentCategories"
                      onClick={() => setFilter(category.name)}
                    >
                      {category.name}
                    </button>
                    <button
                      className="plusBtn"
                      onClick={() => showActiveList(category.id)}
                    >
                      <img
                        src={activeList === category.id ? minus : plus}
                        alt="toggleImg"
                      />
                    </button>
                  </div>

                  <div
                    className={`childrenContainer ${
                      category.id === activeList ? "expanded" : "collapsed"
                    }`}
                  >
                    {category.id === activeList &&
                      Array.isArray(category.children) &&
                      category.children.map((data, index) => (
                        <div
                          className={`childCategory ${
                            filter === data ? "colored" : ""
                          }`}
                          key={index}
                        >
                          <button onClick={() => setFilter(data)}>
                            {data}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="menuComponent">
          {" "}
          <MenuList
            showBasket={showBasket}
            setShowBasket={setShowBasket}
            addToBasket={addToBasket}
            menu={menu}
            getMenuList={getMenuList}
          />
        </div>
      </div>
      <div className="paginationButton">
        {" "}
        <div className="pagBtn">
          {" "}
          {previousPage ? (
            <button onClick={handleClickPreviousPage}>უკან</button>
          ) : (
            ""
          )}
          {nextPage ? (
            <button onClick={handleClickNextPage}>შემდეგი</button>
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Menu;
