import React, { useEffect, useState } from 'react';

const useMenus = () => {
        const [menus, setMenus] = useState([])
        const [loading, setLoading] = useState(true)
        useEffect(()=>{
            fetch('http://localhost:5000/menu')
            .then(res=> res.json())
            .then(data=> {
                console.log(data)
                setMenus(data)
                setLoading(false)
            })
        },[])
    return [menus, loading]
};

export default useMenus;