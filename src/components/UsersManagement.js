import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import {
  useFilterUserByDateQuery,
  useGetFileQuery,
  useUserStatusMutation,
} from "../services/Post";
import Spinner from "./Spinner";
import GoogleMap from "./GoogleMap";
import ReactGoogleMap from "./ReactGoogleMap";
import { useCreateMapMutation } from "../services/Post";
import { useGetLatLongitudeQuery } from "../services/Post";
import { useGetUserListAllQuery } from "../services/Post";
function UsersManagement(props) {
  const [createMap, res] = useCreateMapMutation();
  const { data, isLoading, isError } = useGetFileQuery("file-id");
  const { data: userList } = useGetUserListAllQuery();
  const [updateStatus] = useUserStatusMutation();
  const [loading, setLoading] = useState(true);
  console.log("down load data of user management", data);
  const [usersList, setUsersList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [userListAll, setUserListListAll] = useState([]);
  console.log("userlist", userListAll);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("token");

  const { data: filteredUser } = useFilterUserByDateQuery(
    {
      from: fromDate,
      to: toDate,
    },
    {
      skip: !fromDate || !toDate,
    }
  );

  useEffect(() => {
    if (filteredUser?.results?.list) {
      setUserListListAll(filteredUser?.results?.list);
    }
  }, [filteredUser]);

  useEffect(() => {
    if (userList) {
      console.log(userList);
      props.setProgress(10);
      setLoading(true);
      setTimeout(() => {
        setUserListListAll(userList?.results?.list);
        setLoading(false);
        props.setProgress(100);
      }, 500);
    }
  }, [userList]);

  const handleCheckboxChange = async (e, categoryId) => {
    e.preventDefault();
    console.log("handleSaveChanges1", categoryId);
    const newStatus = e.target.checked;

    const confirmationResult = await Swal.fire({
      title: "Confirm Status Change",
      text: "Do you want to change the status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (confirmationResult.isConfirmed) {
      const editStatus = {
        id: categoryId,
        status: newStatus,
      };
      try {
        await updateStatus(editStatus);
        Swal.fire({
          title: "Changes Saved",
          text: "The Status has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } catch (error) {}
    }
  };

  return (
    <>
      {loading}
      <Sidebar Dash={"users"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row user-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Users Management</h2>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                    >
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="fromDate">From</label>
                        <input
                          type="date"
                          className="form-control"
                          id="fromDate"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="toDate">To</label>
                        <input
                          type="date"
                          className="form-control"
                          id="toDate"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <Link
                          className="comman_btn"
                          // onClick={handleDateFilter}
                          disabled
                        >
                          <span>Search</span>
                        </Link>
                      </div>
                    </form>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="row">
                        <div className="col-12 comman_table_design px-0">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th>S.No.</th>
                                  <th>User Name</th>
                                  <th>Mobile Number</th>
                                  <th>Order Date</th>
                                  <th>Total Orders</th>
                                  <th>Status</th>
                                  {/* <th>Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {userListAll?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td> {index + 1} </td>
                                      <td> {item?.userName} </td>
                                      <td> {item?.mobileNumber} </td>
                                      <td> {item?.createdAt?.slice(0, 10)} </td>
                                      <td> {item?.user} </td>
                                      <td>
                                        <form className="table_btns d-flex align-items-center">
                                          <div className="check_toggle">
                                            <input
                                              type="checkbox"
                                              defaultChecked={item?.status}
                                              name={`check${index}`}
                                              id={`check${index}`}
                                              className="d-none"
                                              onChange={(e) =>
                                                handleCheckboxChange(
                                                  e,
                                                  item._id
                                                )
                                              }
                                            />
                                            <label htmlFor={`check${index}`} />
                                          </div>
                                        </form>
                                      </td>
                                      {/* <td>
                                        <a
                                          className="comman_btn table_viewbtn"
                                          href="javascript:;"
                                        >
                                          <span>View</span>
                                        </a>
                                      </td> */}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersManagement;
