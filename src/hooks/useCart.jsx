import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const secureAxios = useAxiosSecure()
    // tanstack query using 
    const {data: cart=[]} = useQuery({
        queryKey:['cart'],
        queryFn: async () => {
            const response = await secureAxios.get(`/carts`)
            return response.data;
        }
    })

    return [cart];
};

export default useCart;