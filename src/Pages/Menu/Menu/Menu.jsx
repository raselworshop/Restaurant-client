import React from 'react';
import { Helmet, } from 'react-helmet-async';
import Cover from '../../shared/Cover/Cover';
import menubgimg from '../../../assets/menu/banner3.jpg'
import SectionTitle from '../../../Component/shared/SectionTitle';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import useMenus from '../../../hooks/useMenus';
import CategoryMenu from '../MenuCategory/CategoryMenu';

const Menu = () => {
    const [menus] = useMenus()
    const dessert = menus.filter(item => item.category === 'dessert')
    const soup = menus.filter(item => item.category === 'soup')
    const salad = menus.filter(item => item.category === 'salad')
    const pizza = menus.filter(item => item.category === 'pizza')
    const offered = menus.filter(item => item.category === 'offered')

    return (
        <div>
            <Helmet>
                <title>BISTRO BOSS || MENU</title>
            </Helmet>
            <Cover img={menubgimg}
                title={'our menu'} description={"Would you like to try a dish?"}
            ></Cover>
            {/* main cover */}
            <SectionTitle heading={"TODAY'S OFFER"} subheading={"---Don't miss---"} />
            {/* offered */}
            <CategoryMenu items={offered}></CategoryMenu>
            {/* dessert menu items */}
            <CategoryMenu items={dessert}
                title={'DESSERTS'} 
                coverImg={dessertImg}
                description={"Proactively coordinate long-term high-impact catalysts for change and enabled infrastructures. Competently envisioneer future-proof leadership skills for backward-compatible."}
            ></CategoryMenu>
            {/* pizza menu items */}
            <CategoryMenu items={pizza}
                title={'Pizza'} 
                coverImg={pizzaImg}
                description={"Continually foster B2B imperatives through progressive manufactured products. Dramatically target multidisciplinary channels whereas installed base mindshare."}
            ></CategoryMenu>
            {/* salads menu items */}
            <CategoryMenu items={salad}
                title={'salads'} 
                coverImg={saladImg}
                description={"Uniquely cultivate standards compliant catalysts for change whereas multimedia based mindshare. Enthusiastically implement high standards in value."}
            ></CategoryMenu>
            {/* soups menu items */}
            <CategoryMenu items={soup}
                title={'salads'} 
                coverImg={soupImg}
                description={"Quality platforms. Globally develop go forward customer service after seamless niche markets."}
            ></CategoryMenu>


        </div>
    );
};

export default Menu;
