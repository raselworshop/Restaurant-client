import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/payments/${user?.email}`);
            return response.data;
        }
    })
    return (
        <div>
            <h2 className="text-3xl">Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, idx) => <tr key={payment._id}>
                            <th>{idx + 1}</th>
                            <td>{payment.email}</td>
                            <td>${payment.price.toFixed(2)}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.status}</td>
                        </tr>)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th className='text-right'>Total Purchased:</th>
                            <th className='border-l-2'>
                                 ${payments.reduce((total, pay)=> total + parseFloat(pay.price), 0).toFixed(2) }
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;