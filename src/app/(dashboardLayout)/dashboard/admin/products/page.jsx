

import DeleteButton from "@/components/dashboard/DeleteButton";
import EditButton from "@/components/dashboard/EditButton";
import { getAllAdminProducts } from "@/lib/api/api";
import Image from "next/image";
import Link from "next/link";

const page = async() => {

 const products = await getAllAdminProducts()
    
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Student Table
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-3">ID</th>
              <th className="border border-gray-300 p-3">Name</th>
              <th className="border border-gray-300 p-3">Products</th>
              <th className="border border-gray-300 p-3">Action</th>
            </tr>
          </thead>

             <tbody>
         {products.map((product,index)=>(
            <tr 
               key={product._id}
            className="text-center hover:bg-gray-100">
              <td className="border border-gray-300 p-3"> {index + 1}</td>
              <td className="border border-gray-300 p-3">{product.name}</td>
              <td className="border border-gray-300 p-3">
               <Image
               src={product.image}
               alt={product.name}
               width={70}
               height={70}
               />
              </td>
              <td className="border  border-gray-300 p-3">
               <Link href={`/products/${product._id}/edit`}>
               <EditButton/>
               </Link>
               
                <DeleteButton productId={product._id}/>
              </td>
            </tr>

         
))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
