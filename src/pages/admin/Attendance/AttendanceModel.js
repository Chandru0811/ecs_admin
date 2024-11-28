import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GrDownload } from "react-icons/gr";
import pdf from "../../../assets/pdf.png";
import excel from "../../../assets/excel.png";
import api from "../../../config/URL";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const AttendanceModel = ({ exportToPDF, exportToExcel }) => {
  const [show, setShow] = useState(false);
  const [exportAs, setExportAs] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [pdfLoading, setPdfLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
    setExportAs("");
  };

  const handleShow = () => setShow(true);
  const [employeeData, setEmployeeData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("admin/allEmps");
      setEmployeeData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    empId: Yup.string().required("*Please select an employee"),
    fromdate: Yup.string().required("*Please select a start date"),
    todate: Yup.string()
      .required("*Please select an end date")
      .test("dateOrder", "End date must be after start date", function (value) {
        const { fromdate } = this.parent;
        return !fromdate || !value || new Date(value) >= new Date(fromdate);
      }),
  });

  const formik = useFormik({
    initialValues: {
      empId: "0",
      fromdate: "",
      todate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setPdfLoading(exportAs === "pdf");
        setExcelLoading(exportAs === "xls");
        
        const response = await api.post("admin/filter/attendance", values);
        if (response.status === 200) {
          toast.success(response.data.message);
          if (exportAs === "pdf") {
            exportToPDF(
              response.data.data,
              `Attendance Report From ${values.fromdate} to ${values.todate}`,
              `Attendance_${values.fromdate}_to_${values.todate}`
            );
          } else if (exportAs === "xls") {
            exportToExcel(
              response.data.data,
              `Attendance Report From ${values.fromdate} to ${values.todate}`,
              `${values.fromdate} to ${values.todate}`
            );
          }
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error occurred while exporting");
      } finally {
        setPdfLoading(false);
        setExcelLoading(false);
      }
    },
  });

  return (
    <>
      <button className="btn btn-sm btndwnld" onClick={handleShow}>
        <GrDownload />
      </button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Download Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Employee</label>
                <select
                  name="empId"
                  className={`form-select ${
                    formik.touched.empId && formik.errors.empId
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.empId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="0">All</option>
                  {employeeData?.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
                {formik.touched.empId && formik.errors.empId && (
                  <div className="invalid-feedback">{formik.errors.empId}</div>
                )}
              </div>
              <div className="col-md-6 col-6 mb-3">
                <label className="form-label">Download From</label>
                <input
                  type="date"
                  name="fromdate"
                  className={`form-control ${
                    formik.touched.fromdate && formik.errors.fromdate
                      ? "is-invalid"
                      : ""
                  }`}
                  max={today}
                  value={formik.values.fromdate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fromdate && formik.errors.fromdate && (
                  <div className="invalid-feedback">
                    {formik.errors.fromdate}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-6 mb-3">
                <label className="form-label">Download To</label>
                <input
                  type="date"
                  name="todate"
                  max={today}
                  className={`form-control ${
                    formik.touched.todate && formik.errors.todate
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.todate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.todate && formik.errors.todate && (
                  <div className="invalid-feedback">{formik.errors.todate}</div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-sm btnPdf"
              type="button"
              onClick={() => {
                setExportAs("pdf");
                formik.handleSubmit();
              }}
              disabled={pdfLoading}
            >
              {pdfLoading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              <img src={pdf} alt="PDF" className="img-fluid me-2" />
              Download PDF
            </Button>
            <Button
              className="btn btn-sm btnExcel"
              type="button"
              onClick={() => {
                setExportAs("xls");
                formik.handleSubmit();
              }}
              disabled={excelLoading}
            >
              {excelLoading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              <img src={excel} alt="Excel" className="img-fluid me-2" />
              Download Excel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AttendanceModel;