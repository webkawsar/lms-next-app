import React from "react";
import { FaAngleRight, FaGreaterThan } from "react-icons/fa6";

const Breadcrumb = ({ heading = "Title", root = "Home" }) => {
  return (
    <div className="breadcrumbarea">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb__content__wraper" data-aos="fade-up">
              <div className="breadcrumb__title">
                <h2 className="heading">{heading}</h2>
              </div>
              <div className="breadcrumb__inner">
                <ul>
                  <li>
                    <a
                      href="index.html"
                      className="d-flex align-items-baseline"
                    >
                      {root} <FaAngleRight size={13} />
                    </a>
                  </li>
                  <li>{heading}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shape__icon__2">
        <img
          className=" shape__icon__img shape__icon__img__1"
          src="img/herobanner/herobanner__1.png"
          alt="photo"
        />
        <img
          className=" shape__icon__img shape__icon__img__2"
          src="img/herobanner/herobanner__2.png"
          alt="photo"
        />
        <img
          className=" shape__icon__img shape__icon__img__3"
          src="img/herobanner/herobanner__3.png"
          alt="photo"
        />
        <img
          className=" shape__icon__img shape__icon__img__4"
          src="img/herobanner/herobanner__5.png"
          alt="photo"
        />
      </div>
    </div>
  );
};

export default Breadcrumb;
