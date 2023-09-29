import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTrash,
  faDollarSign,
  faMoneyBill1Wave,
  faDownload,
  faFileExport,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ Dash }) {
  const [profilePic, setProfilePic] = useState("");
  console.log("profilePic", profilePic);
  const storedPic = localStorage.getItem("profilePic");

  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("token");

  const loginId = localStorage?.getItem("loginId");

  useEffect(() => {
    axios
      .post(`https://www.techgropsedev.com:2053/admin/admin-details/${loginId}`)
      .then((response) => {
        setProfilePic(response?.data?.results?.adminDetail);
        console.log(response.data);
      });
  }, []);
  return (
    <>
      <div className="admin_main">
        <div className="siderbar_section">
          <div className="siderbar_inner">
            <div className="sidebar_logo">
              <Link to="javscript:;">
                <img src={require("../asset/img/logo.png")} alt="Logo" />
                {/* <img src="../assets/img/logo.png" alt="Logo" /> */}
              </Link>
            </div>
            <div className="sidebar_menus">
              <ul className="list-unstyled ps-1 m-0">
                <li>
                  <Link
                    className={Dash === "dashboard" ? "active" : ""}
                    to="/dashboard"
                  >
                    <i className="fal fa-box-full"></i>Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className={Dash === "users" ? "active" : ""}
                    to="/users"
                  >
                    <i className="fal fa-user"></i>Users Management
                  </Link>
                </li>

                <li>
                  <Link
                    className={Dash === "product-management" ? "active" : ""}
                    to="/product-management"
                  >
                    <i className="fas fa-cogs"></i>
                    <span>Product Management</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className={Dash === "orders" ? " active" : ""}
                    to="/orders"
                  >
                    <i className="fal fa-box-full"></i>Order Management
                  </Link>
                </li>

                <li>
                  <Link
                    className={Dash === "transactions" ? " active" : ""}
                    to="/transactions"
                  >
                    <i className="far fa-repeat-1"></i>Transaction Management
                  </Link>
                </li>

                <li>
                  <Link
                    className={Dash === "content-management" ? " active" : ""}
                    to="/content-management"
                  >
                    <i className="fal fa-user-edit"></i>Content Management
                  </Link>
                </li>

                <li>
                  <Link className={Dash === "help" ? "active" : ""} to="/help">
                    <i className="fal fa-hands-heart"></i>Help & Support
                  </Link>
                </li>
                <li>
                  <Link className={Dash === "faqs" ? "active" : ""} to="/faqs">
                    <i className="fal fa-hands-heart"></i>FAQs
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    <i className="fal fa-sign-out-alt"></i>Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="admin_main_inner">
          <div className="admin_header shadow">
            <div className="row align-items-center mx-0 justify-content-between w-100">
              <div className="col">
                <Link className="sidebar_btn" to="#">
                  <i className="far fa-bars"></i>
                </Link>
              </div>

              <div className="col-auto d-flex align-items-center">
                <div className="dropdown Profile_dropdown">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {storedPic ? (
                      <img src={storedPic} alt="" />
                    ) : (
                      <img
                        src={
                          profilePic?.adminProfile
                            ? profilePic?.adminProfile
                            : "../assets/img/profile_img1.png"
                        }
                        alt=""
                      />
                    )}
                    {/* <img
                      src={
                        profilePic?.adminProfile
                          ? profilePic?.adminProfile
                          : "../assets/img/profile_img1.png"
                      }
                      alt=""
                    /> */}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item" to="/editProfile">
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/forget-password">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
