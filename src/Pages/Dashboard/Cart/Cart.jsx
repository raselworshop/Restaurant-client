import React from 'react';
import useCart from '../../../hooks/useCart';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const secureAxios = useAxiosSecure();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const handleDelete = id => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                secureAxios.delete(`/carts/${id}`)
                    .then(res => {
                        console.log(res)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className='flex justify-between mb-8'>
                <h1 className="text-4xl">Total Orders: {cart.length}</h1>
                <h1 className="text-4xl">Total Price: {totalPrice}</h1>
                {cart.length ? <Link to={'/dashboard/payment'}>
                    <button className="btn bg-orange-700">Pay</button>
                </Link>:
                <button className="btn bg-orange-700 btn-disabled">Pay</button>}
            </div>

            <div className="overflow-x-auto">
                <table className="table rounded-t-3xl">
                    {/* head */}
                    <thead className=''>
                        <tr className='bg-orange-700'>
                            <th>
                                #
                            </th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, idx) => (
                            <tr key={item._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>${item.price}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost">
                                        <FaTrashCan className='text-red-500 text-xl'></FaTrashCan>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;