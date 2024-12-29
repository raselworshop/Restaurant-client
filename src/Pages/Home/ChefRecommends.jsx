import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Component/shared/SectionTitle';
import DishCard from '../../Component/shared/DishCard';

const ChefRecommends = () => {
    const [menus, setMenus] = useState([])
    useEffect(() => {
        fetch('/menu.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const offered = data.filter(item => item.category === 'offered')
                setMenus(offered)
            })
    }, [])
    return (
        <section>
            <SectionTitle heading={"CHEF RECOMMENDS"} subheading={"---Should Try---"} />
            <div className='grid md:grid-cols-2 lg:grid-cols-3'>
                {menus.map(item => <DishCard key={item._id} item={item} />)}
            </div>
        </section>
    );
};

export default ChefRecommends;