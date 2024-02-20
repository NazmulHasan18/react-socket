import { Button } from "@/components/ui/button";
import { ChatContext } from "@/context/ChatContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserMessage = () => {
   const { sender } = useContext(ChatContext);
   const navigate = useNavigate();
   const [support, setSupport] = useState<{ supportId: string }>();

   useEffect(() => {
      fetch(`http://localhost:4000/api/v2/get/support/${sender._id}`)
         .then((res) => res.json())
         .then((data) => setSupport(data.supports));
   }, [sender]);

   const handelNewSupport = () => {
      const customerId = sender._id;

      fetch(`http://localhost:4000/api/v2/create/support`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ customerId }),
      })
         .then((res) => res.json())
         .then((data) => {
            setSupport(data.response.support);
            if (data.response.support._id) {
               navigate(`/message/${data?.response?.support?.supportId}`, { state: data.response.support });
            }
         });
   };

   return (
      <div className="container mx-auto">
         {support?.supportId ? (
            <div>
               <Link to={`/message/${support?.supportId}`} state={support}>
                  <Button>My Support</Button>
               </Link>
            </div>
         ) : (
            <Button onClick={handelNewSupport}>New Support</Button>
         )}
      </div>
   );
};

export default UserMessage;
