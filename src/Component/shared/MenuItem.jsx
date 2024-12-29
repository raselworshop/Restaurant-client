import React from 'react';

const MenuItem = ({menu}) => {
    const {name, image, price, recipe} = menu;
    return (
        <div className='flex space-x-2'>
            <img style={{borderRadius: "0 200px 200px 200px"}} className='w-28' src={image} alt={name} />
            <div>
                <h3 className='uppercase'>{name}---------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>${price}</p>
        </div>
    );
};

export default MenuItem;