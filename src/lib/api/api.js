import { baseUrl } from "@/lib/server/server"

export const getFeturedProducts = async ()=>{
    try{
    const res = await fetch(`${baseUrl}/featured-products`,{
        method: 'GET',
        cache: 'no-store'
    },    
)
const result = await res.json()
return result
    }catch(error){
        console.log('getFeturedProducts server problem',error)
    }
}



export const getAllProducts = async ({
  search = "",
  category = "",
  page = 1,
  limit = 12,
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (category.trim() && category.toLowerCase() !== "all") {
      params.set("category", category.trim());
    }

    params.set("page", String(page));
    params.set("limit", String(limit));

    const res = await fetch(
      `${baseUrl}/products?${params.toString()}`,
      {
        method: "GET",
        next: { revalidate: 30 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return await res.json();
  } catch (error) {
    console.error("getAllProducts server problem:", error);

    return {
      success: false,
      products: [],
      pagination: {
        currentPage: Number(page) || 1,
        limit: Number(limit) || 12,
        totalProducts: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
};






export const getProductDetails = async(productId)=>{
    try {
        const res = await fetch(`${baseUrl}/products/${productId}`,{
            method: 'GET',
            cache: 'no-store'
        })
        const result = await res.json()
        return result
    } catch (error) {
            console.log('getProductDetails server problem',error)

    }
}







