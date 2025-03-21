import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Account from "./components/account";
import Recycling from "./components/recycling";
import Notifications from "./components/notifications";
import History from "./components/history";
import ForgetPassword from "./components/forget_password";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/register" element={ <Register /> }></Route>
        <Route path="/home" element={ <Home /> }></Route>
        <Route path="/account" element={ <Account /> }></Route>
        <Route path="/recycling" element={ <Recycling /> }></Route>
        <Route path="/notifications" element={ <Notifications /> }></Route>
        <Route path="/recycling-history" element={ <History /> }></Route>
        <Route path="/forget-password" element={ <ForgetPassword /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
