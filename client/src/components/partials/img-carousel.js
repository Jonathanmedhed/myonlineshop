import React, { Fragment, useState, createRef } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import CardVer from "./card-vert";

const IMGCarousel = ({ items, type }) => {
  const responsiveSettings = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  let itemTemplate = (item) => {
    return <img src={require("../../img/galaxy1.jpg")}></img>;
  };

  let itemTemplateMobile = (item) => {
    return <img src={require("../../img/galaxy1.jpg")}></img>;
  };

  const basicHeader = <h2>Basic</h2>;
  const customHeader = <h2 className="page-title mt-1">Products on Sale</h2>;

  return (
    <Fragment>
      <div className="hide-sm">
        <div>
          <Carousel
            value={items}
            itemTemplate={itemTemplate}
            numVisible={1}
            numScroll={1}
            className="custom-carousel"
            responsive={responsiveSettings}
            header={customHeader}
            /**circular={true}*/
            /**autoplayInterval={1000} Not working */
          ></Carousel>
        </div>
      </div>
      <div className="show-sm">
        <Carousel
          circular={true}
          autoplayInterval={1000} /**Not working */
          value={items}
          itemTemplate={itemTemplateMobile}
          numVisible={1}
          numScroll={1}
          header={basicHeader}
          responsive={responsiveSettings}
        ></Carousel>
      </div>
    </Fragment>
  );
};
export default IMGCarousel;
