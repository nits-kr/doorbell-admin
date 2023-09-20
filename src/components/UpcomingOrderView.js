import React from "react";
import Sidebar from "./Sidebar";

function UpcomingOrderView() {
  return (
    <>
      <Sidebar />
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
                        <form className="form-design row" action="">
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Full Name</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              defaultValue="Mohd. Arbab"
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
                              defaultValue="01/01/2020"
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
                              defaultValue="Credit Card"
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
                              defaultValue="In Progress"
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
                              defaultValue={
                                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae quasi provident nesciunt eligendi nobis placeat totam corrupti, itaque impedit natus ex fuga consequuntur optio veniam quam sit maxime voluptates perferendis."
                              }
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

export default UpcomingOrderView;
