import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import ChatProvider from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ChatProvider>
         <RouterProvider router={router} />
      </ChatProvider>
   </React.StrictMode>
);
