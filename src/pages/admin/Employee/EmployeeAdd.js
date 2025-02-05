import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";

function EmployeeAdd() {
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Employee Name is required"),
    email: Yup.string()
      .email("*Invalid email format")
      .required("*Email is required"),
    join_date: Yup.date().required("*Joining Date is required")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      join_date: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.post(`admin/emp/register`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/employee");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  return (
    <section className="mx-2">
      <form onSubmit={formik.handleSubmit}>
        <div
          className="card shadow border-0 mb-2"
          style={{ borderRadius: "0px" }}
        >
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
                    <button
                      type="button"
                      className="btn btn-sm btn-light btn-add"
                    >
                      <span>Back</span>
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-sm btn-button" disabled={loadIndicator}>
                    {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card shadow border-0 mt-2"
          style={{ minHeight: "69vh", borderRadius: "0px" }}
        >
          <div className="container py-5">
            <div className="row py-3">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Employee Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                    }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Email<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  className={`form-control ${formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                    }`}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Joining Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="join_date"
                  className={`form-control ${formik.touched.join_date && formik.errors.join_date
                      ? "is-invalid"
                      : ""
                    }`}
                  {...formik.getFieldProps("join_date")}
                />
                {formik.touched.join_date && formik.errors.join_date && (
                  <div className="invalid-feedback">
                    {formik.errors.join_date}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default EmployeeAdd;