import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';

const Navbar = () => {
    const { user, userSignOut } = useAuth();
    const [ isAdmin ] = useAdmin();
    const [cart] = useCart();

    const handleSignOUt = () => {
        userSignOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your successfully logged out",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                // console.log("log out error", error)
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }
    const links = <>
        <li><NavLink className={'btn btn-ghost'} to={'/'}>Home</NavLink></li>
        <li><NavLink className={'btn btn-ghost'} to={'/menu'}>Menu</NavLink></li>
        <li><NavLink className={'btn btn-ghost'} to={'/secret'}>Secret</NavLink></li>
        <li><NavLink className={'btn btn-ghost'} to={`/order/${'salad'}`}>Order</NavLink></li>

        {user && isAdmin && <li><NavLink className={'btn btn-ghost'} to={'/dashboard/adminHome'}>Dashboard</NavLink></li>}
        {user && !isAdmin && <li><NavLink className={'btn btn-ghost'} to={'/dashboard/userHome'}>Dashboard</NavLink></li>}

        <li><NavLink to={'/dashboard/cart'}>
            <button className="btn">
                <FaShoppingCart/>
                <div className="badge badge-secondary">+{cart.length}</div>
            </button>
        </NavLink></li>
        {user ? <>
            <button onClick={handleSignOUt} className="btn btn-ghost">Sign Out</button>
        </> : <>
            <li><NavLink className={'btn btn-ghost'} to={'/signin'}>Signin</NavLink></li>
            <li><NavLink className={'btn btn-ghost'} to={'/signup'}>Signup</NavLink></li>
        </>}
    </>
    return (
        <>
            <div className="navbar fixed z-20 bg-opacity-40 bg-black text-white max-w-screen-xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">BISTRO_BOSS</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;