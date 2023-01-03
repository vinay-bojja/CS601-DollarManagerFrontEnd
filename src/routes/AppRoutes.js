import { Routes, Route } from "react-router-dom";
import NavBar from "../components/HomePage/Navbar";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import HomePage from "../components/HomePage/HomePage";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ExpenseHome from "../components/Expense/ExpenseHome";
import ManageExpense from "../components/Expense/ManageExpense/ManageExpense";
import Splitter from "../components/Expense/Splitter/Splitter";
import AddExpense from "../components/Expense/ManageExpense/AddExpense";
import UpdateExpense from "../components/Expense/ManageExpense/UpdateExpense";
import DeleteExpense from "../components/Expense/ManageExpense/DeleteExpense";
import EditExpense from "../components/Expense/ManageExpense/EditExpense";
import View from "../components/Expense/View/View";
import ViewMonthly from "../components/Expense/View/ViewMonthly";
import SetLocalStorage from "../components/Login/SetLocalStorage";
import ResetPassword from "../components/ForgotPassword/ResetPassword";
import Groups from "../components/Expense/Splitter/Groups";
import Notifications from "../components/Expense/Splitter/Notifications";
import CreateGroup from "../components/Expense/Splitter/CreateGroup";
import AddFriends from "../components/Expense/Splitter/AddFriends";
import ViewGroup from "../components/Expense/Splitter/ViewGroup";
import AddGroupExpense from "../components/Expense/Splitter/AddGroupExpense";
import ViewDeleteExpense from "../components/Expense/Splitter/ViewDeleteExpense";
import Balance from "../components/Expense/Splitter/Balance";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Navbar" element={<NavBar />} />
      {/* <Route path="/AboutUs" element={<AboutUs />} />  
      <Route path="/ContactUs" element={<ContactUs />} /> */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Login/SetLocalStorage/:id" element={<SetLocalStorage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route
        path="/forgotPassword/resetPassword/:ssouid"
        element={<ResetPassword />}
      />
      <Route path="/expenseHome" element={<ExpenseHome />} />
      <Route path="/manageExpense" element={<ManageExpense />} />
      <Route path="/splitter" element={<Splitter />} />
      <Route path="/splitter/groups" element={<Groups />} />
      <Route path="/splitter/notification" element={<Notifications />} />
      <Route path="/splitter/groups/create" element={<CreateGroup />} />
      <Route path="/splitter/groups/addfriends/:id" element={<AddFriends />} />
      <Route path="/splitter/groups/view/:id" element={<ViewGroup />} />
      <Route
        path="/splitter/groups/addgroupexpense/:groupId"
        element={<AddGroupExpense />}
      />
      <Route
        path="/splitter/groups/viewdeletegroupexpense/:groupId"
        element={<ViewDeleteExpense />}
      />
      <Route path="/splitter/groups/balance/:groupId" element={<Balance />} />

      <Route path="/view" element={<View />} />
      <Route path="/manageExpense/addExpense" element={<AddExpense />} />
      <Route path="/manageExpense/updateExpense" element={<UpdateExpense />} />
      <Route path="/manageExpense/deleteExpense" element={<DeleteExpense />} />
      <Route
        path="/manageExpense/updateExpense/editExpense/:id"
        element={<EditExpense />}
      />
      <Route path="/view/viewMonthlyExpense" element={<ViewMonthly />} />
      {/* /splitter/groups */}
    </Routes>
  );
}

export default AppRoutes;
