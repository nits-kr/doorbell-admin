import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faCopy } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

function ProductManagementView(props) {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const navigate = useNavigate();
  // const { id } = useParams();

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
      <Sidebar Dash={"product-management"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row buyers-details justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4 toggle_set">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Product Managemnet Details</h2>
                      </div>
                    </div>
                    <div className="row justify-content-center py-5">
                      <div className="col-10">
                        <form className="form-design row" action="">
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Product Name</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              // defaultValue="Wi-Fi Smart Video Doorbell"
                              defaultValue={parsedItem?.productName}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Model Number</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              // defaultValue="R4115"
                              defaultValue={parsedItem?.productModel}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Description</label>
                            <textarea
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              // defaultValue="Lorem ipsum dolor sit"
                              defaultValue={parsedItem?.description}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Price</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              // defaultValue="100 SAR"
                              defaultValue={parsedItem?.Price}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">Discounted Price</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              // defaultValue="10 SAR"
                              defaultValue={
                                parsedItem?.oldPrice - parsedItem?.Price
                              }
                              readOnly
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="quesstioon">
                              Minimum Order Quantity
                            </label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              // defaultValue="1000 Pieces"
                              defaultValue={parsedItem?.quantity}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="quesstioon">Color</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              // defaultValue="Black"
                              defaultValue={parsedItem?.color}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="quesstioon">Certification</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              // defaultValue="1080P/2MP"
                              defaultValue={parsedItem?.certification}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="quesstioon">Max Resolution</label>
                            <input
                              disabled=""
                              className="form-control"
                              type="text"
                              id="quesstioon"
                              name="quesstioon"
                              // defaultValue="FCC"
                              defaultValue={parsedItem?.maxResolution}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-12 position-relative">
                            <label>Multiple Images</label>
                            <div className="upload_file">
                              <input
                                disabled=""
                                type="file"
                                id="file_upload"
                                name="file_upload"
                                className="d-none"
                              />
                              <label className="file_upload" htmlFor="">
                                <div className="show_images">
                                  {parsedItem?.productImage?.map(
                                    (item, index) => {
                                      return (
                                        <Link
                                          className="imguploded"
                                          to="#"
                                          key={index}
                                        >
                                          <img src={item} alt="" />
                                        </Link>
                                      );
                                    }
                                  )}
                                </div>
                                {/* <div>
                                  <img src="../assets/img/upload.png" alt="" />
                                  <span>
                                    File Format: JPG, JPEG, PNG or PDF Size:
                                    Upto 500KB
                                  </span>
                                </div> */}
                              </label>
                            </div>
                            <div className="show_images">
                              {/* {parsedItem?.productImage?.map((item, index) => {
                                return (
                                  <a
                                    className="imguploded"
                                    href="javascript:;"
                                    key={index}
                                  >
                                    <img src={item} alt="" />
                                  </a>
                                );
                              })} */}
                            </div>
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

export default ProductManagementView;
