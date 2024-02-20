import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllSupport = () => {
   const [supports, setSupports] = useState<
      {
         supportId: string;
         _id: string;
         customerId: string;
         issue: string;
         message: string;
         status: string;
         createdAt: string;
         updatedAt: string;
      }[]
   >([]);

   useEffect(() => {
      fetch("http://localhost:4000/api/v2/get/support")
         .then((res) => res.json())
         .then((data) => setSupports(data?.response?.supports));
   }, []);

   return (
      <div className="container mx-auto">
         <h1 className="text-center font-bold text-4xl underline mb-8">All support </h1>

         <div>
            <Table>
               <TableCaption>A list of your recent invoices.</TableCaption>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[60px]">SL</TableHead>
                     <TableHead>Support ID</TableHead>
                     <TableHead>Customer Information</TableHead>
                     <TableHead>Issue</TableHead>
                     <TableHead>Issue Date & Time</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead>Solve Date</TableHead>
                     <TableHead>Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {supports?.map((support, i) => (
                     <TableRow key={support._id}>
                        <TableCell className="font-medium">{i + 1}</TableCell>
                        <TableCell>
                           <Link to={`/message/${support.supportId}`} state={support}>
                              {support?.supportId}
                           </Link>
                        </TableCell>
                        <TableCell>{support?.customerId?.username}</TableCell>
                        <TableCell>{support?.issue}</TableCell>
                        <TableCell>{support?.createdAt}</TableCell>
                        <TableCell>{support?.status}</TableCell>
                        <TableCell>{support?.updatedAt}</TableCell>
                        <TableCell>Edit</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   );
};

export default AllSupport;
