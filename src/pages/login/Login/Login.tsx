import { Button } from "@/components/ui/button";
import { ChatContext } from "@/context/ChatContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const navigate = useNavigate();

   const { setSender, sender, setAdmin } = useContext(ChatContext);

   /* {
      setSender: React.Dispatch<
         React.SetStateAction<
            | {
                 username: string;
                 role: string;
                 _id: number;
              }
            | undefined
         >
      >;
      setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
      sender: {
         username: string;
         role: string;
         _id: number;
      };
   }*/

   const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const obj = {
         username: e.currentTarget.username.value,
      };

      fetch("http://localhost:4000/api/v2/create/user", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(obj),
      })
         .then((res) => res.json())
         .then((data) => {
            setSender(data.user);
            console.log(data.user);
            if (data?.user?.role === "admin") {
               setAdmin(true);
            } else {
               setAdmin(false);
            }
            localStorage.setItem("sender", JSON.stringify(data?.user));
            if (data?.user?.username) {
               navigate("/");
            }
         });
      // console.log(obj);
   };

   useEffect(() => {
      if (sender) {
         navigate("/");
      }
   }, [sender, navigate]);

   return (
      <div className="flex justify-center items-center h-screen">
         <form onSubmit={submitForm}>
            <div className="w-96 h-96 rounded-lg bg-blue-300 flex flex-col justify-center items-center gap-5">
               <h2 className="text-3xl font-bold text-center underline mb-4">Login User</h2>
               <input
                  type="text"
                  className="border py-3 px-5 rounded-md border-black"
                  placeholder="Enter user name"
                  name="username"
                  id="username"
                  required
               />

               <Button>login</Button>
            </div>
         </form>
      </div>
   );
};

export default Login;
