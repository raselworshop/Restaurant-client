import React from 'react';
import { BiMenu } from 'react-icons/bi';
import { CiShoppingBasket } from 'react-icons/ci';
import { FaHome, FaRegAddressBook, FaShoppingCart } from 'react-icons/fa';
import { FaCalendar, FaList } from 'react-icons/fa6';
import { GrContactInfo } from 'react-icons/gr';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Dashboard = () => {
    const [cart] = useCart();
    return (
        <div className='flex'>
            {/* dashboard side bar  */}
            <div className="w-60 min-h-screen bg-orange-700">
                <ul className='menu'>
                    <li><NavLink to={'/dashboard/userHome'}>
                        <FaHome></FaHome>
                        User Home
                    </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/reservation'}>
                            <FaCalendar></FaCalendar>
                            My Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/cart'}>
                            <FaShoppingCart></FaShoppingCart>
                            My Cart ({cart.length})
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/review'}>
                            <FaRegAddressBook></FaRegAddressBook>
                            Add Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/bookings'}>
                            <FaList></FaList>
                            My Bookings
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/menu'}>
                            <BiMenu></BiMenu>
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                            <CiShoppingBasket></CiShoppingBasket>
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/'}>
                            <GrContactInfo></GrContactInfo>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content  */}
            <div className='flex-1 p-10'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;