import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function EmployeeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Employee Name is required"),
    email: Yup.string().email("*Invalid email").required("*Email is required"),
    join_date: Yup.string().required("*Joining Date is required")
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
        const response = await api.put(`admin/emp/update/${id}`, values);
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`admin/emp/${id}`);
        formik.setValues(response.data.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, [id]);

  return (
    <section className="mx-2">
      <form onSubmit={formik.handleSubmit}>
        <div
          className="card shadow border-0 mb-2"
          style={{ borderRadius: "0px" }}
        >
          <div className="container-fluid py-4">
            <div className="row align-items-center justify-content-between">
              <div className="col">
                <h1 className="h4 ls-tight fw-semibold">Edit Employee</h1>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/employee">
                    <button type="button" className="btn btn-sm btn-light">
                      Back
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-sm btn-button" disabled={loadIndicator}>
                    {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    Update
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
              {/* Employee ID */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Employee Id<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="emp_id"
                  className={`form-control`}
                  {...formik.getFieldProps("emp_id")}
                  readOnly
                />
              </div>
              {/* Employee Name */}
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
              {/* Email */}
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
              {/* Joining Date */}
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

export default EmployeeEdit;