import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GrDownload } from "react-icons/gr";
import pdf from "../../../assets/pdf.png";
import excel from "../../../assets/excel.png";

const AttendanceModel = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                className="btn btn-sm btndwnld"
                onClick={handleShow}
            >
                <GrDownload />
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Download Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-6 col-6 mb-3">
                                <label className="form-label">Employee</label>
                                <select
                                    name="name"
                                    className={`form-select`}
                                >
                                    <option selected></option>
                                    <option value="All">All</option>
                                    <option value="Manoj Prabhakar R">Manoj Prabhakar R</option>
                                    <option value="Vishnu Priya S">Vishnu Priya S</option>
                                    <option value="Kavitha M">Kavitha M</option>
                                    <option value="Yalini S A">Yalini S A</option>
                                    <option value="Leela Prasanna D">Leela Prasanna D</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-6"></div>
                            <div className="col-md-6 col-6 mb-3">
                                <label className="form-label">Download From</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-6 col-6 mb-3">
                                <label className="form-label">Download To</label>
                                <input type="date" className="form-control" />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-sm btnPdf">
                        <img src={pdf} alt="PDF"className="img-fluid me-2" />Download
                    </Button>
                    <Button className="btn btn-sm btnExcel">
                        <img src={excel} alt="PDF" className="img-fluid me-2" />Download
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AttendanceModel;