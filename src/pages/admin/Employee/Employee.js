import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import DeleteModel from "../../../components/admin/DeleteModel";

const Items = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      name: "Ragul",
      mobile: "9876543210",
      email: "ragul@gmail.com",
      usage: "Unit",
    },
    {
      id: 2,
      name: "Sakthivel",
      mobile: "9123456780",
      email: "sakthivel@gmail.com",
    },
    {
      id: 3,
      name: "prem",
      mobile: "9876543210",
      email: "prem@gmail.com",
      usage: "Unit",
    }
  ];

  useEffect(() => {
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
                <h1 className="h4 ls-tight fw-semibold">Employee</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/employee/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add +</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 my-2" style={{ borderRadius: "0px" }}>
        <div className="table-responsive p-2 minHeight">
          <table ref={tableRef} className="display table ">
            <thead className="thead-light">
              <tr>
                <th scope="col" className="text-center" style={{ whiteSpace: "nowrap" }}>
                  S.NO
                </th>
                <th scope="col" className="text-center">Employee Name</th>
                <th scope="col" className="text-center">Mobile</th>
                <th scope="col" className="text-center">Email</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.name}</td>
                  <td className="text-center">{data.mobile}</td>
                  <td className="text-center">{data.email}</td>
                  <td className="text-center">
                    <div>
                      <Link to="/employee/view">
                        <button className="btn btn-sm ps-0 shadow-none border-none">
                          <FaEye />
                        </button>
                      </Link>
                      <Link to="/employee/edit">
                        <button className="btn btn-sm shadow-none border-none">
                          <FaEdit />
                        </button>
                      </Link>
                      <DeleteModel />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card-footer border-0 py-5"></div>
      </div>
    </section>
  );
};

export default Items;