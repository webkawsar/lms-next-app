"use client";

import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGooglePlusG } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Login from "@/app/components/Login/Login";
import Register from "@/app/components/Register/Register";

const page = () => {
  // for showing modal based on tab select
  const [isActive, setIsActive] = useState("login");
  const handelModal = (param) => {
    setIsActive(param);
  };

  return (
    <div>
      <Breadcrumb root="Home" heading="Login In" />

      <div className="loginarea sp_top_100 sp_bottom_100">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-md-8 offset-md-2" data-aos="fade-up">
              <ul
                className="nav  tab__button__wrap text-center"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => handelModal("login")}
                    className={`single__tab__link ${
                      isActive === "login" ? "active" : ""
                    }`}
                    data-bs-toggle="tab"
                    data-bs-target="#projects__one"
                    type="button"
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => handelModal("register")}
                    className={`single__tab__link ${
                      isActive === "register" ? "active" : ""
                    }`}
                    data-bs-toggle="tab"
                    data-bs-target="#projects__two"
                    type="button"
                  >
                    Register
                  </button>
                </li>
              </ul>
            </div>

            <div
              className="tab-content tab__content__wrapper"
              id="myTabContent"
              data-aos="fade-up"
            >
              {isActive === "login" ? (
                <Login setIsActive={setIsActive} />
              ) : (
                <Register setIsActive={setIsActive} />
              )}
            </div>
          </div>

          <div className=" login__shape__img educationarea__shape_image">
            <img
              className="hero__shape hero__shape__1"
              src="img/education/hero_shape2.png"
              alt="Shape"
            />
            <img
              className="hero__shape hero__shape__2"
              src="img/education/hero_shape3.png"
              alt="Shape"
            />
            <img
              className="hero__shape hero__shape__3"
              src="img/education/hero_shape4.png"
              alt="Shape"
            />
            <img
              className="hero__shape hero__shape__4"
              src="img/education/hero_shape5.png"
              alt="Shape"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
