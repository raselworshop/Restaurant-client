import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../Component/shared/SectionTitle';
import { useLoaderData } from 'react-router-dom';

const UpdateItem = () => {
    const [loading, setLoading] = useState(true);
    const item = useLoaderData();

    useEffect(() => {
        if (item) {
            setLoading(false);
        }
    }, [item]);

    return (
        <div>
            <SectionTitle heading={'Update an item'} subheading={'Refresh info'}></SectionTitle>
            {loading ? (
                <p>Loading...</p>
            ) : item ? (
                <div>
                    <h2>{item.name}</h2>
                    <p>{item.recipe}</p>
                    <p>Price: {item.price}</p>
                </div>
            ) : (
                <p>No data found.</p>
            )}
        </div>
    );
};

export default UpdateItem;
