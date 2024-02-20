import { Button } from "@/components/ui/button";
import React from "react";

const Support = () => {
   const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const message = e.currentTarget?.message?.value;
      const issue = e.currentTarget?.issue?.value;
      const customerId = Math.floor(Math.random() * 100000000000).toString();

      const support = { message, issue, customerId };

      fetch("http://localhost:4000/api/v2/create/support", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(support),
      })
         .then((res) => res.json())
         .then((data) => console.log(data));
   };

   return (
      <div className="container mx-auto">
         <div>
            <h2 className="text-center text-3xl font-bold">Support form</h2>
            <div>
               <form
                  onSubmit={handelSubmit}
                  className=" flex gap-5 flex-col justify-center items-center w-[400px] h-[400px] mx-auto"
               >
                  <div className="flex justify-center  flex-col">
                     <label htmlFor="issue">Write your issue.</label>
                     <input
                        className="px-5 py-3 border rounded-lg w-[350px]"
                        type="text"
                        name="issue"
                        id="issue"
                        placeholder="Write your issue"
                     />
                  </div>
                  <div className="flex justify-center  flex-col">
                     <label htmlFor="message">Write your message.</label>
                     <input
                        className="px-5 py-3 border rounded-lg w-[350px]"
                        type="text"
                        name="message"
                        id="message"
                        placeholder="Write your Message"
                     />
                  </div>

                  <Button type="submit">Submit</Button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Support;
