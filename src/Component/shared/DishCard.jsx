import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';

const DishCard = ({ item }) => {
    const { user } = useAuth();
    const { name, image, recipe, price, _id } = item;
    const navigate = useNavigate();
    const location = useLocation();
    const secureAxios = useAxiosSecure();
    const [cart, refetch] = useCart()

    const handleAddToCart = async () => {
        if (user && user?.email) {
            // send cart item to db with user info 
            const cartItem = {
                menuId: _id,
                email: user.email,
                name, 
                image,
                price
            }
            try {
                const res = await secureAxios.post(`/carts`, cartItem)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} is added in cart!`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    refetch();
                }

            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: "Error!",
                    text: "There was an issue adding the item to the cart. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            }

        } else {
            Swal.fire({
                title: "You aren't signed in!",
                text: "Please sign in add to cart your favorite",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Let's go"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send user to signin page 
                    navigate('/signin', { state: { from: location } })
                }
            });
        }
        console.log(food, user?.email)
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src={image}
                    alt={name}
                    className="rounded-xl" />
            </figure>
            <p className='absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white'>${price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button
                        onClick={ handleAddToCart}
                        className="btn btn-sm hover:bg-black bg-gray-200 border-b-4
                    border-b-yellow-500 text-yellow-500"
                    >Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default DishCard;