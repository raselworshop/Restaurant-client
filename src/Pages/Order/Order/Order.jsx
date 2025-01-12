import React, { useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg';
import Cover from '../../shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenus from '../../../hooks/useMenus';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams();
    const initIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initIndex);
    const [menus] = useMenus();

    // console.log(category)
    const dessert = menus.filter(item => item.category === 'dessert')
    const soup = menus.filter(item => item.category === 'soup')
    const salad = menus.filter(item => item.category === 'salad')
    const pizza = menus.filter(item => item.category === 'pizza')
    const drinks = menus.filter(item => item.category === 'drinks')
    return (
        <div>
            <Helmet>
                <title>BISTRO BOSS || ORDER</title>
            </Helmet>
            <Cover img={orderCover}
                title={"order food"}
                description={"Synergistically build error-free communities via multifunctional e-commerce. Monotonectally repurpose robust functionalities"}
            ></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>SALADS</Tab>
                    <Tab>PIZZAS</Tab>
                    <Tab>SOUPS</Tab>
                    <Tab>DESSERTS</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;