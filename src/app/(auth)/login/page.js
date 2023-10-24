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

const Login = () => {
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
              <div
                className={`tab-pane fade ${
                  isActive === "login" ? "active show" : ""
                }`}
                id="projects__one"
                role="tabpanel"
                aria-labelledby="projects__one"
              >
                <div className="col-xl-8 col-md-8 offset-md-2">
                  <div className="loginarea__wraper">
                    <div className="login__heading">
                      <h5 className="login__title">Login</h5>
                      <p className="login__description">
                        Don't have an account yet?{" "}
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#registerModal"
                        >
                          Sign up for free
                        </a>
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="login__form">
                        <label className="form__label">Username or email</label>
                        <input
                          className="common__login__input"
                          type="text"
                          placeholder="Your username or email"
                          {...register("identifier")}
                          value={defaultValues.identifier}
                        />

                        {errors?.identifier?.message && (
                          <div
                            class="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {errors?.identifier?.message}
                          </div>
                        )}
                      </div>
                      <div className="login__form">
                        <label className="form__label">Password</label>
                        <input
                          className="common__login__input"
                          type="password"
                          placeholder="Password"
                          {...register("password")}
                          value={defaultValues.password}
                        />

                        {errors?.password?.message && (
                          <div
                            class="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {errors?.password?.message}
                          </div>
                        )}
                      </div>
                      <div className="login__form d-flex justify-content-between flex-wrap gap-2">
                        <div className="form__check">
                          <input id="forgot" type="checkbox" />
                          <label htmlFor="forgot"> Remember me</label>
                        </div>
                        <div className="text-end login__form__link">
                          <a href="#">Forgot your password?</a>
                        </div>
                      </div>
                      <div className="login__button">
                        <button
                          className="default__button"
                          type="submit"
                          disabled={isLoading}
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                    <div className="login__social__option">
                      <p>or Log-in with</p>

                      <ul className="login__social__btn">
                        <li>
                          <a
                            className="default__button login__button__1 d-flex align-items-center"
                            href="#"
                          >
                            <FaFacebookF className="mr-1" /> Facebook
                          </a>
                        </li>
                        {/* <li>
                          <a
                            className="default__button d-flex align-items-center"
                            href="#"
                          >
                            <FaGooglePlusG className="mr-1" /> Google
                          </a>
                        </li> */}

                        <li>
                          <button
                            className="default__button login__button__1 d-flex align-items-center"
                            onClick={handleGithubLogin}
                          >
                            <FaGithub className="mr-2" /> Github
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`tab-pane fade ${
                  isActive === "register" ? "active show" : ""
                }`}
                id="projects__two"
                role="tabpanel"
                aria-labelledby="projects__two"
              >
                <div className="col-xl-8 offset-md-2">
                  <div className="loginarea__wraper">
                    <div className="login__heading">
                      <h5 className="login__title">Register</h5>
                      <p className="login__description">
                        Already have an account?{" "}
                        <button
                          onClick={() => handelModal("login")}
                          data-bs-toggle="modal"
                          data-bs-target="#registerModal"
                        >
                          Log In
                        </button>
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="login__form">
                            <label className="form__label">First Name</label>
                            <input
                              className="common__login__input"
                              type="text"
                              placeholder="First Name"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="login__form">
                            <label className="form__label">Last Name</label>
                            <input
                              className="common__login__input"
                              type="password"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="login__form">
                            <label className="form__label">Username</label>
                            <input
                              className="common__login__input"
                              type="password"
                              placeholder="Username"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="login__form">
                            <label className="form__label">Email</label>
                            <input
                              className="common__login__input"
                              type="password"
                              placeholder="Your Email"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="login__form">
                            <label className="form__label">Password</label>
                            <input
                              className="common__login__input"
                              type="password"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="login__form">
                            <label className="form__label">
                              Re-Enter Password
                            </label>
                            <input
                              className="common__login__input"
                              type="password"
                              placeholder="Re-Enter Password"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="login__form d-flex justify-content-between flex-wrap gap-2">
                        <div className="form__check">
                          <input id="accept_pp" type="checkbox" />{" "}
                          <label htmlFor="accept_pp">
                            Accept the Terms and Privacy Policy
                          </label>
                        </div>
                      </div>
                      <div className="login__button">
                        <a className="default__button" href="#">
                          Log In
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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

export default Login;
