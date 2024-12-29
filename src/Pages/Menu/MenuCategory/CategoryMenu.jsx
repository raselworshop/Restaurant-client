import React from 'react';
import MenuItem from '../../../Component/shared/MenuItem';
import Cover from '../../shared/Cover/Cover';

const CategoryMenu = ({ items, title, description, coverImg }) => {
    return (
        <div className='my-6'>
            {title && <Cover img={coverImg}
                title={title} description={description}
            ></Cover>
            }
            <div className='grid md:grid-cols-2 gap-14 py-8'>
                {items.map(menu => <MenuItem key={menu._id} menu={menu}>
                </MenuItem>)}
            </div>
                <button className='btn border-b-4 border-b-black my-6'>ORDER YOUR FAVOURITE FOOD</button>
        </div>
    );
};

export default CategoryMenu;