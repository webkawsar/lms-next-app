import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// const defaultValues = {
//   username: "",
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

const defaultValues = {
  username: "kawsar",
  firstName: "Kawsar",
  lastName: "Ahmed",
  email: "web.kawsarahmed@gmail.com",
  password: "123456",
  confirmPassword: "123456",
};

const schema = yup
  .object({
    username: yup
      .string()
      .trim()
      .required("Username is required")
      .min(3, "Username must be at least 3 character")
      .lowercase(),
    firstName: yup
      .string()
      .trim()
      .required("First name is required")
      .min(3, "Firstname must be at least 3 character"),
    lastName: yup
      .string()
      .trim()
      .required("Last name is required")
      .min(3, "Lastname must be at least 3 character"),
    email: yup
      .string()
      .trim()
      .email("Must be a valid email")
      .required("Email is required")
      .lowercase(),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .matches(/[a-z0-9]{6}/, "Must contain letter and number"),
    confirmPassword: yup
      .string()
      .trim()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Confirm password don't match"),
  })
  .required();

const Register = ({ setIsActive }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}/api/auth/local/register`,
        {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }
      );

      // console.log(response.data, "response");

      // show success message
      toast.success("Registration succes!. Please login");

      // redirect to login
      setIsActive("login");
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
                    value={defaultValues.firstName}
                  />
                  {errors?.firstName?.message && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors?.firstName?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-6">
                <div className="login__form">
                  <label className="form__label">Last Name</label>
                  <input
                    className="common__login__input"
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                    value={defaultValues.lastName}
                  />
                  {errors?.lastName?.message && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors?.lastName?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-6">
                <div className="login__form">
                  <label className="form__label">Username</label>
                  <input
                    className="common__login__input"
                    type="text"
                    placeholder="Username"
                    {...register("username")}
                    value={defaultValues.username}
                  />
                  {errors?.username?.message && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors?.username?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-6">
                <div className="login__form">
                  <label className="form__label">Email</label>
                  <input
                    className="common__login__input"
                    type="email"
                    placeholder="Your Email"
                    {...register("email")}
                    value={defaultValues.email}
                  />
                  {errors?.email?.message && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors?.email?.message}
                    </div>
                  )}
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
                    value={defaultValues.password}
                  />
                  {errors?.password?.message && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors?.password?.message}
                    </div>
                  )}
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
                    value={defaultValues.confirmPassword}
                  />
                  {errors?.confirmPassword?.message && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors?.confirmPassword?.message}
                    </div>
                  )}
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
              <button className="default__button" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
