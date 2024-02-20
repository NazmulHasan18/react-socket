import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "@/pages/login/Login/Login";
import Support from "@/pages/support/Support";
import AllSupport from "@/pages/support/AllSupport";
import ChatBox from "@/pages/home/Home/ChatBox";
import UserMessage from "@/pages/home/Home/UserMessage";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout></MainLayout>,
   },
   {
      path: "/login",
      element: <Login></Login>,
   },
   {
      path: "/support",
      element: <Support></Support>,
   },
   {
      path: "/message/:supportId",
      element: <ChatBox></ChatBox>,
   },
   {
      path: "/message",
      element: <UserMessage></UserMessage>,
   },
   {
      path: "/all-support",
      element: <AllSupport></AllSupport>,
   },
]);

export default router;
