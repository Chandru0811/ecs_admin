import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import api from "../../../config/URL";
import { Link } from "react-router-dom";
import { FaRegEdit, FaPlus } from "react-icons/fa";
import AttendanceModel from "../Attendance/AttendanceModel";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";

const Attendance = () => {
  const tableRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTimeTo12Hour = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hour12 = hour % 12 || 12;
    const period = hour >= 12 ? "PM" : "AM";
    return `${hour12}:${minute} ${period}`;
  };

  const exportToExcel = (data, heading, filename) => {
    if (data.length === 0) {
      toast.error(
        "There are no records available to download as an Excel file."
      );
      return;
    }

    const headingRow = [[heading]];

    const dataRows = data.map((item, index) => ({
      "S.NO": index + 1,
      Date: item.date,
      "Employee ID": item.user.emp_id,
      "Employee Name": item.user.name,
      "Check In": formatTimeTo12Hour(item.checkin),
      "Check Out": formatTimeTo12Hour(item.checkout),
      "Working Mode": item.work_mode,
      "Work Log": item.work_log,
    }));

    const worksheet = XLSX.utils.aoa_to_sheet([
      ...headingRow,
      ...[
        [
          "S.NO",
          "Date",
          "Employee ID",
          "Employee Name",
          "Check In",
          "Check Out",
          "Working Mode",
          "Work Log",
        ],
      ],
      ...dataRows.map((row) => Object.values(row)),
    ]);

    worksheet["!merges"] = [
      {
        s: { r: 0, c: 0 },
        e: { r: 0, c: 7 },
      },
    ];

    const columnWidths = [
      { wch: 5 },
      { wch: 10 },
      { wch: 15 },
      { wch: 20 },
      { wch: 10 },
      { wch: 10 },
      { wch: 20 },
      { wch: 50 },
    ];
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, filename);

    XLSX.writeFile(workbook, `${filename}.xlsx`);

    toast.success("Excel File Downloaded Successfully!");
  };

  const exportToPDF = (data, heading, filename) => {
    if (data.length === 0) {
      toast.error("There are no records available to download as a PDF.");
      return;
    }

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.width;
    const headingWidth = doc.getTextWidth(heading);
    const headingX = (pageWidth - headingWidth) / 2;

    doc.text(heading, headingX, 10);

    doc.autoTable({
      head: [
        [
          "S.NO",
          "Date",
          "Employee ID",
          "Employee Name",
          "Check In",
          "Check Out",
          "Working Mode",
        ],
      ],
      body: data.map((item, index) => [
        index + 1,
        item.date,
        item.user.emp_id,
        item.user.name,
        formatTimeTo12Hour(item.checkin),
        formatTimeTo12Hour(item.checkout),
        item.work_mode,
      ]),
    });

    doc.save(`${filename}.pdf`);

    toast.success("PDF File Downloaded Successfully!");
  };

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `admin/allEmpAttendance?date=${selectedDate}`
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

  return (
    <section className="mx-2">
      <div
        className="card shadow border-0 mb-2"
        style={{ borderRadius: "0px" }}
      >
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between">
            <div className="col">
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="h4 ls-tight fw-semibold">Attendance</h1>
                {/* <Link to='/attendance/add'>
                  <button type="button" className="btn btn-button">
                    Add <FaPlus size={10} className="mb-1" />
                  </button>
                </Link> */}
              </div>
            </div>
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
            <div className="d-flex flex-wrap justify-content-between px-2 py-3">
              <div className="Button mb-3">
                <button
                  className="btn btn-sm btn-light "
                  onClick={() =>
                    exportToExcel(
                      datas,
                      `Attendance Report for ${selectedDate}`,
                      `Attendance_${selectedDate}`
                    )
                  }
                >
                  Excel
                </button>
                <button
                  className="btn btn-sm btn-light  mx-3"
                  onClick={() =>
                    exportToPDF(
                      datas,
                      `Attendance Report for ${selectedDate}`,
                      `Attendance_${selectedDate}`
                    )
                  }
                >
                  PDF
                </button>
                <AttendanceModel
                  exportToPDF={exportToPDF}
                  exportToExcel={exportToExcel}
                />
              </div>
              <div className="Input ps-2">
                <input
                  type="date"
                  style={{ width: "250px" }}
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
                      Working Mode
                    </th>
                    <th scope="col" className="text-center">
                      Work Log
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
                      <td className="text-center">{data.user.emp_id}</td>
                      <td className="text-center">{data.user.name}</td>
                      <td className="text-center">
                        {formatTimeTo12Hour(data.checkin)}
                      </td>
                      <td className="text-center">
                        {formatTimeTo12Hour(data.checkout)}
                      </td>
                      <td className="text-center">{data.work_mode}</td>
                      <td className="text-center">-</td>
                      <td className="text-center">
                        <div>
                          <Link
                            to={`/attendance/edit/${data.id}?work_mode=${data.work_mode}&checkin=${data.checkin}&checkout=${data.checkout}&work_log=${data.work_log}`}
                          >
                            <button className="btn btn-sm shadow-none border-none">
                              <FaRegEdit />
                            </button>
                          </Link>
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
