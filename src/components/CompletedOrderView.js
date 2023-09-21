import React from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";

function CompletedOrderView() {
  const { item } = useParams();
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
                        <h2>Completed Order Details</h2>
                      </div>
                    </div>
                    <div className="row justify-content-center py-5">
                      <div className="col-10">
                        <form className="form-design row" action="">
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
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Status</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              defaultValue={parsedItem?.orderStatus}
                              readOnly
                            />
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
                              readOnly
                            />
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

export default CompletedOrderView;
