import { ChatContext } from "@/context/ChatContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AdminOnly = ({ children }) => {
   const { admin } = useContext(ChatContext);

   if (!admin) {
      return <Navigate to={"/"}></Navigate>;
   }

   return children;
};

export default AdminOnly;
