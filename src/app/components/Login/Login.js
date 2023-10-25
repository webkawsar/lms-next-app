import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { FaFacebookF, FaGithub } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

const Login = ({ setIsActive }) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl");

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data, "login data");
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

        // send to restrictred route
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
    <div
      className={`tab-pane fade active show`}
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
              <button
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
                onClick={() => setIsActive("register")}
              >
                Sign up for free
              </button>
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
                <div className="invalid-feedback" style={{ display: "block" }}>
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
                <div className="invalid-feedback" style={{ display: "block" }}>
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
  );
};

export default Login;
