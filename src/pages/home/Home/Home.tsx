// import Asidebar from "./Asidebar";
// import ChatBox from "./ChatBox";
// import { ChatContext } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { ChatContext } from "@/context/ChatContext";
import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
   // const [users, setUsers] = useState<{ username: string; _id: number }[]>([]);

   const { admin, sender, setSender } = useContext(ChatContext);

   const navigate = useNavigate();

   // const addUser = () => {
   //    setUsers((prev: { username: string; _id: number }[]) => [
   //       ...prev,
   //       { userName: Math.floor(Math.random() * 100000).toString(), id: Math.floor(Math.random() * 100000) },
   //    ]);
   // };

   useEffect(() => {
      if (!sender) {
         navigate("/login");
      }
   }, []);

   return (
      <div className="h-screen max-w-screen-xl container">
         <div>
            <h1 className="text-center text-3xl font-bold mb-6">Support System</h1>
            <div>
               <nav className="mt-6">
                  {/* <NavLink to="/support" className="px-5 py-3 bg-yellow-300 rounded-md ">
                     Support
                  </NavLink> */}
                  {admin ? (
                     <NavLink to="/all-support" className="px-5 py-3 bg-yellow-300 rounded-md ">
                        All-support
                     </NavLink>
                  ) : (
                     <NavLink to="/message" className="px-5 py-3 bg-yellow-300 rounded-md ">
                        Message
                     </NavLink>
                  )}
                  {!sender ? (
                     <NavLink to="/login">
                        <Button>Login</Button>
                     </NavLink>
                  ) : (
                     <Button
                        onClick={() => {
                           localStorage.removeItem("sender");
                           setSender(null);
                        }}
                     >
                        Log out
                     </Button>
                  )}
               </nav>
            </div>
         </div>
      </div>
   );
};

export default Home;
