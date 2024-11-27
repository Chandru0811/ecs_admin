import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import LoginImage from "../../../assets/login_image.png";
import Logo from "../../../assets/logo.webp";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const validationSchema = Yup.object().shape({
    emp_id: Yup.string().required("*Employee ID is required"),
    password: Yup.string().required("*Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      emp_id: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.post(`emp/login`, values);
        if (response.status === 200) {
          const { token, userDetails } = response.data.data;
          if (userDetails.role === 1) {
            handleLogin(values);
            navigate("/admin");
            toast.success(response.data.message);
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userRole", userDetails.role);
          } else if (userDetails.role === 2) {
            toast.error("You don't have authorization to access this.");
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message;
          if (errorMessage) {
            toast(errorMessage, {
              icon: <FiAlertTriangle className="text-warning" />,
            });
          }
        } else {
          console.error("API Error", error);
          toast.error("An unexpected error occurred.");
        }
      }
    },
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <section className="login">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-4 col-md-4 col-12">
            <div className="login_logo">
              <img src={Logo} alt="ECS Cloud Infotech" className="img-fluid" />
            </div>
            <div className="p-3 bg-white login_card mt-2 shadow">
              <div className="text-center py-2">
                <span className="login_title">Login</span>
              </div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="pb-4">
                    <div className="input-group input-group-sm login_inputs mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        name="emp_id"
                        placeholder="Employee ID"
                        aria-label="Employee ID"
                        className={`form-control ${
                          formik.touched.emp_id && formik.errors.emp_id
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("emp_id")}
                      />
                    </div>
                    {formik.touched.emp_id && formik.errors.emp_id && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.emp_id}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="input-group input-group-sm login_inputs mb-1">
                      <span className="input-group-text" id="basic-addon2">
                        <FaLock />
                      </span>
                      <input
                        type={passwordVisible ? "text" : "password"} // Toggle password visibility
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        aria-label="Password"
                        name="password"
                        {...formik.getFieldProps("password")}
                      />
                      <span
                        className="input-group-text"
                        id="basic-addon2"
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="text-center pt-5 pb-3">
                    <button type="submit" className="btn w-100 login_submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-12 d-flex align-items-center justify-content-center pt-5">
            <img
              src={LoginImage}
              alt="login_logo"
              className="img-fluid"
              style={{ height: "550px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;