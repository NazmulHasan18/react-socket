import { Button } from "@/components/ui/button";
import ChatBubble from "./ChatBubble";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "@/context/ChatContext";
import { io, Socket } from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";

type TMessage = {
   text: string;
   sender: string;
   file: string;
   receiver: string;
   supportId: string;
};

const ChatBox = () => {
   const socket = useRef<Socket | null>();
   const [newMsg, setNewMsg] = useState<TMessage>();
   const { receiver, sender, setSender, admin } = useContext(ChatContext);
   const [message, setMessage] = useState<TMessage[]>([]);
   const { supportId } = useParams();
   const location = useLocation();

   const supportDetails = location?.state;

   // console.log(supportDetails);
   useEffect(() => {
      socket.current = io("http://localhost:4000/");
   }, []);

   useEffect(() => {
      socket?.current?.on("connect", () => {
         // console.log(socket?.current?.id);
         // console.log(socket?.current?.connected);
      });
   }, []);

   useEffect(() => {
      socket?.current?.emit("addUsers", sender?._id);

      // socket?.current?.on("getUsers", (users) => {
      //    console.log(users);
      // });
   }, [sender]);

   useEffect(() => {
      socket?.current?.on("getMessage", (res) => {
         setNewMsg(res);
         console.log(res);
      });
   }, []);

   useEffect(() => {
      if (newMsg) {
         setMessage((prev) => [...prev, newMsg as TMessage]);
      }
   }, [newMsg]);

   const handelMessage = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const text = e.currentTarget.text.value;
      const messageObj = {
         supportId,
         receiver: admin ? supportDetails.customerId._id : supportDetails.supportAgent,
         sender: admin ? supportDetails.supportAgent : supportDetails.customerId._id,
         text,
      };
      // console.log(messageObj);
      socket?.current?.emit("message", messageObj);
      setMessage([...message, messageObj as TMessage]);
      e.currentTarget.reset();
      fetch("http://localhost:4000/api/v2/create/message", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(messageObj),
      })
         .then((res) => res.json())
         .then((data) => console.log(data));
   };

   useEffect(() => {
      fetch(`http://localhost:4000/api/v2/messages/${supportId}`)
         .then((res) => res.json())
         .then((data) => setMessage(data?.response?.messages));
   }, [supportId]);

   // console.log(receiver, sender);
   return (
      <div className="container mx-auto flex flex-col h-screen">
         <div className="bg-purple-300 p-3 font-bold text-3xl flex justify-between items-center">
            <p>{admin ? supportDetails.customerId.username : "Support Agent"} </p>
            <Button
               onClick={() => {
                  localStorage.removeItem("sender");
                  setSender(null);
                  // setMessage([]);
               }}
            >
               Log out
            </Button>
         </div>

         <div className="p-5 bg-blue-300 rounded-md m-5 h-auto flex-1 overflow-auto">
            {message?.map((text, i) => (
               <ChatBubble message={text} key={i}></ChatBubble>
            ))}
         </div>

         <div className="p-4 bg-gray-100">
            <form className="flex py-4" onSubmit={(e) => handelMessage(e)}>
               <input
                  type="text"
                  className="border-2 border-red-400 w-full rounded-md h-10"
                  name="text"
                  id="text"
               />
               <Button>Send</Button>
            </form>
         </div>
      </div>
   );
};

export default ChatBox;
