import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
   const storeSender = localStorage.getItem("sender");

   const [admin, setAdmin] = useState<boolean>(false);

   const [receiver, setReceiver] = useState<{ username: string; role: string; _id: number }>();

   const [sender, setSender] = useState<{ userName: string; role: string; _id: string }>(
      JSON.parse(storeSender as string)
   );

   useEffect(() => {
      if (sender?.role === "admin") {
         setAdmin(true);
      } else {
         setAdmin(false);
      }
   }, [sender]);

   return (
      <ChatContext.Provider
         value={{ value: "some", setReceiver, receiver, sender, setSender, admin, setAdmin }}
      >
         {children}
      </ChatContext.Provider>
   );
};

export default ChatProvider;
