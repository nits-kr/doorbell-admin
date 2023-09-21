import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateOrderStatusMutation } from "../services/Post";

function UpcomingOrderView() {
  const [orderStatus, setOrderStatus] = useState([]);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const { item } = useParams();
  const navigate = useNavigate();

  let parsedItem = null;
  try {
    if (item) {
      parsedItem = JSON.parse(decodeURIComponent(item));
      console.log("parsedItem", parsedItem);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  if (!parsedItem) {
    console.error("Item data is missing or invalid.");
  }
  console.log("parsedItem", parsedItem);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const editHelp = {
      id: parsedItem?._id,
      status: orderStatus,
    };
    try {
      await updateOrderStatus(editHelp);
      Swal.fire({
        icon: "success",
        title: "Changes Saved",
        text: "The Status has been updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          // window.location.reload();
          navigate("/orders");
          setTimeout(() => {
            window.location.reload();
          }, 500);
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
      <Sidebar Dash={"orders"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row buyers-details justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4 toggle_set">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Upcoming Order Details</h2>
                      </div>
                    </div>
                    <div className="row justify-content-center py-5">
                      <div className="col-10">
                        <form
                          className="form-design row"
                          action=""
                          onSubmit={handleSaveChanges}
                        >
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Full Name</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              defaultValue={`${parsedItem?.firstName} ${parsedItem?.lastName}`}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Email Id</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              defaultValue="xyz@gmail.com"
                              readOnly
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Order Date</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              defaultValue={parsedItem?.createdAt?.slice(0, 10)}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Order Amount</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              defaultValue="100 SAR"
                              readOnly
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Payment Method</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              defaultValue={parsedItem?.paymentMethod}
                              readOnly
                            />
                          </div>
                          {/* <div className="form-group col-6">
                            <label htmlFor="quesstioon">Status</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              defaultValue="In Progress"
                            />
                          </div> */}
                          <div className="form-group col-6">
                            <form>
                              <label htmlFor="quesstioon">Status</label>
                              <div className="form-floating ">
                                <select
                                  className="form-select"
                                  id="floatingSelect12"
                                  aria-label="  select example"
                                  defaultValue={parsedItem?.orderStatus}
                                  style={{
                                    padding: "14px",
                                    height: "50px",
                                  }}
                                  onChange={(e) =>
                                    setOrderStatus(e.target.value)
                                  }
                                >
                                  <option value="">Order Status</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                  <option value="InProgress">InProgress</option>
                                </select>
                              </div>
                            </form>
                          </div>
                          <div className="form-group col-12">
                            <label htmlFor="quesstioon">Address</label>
                            <textarea
                              disabled=""
                              className="form-control"
                              name=""
                              id=""
                              style={{ height: 100 }}
                              defaultValue={parsedItem?.address}
                            />
                          </div>
                          <div className="form-group col-10 text-center mb-0">
                            <button type="submit" className="comman_btn">
                              <span>Update Status</span>
                            </button>
                          </div>
                        </form>
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

export default UpcomingOrderView;
