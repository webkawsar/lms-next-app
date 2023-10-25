import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

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

const Register = ({ setIsActive }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data, "register data");
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
  };

  return (
    <div
      className={`tab-pane fade active show`}
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
                onClick={() => setIsActive("login")}
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
                    {...register("firstName")}
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
                    {...register("lastName")}
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
                    {...register("userName")}
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
                    {...register("email")}
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
                    {...register("password")}
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="login__form">
                  <label className="form__label">Re-Enter Password</label>
                  <input
                    className="common__login__input"
                    type="password"
                    placeholder="Re-Enter Password"
                    {...register("confirmPassword")}
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
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
