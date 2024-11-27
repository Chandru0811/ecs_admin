import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import DeleteModel from "../../../components/admin/DeleteModel";

const Attendance = () => {
  const tableRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState("");

  const datas = [
    {
      id: 1,
      employeeId: "ECS001",
      name: "Ragul",
      checkIn: "10.00 AM",
      checkOut: "07.00 PM",
    },
    {
      id: 2,
      employeeId: "ECS002",
      name: "Sakthivel",
      checkIn: "10.10 AM",
      checkOut: "07.00 PM",
    },
    {
      id: 3,
      employeeId: "ECS003",
      name: "prem",
      checkIn: "10.00 AM",
      checkOut: "07.10 PM",
    },
  ];

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);

    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <section className="mx-2">
      <div className="card shadow border-0 mb-2" style={{ borderRadius: "0px" }}>
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
      <div className="card shadow border-0 mt-2" style={{ minHeight: "69vh", borderRadius: "0px" }}>
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
                <th scope="col" className="text-center" style={{ whiteSpace: "nowrap" }}>
                  S.NO
                </th>
                <th scope="col" className="text-center">Employee ID</th>
                <th scope="col" className="text-center">Employee Name</th>
                <th scope="col" className="text-center">Check In</th>
                <th scope="col" className="text-center">Check Out</th>
                {/* <th scope="col" className="text-center">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.emp_id}</td>
                  <td className="text-center">{data.name}</td>
                  <td className="text-center">{data.checkIn}</td>
                  <td className="text-center">{data.checkOut}</td>
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