import Landing from "./landing/Landing";
 import Login from "./Login/Login";
import Reg from "./registration/Reg";
import Home from "./home/Home";
import Contactus from "./assets/Contact/Contactus";
import Product from "./Product/Product";
import { FilterProvider } from "./FilterContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Order from "./Order/Order";
import CartView from "./Cart/CartView";
import Adminlogin from "./Admin/Adminlogin";
import Adminheader from "./Admin/Adminheader";
import TotalOrders from "../total order/Totalorder";
import Totalusers from "../total users/Totalusers";
import OrderTracking from "./Ordertracking.jsx/OrderTracking";
import TotalSales from "./Totalsales/Totalsales";
import AboutUs from "./About us/Aboutus";
import ContactForm from "./assets/Contact/Contactus";
import UpiPayment from "./Upi/UpiPayment";


function App(){

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Reg/>
    },
    {
      path: "/home",
      element: <FilterProvider> <Home/></FilterProvider>
      },
      {
        path: "/about",
        element: <AboutUs/>
      },
     {
      path: "/Contactus",
      element: <Contactus/>
     } ,
     {
      path:"/product",
      element:<FilterProvider><Product/></FilterProvider>
     },
     {
      path:"/order",
      element:<Order/>
     },
     {
      path:"/cart",
      element:<CartView/>
     },
     {
      path:"/admin",
      element:<Adminlogin/>
     },
     {
      path:"/dash",
      element:<Adminheader/>
     },
     {
      path:"/Totalorders",
      element:<TotalOrders/>
     },
     {
      path:"/Totalusers",
      element:<Totalusers/>
     },
     {
      path:"/totalsales",
      element:<TotalSales/>
     },
     {
      path:"/ordertrack",
      element:<OrderTracking/>
     },
     {
      path:"/upi",
      element:<UpiPayment/>
     },
  ])
return(
  <>
  <RouterProvider router={router} />
  </>
)
}

export default App  
