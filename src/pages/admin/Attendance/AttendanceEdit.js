import React from 'react';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function AttendanceEdit() {
    const validationSchema = Yup.object().shape({
        checkIn: Yup.string().required("*Check In is required"),
        working_mode: Yup.string().required("*Select a Working Mode"),
    });

    const formik = useFormik({
        initialValues: {
            checkIn: "10:00",
            checkOut: "",
            working_mode: "Work from office"
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Attendance Datas:", values);
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
                                    <h1 className="h4 ls-tight fw-semibold">Edit Attendance</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-end">
                                    <Link to="/attendance">
                                        <button type="button" className="btn btn-sm btn-light">
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                    <button type="submit" className="btn btn-sm btn-button">
                                        <span>Update</span>
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
                                <label className='form-label'>Check In<span className="text-danger">*</span></label>
                                <input type='time'
                                    name="checkIn"
                                    className={`form-control  ${formik.touched.checkIn && formik.errors.checkIn
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("checkIn")}
                                />
                                {formik.touched.checkIn &&
                                    formik.errors.checkIn && (
                                        <div className="invalid-feedback">
                                            {formik.errors.checkIn}
                                        </div>
                                    )}
                            </div>
                            <div className='col-md-6 col-12 mb-3'>
                                <label className='form-label'>Check Out</label>
                                <input type='time'
                                    name="checkOut"
                                    className={`form-control`}
                                    {...formik.getFieldProps("checkOut")}
                                />
                            </div>
                            <div className='col-md-6 col-12 mb-3'>
                                <label className='form-label'>Working Mode<span className="text-danger">*</span></label>
                                <select
                                    name="name"
                                    {...formik.getFieldProps("working_mode")}
                                    className={`form-select    ${formik.touched.working_mode && formik.errors.working_mode
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                >
                                    <option selected></option>
                                    <option value="Work from office">Work from office</option>
                                    <option value="Work from office">Work from home</option>
                                </select>
                                {formik.touched.working_mode &&
                                    formik.errors.working_mode && (
                                        <div className="invalid-feedback">
                                            {formik.errors.working_mode}
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

export default AttendanceEdit;