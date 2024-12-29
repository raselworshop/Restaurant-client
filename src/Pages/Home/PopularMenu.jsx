import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Component/shared/SectionTitle';
import MenuItem from '../../Component/shared/MenuItem';

const PopularMenu = () => {

    const [menus, setMenus] = useState([])
    useEffect(()=>{
        fetch('/menu.json')
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            const popularItem = data.filter(item => item.category === 'popular')
            setMenus(popularItem)
        })
    },[])
    return (
        <section className='mb-12'>
            <SectionTitle heading={'FROM OUR MENU'} subheading={'---Check it out---'}/>
            <div className='grid md:grid-cols-2 gap-10'>
                {menus.map(menu=> <MenuItem key={menu._id} menu={menu}>
                </MenuItem>)}
            </div>
        </section>
    );
};

export default PopularMenu;