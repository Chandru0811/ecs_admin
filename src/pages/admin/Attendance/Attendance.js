import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import api from "../../../config/URL";
// import { Link } from "react-router-dom";
// import { GoEye } from "react-icons/go";
// import { FaRegEdit } from "react-icons/fa";
// import DeleteModel from "../../../components/admin/DeleteModel";

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
        const response = await api.post("admin/employees/attendance", {
          date: selectedDate,
        });
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
    // refreshData();
  }, [selectedDate]);

  function formatTimeTo12Hour(time) {
    const [hour, minute] = time.split(":"); // Split time into components
    const hour12 = hour % 12 || 12; // Convert 24-hour to 12-hour format
    const period = hour >= 12 ? "PM" : "AM"; // Determine AM/PM
    return `${hour12}:${minute} ${period}`; // Format as HH:MM AM/PM
  }

  return (
    <section className="mx-2">
      <div
        className="card shadow border-0 mb-2"
        style={{ borderRadius: "0px" }}
      >
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
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
        <div className="container-fluid row py-4">
          <div className="col-md-8 col-12"></div>
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
          <table ref={tableRef} className="display table ">
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
                {/* <th scope="col" className="text-center">Action</th> */}
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
                  {/* <td className="text-center">
                    <div>
                      <Link to="/attendance/view">
                        <button className="btn btn-sm ps-0 shadow-none border-none">
                          <GoEye />
                        </button>
                      </Link>
                      <Link to="/attendance/edit">
                        <button className="btn btn-sm shadow-none border-none">
                          <FaRegEdit />
                        </button>
                      </Link>
                      <DeleteModel />
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Attendance;
