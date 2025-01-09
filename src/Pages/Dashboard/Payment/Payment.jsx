import React from 'react';
import SectionTitle from '../../../Component/shared/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckOutForm';

// todo: add publishable key 
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle heading={"Payment"} subheading={"Please pay for"}></SectionTitle>
            <div>
                <h2 className='text-3xl mb-3'>Make a Payment</h2>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;