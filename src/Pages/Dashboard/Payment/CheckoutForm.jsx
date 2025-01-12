import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        const postPay = async () => {
            try {
                const res = await axiosSecure.post(`/create-checkout-session`, { price: totalPrice })
                // const data = await res.data
                setClientSecret(res.data.clientSecret)
                // console.log("Data from payment response:", data);
            } catch (error) {
                // console.error('An error occurred during payment:', error)
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        if (totalPrice > 0.50) {
            postPay()
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card })
        if (error) {
            // console.log("Payment error: ", error)
            setError(error.message)
        } else {
            // console.log('pament method: ', paymentMethod)

            setError('')
        }

        // confirm payment 
        const { paymentIntent, error: confirmingErr } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "Anonymous",
                    email: user?.email || "anonymous@mail.com"
                }
            }
        })
        if (confirmingErr) {
            // console.error("Confirming error occured", confirmingErr)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: confirmingErr.message,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            // console.log("Payment Intent success", paymentIntent)
            if (paymentIntent.status === "succeeded") {
                // console.log("Transaction ID: ", paymentIntent.id)
                setTransactionId(paymentIntent.id)
                // now save the payment in db 
                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert, use moment js to convert
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: "pending"
                }
                try {
                    const res = await axiosSecure.post('/payments', payment)
                    const data = res.data
                    if (data?.paymentResult?.insertedId) {
                        Swal.fire({
                            position: "top-right",
                            icon: "success",
                            title: "Thanks for purchased successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        })
                        refetch();
                        navigate('/dashboard/paymentHistory')
                    }
                    // console.log("saved payment info: ", data)
                } catch (error) {
                    // console.error("Error saving payment info to db", error)
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: error.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-error my-5' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                {transactionId && <p className='text-green-500'>Your succeeded Transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;