import React from 'react';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function EmployeeAdd() {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("*Employee Name is required"),
        mobile: Yup.string().required("*Mobile is required"),
        email: Yup.string().required("*Email is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            email: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Employee Datas:", values);
        },
    });

    return (
        <section className='mx-2'>
            <form onSubmit={formik.handleSubmit}>
                <div className="card shadow border-0 mb-2" style={{ borderRadius: "0px" }}>
                    <div className="container-fluid py-4">
                        <div className="row align-items-center justify-content-between ">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight fw-semibold">Add Employee</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-end">
                                    <Link to="/employee">
                                        <button type="button" className="btn btn-sm btn-light">
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                    <button type="submit" className="btn btn-sm btn-button">
                                        <span>Save</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow border-0 mt-2" style={{ minHeight: "69vh", borderRadius: "0px" }}>
                    <div className='container py-5'>
                        <div className='row py-3'>
                            <div className='col-md-6 col-12 mb-3'>
                                <label className='form-label'>Employee Name<span className="text-danger">*</span></label>
                                <input type='text'
                                    name="name"
                                    className={`form-control  ${formik.touched.name && formik.errors.name
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("name")}
                                />
                                {formik.touched.name &&
                                    formik.errors.name && (
                                        <div className="invalid-feedback">
                                            {formik.errors.name}
                                        </div>
                                    )}
                            </div>
                            <div className='col-md-6 col-12 mb-3'>
                                <label className='form-label'>Mobile<span className="text-danger">*</span></label>
                                <input type='text'
                                    name="mobile"
                                    className={`form-control  ${formik.touched.mobile && formik.errors.mobile
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("mobile")}
                                />
                                {formik.touched.mobile &&
                                    formik.errors.mobile && (
                                        <div className="invalid-feedback">
                                            {formik.errors.mobile}
                                        </div>
                                    )}
                            </div>
                            <div className='col-md-6 col-12 mb-3'>
                                <label className='form-label'>Email<span className="text-danger">*</span></label>
                                <input type='text'
                                    name="email"
                                    className={`form-control  ${formik.touched.email && formik.errors.email
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email &&
                                    formik.errors.email && (
                                        <div className="invalid-feedback">
                                            {formik.errors.email}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default EmployeeAdd;