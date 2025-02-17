import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function AttendanceEdit() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const work_mode = searchParams.get("work_mode");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const work_log = searchParams.get("work_log");
  const emp_id = searchParams.get("emp_id");
  const date = searchParams.get("date");
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);

  const validationSchema = Yup.object().shape({
    checkin: Yup.string().required("*Check In is required"),
    work_mode: Yup.string().required("*Select a Working Mode"),
  });

  const formik = useFormik({
    initialValues: {
      id: id,
      emp_id: emp_id,
      date: date,
      checkin: checkin === "null" ? "" : checkin,
      checkout: checkout === "null" ? "" : checkout,
      work_mode: work_mode === "null" ? '' : work_mode,
      work_log: work_log === "null" ? '' : work_log
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoadIndicator(true);
        if (values.id === "null") {
          delete values.id;
        }
        const response = await api.post("admin/attendance", values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/attendance");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Error Occurred");
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
            <div className="row align-items-center justify-content-between">
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
                  <button type="submit" className="btn btn-sm btn-button" disabled={loadIndicator} >
                    {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    <span>Update</span>
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
                  Check In<span className="text-danger">*</span>
                </label>
                <input
                  type="time"
                  name="checkin"
                  className={`form-control ${formik.touched.checkin && formik.errors.checkin
                      ? "is-invalid"
                      : ""
                    }`}
                  {...formik.getFieldProps("checkin")}
                />
                {formik.touched.checkin && formik.errors.checkin && (
                  <div className="invalid-feedback">
                    {formik.errors.checkin}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Check Out</label>
                <input
                  type="time"
                  name="checkout"
                  className="form-control"
                  {...formik.getFieldProps("checkout")}
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
}

export default AttendanceEdit;