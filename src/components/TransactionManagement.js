import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import {
  useFilterTransactionListByDateQuery,
  useGetTransactionListAllQuery,
} from "../services/Post";
function TransactionManagement(props) {
  const [loading, setLoading] = useState(true);
  const { data: transactionListAll } = useGetTransactionListAllQuery();
  const [transactionList, setTransactionList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data: filteredTransaction } = useFilterTransactionListByDateQuery(
    {
      from: fromDate,
      to: toDate,
    },
    {
      skip: !fromDate || !toDate,
    }
  );

  useEffect(() => {
    if (filteredTransaction?.results?.listaData) {
      setTransactionList(filteredTransaction?.results?.listaData);
    }
  }, [filteredTransaction]);

  useEffect(() => {
    if (transactionListAll) {
      props.setProgress(10);
      setLoading(true);
      console.log(transactionListAll);
      setTransactionList(transactionListAll?.results?.listaData);
      setLoading(false);
      props.setProgress(100);
    }
  }, [transactionListAll]);
  return (
    <>
      <Sidebar Dash={"transactions"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row user-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Transaction Management</h2>
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
                        <Link className="comman_btn" disabled>
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
                                <th>Customer name</th>
                                <th>Transaction Date &amp; Time</th>
                                {/* <th>Company Name</th> */}
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {loading ? (
                              <div
                                className="d-flex align-items-end justify-content-end "
                                style={{ marginLeft: "450px" }}
                              >
                                <Spinner />
                              </div>
                            ) : (
                              <tbody>
                                {transactionList?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1} </td>
                                      <td>
                                        {item?.firstName} {item?.lastName}
                                      </td>
                                      <td>
                                        {item?.createdAt?.slice(0, 10)} <br />{" "}
                                        {item?.createdAt?.slice(12, 19)}
                                      </td>
                                      {/* <td> {item?.companyName} </td> */}
                                      <td>{item?.total} SAR</td>
                                      <td> {item?.paymentMethod} </td>
                                      <td>
                                        <a
                                          className="comman_btn table_viewbtn"
                                          href="#"
                                        >
                                          <span>View</span>
                                        </a>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            )}
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
    </>
  );
}

export default TransactionManagement;
