import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useMenus = () => {
    const axiosPublic = useAxiosPublic();
        // const [menus, setMenus] = useState([])
        // const [loading, setLoading] = useState(true)
        // useEffect(()=>{
        //     fetch('https://bistro-restaurant-server-dusky.vercel.app/menu')
        //     .then(res=> res.json())
        //     .then(data=> {
        //         console.log(data)
        //         setMenus(data)
        //         setLoading(false)
        //     })
        // },[])

        const {data: menus=[], refetch, isPending:loading, isError, error} = useQuery({
            queryKey: ['menus'],
            queryFn: async () => {
                const response = await axiosPublic.get('/menu')
                return response.data
            }
        })
    return [menus, refetch, loading, isError, error]
};

export default useMenus;