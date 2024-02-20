import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChatContext } from "@/context/ChatContext";
import { useContext } from "react";

const ChatBubble = ({ message }) => {
   const { sender } = useContext(ChatContext);
   // console.log(message);
   return (
      <div
         className={`flex gap-2 items-center w-full  my-2 ${
            message.sender === sender?._id ? "justify-end" : "justify-start"
         }`}
      >
         <Avatar>
            <AvatarImage src="https://pbs.twimg.com/profile_images/754207607875862528/8bxQXZT4_400x400.jpg"></AvatarImage>
         </Avatar>
         <div className="px-5 py-3 max-w-64 bg-white rounded-md">
            <p>{message?.text}</p>
         </div>
      </div>
   );
};

export default ChatBubble;
