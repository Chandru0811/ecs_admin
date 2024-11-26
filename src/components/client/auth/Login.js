import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import LoginImage from "../../../assets/login_image.png";
import Logo from "../../../assets/logo.webp";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login({ handleLogin }) {
    const validationSchema = Yup.object().shape({
        employeeId: Yup.string().required("*Employee ID is required"),
        password: Yup.string().required("*Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            employeeId: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Login Datas:", values);
            handleLogin(values);
        },
    });

    return (
        <section className="login">
            <div className="container">
                <div className="row m-0">
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className="login_logo">
                            <img
                                src={Logo}
                                alt="ECS Cloud Infotech"
                                className="img-fluid"
                            />
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
                                                name="employeeId"
                                                placeholder="Employee ID"
                                                aria-label="Employee ID"
                                                className={`form-control ${formik.touched.employeeId && formik.errors.employeeId ? "is-invalid" : ""}`}
                                                {...formik.getFieldProps("employeeId")}
                                            />
                                        </div>
                                        {formik.touched.employeeId && formik.errors.employeeId && (
                                            <div className="invalid-feedback d-block">
                                                {formik.errors.employeeId}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="input-group input-group-sm login_inputs mb-1">
                                            <span className="input-group-text" id="basic-addon2">
                                                <FaLock />
                                            </span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Password"
                                                aria-label="Password"
                                                name="password"
                                                {...formik.getFieldProps("password")}
                                            />
                                        </div>
                                        {formik.touched.password && formik.errors.password && (
                                            <div className="invalid-feedback d-block">
                                                {formik.errors.password}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center pt-5 pb-3">
                                        <button
                                            type="submit"
                                            className="btn w-100 login_submit"
                                        >
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