import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import { useGetProductListAllQuery } from "../services/Post";
import { protocol } from "socket.io-client";

function ProductManagement2(props) {
  const [loading, setLoading] = useState(true);
  const { data: productListAll } = useGetProductListAllQuery();
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [productModel, setProductModel] = useState("");
  const [description, setDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [price, setPrice] = useState("");
  console.log("price", price);
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [color, setColor] = useState("");
  const [minOrderQuantity, setMinOrderQuantity] = useState("");
  const [certification, setCertification] = useState("");
  const [maxResolution, setMaxResolution] = useState("");
  const [itemId, setItemId] = useState([]);
  const [protocol, setProtocol] = useState("");
  const [formData, setFormData] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedImage2, setSelectedImage2] = useState([]);
  const initialFormData = {
    productName: "",
    productModel: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    minOrderQuantity: 0,
    color: "",
    certification: "",
    maxResolution: "",
    protocol: "",
  };

  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("token");

  console.log("productName", productName);
  useEffect(() => {
    if (productListAll) {
      props.setProgress(10);
      setLoading(true);
      console.log(productListAll);
      setTimeout(() => {
        setProductList(productListAll?.results?.productListing);
        props.setProgress(100);
        setLoading(false);
      }, 500);
    }
  }, [productListAll]);

  const handleItem = (item) => {
    console.log("handleItem price", item);
    setItemId(item?._id);
    setProductName(item?.productName || "");
    setProductModel(item?.productModel || "");
    setDescription(item?.description || "");
    setProductImages(item?.productImage || []);
    setPrice(item?.oldPrice || 0);
    console.log("setPrice", item?.Price);
    setDiscountedPrice(item?.Price || 0);
    setColor(item?.color || "");
    setMinOrderQuantity(item?.quantity || 0);
    setCertification(item?.certification || "");
    setMaxResolution(item?.maxResolution || "");
    setProtocol(item?.protocol || "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("edit category value:  ", value);
  };

  const handleFileChange = (e, key) => {
    const files = e.target.files;
    let img = [...selectedImage];
    let img2 = [...selectedImage2];
    for (const file of files) {
      img2.push(file);
      img.push(URL.createObjectURL(file));
    }
    console.log("img", img);
    setSelectedImage2(img2);
    setSelectedImage(img);
  };
  const id = "64edd147b7c70a1d5fc7f608";
  const handleOnSave = (e) => {
    e.preventDefault();
    const data = new FormData();
    // data.append("productName", formData.productName);
    // data.append("color", formData.color);
    // data.append("productModel", formData.productModel);
    // if (formData?.protocol) {
    //   data.append("protocol", formData.protocol);
    // }
    // data.append("certification", formData.certification);
    // data.append("maxResolution", formData.maxResolution);
    // data.append("oldPrice", formData.price);
    // data.append("Price", formData.discountedPrice);
    // data.append("quantity", formData.minOrderQuantity);
    // data.append("description", formData.description);
    // if (selectedImage2 && selectedImage2.length > 0) {
    //   selectedImage2.map((item, index) => {
    //     data.append(`productImage`, item);
    //   });
    if (formData.productName) {
      data.append("productName", formData.productName);
    }

    if (formData.color) {
      data.append("color", formData.color);
    }

    if (formData.productModel) {
      data.append("productModel", formData.productModel);
    }

    if (formData.protocol) {
      data.append("protocol", formData.protocol);
    }

    if (formData.certification) {
      data.append("certification", formData.certification);
    }

    if (formData.maxResolution) {
      data.append("maxResolution", formData.maxResolution);
    }

    if (formData.price) {
      data.append("oldPrice", formData.price);
    }

    if (formData.discountedPrice) {
      data.append("Price", formData.discountedPrice);
    }

    if (formData.minOrderQuantity) {
      data.append("quantity", formData.minOrderQuantity);
    }

    if (formData.description) {
      data.append("description", formData.description);
    }

    if (selectedImage2 && selectedImage2.length > 0) {
      selectedImage2.map((item, index) => {
        data.append(`productImage`, item);
      });
    }

    axios
      .post(
        `https://www.techgropsedev.com:2053/admin/update-product/${itemId}`,
        data
      )
      .then((response) => {
        setFormData(response.data.results.updateProduct);
        console.log(response.data.results.updateProduct);
        localStorage?.setItem(
          "productId",
          response?.data?.results?.updateProduct?._id
        );
        Swal.fire({
          title: "Product Updated!",
          text: "Your new product has been Updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // navigate("/products");
            window?.location?.reload();
          }
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const [descriptionEn2, setDescriptionEn2] = useState("");

  const handleItem2 = (item) => {
    setDescriptionEn2(item?.description || "");
  };
  return (
    <>
      {loading}
      <Sidebar Dash={"product-management"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row user-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Product Managemnet</h2>
                      </div>
                    </div>
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
                                  <th>Product Name</th>
                                  <th>Model Number</th>
                                  <th>Protocol </th>
                                  <th>Description</th>
                                  <th>Multiple images</th>
                                  <th>Price</th>
                                  <th>Discounted price</th>
                                  <th>Colour</th>
                                  <th>Minimum orders quantity</th>
                                  <th>Certification</th>
                                  <th>Max Resolution</th>
                                  <th>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {productList?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td> {index + 1} </td>
                                      <td>
                                        {item?.productName}
                                        {/* <br /> Video Doorbell{" "} */}
                                      </td>
                                      <td> {item?.productModel} </td>
                                      <td> {item?.protocol} </td>
                                      <td>
                                        <Link
                                          onClick={() => {
                                            handleItem2(item);
                                          }}
                                          style={{ cursor: "pointer" }}
                                          title="Click To View"
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdrop"
                                        >
                                          {item?.description?.slice(0, 20)}...{" "}
                                        </Link>
                                      </td>
                                      <td>
                                        <img
                                          className="product_immg"
                                          src={
                                            item?.productImage?.length > 0
                                              ? item?.productImage[0]
                                              : "assets/img/product1.png"
                                          }
                                          // src="assets/img/product1.png"
                                          alt=""
                                          style={{
                                            width: "150px",
                                            height: "50px",
                                          }}
                                        />
                                      </td>
                                      <td> {item?.oldPrice} SAR </td>
                                      <td>{item?.Price} SAR</td>
                                      <td> {item?.color} </td>
                                      <td>{item?.quantity} Pieces</td>
                                      <td> {item?.certification}</td>
                                      <td> {item?.maxResolution} </td>
                                      <td>
                                        <Link
                                          className="comman_btn table_viewbtn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit"
                                          href="#"
                                          onClick={() => handleItem(item)}
                                        >
                                          <span>Edit</span>
                                        </Link>
                                        <Link
                                          className="comman_btn table_viewbtn ms-2"
                                          to={`/product-management-view/${encodeURIComponent(
                                            JSON.stringify(item)
                                          )}`}
                                        >
                                          <span>View</span>
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                onSubmit={handleOnSave}
              >
                <div className="form-group col-6">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    className="form-control"
                    type="text"
                    id="productName"
                    name="productName"
                    defaultValue={productName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="productModel">Model Number</label>
                  <input
                    className="form-control"
                    type="text"
                    id="productModel"
                    name="productModel"
                    defaultValue={productModel}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="productModel">Protocol</label>
                  <input
                    className="form-control"
                    type="text"
                    id="protocol"
                    name="protocol"
                    defaultValue={protocol}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    type="text"
                    id="description"
                    name="description"
                    defaultValue={description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="price">Price</label>
                  <input
                    className="form-control"
                    type="text"
                    id="price"
                    name="price"
                    // value={price}
                    defaultValue={price}
                    onChange={handleInputChange}
                  />
                  {console.log("edit price", price)}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="discountedPrice">Discounted Price</label>
                  <input
                    className="form-control"
                    type="text"
                    id="discountedPrice"
                    name="discountedPrice"
                    // value={discountedPrice}
                    defaultValue={discountedPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="minOrderQuantity">
                    Minimum Order Quantity
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="minOrderQuantity"
                    name="minOrderQuantity"
                    // value={minOrderQuantity}
                    defaultValue={minOrderQuantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="color">Color</label>
                  <input
                    className="form-control"
                    type="text"
                    id="color"
                    name="color"
                    defaultValue={color}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="certification">Certification</label>
                  <input
                    className="form-control"
                    type="text"
                    id="certification"
                    name="certification"
                    defaultValue={certification}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="maxResolution">Max Resolution</label>
                  <input
                    className="form-control"
                    type="text"
                    id="maxResolution"
                    name="maxResolution"
                    defaultValue={maxResolution}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-12 position-relative">
                  <label htmlFor="gallery_images">Multiple Images</label>
                  <div className="upload_file">
                    <input
                      type="file"
                      className="form-control"
                      defaultValue=""
                      id="gallery_images"
                      accept="image/*"
                      name="gallery_images"
                      onChange={(e) => handleFileChange(e, "gallery_images")}
                      multiple
                    />
                    <label className="file_upload" htmlFor="gallery_images">
                      <div>
                        <img src="assets/img/upload.png" alt="" />
                        <span>
                          File Format: JPG, JPEG, PNG or PDF Size: Upto 500KB
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="show_images">
                    {selectedImage?.map((item, index) => {
                      console.log(item);
                      return (
                        <Link className="imguploded" href="#" key={index}>
                          <img src={item} alt="" />
                        </Link>
                      );
                    })}
                    {/* <a className="imguploded" href="#">
                      <img src="assets/img/product3.jpeg" alt="" />
                    </a>
                    <a className="imguploded" href="#">
                      <img src="assets/img/product3.jpeg" alt="" />
                    </a>
                    <a className="imguploded" href="#">
                      <img src="assets/img/product3.jpeg" alt="" />
                    </a>
                    <a className="imguploded" href="#">
                      <img src="assets/img/product3.jpeg" alt="" />
                    </a> */}
                  </div>
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button type="submit" className="comman_btn">
                    <span>Update</span>
                  </button>
                  <a
                    href="#"
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

      <div
        className="modal fade reply_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                DESCRIPTION
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-4">
              <div className="chatpart_main">
                <p>{descriptionEn2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductManagement2;
