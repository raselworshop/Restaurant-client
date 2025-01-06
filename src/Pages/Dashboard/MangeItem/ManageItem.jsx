import React from 'react';
import SectionTitle from '../../../Component/shared/SectionTitle';
import useMenus from '../../../hooks/useMenus';
import { FaTrashCan } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageItem = () => {
    const [menus, refetch, loading, isError, error] = useMenus();
    const axiosSecure = useAxiosSecure();

    const handleDelete = menu => {
        console.log(menu._id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/menu/${menu._id}`)
                    .then(res => {
                        console.log(res)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${menu.name} has been deleted.`,
                                icon: "success"
                            });
                        }else {
                            Swal.fire("Error!", "Failed to delete the menu from database.", "error");
                        }
                    })
            }
        });
    }
    if(loading){
        return <div>Data Loading...</div>
    }
    if (isError) {
        console.error("Error fetching menus:", error);
        return <p>Error fetching menus: {error.message}</p>;
    }
    
    return (
        <div>
            <SectionTitle heading={'Manage all items'} subheading={'Hurry up'}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menu, idx) => <tr key={menu._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={menu.image}
                                                    alt={menu.name} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td> {menu.name}</td>
                                <td>${menu.price}</td>
                                <td>
                                    <Link to={`/dashboard/updateItem/${menu._id}`}>
                                    <button
                                        className="btn btn-ghost btn-sm bg-orange-500">
                                        <FaEdit className='text-xl'></FaEdit>
                                    </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(menu)}
                                        className="btn btn-ghost">
                                        <FaTrashCan className='text-red-500 text-xl'></FaTrashCan>
                                    </button>
                                </td>
                            </tr>)}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;