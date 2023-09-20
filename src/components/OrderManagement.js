import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import {
  useFilterCompleteOrderByDateQuery,
  useFilterOrderByDateQuery,
  useGetCompletedOrderListAllQuery,
  useGetOrderListAllQuery,
} from "../services/Post";

function OrderManagement() {
  const { data: orderListAll } = useGetOrderListAllQuery();
  const { data: completedOrderListAll } = useGetCompletedOrderListAllQuery();
  const [orderList, setOrderList] = useState([]);
  const [completedOrderList, setCompletedOrderList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate1, setFromDate1] = useState("");
  const [toDate1, setToDate1] = useState("");

  const { data: filteredOrder, isLoading } = useFilterOrderByDateQuery(
    {
      from: fromDate,
      to: toDate,
    },
    {
      skip: !fromDate || !toDate,
    }
  );

  useEffect(() => {
    if (filteredOrder?.results?.order) {
      setOrderList(filteredOrder?.results?.order);
    }
  }, [filteredOrder]);

  const { data: filteredOrdercompleted } = useFilterCompleteOrderByDateQuery(
    {
      from: fromDate1,
      to: toDate1,
    },
    {
      skip: !fromDate1 || !toDate1,
    }
  );

  useEffect(() => {
    if (filteredOrdercompleted?.results?.CompletedOrder) {
      setCompletedOrderList(filteredOrdercompleted?.results?.CompletedOrder);
    }
  }, [filteredOrdercompleted]);

  useEffect(() => {
    if (orderListAll) {
      console.log(orderListAll);
      setOrderList(orderListAll?.results?.order);
    }
  }, [orderListAll]);

  useEffect(() => {
    if (completedOrderListAll) {
      console.log(completedOrderListAll);
      setCompletedOrderList(completedOrderListAll?.results?.CompletedOrder);
    }
  }, [completedOrderListAll]);
  return (
    <>
      <Sidebar Dash={"orders"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row buyersseller justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow px-0">
                    <ul
                      className="nav nav-tabs comman_tabs"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          Upcoming Order
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#profile"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          Completed Orders
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="row px-4 py-4 mx-0">
                          <div className="col-12 inner_design_comman border">
                            <div className="row comman_header justify-content-between">
                              <div className="col-auto">
                                <h2>Upcoming Order</h2>
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
                              <div className="form-group mb-0 col-2">
                                <Link
                                  className="comman_btn d-flex w-100"
                                  disabled
                                >
                                  <span>Search</span>
                                </Link>
                              </div>
                            </form>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        <th>Full Name</th>
                                        <th>Email Id</th>
                                        <th>Order Date</th>
                                        <th>Order Amount</th>
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {orderList?.map((item, index) => {
                                        return (
                                          <tr key={index}>
                                            <td> {index + 1} </td>
                                            <td>
                                              {" "}
                                              {item?.firstName} {item?.lastName}{" "}
                                            </td>
                                            <td>xyz@gmail.com</td>
                                            <td>
                                              {" "}
                                              {item?.createdAt?.slice(
                                                0,
                                                10
                                              )}{" "}
                                            </td>
                                            <td>{item?.total} SAR</td>
                                            <td>Credit Card</td>
                                            <td>
                                              {" "}
                                              <div
                                                className={
                                                  item?.orderStatus ===
                                                  "Cancelled"
                                                    ? "text-danger"
                                                    : item?.orderStatus ===
                                                      "Pending"
                                                    ? "text-warning"
                                                    : item?.orderStatus ===
                                                      "Packed"
                                                    ? "text-info"
                                                    : item?.orderStatus ===
                                                      "Approved"
                                                    ? "text-success"
                                                    : item?.orderStatus ===
                                                      "Inprogress"
                                                    ? "text-primary"
                                                    : item?.orderStatus ===
                                                      "Delivered"
                                                    ? "text-secondary"
                                                    : "text-default"
                                                }
                                                style={{
                                                  background:
                                                    item?.orderStatus ===
                                                    "Cancelled"
                                                      ? "#ffe5e5"
                                                      : item?.orderStatus ===
                                                        "Pending"
                                                      ? "#fff6e5"
                                                      : item?.orderStatus ===
                                                        "Packed"
                                                      ? "#e5f0ff"
                                                      : item?.orderStatus ===
                                                        "Approved"
                                                      ? "#e5ffe5"
                                                      : item?.orderStatus ===
                                                        "Inprogress"
                                                      ? "#e5e5ff"
                                                      : item?.orderStatus ===
                                                        "Delivered"
                                                      ? "#f3f3f3"
                                                      : "#f9f9f9",
                                                  borderRadius: "5px",
                                                  padding: "2px 5px",
                                                }}
                                              >
                                                {item?.orderStatus}
                                              </div>{" "}
                                            </td>
                                            <td>
                                              <Link
                                                className="comman_btn table_viewbtn"
                                                to="/upcoming-orders"
                                              >
                                                <span>View</span>
                                              </Link>
                                              <a
                                                className="comman_btn bg-danger table_viewbtn ms-1"
                                                href="javascript:;"
                                              >
                                                <span>Delete</span>
                                              </a>
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
                      <div
                        className="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="row px-4 py-4 mx-0">
                          <div className="col-12 inner_design_comman border">
                            <div className="row comman_header justify-content-between">
                              <div className="col-auto">
                                <h2>Complete Order</h2>
                              </div>
                            </div>
                            <form
                              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                              action=""
                            >
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="fromDate1">From</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="fromDate1"
                                  value={fromDate1}
                                  onChange={(e) => setFromDate1(e.target.value)}
                                />
                              </div>
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="toDate1">To</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="toDate1"
                                  value={toDate1}
                                  onChange={(e) => setToDate1(e.target.value)}
                                />
                              </div>
                              <div className="form-group mb-0 col-2">
                                <Link
                                  className="comman_btn d-flex w-100"
                                  disabled
                                >
                                  <span>Search</span>
                                </Link>
                              </div>
                            </form>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        <th>Full Name</th>
                                        <th>Email Id</th>
                                        <th>Order Date</th>
                                        <th>Order Amount</th>
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {completedOrderList?.map(
                                        (item, index) => {
                                          return (
                                            <tr key={index}>
                                              <td> {index + 1} </td>
                                              <td>
                                                {item?.firstName}{" "}
                                                {item?.lastName}
                                              </td>
                                              <td>xyz@gmail.com</td>
                                              <td>
                                                {item?.createdAt?.slice(0, 10)}
                                              </td>
                                              <td>{item?.total} SAR</td>
                                              <td>Credit Card</td>
                                              <td>
                                                <div
                                                  className={
                                                    item?.orderStatus ===
                                                    "Cancelled"
                                                      ? "text-danger"
                                                      : item?.orderStatus ===
                                                        "Pending"
                                                      ? "text-warning"
                                                      : item?.orderStatus ===
                                                        "Packed"
                                                      ? "text-info"
                                                      : item?.orderStatus ===
                                                        "Approved"
                                                      ? "text-success"
                                                      : item?.orderStatus ===
                                                        "Inprogress"
                                                      ? "text-primary"
                                                      : item?.orderStatus ===
                                                        "Delivered"
                                                      ? "text-secondary"
                                                      : "text-default"
                                                  }
                                                  style={{
                                                    background:
                                                      item?.orderStatus ===
                                                      "Cancelled"
                                                        ? "#ffe5e5"
                                                        : item?.orderStatus ===
                                                          "Pending"
                                                        ? "#fff6e5"
                                                        : item?.orderStatus ===
                                                          "Packed"
                                                        ? "#e5f0ff"
                                                        : item?.orderStatus ===
                                                          "Approved"
                                                        ? "#e5ffe5"
                                                        : item?.orderStatus ===
                                                          "Inprogress"
                                                        ? "#e5e5ff"
                                                        : item?.orderStatus ===
                                                          "Delivered"
                                                        ? "#f3f3f3"
                                                        : "#f9f9f9",
                                                    borderRadius: "5px",
                                                    padding: "2px 5px",
                                                  }}
                                                >
                                                  {item?.orderStatus}
                                                </div>
                                              </td>
                                              <td>
                                                <a
                                                  className="comman_btn table_viewbtn"
                                                  href="complete-order-view.html"
                                                >
                                                  <span>View</span>
                                                </a>
                                                <a
                                                  className="comman_btn bg-danger table_viewbtn ms-1"
                                                  href="javascript:;"
                                                >
                                                  <span>Delete</span>
                                                </a>
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderManagement;
