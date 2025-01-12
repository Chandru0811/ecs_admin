import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function EmployeeAdd() {
  const validationSchema = Yup.object().shape({
    employeeId: Yup.string().required("*Employee Id is required"),
    employeeName: Yup.string().required("*Employee Name is required"),
    email: Yup.string()
      .email("*Invalid email format")
      .required("*Email is required"),
    joiningDate: Yup.date().required("*Joining Date is required"),
    password: Yup.string().required("*Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "*Passwords must match")
      .required("*Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      employeeName: "",
      email: "",
      joiningDate: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Employee Data:", values);
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
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Save</span>
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
                  Employee Id<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="employeeId"
                  className={`form-control ${
                    formik.touched.employeeId && formik.errors.employeeId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("employeeId")}
                />
                {formik.touched.employeeId && formik.errors.employeeId && (
                  <div className="invalid-feedback">
                    {formik.errors.employeeId}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Employee Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="employeeName"
                  className={`form-control ${
                    formik.touched.employeeName && formik.errors.employeeName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("employeeName")}
                />
                {formik.touched.employeeName && formik.errors.employeeName && (
                  <div className="invalid-feedback">
                    {formik.errors.employeeName}
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
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
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
                  name="joiningDate"
                  className={`form-control ${
                    formik.touched.joiningDate && formik.errors.joiningDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("joiningDate")}
                />
                {formik.touched.joiningDate && formik.errors.joiningDate && (
                  <div className="invalid-feedback">
                    {formik.errors.joiningDate}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Confirm Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {formik.errors.confirmPassword}
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
