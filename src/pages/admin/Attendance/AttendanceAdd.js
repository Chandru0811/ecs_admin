import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";

function AttendanceAdd() {
    const [datas, setDatas] = useState([]);

    const validationSchema = Yup.object().shape({
        emp_id: Yup.string().required("*Employee Name is required"),
        checkIn: Yup.string().required("*Check In is required"),
        work_mode: Yup.string().required("*Select a Working Mode")
    });

    const formik = useFormik({
        initialValues: {
            emp_id: "",
            checkIn: "",
            checkOut: "",
            work_mode: "",
            work_log: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Attendance Datas:", values);
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("admin/allEmps");
                setDatas(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className='mx-2'>
            <form onSubmit={formik.handleSubmit}>
                <div className="card shadow border-0 mb-2" style={{ borderRadius: "0px" }}>
                    <div className="container-fluid py-4">
                        <div className="row align-items-center justify-content-between ">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight fw-semibold">Add Attendance</h1>
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
                                <select
                                    name="emp_id"
                                    aria-label="Default select example"
                                    {...formik.getFieldProps("emp_id")}
                                    className={`form-select ${formik.touched.emp_id && formik.errors.emp_id
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                >
                                    <option selected></option>
                                    {datas &&
                                        datas.map((employee) => (
                                            <option key={employee.id} value={employee.id}>
                                                {employee.name}
                                            </option>
                                        ))}
                                </select>
                                {formik.touched.emp_id &&
                                    formik.errors.emp_id && (
                                        <div className="invalid-feedback">
                                            {formik.errors.emp_id}
                                        </div>
                                    )}
                            </div>
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
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Working Mode<span className="text-danger">*</span>
                                </label>
                                <select
                                    name="work_mode"
                                    {...formik.getFieldProps("work_mode")}
                                    className={`form-select ${formik.touched.work_mode && formik.errors.work_mode
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                >
                                    <option selected></option>
                                    <option value="Work From Office">Work From Office</option>
                                    <option value="Work From Home">Work From Home</option>
                                </select>
                                {formik.touched.work_mode && formik.errors.work_mode && (
                                    <div className="invalid-feedback">
                                        {formik.errors.work_mode}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Work Log
                                </label>
                                <textarea
                                    rows="3"
                                    className="form-control"
                                    name="work_log"
                                    {...formik.getFieldProps("work_log")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default AttendanceAdd;