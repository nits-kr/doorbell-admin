import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import RecentOrderDetails from "./components/RecentOrderDetails";
import OrderDetails from "./components/OrderDetails";
import OrderManagement from "./components/OrderManagement";
import Login from "./components/Login";
import LanguageSelection from "./components/LanguageSelection";
import HelpView from "./components/HelpView";
import Help from "./components/Help";
import ForgetPassword from "./components/ForgetPassword";
import EditProfile from "./components/EditProfile";
import ContentManagement from "./components/ContentManagement";
import ContactUs from "./components/ContactUs";
import ChangePassword from "./components/ChangePassword";
import Varification from "./components/Varification";
import UsersManagement from "./components/UsersManagement";
import TransactionManagement from "./components/TransactionManagement";
import TransactionDetails from "./components/TransactionDetails";

import VerificationModal from "./components/VerificationModal";

import LoadingBar from "react-top-loading-bar";
import ProductManagement2 from "./components/ProductManagement2";
import ProductList2 from "./components/ProductList2";
import GoogleMap from "./components/GoogleMap";

import ProductManagementView from "./components/ProductManagementView";
import DashboardNew from "./components/DashboardNew";
import UpcomingOrderView from "./components/UpcomingOrderView";
import CompletedOrderView from "./components/CompletedOrderView";
import Faqs from "./components/Faqs";

function App() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route exact className="active" path="/" element={<Login />} />
          <Route
            exact
            className="active"
            path="/dashboard"
            element={<DashboardNew setProgress={setProgress} />}
          />

          <Route
            exact
            className="active"
            path="/users"
            element={<UsersManagement setProgress={setProgress} />}
          />

          <Route exact className="active" path="/map" element={<GoogleMap />} />

          <Route
            exact
            className="active"
            path="/product-management"
            element={<ProductManagement2 setProgress={setProgress} />}
          />

          <Route
            exact
            className="active"
            path="/product-management-view/:item"
            element={<ProductManagementView setProgress={setProgress} />}
          />

          <Route
            exact
            className="active"
            path="/products"
            element={<ProductList2 setProgress={setProgress} />}
          />

          <Route
            exact
            className="active"
            path="/orders"
            element={<OrderManagement setProgress={setProgress} />}
          />
          <Route
            exact
            className="active"
            path="/upcoming-orders/:item"
            element={<UpcomingOrderView />}
          />
          <Route
            exact
            className="active"
            path="/completed-orders/:item"
            element={<CompletedOrderView />}
          />

          <Route
            exact
            className="active"
            path="/transactions"
            element={<TransactionManagement setProgress={setProgress} />}
          />

          <Route
            exact
            className="active"
            path="/content-management"
            element={<ContentManagement setProgress={setProgress} />}
          />

          <Route
            exact
            className="active"
            path="/contact-us"
            element={<ContactUs />}
          />
          <Route exact className="active" path="/help" element={<Help />} />

          <Route
            exact
            className="active"
            path="/reset"
            element={<ResetPassword />}
          />
          <Route
            exact
            className="active"
            path="/recent-order/:item"
            element={<RecentOrderDetails />}
          />
          <Route
            exact
            className="active"
            path="/help-view/:item"
            element={<HelpView />}
          />
          <Route
            exact
            className="active"
            path="/forget-password"
            element={<ForgetPassword />}
          />
          <Route
            exact
            className="active"
            path="/order-details/:id"
            element={<OrderDetails />}
          />

          <Route
            exact
            className="active"
            path="/languageSelection"
            element={<LanguageSelection />}
          />
          <Route
            exact
            className="active"
            path="/editProfile"
            element={<EditProfile />}
          />
          <Route
            exact
            className="active"
            path="/changePassword"
            element={<ChangePassword />}
          />
          <Route
            exact
            className="active"
            path="/varification"
            element={<Varification />}
          />

          <Route
            exact
            className="active"
            path="/transactionDetails"
            element={<TransactionDetails />}
          />

          <Route
            exact
            className="active"
            path="/verificationModal"
            element={<VerificationModal />}
          />

          <Route
            exact
            className="active"
            path="/faqs"
            element={<Faqs setProgress={setProgress} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
