import { ChatContext } from "@/context/ChatContext";
import { User } from "lucide-react";
import { useContext } from "react";

const SenderAvatar = ({ user }: { user: { username: string; _id: string } }) => {
   const { setReceiver } = useContext(ChatContext);

   return (
      <div
         className="flex items-center justify-center gap-2 bg-slate-100 p-5 rounded-md hover:bg-slate-200 cursor-pointer group duration-200"
         onClick={() => setReceiver(user)}
      >
         <div className="text-4xl bg-white rounded-full border border-black">
            <User></User>
         </div>
         <div>
            <h2 className="text-xl font-bold">{user?.username}</h2>
            <p className="text-sm text-slate-400 group-hover:text-slate-700">This is recent message</p>
         </div>
      </div>
   );
};

export default SenderAvatar;
