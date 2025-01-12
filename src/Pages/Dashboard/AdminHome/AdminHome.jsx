import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBookJournalWhills, FaDollarSign, FaUsers } from 'react-icons/fa6';
import { FaStreetView } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import BarCharts from './chart/BarCharts';
import PieCharts from './chart/PieCharts';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data;
        }
    })
    const { data : chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            return res.data;
        }
    })
    if(isLoading){
        return <CgSpinner/>
    }
    return (
        <div className='max-h-screen'>
            <h2 className="text-3xl">Hi, Welcome {user ? user.displayName : "Back"}</h2>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className='text-3xl'></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">{stats.revenue}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                       <FaUsers className='text-3xl'></FaUsers>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats.users}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                       <FaBookJournalWhills className='text-3xl'></FaBookJournalWhills>
                    </div>
                    <div className="stat-title">Menu Items</div>
                    <div className="stat-value">{stats.menuItems}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaStreetView className='text-3xl'/>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-1/2">
                 <BarCharts data={chartData}></BarCharts>
                </div>
                <div className="w-1/2">
                <PieCharts chartData={chartData}></PieCharts>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;