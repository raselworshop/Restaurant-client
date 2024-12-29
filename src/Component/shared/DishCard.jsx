import React from 'react';

const DishCard = ({item}) => {
    const {name, image, recipe} = item;
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src={image}
                    alt={name}
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button className="btn btn-sm hover:bg-black bg-gray-200 border-b-4 border-b-yellow-500 text-yellow-500">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default DishCard;