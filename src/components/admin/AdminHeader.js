import React from "react";
import user from "../../assets/user.webp";

function AdminHeader() {
  return (
    <header className="border-bottom py-3 sticky-top-header">
      <div className="container-fluid">
        <div className="mb-npx">
          <div className="row align-items-center justify-content-end">
            <div className="col-sm-6 col-12 text-sm-end">
              <div className="mx-n1">
                <span style={{ fontSize: "24px" }}>
                  <img src={user} className="img-fluid header-user" alt="img" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;