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

const defaultValues = {
  identifier: "web.kawsarahmed@gmail.com",
  password: "123456",
};

const schema = yup
  .object({
    identifier: yup
      .string()
      .trim()
      .required("Username or email is required")
      .lowercase(),
    password: yup.string().trim().required("Password is required"),
  })
  .required();

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [isActive, setIsActive] = useState("login");
  const handelModal = (param) => {
    setIsActive(param);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isActive === "register") {
      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}/api/auth/local/register`,
          {
            username: "webkawsar123",
            email: "web.kawsarahmed123@gmail.com",
            password: "abc123",
          }
        );

        console.log(result, "result");

        // show success message
        toast.success("Registration successful!");
      } catch (error) {
        console.log(error?.response?.data?.error, "error");

        // show error message
        toast.error(
          error?.response?.data?.error?.message ?? "Something went wrong!"
        );
      }

      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      console.log(result, "result");

      if (result.ok) {
        // show success message
        toast.success("Login success!");

        // send to destination
        router.push("/dashboard");
      } else {
        // show error message
        toast.error("Invalid email or password!");
      }
    } catch (error) {
      // show error message
      toast.error(
        error?.response?.data?.error?.message ?? "Something went wrong!"
      );
    }
  };

  const handleGithubLogin = () => {
    signIn("github", { redirect: true, callbackUrl: "/dashboard" });
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
              <Login />
              <Register />
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
