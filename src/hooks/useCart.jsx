import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const secureAxios = useAxiosSecure();
    const { user } = useAuth();
    // tanstack query using 
    const {refetch, data: cart=[]} = useQuery({
        queryKey:['cart', user?.email],
        queryFn: async () => {
            const response = await secureAxios.get(`/carts?email=${user.email}`)
            return response.data;
        }
    })

    return [cart, refetch];
};

export default useCart;