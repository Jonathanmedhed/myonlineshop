import React, { useState, Fragment } from "react";

const MobileMenu = ({ type, setOption, bodyRef }) => {
  const select = async (option) => {
    setOption(option);
    window.scrollTo(0, bodyRef.current.offsetTop);
  };

  const [icon, setIcon] = useState("bars");
  return (
    <div className="show-sm">
      <ul className="dropdown-ul">
        <li onClick={() => setIcon(icon === "bars" ? "arrow" : "bars")}>
          <a href="">
            <div>
              {icon === "bars" ? (
                <i
                  onClick={() => setIcon("arrow")}
                  className="fas fa-bars fa-2x"
                ></i>
              ) : (
                <Fragment></Fragment>
              )}
              {icon === "arrow" ? (
                <i
                  onClick={() => setIcon("bars")}
                  class="fas fa-chevron-up fa-2x"
                ></i>
              ) : (
                <Fragment></Fragment>
              )}
            </div>
          </a>
        </li>
        <div className="down">
          <li>
            <a href="" onClick={() => select("jumbos")}>Jumbos</a>
            {type === "simple" ? (
              <Fragment></Fragment>
            ) : (
              <div className="underline"></div>
            )}
          </li>
        </div>
      </ul>
    </div>
  );
};
export default MobileMenu;