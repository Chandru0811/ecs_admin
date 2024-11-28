import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import api from "../../../config/URL";
import { Link } from "react-router-dom";
// import { GoEye } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
// import DeleteModel from "../../../components/admin/DeleteModel";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AttendanceModel from "../Attendance/AttendanceModel";

const Attendance = () => {
  const tableRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
    }
    $(tableRef.current).DataTable({
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  };

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const destroyDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }
  };

  // const refreshData = async () => {
  //   destroyDataTable();
  //   setLoading(true);
  //   try {
  //     const response = await api.get("admin/employees");
  //     setDatas(response.data.data);
  //   } catch (error) {
  //     console.error("Error refreshing data:", error);
  //   }
  //   setLoading(false);
  //   initializeDataTable();
  // };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `admin/allEmpAttendance?date=${selectedDate}`,
        );
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate !== "") {
      fetchData();
    }
  }, [selectedDate]);

  function formatTimeTo12Hour(time) {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hour12 = hour % 12 || 12;
    const period = hour >= 12 ? "PM" : "AM";
    return `${hour12}:${minute} ${period}`;
  }

  const exportToExcel = (excelData) => {
    const worksheet = XLSX.utils.json_to_sheet(
      excelData.map((data, index) => ({
        "S.NO": index + 1,
        "Employee ID": data.emp_id,
        "Employee Name": data.name,
        "Check In": formatTimeTo12Hour(data.checkin),
        "Check Out": formatTimeTo12Hour(data.checkout),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, `Attendance_${selectedDate}.xlsx`);
  };

  const exportToPDF = (pdfData) => {
    const doc = new jsPDF();
    doc.text("Attendance", 20, 10);

    doc.autoTable({
      head: [["S.NO", "Employee ID", "Employee Name", "Check In", "Check Out"]],
      body: pdfData.map((data, index) => [
        index + 1,
        data.emp_id,
        data.name,
        formatTimeTo12Hour(data.checkin),
        formatTimeTo12Hour(data.checkout),
      ]),
    });

    doc.save(`Attendance_${selectedDate}.pdf`);
  };

  return (
    <section className="mx-2">
      <div
        className="card shadow border-0 mb-2"
        style={{ borderRadius: "0px" }}
      >
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight fw-semibold">Attendance</h1>
              </div>
            </div>
            {/* <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/attendance/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add +</span>
                  </button>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div
        className="card shadow border-0 mt-2"
        style={{ minHeight: "69vh", borderRadius: "0px" }}
      >
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32"></circle>
              </svg>
            </div>
          </div>
        ) : (
          <>
            <div className="container-fluid row py-4">
              <div className="col-md-8 col-12 mb-3">
                <button
                  className="btn btn-sm btnDownload"
                  onClick={() => exportToExcel(datas)}
                >
                  Excel
                </button>
                <button
                  className="btn btn-sm btnDownload mx-3"
                  onClick={() => exportToPDF(datas)}
                >
                  PDF
                </button>
                <AttendanceModel />
              </div>
              <div className="col-md-4 col-12">
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
            <div className="table-responsive p-2 minHeight">
              <table ref={tableRef} className="display table">
                <thead className="thead-light">
                  <tr>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      S.NO
                    </th>
                    <th scope="col" className="text-center">
                      Employee ID
                    </th>
                    <th scope="col" className="text-center">
                      Employee Name
                    </th>
                    <th scope="col" className="text-center">
                      Check In
                    </th>
                    <th scope="col" className="text-center">
                      Check Out
                    </th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{data.emp_id}</td>
                      <td className="text-center">{data.name}</td>
                      <td className="text-center">
                        {formatTimeTo12Hour(data.checkin)}
                      </td>
                      <td className="text-center">
                        {formatTimeTo12Hour(data.checkout)}
                      </td>
                      <td className="text-center">
                        <div>
                          {/* <Link to="/attendance/view">
                            <button className="btn btn-sm ps-0 shadow-none border-none">
                              <GoEye />
                            </button>
                          </Link> */}
                          <Link to="/attendance/edit">
                            <button className="btn btn-sm shadow-none border-none">
                              <FaRegEdit />
                            </button>
                          </Link>
                          {/* <DeleteModel /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Attendance;
