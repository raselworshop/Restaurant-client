// import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Component/shared/SectionTitle';
import MenuItem from '../../Component/shared/MenuItem';
import useMenus from '../../hooks/useMenus';

const PopularMenu = () => {
const [menus] = useMenus()
const popularItem = menus.filter(item => item.category === 'popular')

    // const [menus, setMenus] = useState([])
    // useEffect(()=>{
    //     fetch('/menu.json')
    //     .then(res=> res.json())
    //     .then(data=> {
    //         console.log(data)
    //         const popularItem = data.filter(item => item.category === 'popular')
    //         setMenus(popularItem)
    //     })
    // },[])
    return (
        <section className='mb-12'>
            <SectionTitle heading={'FROM OUR MENU'} subheading={'---Check it out---'}/>
            <div className='grid md:grid-cols-2 gap-10'>
                {popularItem.map(menu=> <MenuItem key={menu._id} menu={menu}>
                </MenuItem>)}
            </div>
            <button className='btn border-b-4 border-b-black md:mt-12 lg:mt-16'>View Full Menu</button>
        </section>
    );
};

export default PopularMenu;