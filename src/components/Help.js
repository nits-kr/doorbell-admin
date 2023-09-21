import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import {
  useDeleteContactMutation,
  useDeleteHelpManagementListMutation,
  useFilterHelpListByDateQuery,
  useGetHelpListQuery,
  useUpdateHelpMutation,
} from "../services/Post";

function Help() {
  const { data: helpAll } = useGetHelpListQuery();
  const [deleteHelp, res] = useDeleteContactMutation();
  const [updateHelpList] = useUpdateHelpMutation();
  const [helpList, setHelpList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [itemId, setItemId] = useState([]);
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [itemId2, setItemId2] = useState([]);
  const [userName2, setUserName2] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [email2, setEmail2] = useState("");
  const [message2, setMessage2] = useState("");
  const [status2, setStatus2] = useState("");

  const { data: filteredHelp } = useFilterHelpListByDateQuery(
    {
      from: fromDate,
      to: toDate,
    },
    {
      skip: !fromDate || !toDate,
    }
  );

  useEffect(() => {
    if (filteredHelp?.results?.contactList) {
      setHelpList(filteredHelp?.results?.contactList);
    }
  }, [filteredHelp]);

  // useEffect(() => {
  //   if (helpAll) {
  //     console.log(helpAll);
  //     setHelpList(helpAll?.results?.contactList);
  //   }
  // }, [helpAll]);
  useEffect(() => {
    fetchHelpList(helpAll);
  }, [helpAll]);

  const fetchHelpList = (data) => {
    if (data) {
      setHelpList(data?.results?.contactList);
    }
  };

  const handleItem = (item) => {
    console.log("handleItem price", item);
    setItemId(item?._id);
    setUserName(item?.userName || "");
    setMobile(item?.mobileNumber || "");
    setEmail(item?.userEmail || "");
    setMessage(item?.descripation || []);
    setStatus(item?.status || 0);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editHelp = {
      id: itemId,
      // userName: userName2,
      // mobileNumber: mobile2,
      // userEmail: email2,
      status: status2,
      // subject: message2,
    };
    try {
      await updateHelpList(editHelp);
      Swal.fire({
        icon: "success",
        title: "Changes Saved",
        text: "The Status has been updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the subcategory.",
      });
    }
  };

  return (
    <>
      <Sidebar Dash={"help"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row user-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Help &amp; Support</h2>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                    >
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">From</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">To</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button className="comman_btn">
                          <span>Search</span>
                        </button>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>User Name</th>
                                <th>Mobile Number</th>
                                <th>Email Address</th>
                                <th>Messages</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {helpList?.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1} </td>
                                    <td> {item?.userName} </td>
                                    <td>{item?.mobileNumber} </td>
                                    <td> {item?.userEmail} </td>
                                    <td>
                                      {item?.descripation?.slice(0, 15)}...{" "}
                                    </td>
                                    <td> {item?.createdAt?.slice(0, 10)} </td>
                                    <td>
                                      <div
                                        className={
                                          item?.status === "Cancelled"
                                            ? "text-danger"
                                            : item?.status === "Pending"
                                            ? "text-warning"
                                            : item?.status === "progress"
                                            ? "text-info"
                                            : item?.status === "Fixed"
                                            ? "text-success"
                                            : item?.status === "Inprogress"
                                            ? "text-primary"
                                            : item?.status === "Delivered"
                                            ? "text-secondary"
                                            : "text-default"
                                        }
                                        style={{
                                          background:
                                            item?.status === "Cancelled"
                                              ? "#ffe5e5"
                                              : item?.status === "Pending"
                                              ? "#fff6e5"
                                              : item?.status === "progress"
                                              ? "#e5f0ff"
                                              : item?.status === "Fixed"
                                              ? "#e5ffe5"
                                              : item?.status === "Inprogress"
                                              ? "#e5e5ff"
                                              : item?.status === "Delivered"
                                              ? "#f3f3f3"
                                              : "#f9f9f9",
                                          borderRadius: "5px",
                                          padding: "2px 5px",
                                        }}
                                      >
                                        {item?.status}
                                      </div>{" "}
                                    </td>
                                    <td>
                                      <Link
                                        className="comman_btn table_viewbtn"
                                        // to="/help-view"
                                        to={`/help-view/${encodeURIComponent(
                                          JSON.stringify(item)
                                        )}`}
                                      >
                                        <span>View</span>
                                      </Link>
                                      <Link
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit"
                                        className="comman_btn table_viewbtn mx-1"
                                        to="#"
                                        onClick={() => handleItem(item)}
                                      >
                                        <span>Edit</span>
                                      </Link>
                                      <Link
                                        className="comman_btn bg-danger table_viewbtn"
                                        to="#"
                                        onClick={() => {
                                          Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText:
                                              "Yes, delete it!",
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              deleteHelp(item?._id);
                                              Swal.fire(
                                                "Deleted!",
                                                `${item?.userName}  item has been deleted.`,
                                                "success"
                                              ).then(() => {
                                                const updatedOfferList =
                                                  helpList.filter(
                                                    (offer) =>
                                                      offer._id !== item?._id
                                                  );
                                                setHelpList(updatedOfferList);
                                              });
                                            }
                                          });
                                        }}
                                      >
                                        Delete
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade reply_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                MESSAGES
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body py-4">
              <div className="chatpart_main">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                  ut soluta, debitis provident reiciendis architecto.
                  Reprehenderit et labore saepe, dolor ullam commodi fugiat
                  dolorum tempora voluptatem explicabo delectus ducimus
                  quibusdam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      <div
        className="modal fade Edit_help Edit_modal"
        id="edit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form
                className="form-design row mx-0 py-2"
                action=""
                onSubmit={handleSaveChanges}
              >
                {/* <div className="form-group col-6">
                  <label htmlFor="quesstioon">USER NAME</label>
                  <input
                    className="form-control"
                    type="text"
                    id="quesstioon"
                    name="quesstioon"
                    defaultValue={userName}
                    onChange={(e) => setUserName2(e.target.value)}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="quesstioon">MOBILE NUMBER</label>
                  <input
                    className="form-control"
                    type="text"
                    id="quesstioon"
                    name="quesstioon"
                    defaultValue={mobile}
                    onChange={(e) => setMobile2(e.target.value)}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="quesstioon">EMAIL ADDRESS</label>
                  <input
                    className="form-control"
                    type="text"
                    id="quesstioon"
                    name="quesstioon"
                    defaultValue={email}
                    onChange={(e) => setEmail2(e.target.value)}
                  />
                </div> */}
                <div className="form-group col-12">
                  <label htmlFor="quesstioon">Descripation</label>
                  <textarea
                    className="form-control"
                    type="text"
                    id="quesstioon"
                    name="quesstioon"
                    defaultValue={message}
                    // onChange={(e) => setMessage2(e.target.value)}
                    readOnly
                  />
                </div>
                {/* <div className="form-group col-6">
                  <label htmlFor="quesstioon">DATE</label>
                  <input
                    className="form-control"
                    type="text"
                    id="quesstioon"
                    name="quesstioon"
                    defaultValue="11/09/2023"
                  />
                </div> */}
                {/* <div className="form-group col-12">
                  <label htmlFor="quesstioon">STATUS</label>
                  <input
                    className="form-control"
                    type="text"
                    id="quesstioon"
                    name="quesstioon"
                    defaultValue={status}
                    onChange={(e) => setStatus2(e.target.value)}
                  />
                </div> */}
                <div className="form-group col-12">
                  <form>
                    {/* <div className="form-floating "> */}
                    <select
                      className="form-select"
                      id="floatingSelect12"
                      aria-label="  select example"
                      defaultValue=" "
                      // style={{
                      //   padding: "5px",
                      // }}
                      onChange={(e) => setStatus2(e.target.value)}
                    >
                      <option value=""> Status</option>
                      <option value="Pending">Pending</option>
                      <option value="progress">progress</option>
                      <option value="Fixed">Fixed</option>
                    </select>
                    {/* </div> */}
                  </form>
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button type="submit" className="comman_btn">
                    <span>Update</span>
                  </button>
                  <a
                    href="javascript:;"
                    data-bs-dismiss="modal"
                    className="comman_btn ms-3 bg-danger"
                  >
                    <span>Cancel</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Help;
