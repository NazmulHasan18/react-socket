import { useContext, useEffect, useState } from "react";
import SenderAvatar from "./SenderAvatar";
import { ChatContext } from "@/context/ChatContext";

const Asidebar = () => {
   const [users, setUsers] = useState<{ username: string; _id: string }[]>([]);
   const { setReceiver, sender } = useContext(ChatContext);

   useEffect(() => {
      fetch("http://localhost:4000/api/v2/users")
         .then((res) => res.json())
         .then((data) => {
            const allUsers = data.users.filter((user) => user._id !== sender?._id);

            setUsers(allUsers);
            setReceiver(allUsers[0]);
         });
   }, [setReceiver, sender]);

   return (
      <div className="p-5 bg-slate-300 h-screen">
         <div>
            <div>
               <h2 className="uppercase text-2xl font-bold border-b-4 pb-4 mb-4 border-black ">Chat Box</h2>
            </div>
            <div className="overflow-auto h-[80vh]">
               {users.map((user) => (
                  <SenderAvatar user={user} key={user._id}></SenderAvatar>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Asidebar;
